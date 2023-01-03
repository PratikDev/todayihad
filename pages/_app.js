// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// global style imports
import "../styles/globals.css";

// context imports
import NotificationContext from "../contexts/NotificationContext";
import AuthContextComponent from "../contexts/AuthContext";
import AuthChecker from "../comps/AuthChecker";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotificationContext>
        <AuthContextComponent>
          <div className="vh-100 container">
            <AuthChecker children={Component} childProps={pageProps} />
          </div>
        </AuthContextComponent>
      </NotificationContext>
    </>
  );
}

export default MyApp;
