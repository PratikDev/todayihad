// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// global style imports
import "../styles/globals.css";

// comp imports
import Routing from "../comps/Pages_comps/Routing";
import FloatNotification from "../comps/utils/FloatNotification";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";

// firebase init imports
import { auth } from "../firebase/firebase_init";

// reactjs imports
import { useState } from "react";

function MyApp({ Component, pageProps }) {
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
      <FloatNotification>
        <div className="vh-100 container">
          <Component signedIn={signedIn} {...pageProps} />
          {!!signedIn ? <Routing /> : ``}
        </div>
      </FloatNotification>
    </>
  );
}

export default MyApp;
