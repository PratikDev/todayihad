// nextjs imports
import Image from "next/image";

// style imports
import styles from "../../styles/comps/Post.module.css";

function Post({ count }) {
  return (
    <div className={`bg-secondary bg-opacity-25 rounded-1 p-4`}>
      <div className="d-flex flex-column align-items-center justify-content-between gap-4 p-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <a
            href="https://www.google.com"
            className={`d-flex align-items-end gap-1`}
          >
            <Image
              src="/preview_img.png"
              width={40}
              height={40}
              alt="op dp"
              className={`rounded-circle objectFit-contain bg-secondary`}
            />
            <small>user9898</small>
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 512"
            fill="rgba(255,255,255,0.75)"
            width={10}
            height={25}
            className={`p-2 px-3 box-sizing-content`}
            role="button"
          >
            <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
          </svg>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center gap-4">
          <div className="text-wrap text-break">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos sed ex fuga voluptatibus asperiores ipsa exercitationem.
            Totam quis molestias asperiores eveniet facilis temporibus nesciunt
            consequuntur modi? Voluptates cupiditate culpa praesentium.
          </div>
          <div
            className={`w-100 d-flex align-items-center justify-content-center`}
          >
            <Image
              alt="post media"
              src={`/preview_img${count === 1 ? "" : count}.png`}
              fill
              className={`objectFit-contain position-relative ${styles.post_media}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
