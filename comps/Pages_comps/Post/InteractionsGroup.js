// nextjs imports
import Link from "next/link";

// styles import
import styles from "../../../styles/comps/Page_comps/InteractionsGroup.module.css";
import InteractionBtn from "./InteractionsGroup/InteractionBtn";

/**
 * @param {Object} param
 * @param {String} param.postID - id of the post
 * @param {True | Undefined} param.separate - if post is separate
 * @param {String[]} param.likersArray - array of who already liked
 * @param {Number} param.cookies - number of cookies on this post
 * @param {Number} param.comments - number of comments on this post
 * @param {Number} param.trashRequest - number of trash request on this post
 */
export default function InteractionsGroup({
  postID,
  separate,
  likersArray,
  trashRequestArray,
  cookies,
  comments,
  trashRequest,
}) {
  const CustomLink = !separate ? Link : "div";

  // formate counts
  const formatter = Intl.NumberFormat(`en`, { notation: `compact` });

  function handleCommentClick() {
    sessionStorage.setItem("homePageScrollPosition", window.scrollY);
  }

  return (
    <div
      className={`d-flex align-items-center justify-content-between p-1 w-100 bg-secondary bg-opacity-25 rounded-1`}
    >
      <InteractionBtn
        postID={postID}
        variant="likers"
        interactionCount={cookies}
        InteractionsArray={likersArray}
      />
      <CustomLink
        href={!separate ? `/post/${postID}#commentsection` : null}
        className={`w-25`}
        onClick={!separate ? handleCommentClick : null}
      >
        <button
          className={`btn rounded-1 text-light text-opacity-50 w-100 ${styles.react_btn}`}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 30 30"
            fill={`rgba(255,255,255,0.3)`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25.9374 0.49585H2.9367C1.28038 0.49585 0.25 1.49366 0.25 3.17077V29.4958L5.93797 23.7852H25.9374C27.5953 23.7852 29.25 22.0626 29.25 20.3839V3.17077C29.2484 1.49366 27.5937 0.49585 25.9374 0.49585ZM17.9302 16.534H6.73564V13.3748H17.9302V16.534ZM22.7451 10.0336H6.73564V6.87439H22.7451V10.0336Z" />
          </svg>

          <sub className={`ms-1 ${styles.interectionCount}`}>
            ({formatter.format(comments)})
          </sub>
        </button>
      </CustomLink>
      <InteractionBtn
        postID={postID}
        variant="trashRequest"
        interactionCount={trashRequest}
        InteractionsArray={trashRequestArray}
      />
    </div>
  );
}
