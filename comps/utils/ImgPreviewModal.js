// styles imports
import styles from "../../styles/comps/utils/ImgPreviewModal.module.css";

function ImgPreviewModal({ photo, show, onClose }) {
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
      <div className={`${styles.customModalDialog} p-4 rounded-1`}>
        <div className="customModal-content">
          <div className="customModal-body">
            <img
              src={photo}
              alt="modal"
              className={`${styles.modal_img} objectFit-contain w-100`}
            />
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
export default ImgPreviewModal;
