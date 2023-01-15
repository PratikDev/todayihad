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
  data: { errorCode, post, commentsList, postID },
}) {
  // if there is error
  if (errorCode) console.error(errorCode);

  // if post isn't available
  if (!post) {
    let Error = require("next/error").default;
    return <Error statusCode={404} />;
  }

  // parsing post content
  const parsedPost = JSON.parse(post);

  // parsing all posts
  let commentsArr = [];
  commentsList.forEach((comment) => {
    commentsArr.push(JSON.parse(comment));
  });

  // comments list
  const [comments, setComments] = useState(commentsArr);

  return (
    <div className={`mx-auto py-3 ${styles.wrapper}`}>
      <Post count={1} separate data={parsedPost} />
      <div
        className={`bg-secondary bg-opacity-25 p-4 pt-2 rounded-bottom ${styles.commentsArea}`}
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

        <div className="pt-4 pb-2 d-flex flex-column-reverse">
          {comments.map((value, index) => (
            <Comment key={index} data={value} />
          ))}
        </div>
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
      const { collection } = await import(`firebase/firestore`);
      // comments ref
      const commentsRef = collection(db, "posts", postID, "comments");

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
          data.commentsList.push(JSON.stringify({ ...commentData }));
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
      data.post = JSON.stringify({ ...postData });
    }
  } catch (error) {
    data.errorCode = JSON.stringify(error);
  }

  return {
    props: { data },
  };
}
