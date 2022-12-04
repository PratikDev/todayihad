import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
