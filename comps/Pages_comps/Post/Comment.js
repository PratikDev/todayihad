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
      <div className="d-flex gap-3 w-100 align-items-start mt-2">
        <Link href={`../user/${autherID}`}>
          <Image
            src={autherPhoto}
            alt={autherName}
            width={50}
            height={50}
            className={`bg-secondary bg-opacity-50 rounded-circle border border-secondary objectFit-contain ${styles.commenter_dp}`}
          />
        </Link>
        <div className="d-flex flex-column gap-1">
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

          <p className={`mt-2 ${styles.comment_text}`}>{decodedContet}</p>
        </div>
      </div>
    </>
  );
}
export default Comment;
