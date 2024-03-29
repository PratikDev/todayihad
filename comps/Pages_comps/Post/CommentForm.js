// reactjs imports
import { useContext, useRef, useState } from "react";

// comps imports
import Spinner from "../../utils/Spinner";

// contexts imports
import { NotificationContext } from "../../../contexts/NotificationContext";

// styles imports
import footerBtnStyles from "../../../styles/comps/utils/utils_comp/FooterBtn.module.css";

export default function CommentForm({ data, loading }) {
  // comment uploading state
  const [uploading, setUploading] = useState(false);

  // comment textarea ref to use later inside handleSubmit function
  const textareaRef = useRef();

  // using notification context
  const showNotification = useContext(NotificationContext);

  // function to handle comment form submit and post it the DB
  async function handleSubmit({ target }) {
    const { current } = textareaRef;

    if (!current || !current.value) return;

    if (current.value.trim().length > 2000) {
      showNotification({
        title: `Opps!!`,
        message: `Max length for comment is 2000😖`,
        variant: `danger`,
      });

      return;
    }

    const { auth } = await import(`../../../firebase/firebase_init`);

    const user = auth.currentUser;

    if (!user) return;

    const { postComment } = await import(
      "../../../firebase/firebase_functions"
    );

    const { postID, setComments } = data;

    const uploadResult = await postComment({
      content: current.value,
      postID,
      setUploading,
    });

    if (uploadResult) {
      const { displayName, uid, photoURL } = user;

      const newComment = {
        autherID: uid,
        autherName: displayName,
        autherPhoto: photoURL,
        content: Buffer.from(current.value).toString("base64"),
        creationTime: `0 mins ago`,
      };

      setComments((prev) => [newComment, ...prev]);
    } else {
      showNotification({
        title: `Opps!!`,
        message: `Something went wrong. Please try again😖`,
        variant: `danger`,
      });
    }

    target.reset();
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!uploading && !loading) handleSubmit(e);
        }}
      >
        <textarea
          required
          ref={textareaRef}
          placeholder="Write what you think..."
          rows={7}
          className={`${footerBtnStyles.textarea} bg-transparent rounded-1 w-100 flex-grow-1 p-3`}
        ></textarea>
        <div className={`customModal-footer mt-2 mb-4 text-end`}>
          {loading ? (
            <>
              <div className="placeholder-glow">
                <div className="px-5 py-3 rounded-2 placeholder bg-light"></div>
              </div>
            </>
          ) : (
            <button
              type="submit"
              disabled={uploading || loading}
              className={`btn btn-light ${footerBtnStyles.modalBtn}`}
            >
              {uploading ? (
                <Spinner
                  size={`sm`}
                  hiddenText={`posting comment`}
                  customClasses={`mx-3`}
                />
              ) : (
                `Comment`
              )}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
