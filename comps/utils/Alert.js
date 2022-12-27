// styles imports
import styles from "../../styles/comps/utils/Alert.module.css";

// reactjs imports
import { useState } from "react";

function Alert({ show, message }) {
  const [innerShow, SetinnerShow] = useState(show);

  const timeout = setTimeout(() => {
    SetinnerShow(false);
  }, 3000);

  return (
    <div
      className={`${styles.wrapper} position-fixed bottom-0 start-50`}
      style={{
        transform: `translate(-50%, ${innerShow ? `0px` : `100px`})`,
      }}
    >
      <div
        className={`${styles.content} bg-dark rounded-1 px-3 py-2 mb-2 d-flex align-items-center justify-content-between`}
        role="alert"
      >
        <div className={`${styles.body} alert-body`}>
          <div className={`fw-bold`}>Oopps!!</div>
          <p className="light m-0">{message}</p>
        </div>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          aria-label="Close"
          onClick={() => {
            SetinnerShow(false);
            clearTimeout(timeout);
          }}
        ></button>
      </div>
    </div>
  );
}
export default Alert;
