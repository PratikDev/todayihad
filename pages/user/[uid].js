// reactjs imports
import { useState } from "react";

// nextjs imports
import Error from "next/error";

// firebase imports
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// firebase init imports
import { db } from "../../firebase/firebase_init";

// comps imports
import Post from "../../comps/Pages_comps/Post";
import UserInfo from "../../comps/Pages_comps/User/UserInfo";
import OffCanvas from "../../comps/utils/OffCanvas";
import PostSkeleton from "../../comps/utils/Post_Skeleton";

// styles imports
import styles from "../../styles/pages/User.module.css";

function User({ loading, data: { isUserAvailable, posts, errorCode } }) {
  // if there is error
  if (errorCode) console.error(errorCode);

  // if user isn't available
  if (!isUserAvailable) return <Error statusCode={404} />;

  let postArr = [];
  posts.forEach((post) => {
    postArr.push(JSON.parse(post));
  });

  const [offCanvasShow, setOffCanvasShow] = useState("");
  return (
    <div
      className={`d-flex justify-content-center gap-5 py-3 mx-auto ${styles.content}`}
    >
      <UserInfo />

      <div
        className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3`}
      >
        {loading
          ? [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
          : postArr.map((value, index) => (
              <Post key={index} data={value} count={index} />
            ))}
      </div>
      <button
        className={`btn position-fixed bottom-0 start-0 bg-white p-0 pt-3 pe-3 rounded-0 d-lg-none d-block ${styles.menu_btn}`}
        onClick={() => {
          setOffCanvasShow("show");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={25}
          height={25}
          fill={`black`}
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>

      <OffCanvas show={offCanvasShow} setShow={setOffCanvasShow}>
        <UserInfo offcanvas />
      </OffCanvas>
    </div>
  );
}

export async function getServerSideProps(context) {
  // destructuring uid
  const {
    params: { uid },
  } = context;

  let data = {
    isUserAvailable: false,
    posts: [],
    errorCode: null,
  };

  // users ref
  const usersRef = doc(db, "users", uid);

  // try to get user data
  try {
    const user = await getDoc(usersRef);

    data.isUserAvailable = user.exists();

    // if user exit
    if (user.exists()) {
      // posts ref
      const postsRef = collection(db, "posts");

      // query object
      const postsQuObj = query(
        postsRef,
        where("autherID", "==", uid),
        orderBy("creationTime"),
        limit(10)
      );

      // try to set posts data
      try {
        const postsList = await getDocs(postsQuObj);

        // Intl time formatter
        const formatter = new Intl.RelativeTimeFormat(`en`);

        postsList.forEach((post) => {
          // getting the data;
          const postData = post.data();

          const prevTime = postData.creationTime.toMillis();

          const timeDiff = prevTime - new Date();

          const newTime = formatter.format(
            Math.ceil(timeDiff / (1000 * 60 * 60 * 24)),
            "days"
          );

          // updating serverTimestamp object to date
          postData.creationTime = newTime;

          data.posts.push(JSON.stringify(postData));
        });
      } catch (error) {
        data.errorCode = JSON.stringify(error);
      }
    }
  } catch (error) {
    data.errorCode = JSON.stringify(error);
  }

  return {
    props: { data },
  };
}

export default User;
