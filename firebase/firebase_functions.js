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

const createPost = async ({
  content,
  media,
  setUploading,
  autherName,
  autherID,
  autherPhoto,
}) => {
  // if content, auther id or auther name isn't available
  if (!content || !autherID || !autherName || !autherPhoto) return false;

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
      const fileName = `${fileNameWithoutExt}-${new Date().getTime()}-${autherID}.${ext}`;

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
    const { addDoc, collection, serverTimestamp } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    const postsRef = collection(db, "posts");
    const dataForDB = {
      content: encodedContent,
      media: downloadURL,
      autherName,
      autherID,
      autherPhoto,
      cookies: 0,
      comments: 0,
      trashRequest: 0,
      creationTime: serverTimestamp(),
    };
    await addDoc(postsRef, dataForDB);

    return true;
  } catch (e) {
    return false;
  } finally {
    setUploading(false);
  }
};

const postComment = async ({
  content,
  commenterID,
  commenterName,
  commenterPhoto,
  postID,
  setUploading,
}) => {
  if (!content || !commenterID || !commenterName || !commenterPhoto || !postID)
    return false;

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
      autherID: commenterID,
      autherName: commenterName,
      autherPhoto: commenterPhoto,
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

const sendCookie = async ({ postID, cookieSender }) => {
  if (!postID || !cookieSender) return false;

  try {
    const { getDoc, writeBatch, increment, doc, query } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    // likers subcollection ref for adding doc on the next line
    const likersDocRef = doc(db, "posts", postID, "likers", "likerArray");

    const likersDocSnapShot = await getDoc(likersDocRef);

    // post ref
    const postRef = doc(db, "posts", postID);

    const batch = writeBatch(db);

    // if likersArray doc does not exist. means the doc should be created, data should be inputed and increment cookie count
    if (!likersDocSnapShot.exists()) {
      // adding cookieSender id in likers array and increasing liker count in batch
      batch.set(likersDocRef, { likers: [cookieSender] });
      batch.update(postRef, {
        cookies: increment(1),
      });

      // commit batch
      await batch.commit();

      return 1;
    }

    const { where, collection, getDocs } = await import(`firebase/firestore`);

    const likersArrayQueryRef = query(
      collection(db, "posts", postID, "likers"),
      where("likers", "array-contains", cookieSender)
    );

    const likerArrayDocQuerySnapShot = await getDocs(likersArrayQueryRef);

    // if cookie sender does not exist in likersArray. means cookie sender should be added in the array and increment cookie count
    if (likerArrayDocQuerySnapShot.empty) {
      const { arrayUnion } = await import(`firebase/firestore`);

      // update likers array and increment cookie count in batch
      batch.update(likersDocRef, {
        likers: arrayUnion(cookieSender),
      });
      batch.update(postRef, {
        cookies: increment(1),
      });

      // commit batch
      await batch.commit();

      return 1;
    }

    // if cookie sender does exist in likersArray. means cookie sender should be removed from the array and decrement cookie count
    const { arrayRemove } = await import(`firebase/firestore`);

    // remove cookie sender from likers array and decrement cookie count in batch
    batch.update(likersDocRef, {
      likers: arrayRemove(cookieSender),
    });
    batch.update(postRef, {
      cookies: increment(-1),
    });

    // commit batch
    await batch.commit();

    return -1;
  } catch (error) {
    return false;
  }
};

export { userSignOut, providerSignIn, createPost, postComment, sendCookie };
