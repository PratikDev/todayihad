// styles imports
import styles from "../../../styles/comps/utils/utils_comp/FooterBtn.module.css";

const FooterBtn = ({ variant, onClose }) => {
  const isComment = variant === `Comment`;
  return (
    <div
      className={`customModal-footer mt-3 text-end ${isComment ? `mb-4` : ``}`}
    >
      {!isComment ? (
        <button
          type="button"
          className={`btn btn-outline-secondary ${styles.modalBtn}`}
          onClick={onClose}
        >
          Cancel
        </button>
      ) : (
        ``
      )}
      <button type="button" className={`btn btn-light ms-2 ${styles.modalBtn}`}>
        {variant}
      </button>
    </div>
  );
};

export default FooterBtn;
