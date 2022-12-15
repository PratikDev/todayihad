// comps imports
import Post from "../comps/Pages_comps/Post";

// firebase_init imports
import { analytics, app } from "../firebase/firebase_init";

// styles imports
import styles from "../styles/Pages/Home.module.css";

console.log({ app, analytics });

export default function Home() {
  return (
    <div className={`d-flex justify-content-center gap-5 py-3 mx-auto`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 ${styles.post_list}`}
      >
        {[1, 2, 3, 4].map((x, index) => (
          <Post key={index} count={x} />
        ))}
      </div>
    </div>
  );
}
