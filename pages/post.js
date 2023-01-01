// comps imports
import Post from "../comps/Pages_comps/Post";
import Comment from "../comps/Pages_comps/Post/Comment";

// styles imports
import styles from "../styles/pages/Indi.Post.module.css";
import footerBtnStyles from "../styles/comps/utils/utils_comp/FooterBtn.module.css";

function post_page() {
  return (
    <div className={`mx-auto py-3 ${styles.wrapper}`}>
      <Post count={1} separate />
      <div className="bg-secondary bg-opacity-25 p-4 pt-2 rounded-bottom">
        <div
          className={`border-bottom border-1 border-secondary border-opacity-25`}
        >
          <textarea
            name="caption"
            id="caption"
            placeholder="Write what you think..."
            rows={7}
            className={`${footerBtnStyles.textarea} bg-transparent rounded-1 w-100 flex-grow-1 p-3`}
          ></textarea>
          <div className={`customModal-footer mt-2 mb-4 text-end`}>
            <button
              type="button"
              className={`btn btn-light ${footerBtnStyles.modalBtn}`}
            >
              Comment
            </button>
          </div>
        </div>
        <div className="pt-4 pb-2">
          {[1, 2, 3, 4, 5].map((e, index) => (
            <Comment key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default post_page;
