import Image from "next/image";
import { useRef } from "react";
import styles from "./../styles/Home.module.css";

export default function Home() {
  const containerRef = useRef();

  function scrollIt(side) {
    const { current } = containerRef;
    if (current) {
      current.scrollLeft += side * (current.clientWidth + 15);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className={`bi bi-arrow-left-circle-fill ${styles.prev_btn}`}
        viewBox="0 0 16 16"
        role="button"
        aria-label="previous"
        onClick={() => scrollIt(-1)}
      >
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
      </svg>
      <div
        className={`${styles.container} h-100 d-flex align-items-center position-relative`}
        ref={containerRef}
      >
        {[1, 2, 3, 4].map((e, index) => (
          <div
            key={index}
            className={`${styles.img_container} position-relative h-100 w-100`}
          >
            <Image
              src={e % 2 !== 0 ? "/preview_img.png" : "/preview_img2.png"}
              fill
              className={styles.user_img}
              alt="Today this person had..."
            />
            <div className={`${styles.description} w-100`}>
              <span>
                Today{" "}
                <a
                  href="https://www.google.com"
                  className={`${styles.user_profile_link}`}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className={`bi bi-arrow-right-circle-fill ${styles.next_btn}`}
        viewBox="0 0 16 16"
        role="button"
        aria-label="next"
        onClick={() => scrollIt(1)}
      >
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
      </svg>
    </div>
  );
}
