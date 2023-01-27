import { auth } from "./firebase_init";

const providerSignIn = async (provider_name, handleSigningInState) => {
  if (!provider_name || !handleSigningInState) return false;

  let auth_provider;

  switch (provider_name) {
    case "google":
      const { provider_google } = await import(`./firebase_init`);
      auth_provider = provider_google;
      break;

    case "facebook":
      const { provider_facebook } = await import(`./firebase_init`);
      auth_provider = provider_facebook;
      break;

    default:
      auth_provider = null;
      return;
  }

  handleSigningInState(provider_name, true);

  let answer = {
    result: false,
    errorCode: false,
  };

  try {
    const { signInWithPopup, updateProfile } = await import(`firebase/auth`);
    const { auth } = await import(`./firebase_init`);

    const result = await signInWithPopup(auth, auth_provider);

    // update photoURL when sign-in is complete
    await updateProfile(result.user, {
      photoURL: `https://robohash.org/set_set2/${result.user.email}?size=150x150`,
    });
    // and reload
    result.user.reload();

    const {
      user: {
        displayName,
        photoURL,
        uid,
        email,
        providerData: [first_provider],
      },
    } = result;

    const { displayName: provider_displayName, email: provider_email } =
      first_provider;

    const { getAdditionalUserInfo } = await import(`firebase/auth`);
    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      // Add a new document in collection "users"
      const { setDoc, doc } = await import(`firebase/firestore`);
      const { db } = await import(`./firebase_init`);
      await setDoc(doc(db, "users", uid), {
        displayName: displayName || provider_displayName,
        photoURL,
        email: email || provider_email,
        uid,
        hideMe: false,
        hideUsername: false,
        hideEmail: false,
        feedSetting: `recent`,
      });
    }

    answer.result = true;

    return answer;
  } catch (error) {
    const errorCode = error.code;

    answer.errorCode = errorCode;

    return answer;
  } finally {
    handleSigningInState(provider_name, false);
  }
};

