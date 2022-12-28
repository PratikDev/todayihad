// comps imports
import RichEditor from "../Pages_comps/Post/RichEditor";

// styles imports
import styles from "../../styles/comps/utils/PreviewModal.module.css";

function PreviewModal({ photo, show, onClose }) {
  return (
    <div
      className={`${styles.customModal} ${
        show ? styles.show : ``
      } modal-backdrop vw-100 vh-100 bg-dark bg-opacity-75 position-fixed top-0 start-0 d-flex align-items-center justify-content-center`}
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
        className={`${styles.customModalDialog} p-4 rounded-1 overflow-auto`}
      >
        <div className="d-flex flex-column h-100">
          <div
            className={`d-flex flex-column justify-content-center flex-grow-1`}
          >
            {!!photo ? (
              <img
                src={photo}
                alt="modal"
                className={`${styles.modal_img} objectFit-contain w-100`}
              />
            ) : (
              <>
                <RichEditor post />
                <div className="border border-2 d-flex align-items-center justify-content-center w-100 flex-grow-1">
                  {/* <img
                    src={photo}
                    alt="me"
                    className={`${styles.post_img_preview} w-100 h-100 objectFit-contain`}
                  /> */}
                  Drop your photo here
                </div>
              </>
            )}
          </div>
          <div className="customModal-footer mt-3 text-end">
            <button
              type="button"
              className={`btn btn-outline-secondary ${styles.modalBtn}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-light ms-2 ${styles.modalBtn}`}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreviewModal;
