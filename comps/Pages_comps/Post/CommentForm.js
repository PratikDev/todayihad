// reactjs imports
import { useContext, useRef, useState } from "react";

// comps imports
import Spinner from "../../utils/Spinner";

// contexts imports
import { NotificationContext } from "../../../contexts/NotificationContext";

// styles imports
import footerBtnStyles from "../../../styles/comps/utils/utils_comp/FooterBtn.module.css";

export default function CommentForm({ data }) {
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

    const { postComment } = await import(
      "../../../firebase/firebase_functions"
    );
    const {
      authenticatedID,
      authenticatedName,
      authenticatedPhoto,
      postID,
      setComments,
    } = data;

    const uploadResult = await postComment({
      content: current.value,
      commenterID: authenticatedID,
      commenterName: authenticatedName,
      commenterPhoto: authenticatedPhoto,
      postID,
      setUploading,
    });

    if (uploadResult) {
      setComments((prev) => [...prev, 5]);
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
        className={`border-bottom border-1 border-secondary border-opacity-25`}
        onSubmit={(e) => {
          e.preventDefault();
          if (!uploading) handleSubmit(e);
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
          <button
            type="submit"
            disabled={uploading}
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
        </div>
      </form>
    </>
  );
}
