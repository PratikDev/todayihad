// reactjs imports
import { useContext, useState } from "react";

// contexts imports
import { AuthContext } from "../../../../contexts/AuthContext";
import { NotificationContext } from "../../../../contexts/NotificationContext";

// styles import
import styles from "../../../../styles/comps/Page_comps/InteractionsGroup.module.css";

/**
 * @param {Object} param
 * @param {String[]} param.InteractionsArray - array of interacted users
 * @param {Number} param.interactionCount - number of interactions
 * @param {`likers` | `trashRequest`} param.variant - Interaction variant
 * @param {String} param.postID - id of the post
 */
export default function InteractionBtn({
  InteractionsArray,
  interactionCount,
  variant,
  postID,
}) {
  // using notification context
  const showNotification = useContext(NotificationContext);

  // setting Interactions list and counts as state, so that we can change it in the client side first for better UX
  const [interactionsList, setInteractionsList] = useState(InteractionsArray);

  const [interactionCountState, setInteractionCountState] =
    useState(interactionCount);

  // using auth context
  const { uid } = useContext(AuthContext);

  // if auth uid contains in InteractionsArray
  const hasInteractedWithThisPost = interactionsList.includes(uid);

  async function handleBtnClick() {
    /* if user hasn't interacted this post already w/ else */
    if (!hasInteractedWithThisPost) {
      /* first update the UI, then send request to firebase */
      setInteractionsList((prev) => prev.concat(uid));
      setInteractionCountState((prev) => prev + 1);

      const { sendInteraction } = await import(
        `../../../../firebase/firebase_functions`
      );

      const sendInteractionResult = await sendInteraction({ postID, variant });

      if (!sendInteractionResult) {
        /* revert UI changes and show error if request fails */
        setInteractionsList((prev) => prev.filter((i) => i !== uid));
        setInteractionCountState((prev) => prev - 1);

        showNotification({
          title: `Oopps!!`,
          message: `Something went wrong. Please try again😟`,
          variant: `danger`,
        });
      }
    } else {
      /* first update the UI, then send request to firebase */
      setInteractionsList((prev) => prev.filter((i) => i !== uid));
      setInteractionCountState((prev) => prev - 1);

      const { removeInteraction } = await import(
        `../../../../firebase/firebase_functions`
      );

      const removeInteractionResult = await removeInteraction({
        postID,
        variant,
      });

      if (!removeInteractionResult) {
        /* revert UI changes and show error if request fails */
        setInteractionsList((prev) => prev.concat(uid));
        setInteractionCountState((prev) => prev + 1);

        showNotification({
          title: `Oopps!!`,
          message: `Something went wrong. Please try again😟`,
          variant: `danger`,
        });
      }
    }
  }

  // formate counts
  const formatter = Intl.NumberFormat(`en`, { notation: `compact` });

  return (
    <div className="w-25" onClick={handleBtnClick}>
      <button
        className={`btn rounded-1 text-light text-opacity-50 w-100 ${
          hasInteractedWithThisPost ? `bg-secondary bg-opacity-50` : ``
        } ${styles.react_btn}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${variant === "likers" ? `512 512` : `27 28`}`}
          fill={`${
            hasInteractedWithThisPost ? `white` : `rgba(255,255,255,0.3)`
          }`}
          width={25}
          height={25}
        >
          {variant === "likers" ? (
            <path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 208c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
          ) : (
            <path d="M13.1406 2.37683L0.989583 16.0468C-0.3125 17.5116 -0.3125 19.8846 0.989583 21.3495L5.15625 26.037C5.78125 26.7401 6.63021 27.1327 7.51562 27.1327H13H13.4896H24.6667C25.5885 27.1327 26.3333 26.2948 26.3333 25.2577C26.3333 24.2206 25.5885 23.3827 24.6667 23.3827H18.2031L25.0104 15.7303C26.3125 14.2655 26.3125 11.8925 25.0104 10.4276L17.8594 2.37683C16.5573 0.911987 14.4479 0.911987 13.1458 2.37683H13.1406ZM13.4896 23.3885H13H7.51042L3.34375 18.701L9.83854 11.3944L16.9948 19.4452L13.4896 23.3885Z" />
          )}
        </svg>

        <sub
          className={`ms-1 ${hasInteractedWithThisPost ? `text-light` : ``} ${
            styles.interectionCount
          }`}
        >
          ({formatter.format(interactionCountState)})
        </sub>
      </button>
    </div>
  );
}
