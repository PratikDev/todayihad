// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// global style imports
import "../styles/globals.css";

// context imports
import { default as NotifCtxComp } from "../contexts/NotificationContext";
import { default as AuthCtxComp } from "../contexts/AuthContext";
import { default as ModalCtxComp } from "../contexts/ModalContext";

// utility functions imports
import AuthChecker from "../utilities/AuthChecker";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotifCtxComp>
        <AuthCtxComp>
          <ModalCtxComp>
            <div className="vh-100 container">
              <AuthChecker children={Component} childProps={pageProps} />
            </div>
          </ModalCtxComp>
        </AuthCtxComp>
      </NotifCtxComp>
    </>
  );
}

export default MyApp;
