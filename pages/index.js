// styles import
import styles from "../styles/Home.module.css";

// comps imports
import Post from "../comps/Page_User/Post";

export default function Home() {
  return (
    <div
      className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3 mx-auto py-2`}
    >
      {[1, 2, 3].map((x, index) => (
        <Post key={index} count={x} />
      ))}
    </div>
  );
}