const userSignOut = async () => {
  try {
    const { signOut } = await import(`firebase/auth`);
    const { auth } = await import(`./firebase_init`);

    await signOut(auth);

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * takes params as array. checks if firebase auth token and all passed data are available. returns false if not, otherwise the user object
 * @returns {False | Object} false | User
 */
function is_Auth_Token_And_Passed_Data_Are_Available(params) {
  for (let index = 0; index < params.length; index++) {
    const param = params[index];

    if (!param) return false;
  }

  const user = auth.currentUser;

  if (!user) return false;

  return user;
}

const createPost = async ({ content, media, setUploading }) => {
  // if content or auth token isn't available
  if (!is_Auth_Token_And_Passed_Data_Are_Available([content, setUploading]))
    return false;

  const { displayName, uid, photoURL } =
    is_Auth_Token_And_Passed_Data_Are_Available([]);

  setUploading(true);
  try {
    let downloadURL = null;
    // upload photo if photo is available
    if (media) {
      const filePrevName = media?.name;
      const ext = filePrevName.split(".").pop();
      const fileNameWithoutExt = filePrevName?.substring(
        0,
        filePrevName?.lastIndexOf(".")
      );
      const fileName = `${fileNameWithoutExt}-${new Date().getTime()}-${uid}.${ext}`;

      const { uploadBytes, ref, getDownloadURL } = await import(
        `firebase/storage`
      );
      const { storage } = await import(`./firebase_init`);

      // creating fileName ref
      const mediaRef = ref(storage, `posts/${fileName}`);

      // upload photo in DB
      await uploadBytes(mediaRef, media);

      // getting media download url
      downloadURL = await getDownloadURL(mediaRef);
    }

    // encoded content
    const encodedContent = Buffer.from(content).toString("base64");

    // Add a new document in collection "posts"
    const { doc, collection, serverTimestamp, writeBatch } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    // grab `posts` collection
    const postsRef = collection(db, "posts");

    // create a doc in `posts` collection
    const postDocRef = doc(postsRef);

    // create `likers` subcollection in `posts` collection
    const likersSubColRef = collection(postDocRef, "likers");
    // create `likersArray` doc in `likers` subcollection
    const likersArray = doc(likersSubColRef, "likersArray");

    // create `trashRequest` subcollection in `posts` collection
    const trashRequestSubColRef = collection(postDocRef, "trashRequest");
    // create `trashRequestArray` doc in `trashRequest` subcollection
    const trashRequestArray = doc(trashRequestSubColRef, "trashRequestArray");

    const batch = writeBatch(db);

    const postData = {
      content: encodedContent,
      media: downloadURL,
      autherName: displayName,
      autherID: uid,
      autherPhoto: photoURL,
      cookies: 0,
      comments: 0,
      trashRequest: 0,
      creationTime: serverTimestamp(),
    };

    // setting post data
    batch.set(postDocRef, postData);

    // setting likers data
    batch.set(likersArray, {
      likers: [],
    });

    // setting trashRequest data
    batch.set(trashRequestArray, {
      trashRequest: [],
    });

    // commit batch
    await batch.commit();

    return true;
  } catch (e) {
    return false;
  } finally {
    setUploading(false);
  }
};

const postComment = async ({ postID, content, setUploading }) => {
  // if content, postID or auth token isn't available
  if (!is_Auth_Token_And_Passed_Data_Are_Available([content, setUploading]))
    return false;

  const { displayName, uid, photoURL } =
    is_Auth_Token_And_Passed_Data_Are_Available([]);

  setUploading(true);
  try {
    // encoded content
    const encodedContent = Buffer.from(content).toString("base64");

    const { collection, doc, serverTimestamp, writeBatch, increment } =
      await import(`firebase/firestore`);
    const { db } = await import(`./firebase_init`);

    // comments subcollection ref for adding doc
    const commentsRef = collection(db, "posts", postID, "comments");

    const commentDocRef = doc(commentsRef);

    const batch = writeBatch(db);

    const postDocRef = doc(db, "posts", postID);

    const commentData = {
      content: encodedContent,
      creationTime: serverTimestamp(),
      autherID: uid,
      autherName: displayName,
      autherPhoto: photoURL,
    };

    // add comments and increment comments count in batch
    batch.set(commentDocRef, commentData);
    batch.update(postDocRef, {
      comments: increment(1),
    });

    // commit batch
    await batch.commit();

    return true;
  } catch (error) {
    return false;
  } finally {
    setUploading(false);
  }
};

/**
 * @param {Object} param - post id and variant Object
 * @param {String} param.postID
 * @param {`likers` | `trashRequest`} param.variant
 * @returns {Promise<Boolean>} True if interaction is added succesfully. False on error
 */
const sendInteraction = async ({ postID, variant }) => {
  // if postID or auth token isn't available
  if (!is_Auth_Token_And_Passed_Data_Are_Available([postID, variant]))
    return false;

  const { uid } = is_Auth_Token_And_Passed_Data_Are_Available([]);

  try {
    const { arrayUnion, writeBatch, doc, increment } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    const batch = writeBatch(db);

    // interactions array doc ref
    const interactionsDocRef = doc(
      db,
      "posts",
      postID,
      variant,
      `${variant}Array`
    );

    // post ref
    const postRef = doc(db, "posts", postID);

    // update interactions array and increment interaction count in batch
    batch.update(interactionsDocRef, {
      [variant]: arrayUnion(uid),
    });
    batch.update(postRef, {
      [variant === `likers` ? `cookies` : `trashRequest`]: increment(1),
    });

    // commit batch
    await batch.commit();

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @param {Object} param - post id and variant Object
 * @param {String} param.postID
 * @param {`likers` | `trashRequest`} param.variant
 * @returns {Promise<Boolean>} True if interaction is removed succesfully. False on error
 */
const removeInteraction = async ({ postID, variant }) => {
  // if postID or auth token isn't available
  if (!is_Auth_Token_And_Passed_Data_Are_Available([postID, variant]))
    return false;

  const { uid } = is_Auth_Token_And_Passed_Data_Are_Available([]);

  try {
    const { arrayRemove, writeBatch, doc, increment } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    const batch = writeBatch(db);

    // interactions array doc ref
    const interactionsDocRef = doc(
      db,
      "posts",
      postID,
      variant,
      `${variant}Array`
    );

    // post ref
    const postRef = doc(db, "posts", postID);

    // update interactions array and increment interaction count in batch
    batch.update(interactionsDocRef, {
      [variant]: arrayRemove(uid),
    });
    batch.update(postRef, {
      [variant === `likers` ? `cookies` : `trashRequest`]: increment(-1),
    });

    // commit batch
    await batch.commit();

    return true;
  } catch (error) {
    return false;
  }
};

export {
  userSignOut,
  providerSignIn,
  createPost,
  postComment,
  sendInteraction,
  removeInteraction,
};
