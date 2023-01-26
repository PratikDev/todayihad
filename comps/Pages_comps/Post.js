// reactjs imports
import { useEffect, useRef, useState } from "react";

// nextjs imports
import Image from "next/image";
import Link from "next/link";

// comps imports
import InteractionsGroup from "./Post/InteractionsGroup";

// style imports
import styles from "../../styles/comps/Post.module.css";

export default function Post({ data, count, separate }) {
  // destructuring data values
  const {
    autherName,
    autherID,
    autherPhoto,
    content: encodedContent,
    creationTime,
    media,
    postID,
    comments,
    cookies,
    trashRequest,
    likersArray,
    trashRequestArray,
  } = data || {};

  // Decode content
  const decodedContet = Buffer.from(encodedContent, "base64").toString("utf8");

  // if content is tiny
  const tinyContent =
    decodedContet.length > 100 || decodedContet.split("\n").length > 5;

  const [caption_expand, setCaption_expand] = useState(
    !tinyContent || separate || false
  );

  const seeLessBtn = useRef();

  useEffect(() => {
    const { current } = seeLessBtn;

    if (current) {
      current.onclick = () => {
        setCaption_expand(false);
      };
    }
  }, [caption_expand]);

  const prior = count === 0 || separate;

  return (
    <div
      className={`w-100 bg-secondary bg-opacity-25 rounded-1 p-4 pb-3 mx-auto ${styles.wrapper}`}
    >
      <div
        className={`d-flex flex-column justify-content-between gap-4 p-1 ${styles.postContainer}`}
      >
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link
            href={`/user/${autherID}`}
            className={`d-flex align-items-center gap-2`}
          >
            <Image
              src={autherPhoto || `/blank_user.jpg`}
              width={40}
              height={40}
              priority={prior}
              alt={autherName}
              className={`bg-secondary bg-opacity-50 rounded-circle border border-secondary objectFit-contain ${styles.dpImg}`}
            />
            <div className="d-flex flex-column">
              <small className={`${styles.autherName}`}>{autherName}</small>
              <small className={`text-muted ${styles.post_creation_date}`}>
                {`${creationTime}`}
              </small>
            </div>
          </Link>
          <div
            className={`position-relative ${styles.post_settings}`}
            tabIndex={0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 512"
              fill="rgba(255,255,255,0.75)"
              width={10}
              height={22}
              className={`p-2 px-3 box-sizing-content`}
              role="button"
            >
              <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
            </svg>
            <button
              className={`btn position-absolute bg-secondary bg-opacity-25 text-light border border-secondary d-none ${styles.report_btn}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={18}
                height={18}
                fill="rgba(255,255,255,0.5)"
                className="me-2"
              >
                <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z" />
              </svg>
              <small>Report</small>
            </button>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center gap-4">
          <p
            className={`w-100 text-break m-0 position-relative ${
              !caption_expand ? `cursor text-wrap` : ""
            } ${styles.post_caption}`}
            onClick={() => {
              setCaption_expand(true);
            }}
          >
            <>{decodedContet}</>
            {caption_expand && !separate && tinyContent && (
              <i
                className="cursor fw-bold text px-2 text-muted"
                ref={seeLessBtn}
              >
                See less
              </i>
            )}
          </p>
          <input
            type="checkbox"
            className={`d-none ${styles.expand_btn}`}
            hidden
            aria-hidden
            readOnly
            checked={caption_expand}
          />
          {media && (
            <div
              className={`w-100 d-flex align-items-center justify-content-center position-relative`}
            >
              <Image
                alt="post media"
                src={media}
                fill
                draggable={false}
                priority={prior}
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                className={`objectFit-contain position-relative ${styles.post_media}`}
              />
            </div>
          )}
        </div>

        <InteractionsGroup
          postID={postID}
          likersArray={likersArray}
          trashRequestArray={trashRequestArray}
          separate={separate}
          cookies={cookies}
          comments={comments}
          trashRequest={trashRequest}
        />
      </div>
    </div>
  );
}
