// reactjs imports
import { createContext, useEffect, useState } from "react";

// styles imports
import styles from "../styles/contexts/NotificationContext.module.css";

export const NotificationContext = createContext(() => {});

function NotificationContextComponent({ children }) {
  // TODO: remove it before building production
  const tempState = {
    title: `title`,
    message: `a default type message`,
    variant: `success`,
  };

  // mounting state
  const [show, showNotification] = useState(false);

  const { title, message, variant, unmountDuration } = show;

  // wrapper and container styles
  const indicatorStyle = {
    backgroundColor: variant === `success` ? `#237e23` : `#d12828`,
  };

  useEffect(() => {
    if (!!show) {
      const timeout = setTimeout(() => {
        showNotification(false);
      }, unmountDuration || 4000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [show]);

  return (
    <>
      <NotificationContext.Provider value={showNotification}>
        <div
          className={`${styles.notificationWrapper} position-fixed vw-100 vh-100 d-flex`}
        >
          {!!show ? (
            <div
              className={`${styles.notification} mx-auto my-2 px-3 py-2 rounded-1 d-flex align-items-center justify-content-between align-self-end bg-dark border border-secondary border-opacity-25`}
            >
              <div className="body-wrapper position-relative">
                <div
                  className={`${styles.indicator} variant-indicator h-100 rounded-pill position-absolute`}
                  style={indicatorStyle}
                ></div>
                <div className="ms-3">
                  <b className={`${styles.title}`}>{title}</b>
                  <p className={`${styles.message} m-0`}>{message}</p>
                </div>
              </div>
              <div
                className="close-btn ms-3"
                role={`button`}
                onClick={() => {
                  showNotification(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className={`${styles.closeBtnIcon}`}
                  width={25}
                  height={25}
                >
                  <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
              </div>
            </div>
          ) : (
            ``
          )}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
}
export default NotificationContextComponent;
