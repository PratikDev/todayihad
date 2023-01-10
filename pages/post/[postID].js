// nextjs imports
import Error from "next/error";

// firebase imports
import { doc, getDoc } from "firebase/firestore";

// firebase init imports
import { db } from "../../firebase/firebase_init";

// comps imports
import Post from "../../comps/Pages_comps/Post";
import Comment from "../../comps/Pages_comps/Post/Comment";

// helper functions imports
import { timeFormatter } from "../../helpers/timeFormatter";

// styles imports
import styles from "../../styles/pages/Indi.Post.module.css";
import footerBtnStyles from "../../styles/comps/utils/utils_comp/FooterBtn.module.css";

export default function post_page({ data: { errorCode, post } }) {
  // if there is error
  if (errorCode) console.error(errorCode);

  // if post isn't available
  if (!post) return <Error statusCode={404} />;

  const parsedPost = JSON.parse(post);

  return (
    <div className={`mx-auto py-3 ${styles.wrapper}`}>
      <Post count={1} separate data={parsedPost} />
      <div
        className="bg-secondary bg-opacity-25 p-4 pt-2 rounded-bottom"
        id="comments"
      >
        <div
          className={`border-bottom border-1 border-secondary border-opacity-25`}
        >
          <textarea
            name="caption"
            id="caption"
            placeholder="Write what you think..."
            rows={7}
            className={`${footerBtnStyles.textarea} bg-transparent rounded-1 w-100 flex-grow-1 p-3`}
          ></textarea>
          <div className={`customModal-footer mt-2 mb-4 text-end`}>
            <button
              type="button"
              className={`btn btn-light ${footerBtnStyles.modalBtn}`}
            >
              Comment
            </button>
          </div>
        </div>
        <div className="pt-4 pb-2">
          {[1, 2, 3, 4, 5].map((e, index) => (
            <Comment key={index} />
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
  };

  // users ref
  const postRef = doc(db, "posts", postID);

  try {
    const post = await getDoc(postRef);

    if (post.exists()) {
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
    data.errorCode = error;
  }

  return {
    props: { data },
  };
}
