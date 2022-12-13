// nextjs imports
import Image from "next/image";

// style imports
import styles from "../../../styles/comps/Comment.module.css";

function Comment() {
  return (
    <>
      <div className="d-flex gap-3 w-100 align-items-start mt-4">
        <a href="./" className="mt-1">
          <Image
            src="/preview_img.png"
            alt="user9898"
            width={50}
            height={50}
            className={`bg-secondary bg-opacity-50 rounded-circle objectFit-contain ${styles.commenter_dp}`}
          />
        </a>
        <div className="d-flex flex-column gap-1">
          <small className={`text-muted ${styles.comment_time}`}>
            16hr ago
          </small>
          <p className={`pe-4 ${styles.comment_content}`}>
            <a href="./user" className="fw-bold">
              user9898
            </a>
            <span className={`ms-3 ${styles.comment_text}`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
              praesentium modi. Eaque totam quidem necessitatibus, ullam
              cupiditate inventore veritatis, reiciendis mollitia, cum tempora
              hic fugit? Deleniti officiis consequuntur ipsum odio! Ratione
              cupiditate nostrum accusantium fuga nulla accusamus laborum ullam
              natus a illo libero maiores iusto dolores nam illum dignissimos
              saepe pariatur eligendi laboriosam, voluptatum veritatis tempore
              adipisci modi quod. Quidem! Soluta tempore omnis esse sunt debitis
              architecto quae ducimus alias eius, nisi, cupiditate hic ut sit
              quidem ea laboriosam, voluptas maxime perspiciatis optio autem
              dolore ipsam! Molestias ratione veritatis consectetur.
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
export default Comment;
