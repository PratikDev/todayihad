// nextjs imports
import Image from "next/image";

// reactjs imports
import { useState } from "react";

// comps imports
import Post from "../../comps/Pages_comps/Post";
import UserInfo from "../../comps/Pages_comps/User/UserInfo";
import OffCanvas from "../../comps/utils/OffCanvas";
import PostSkeleton from "../../comps/utils/Post_Skeleton";

// styles imports
import styles from "../../styles/pages/User.module.css";

export default function User({ loading, data }) {
  // destructuring values from data
  const {
    isUserAvailable,
    posts,
    autherEmail,
    autherName,
    autherPhoto,
    autherID,
    errorCode,
  } = JSON.parse(data);

  // if there is error
  if (errorCode) console.error(errorCode);

  // if user isn't available
  if (!isUserAvailable) {
    const Error = require("next/error").default;
    return <Error statusCode={404} />;
  }

  const [offCanvasShow, setOffCanvasShow] = useState("");

  return (
    <div
      className={`d-flex justify-content-center gap-5 py-3 mx-auto ${styles.content}`}
    >
      <UserInfo
        displayName={autherName}
        photoURL={autherPhoto}
        email={autherEmail}
        uid={autherID}
      />

      <div
        className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3`}
      >
        {loading ? (
          [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
        ) : posts.length ? (
          posts.map((value, index) => (
            <Post key={index} data={value} count={index} />
          ))
        ) : (
          <>
            <div className="d-flex flex-column align-items-center">
              <Image
                priority={1}
                src={`/empty.png`}
                width={500}
                height={500}
                className={`${styles.empty}`}
                alt={`No hard feelings, but we think ${autherName} is a boring person`}
              />
              <small className="m-0 mt-2 text-center text-muted">
                No hard feelings,
                <br />
                but we think {autherName} is a boring person
              </small>
            </div>
          </>
        )}
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
        <UserInfo
          offcanvas
          displayName={autherName}
          photoURL={autherPhoto}
          email={autherEmail}
          uid={autherID}
        />
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
    autherEmail: undefined,
    autherName: undefined,
    autherPhoto: null,
    autherID: undefined,
    errorCode: null,
  };

  const { doc, getDoc } = await import(`firebase/firestore`);
  const { db } = await import(`../../firebase/firebase_init`);
  // users ref
  const usersRef = doc(db, "users", uid);

  // try to get user data
  try {
    const user = await getDoc(usersRef);

    data.isUserAvailable = user.exists();

    // if user exit
    if (user.exists()) {
      // setting auther data
      const { email, displayName, photoURL, uid } = user.data();
      data.autherEmail = email;
      data.autherName = displayName;
      data.autherPhoto = photoURL;
      data.autherID = uid;

      const { getDocs, collection, limit, orderBy, query, where } =
        await import(`firebase/firestore`);
      // posts ref
      const postsRef = collection(db, "posts");

      // query object
      const postsQuObj = query(
        postsRef,
        where("autherID", "==", uid),
        orderBy("creationTime", "desc"),
        limit(10)
      );

      // set posts data
      const postsList = await getDocs(postsQuObj);

      const { timeFormatter } = await import(`../../helpers/timeFormatter`);
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

        // pushing data back to posts array
        data.posts.push({ ...postData, postID });
      });
    }
  } catch (error) {
    data.errorCode = error;
  }

  return {
    props: { data: JSON.stringify(data) },
  };
}
