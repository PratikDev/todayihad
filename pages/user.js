// comps imports
import Post from "../comps/Page_User/Post";
import UserInfo from "../comps/Page_User/UserInfo";

// styles imports
import styles from "./../styles/User.module.css";

function user() {
  return (
    <div
      className={`d-flex justify-content-center gap-5 py-3 mx-auto ${styles.content}`}
    >
      <div
        className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3`}
      >
        {[1, 2, 3].map((x, index) => (
          <Post key={index} count={x} />
        ))}
      </div>
      <UserInfo />
    </div>
  );
}
export default user;
