// reactjs imports
import { useEffect, useRef, useState } from "react";

// comps imports
import Spinner from "./Spinner";
import NewPostImgUploadArea from "./utils_comp/NewPostImgUploadArea";

// firebase functions imports
import { createPost } from "../../firebase/firebase_functions";

// styles imports
import styles from "../../styles/comps/utils/PreviewModal.module.css";
import footerBtnStyles from "../../styles/comps/utils/utils_comp/FooterBtn.module.css";

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

  // setting post uploading state
  const [uploading, setUploading] = useState(false);

  // textarea ref
  const textarea = useRef();

  // handle post
  function handlePost() {
    if (textarea?.current) {
      const {
        current: { value },
      } = textarea;

      if (value.trim()) {
        const content = value.trim();
        createPost(content, setUploading);
      }
    }
  }

  // handle dp upload
  function handleDpUpload() {
    console.log(`handling dp upload`);
  }

  // handle submit function
  function handleSubmit({ target: { innerText } }) {
    switch (innerText) {
      case `Post`:
        handlePost();
        break;

      case `Upload`:
        handleDpUpload();
        break;

      default:
        onClose();
        break;
    }
  }

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
                <div className={`customModal-footer mt-3 text-end`}>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${footerBtnStyles.modalBtn}`}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light ms-2 ${footerBtnStyles.modalBtn}`}
                  >
                    Upload
                  </button>
                </div>
              </>
            ) : (
              <>
                <textarea
                  ref={textarea}
                  name="caption"
                  id="caption"
                  placeholder="Write what you had today..."
                  className={`${footerBtnStyles.textarea} bg-transparent rounded-1 flex-grow-1 p-3 mb-5`}
                ></textarea>
                <NewPostImgUploadArea />
                <div className={`customModal-footer mt-3 text-end`}>
                  <button
                    type="button"
                    className={`btn btn-outline-secondary ${footerBtnStyles.modalBtn}`}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={uploading}
                    className={`btn btn-light ms-2 ${footerBtnStyles.modalBtn}`}
                    onClick={(e) => uploading && handleSubmit(e)}
                  >
                    {uploading ? (
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      `Post`
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreviewModal;
