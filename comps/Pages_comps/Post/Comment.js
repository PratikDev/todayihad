// nextjs imports
import Image from "next/image";
import Link from "next/link";

// style imports
import styles from "../../../styles/comps/Page_Post/Comment.module.css";

function Comment({
  data: {
    autherID,
    autherName,
    autherPhoto,
    content: encodedContent,
    creationTime,
  },
}) {
  // Decode content
  const decodedContet = Buffer.from(encodedContent, "base64").toString("utf8");

  return (
    <>
      <div
        className={`d-flex gap-1 w-100 align-items-start py-4 ${styles.commentDiv}`}
      >
        <Link href={`../user/${autherID}`}>
          <Image
            src={autherPhoto}
            alt={autherName}
            width={50}
            height={50}
            className={`bg-secondary bg-opacity-50 rounded-circle border border-secondary objectFit-contain ${styles.commenter_dp}`}
          />
        </Link>

        <div className="d-flex flex-column flex-grow-1 gap-1 bg-secondary bg-opacity-25 p-3 rounded-1">
          <div className="d-flex flex-column">
            <small className={`text-muted ${styles.comment_time}`}>
              {creationTime}
            </small>
            <Link
              href={`../user/${autherID}`}
              className={`fw-bold ${styles.commenter_name}`}
            >
              {autherName}
            </Link>
          </div>

          <p className={`m-0 mt-2 ${styles.comment_text}`}>{decodedContet}</p>
        </div>
      </div>
    </>
  );
}
export default Comment;
