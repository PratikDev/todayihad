const providerSignIn = async (provider_name, handleSigningInState) => {
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
    const { signInWithPopup } = await import(`firebase/auth`);
    const { auth } = await import(`./firebase_init`);
    const result = await signInWithPopup(auth, auth_provider);

    const {
      user: {
        displayName,
        photoURL,
        uid,
        email,
        providerData: [first_provider],
      },
    } = result;

    const {
      displayName: provider_displayName,
      photoURL: provider_photoURL,
      email: provider_email,
    } = first_provider;

    const { getAdditionalUserInfo } = await import(`firebase/auth`);
    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      // Add a new document in collection "users"
      const { setDoc, doc } = await import(`firebase/firestore`);
      const { db } = await import(`./firebase_init`);
      await setDoc(doc(db, "users", uid), {
        displayName: displayName || provider_displayName,
        photoURL: `https://robohash.org/set_set2/${
          email || provider_email
        }?size=150x150`,
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
  if (!content || !autherID || !autherName || !autherPhoto) return;

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
    const dataForDB = {
      content: encodedContent,
      media: downloadURL,
      autherName,
      autherID,
      autherPhoto,
      creationTime: serverTimestamp(),
    };
    await addDoc(collection(db, "posts"), dataForDB);

    setUploading(false);

    return true;
  } catch (e) {
    return false;
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

    const { collection, addDoc, serverTimestamp } = await import(
      `firebase/firestore`
    );
    const { db } = await import(`./firebase_init`);

    // comments subcollection ref for adding doc on the next line
    const commentsRef = collection(db, "posts", postID, "comments");

    const commentData = {
      content: encodedContent,
      creationTime: serverTimestamp(),
      autherID: commenterID,
      autherName: commenterName,
      autherPhoto: commenterPhoto,
    };
    await addDoc(commentsRef, commentData);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    setUploading(false);
  }
};

export { userSignOut, providerSignIn, createPost, postComment };
