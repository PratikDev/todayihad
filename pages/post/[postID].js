// reactjs imports
import { useState } from "react";

// comps imports
import Post from "../../comps/Pages_comps/Post";
import Comment from "../../comps/Pages_comps/Post/Comment";
import CommentForm from "../../comps/Pages_comps/Post/CommentForm";

// styles imports
import styles from "../../styles/pages/Comments.module.css";

export default function post_page({
  authenticatedID,
  authenticatedName,
  authenticatedPhoto,
  data,
}) {
  const { errorCode, post, commentsList, postID } = JSON.parse(data);

  // if there is error
  if (errorCode) console.error(errorCode);

  // if post isn't available
  if (!post) {
    let Error = require("next/error").default;
    return <Error statusCode={404} />;
  }

  // comments list
  const [comments, setComments] = useState(commentsList);

  return (
    <div className={`mx-auto py-3 ${styles.wrapper}`}>
      <Post count={1} separate data={post} />

      <div
        className={`bg-secondary bg-opacity-25 px-4 py-2 rounded-bottom ${styles.commentsArea}`}
        id="commentsection"
      >
        <CommentForm
          data={{
            authenticatedID,
            authenticatedName,
            authenticatedPhoto,
            postID,
            setComments,
          }}
        />

        {comments.length ? (
          <>
            <div className="d-flex flex-column">
              {comments.map((value, index) => (
                <Comment key={index} data={value} />
              ))}
            </div>
          </>
        ) : (
          ``
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // destructuring uid
  const {
    params: { postID },
  } = context;

  let data = {
    errorCode: null,
    post: null,
    commentsList: [],
    postID,
  };

  const { doc, getDoc } = await import(`firebase/firestore`);
  const { db } = await import(`../../firebase/firebase_init`);
  // users ref
  const postRef = doc(db, "posts", postID);

  try {
    const post = await getDoc(postRef);

    if (post.exists()) {
      const { collection, query, orderBy, limit } = await import(
        `firebase/firestore`
      );
      // comments ref
      const commentsRef = query(
        collection(db, "posts", postID, "comments"),
        orderBy("creationTime", "desc"),
        limit(10)
      );

      const { getDocs } = await import(`firebase/firestore`);
      // get comments
      const comments = await getDocs(commentsRef);

      const { timeFormatter } = await import(`../../helpers/timeFormatter`);
      // if there are comments
      if (comments.size) {
        comments.forEach((comment) => {
          // getting the data;
          const commentData = comment.data();

          // converting creation time to milliseconds
          const prevTime = commentData.creationTime.toMillis();

          // converting millis to human readable format
          const newTime = timeFormatter(prevTime);

          // updating serverTimestamp object to date
          commentData.creationTime = newTime;

          // pushing data back to posts array
          data.commentsList.push({ ...commentData });
        });
      }

      // getting the data;
      const postData = post.data();

      // converting creation time to milliseconds
      const prevTime = postData.creationTime.toMillis();

      // converting millis to human readable format
      const newTime = timeFormatter(prevTime);

      // updating serverTimestamp object to date
      postData.creationTime = newTime;

      // setting post data in data object
      data.post = { ...postData };
    }
  } catch (error) {
    data.errorCode = error;
  }

  return {
    props: { data: JSON.stringify(data) },
  };
}
