// firebase imports
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

// firebase init imports
import { db } from "../firebase/firebase_init";

// comps imports
import Post from "../comps/Pages_comps/Post";
import PostSkeleton from "../comps/utils/Post_Skeleton";

// helper functions
import { timeFormatter } from "../helpers/timeFormatter";

// styles imports
import styles from "../styles/Pages/Home.module.css";

export default function Home({ loading, data: { errorCode, posts } }) {
  // if there is error
  if (errorCode) console.error(errorCode);

  // parsing all posts
  let postArr = [];
  posts.forEach((post) => {
    postArr.push(JSON.parse(post));
  });

  return (
    <div className={`d-flex justify-content-center gap-5 py-3 mx-auto`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 w-100 ${styles.post_list}`}
      >
        {loading
          ? [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
          : postArr.map((value, index) => (
              <Post key={index} count={index} data={value} />
            ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let data = {
    errorCode: null,
    posts: [],
  };

  // posts ref
  const postsRef = collection(db, "posts");

  // query object
  const postsQuObj = query(
    postsRef,
    orderBy("creationTime", "desc"),
    limit(15)
  );

  // try to set posts data
  try {
    const postsList = await getDocs(postsQuObj);

    postsList.forEach((post) => {
      // getting the data;
      const postData = post.data();

      // getting post id
      const postID = post.id;

      // converting creation time to milliseconds
      const prevTime = postData.creationTime.toMillis();

      // converting millis to human readable format
      const newTime = timeFormatter(prevTime);

      // updating serverTimestamp object to date
      postData.creationTime = newTime;

      data.posts.push(JSON.stringify({ ...postData, postID }));
    });
  } catch (error) {
    data.errorCode = JSON.stringify(error);
  }

  return {
    props: { data },
  };
}
