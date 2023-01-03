// comps imports
import Post from "../comps/Pages_comps/Post";
import PostSkeleton from "../comps/utils/Post_Skeleton";

// styles imports
import styles from "../styles/Pages/Home.module.css";

export default function Home({ loading }) {
  return (
    <div className={`d-flex justify-content-center gap-5 py-3 mx-auto`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 w-100 ${styles.post_list}`}
      >
        {loading
          ? [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
          : [1, 2, 3, 4].map((x, index) => <Post key={index} count={x} />)}
      </div>
    </div>
  );
}
