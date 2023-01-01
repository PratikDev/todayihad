import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, auth, provider_google, provider_facebook } from "./firebase_init";

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

const createPost = async (content, setUploading) => {
  if (content) {
    setUploading(true);
    try {
      // Add a new document in collection "posts"
      const postDocRef = await addDoc(collection(db, "posts"), {
        content,
      });

      setUploading(false);
    } catch (e) {
      console.error(e);
    }
  }
};

export { userSignOut, providerSignIn, createPost };
