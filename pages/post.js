// comps imports
import Post from "../comps/Pages_comps/Post";
import Comment from "../comps/Pages_comps/Post/Comment";
import RichEditor from "../comps/Pages_comps/Post/RichEditor";

// styles imports
import styles from "../styles/pages/Indi.Post.module.css";

function post_page() {
  return (
    <div className={`mx-auto py-3 ${styles.wrapper}`}>
      <Post count={1} separate />
      <div className="bg-secondary bg-opacity-25 p-4 rounded-bottom">
        {/* <textarea className="w-100" rows="5"></textarea> */}
        <RichEditor />
        {[1, 2, 3, 4, 5].map((e, index) => (
          <Comment key={index} />
        ))}
      </div>
    </div>
  );
}
export default post_page;
