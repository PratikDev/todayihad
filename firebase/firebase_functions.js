// firebase imports
import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// firebase init imports
import {
  db,
  auth,
  storage,
  provider_google,
  provider_facebook,
} from "./firebase_init";

const providerSignIn = async (provider_name, handleSigningInState) => {
  let auth_provider;

  switch (provider_name) {
    case "google":
      auth_provider = provider_google;
      break;

    case "facebook":
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

    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      try {
        // Add a new document in collection "users"
        await setDoc(doc(db, "users", uid), {
          displayName: displayName || provider_displayName,
          photoURL: photoURL || provider_photoURL,
          email: email || provider_email,
          uid,
        });

        answer.result = {
          isNewUser,
          displayName,
          photoURL,
          uid,
          email,
          provider_displayName,
          provider_email,
          provider_photoURL,
        };
      } catch (e) {
        answer.errorCode = e;
      }
    } else {
      answer.result = {
        isNewUser,
        displayName,
        photoURL,
        uid,
        email,
        provider_displayName,
        provider_email,
        provider_photoURL,
      };
    }

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

      // creating fileName ref
      const mediaRef = ref(storage, `posts/${fileName}`);

      try {
        // upload photo in DB
        await uploadBytes(mediaRef, media);

        downloadURL = await getDownloadURL(mediaRef);
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    // encoded content
    const encodedContent = Buffer.from(content).toString("base64");

    // Add a new document in collection "posts"
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

export { userSignOut, providerSignIn, createPost };
