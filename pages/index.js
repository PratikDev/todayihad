// nextjs imports
import Image from "next/image";
import Link from "next/link";

// reactjs imports
import { useRef } from "react";

// use-gesture imports
import { useDrag } from "@use-gesture/react";

// styles import
import styles from "../styles/Home.module.css";

export default function Home() {
  const containerRef = useRef();

  function scrollIt(side) {
    const { current } = containerRef;
    if (current) {
      current.scrollLeft += side * (current.clientWidth + 8);
    }
  }

  const scrollable_img = useDrag(
    ({ down, dragging, direction: [side], distance: [distanceX] }) => {
      if (down && dragging && side !== 0 && distanceX > 4) {
        scrollIt(-1 * side);
      }
    }
  );

  return (
    <div
      className={`h-100 d-flex justify-content-center align-items-center flex-column gap-3 py-3 mx-auto overflow-hidden ${styles.content}`}
    >
      <div
        className={`h-100 d-flex align-items-center gap-2 w-100 overflow-hidden ${styles.wrapper}`}
        ref={containerRef}
      >
        {[1, 2, 3, 4].map((e, index) => (
          <div
            key={index}
            className={`position-relative h-100 w-100 flex-grow-0 flex-shrink-0 rounded-1 overflow-hidden ${styles.post}`}
          >
            <Image
              src={e % 2 !== 0 ? "/preview_img.png" : "/preview_img2.png"}
              fill
              alt="Today this person had..."
              draggable={false}
              {...scrollable_img()}
              className={`objectFit-contain bg-secondary bg-opacity-50 ${styles.post_img}`}
            />
            <div
              className={`w-100 position-absolute bottom-0 px-sm-4 px-3 pb-2 pt-5 ${styles.post_caption}`}
            >
              <span>
                Today{" "}
                <a
                  href="https://www.google.com"
                  className={`brand-text fs-5 fw-bold ${styles.op_profile}`}
                >
                  User9898
                </a>{" "}
                had
              </span>{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
                facere exercitationem veritatis non consequatur sequi beatae
                voluptate laboriosam asperiores fugit fugiat maxime unde minima
                dolorem placeat accusantium, dolore libero voluptatibus.
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={`d-flex align-items-center px-2 w-100 gap-3`}>
        <Link
          href="/user"
          className={`w-50 d-flex align-items-center justify-content-center py-2 rounded-1 brand-bg`}
          title="Visit your profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className={`bi bi-person-circle ${styles.icons}`}
            viewBox="0 0 16 16"
            width={30}
            height={30}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </Link>
        <Link
          href="/new-post"
          className={`w-50 d-flex align-items-center justify-content-center py-2 rounded-1 brand-bg`}
          title="Post what you had today"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className={`bi bi-plus-square ${styles.icons}`}
            viewBox="0 0 16 16"
            width={30}
            height={30}
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
