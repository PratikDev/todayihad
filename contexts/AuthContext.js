// firebase imports
import { onAuthStateChanged } from "firebase/auth";

// firebase function imports
import { auth } from "../firebase/firebase_init";

// reactjs imports
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextComponent({ children }) {
  const [signedIn, setSignedIn] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(user);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <>
      <AuthContext.Provider value={signedIn}>{children}</AuthContext.Provider>
    </>
  );
}

export default AuthContextComponent;
