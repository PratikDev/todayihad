// reactjs imports
import { useEffect } from "react";

// comps imports
import RichEditor from "../Pages_comps/Post/RichEditor";
import NewPostImgUploadArea from "./utils_comp/NewPostImgUploadArea";
import FooterBtn from "./utils_comp/FooterBtn";

// styles imports
import styles from "../../styles/comps/utils/PreviewModal.module.css";

function PreviewModal({ photo, onClose }) {
  // function for esc key press
  function escFunc(event) {
    if (event.key === `Escape`) {
      onClose();
    }
  }
  useEffect(() => {
    document.addEventListener(`keydown`, escFunc, true);

    return () => {
      document.removeEventListener(`keydown`, escFunc, true);
    };
  }, []);

  return (
    <div
      className={`${styles.customModal} modal-backdrop vw-100 vh-100 bg-dark bg-opacity-75 position-fixed top-0 start-0 d-flex align-items-center justify-content-center`}
      tabIndex="-1"
      aria-labelledby="image preview"
      aria-hidden="true"
      onClick={({ target: { classList } }) => {
        if (classList.contains(`modal-backdrop`)) {
          onClose();
        }
      }}
    >
      <div
        className={`${styles.customModalDialogWrapper} d-flex align-items-center justify-content-center p-5 h-100 w-100`}
      >
        <div
          className={`${styles.customModalDialog} h-100 w-100 p-4 rounded-1 overflow-auto`}
        >
          <div className="d-flex flex-column h-100">
            {!!photo ? (
              <>
                <div
                  className={`d-flex flex-column justify-content-center flex-grow-1`}
                >
                  <img
                    src={photo}
                    alt="modal"
                    className={`${styles.modal_img} objectFit-contain w-100`}
                  />
                </div>
                <FooterBtn variant={`Upload`} onClose={onClose} />
              </>
            ) : (
              <>
                <RichEditor post onClose={onClose}>
                  <NewPostImgUploadArea />
                </RichEditor>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreviewModal;
