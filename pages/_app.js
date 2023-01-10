// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";

// global style imports
import "../styles/globals.css";

// NProgress imports
import NProgress from "nprogress";
import "../styles/deps/nprogress.css";

// nextjs imports
import { useRouter } from "next/router";

// reactjs imports
import { useEffect } from "react";

// context imports
import { default as NotifCtxComp } from "../contexts/NotificationContext";
import { default as AuthCtxComp } from "../contexts/AuthContext";
import { default as ModalCtxComp } from "../contexts/ModalContext";

// utility functions imports
import AuthChecker from "../utilities/AuthChecker";

function MyApp({ Component, pageProps }) {
  // using next router
  const router = useRouter();

  // route change effect
  useEffect(() => {
    // configuring NProgress
    NProgress.configure({
      showSpinner: false,
    });

    // start function
    const handleStart = () => {
      NProgress.start();
    };

    // stop function
    const handleStop = () => {
      NProgress.done();
    };

    // subscribing to all routing changes
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      // unsubscribing to all routing changes
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

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
