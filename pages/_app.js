// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// global style imports
import "../styles/globals.css";

// comp imports
import Routing from "../comps/Routing";

function MyApp({ Component, pageProps }) {
  return (
    <div className="vh-100 container">
      <Component {...pageProps} />
      <Routing />
    </div>
  );
}

export default MyApp;
