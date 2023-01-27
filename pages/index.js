// reactjs imports
import { useEffect } from "react";

// comps imports
import Post from "../comps/Pages_comps/Post";
import PostSkeleton from "../comps/utils/Post_Skeleton";

// helper functions
import { timeFormatter } from "../helpers/timeFormatter";

// styles imports
import styles from "../styles/Pages/Home.module.css";

export default function Home({ loading, data }) {
  const { errorCode, posts } = JSON.parse(data);

  // if there is error
  if (errorCode) {
    console.error(errorCode);
    return;
  }

  useEffect(() => {
    if (window) {
      const scrollPosition = sessionStorage.getItem("homePageScrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem("homePageScrollPosition");
      }
    }
  });

  return (
    <div className={`d-flex justify-content-center gap-5 py-3 mx-auto`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 w-100 ${styles.post_list}`}
      >
        {loading
          ? [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
          : posts.map((value, index) => (
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

  const { collection, getDocs, doc, getDoc, orderBy, limit, query } =
    await import(`firebase/firestore`);
  const { db } = await import(`../firebase/firebase_init`);

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

    for (const post of postsList.docs) {
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

      // getting likers array
      const likersArrayDocRef = doc(
        db,
        "posts",
        postID,
        "likers",
        "likersArray"
      );
      const likersArrayDocSnapShot = await getDoc(likersArrayDocRef);
      const likersArray = likersArrayDocSnapShot.data().likers;

      // getting trashRequest array
      const trashRequestArrayDocRef = doc(
        db,
        "posts",
        postID,
        "trashRequest",
        "trashRequestArray"
      );
      const trashRequestArrayDocSnapShot = await getDoc(
        trashRequestArrayDocRef
      );
      const trashRequestArray =
        trashRequestArrayDocSnapShot.data().trashRequest;

      data.posts.push({ ...postData, postID, likersArray, trashRequestArray });
    }
  } catch (error) {
    data.errorCode = error;
  }

  return {
    props: { data: JSON.stringify(data) },
  };
}
