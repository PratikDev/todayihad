// nextjs imports
import Image from "next/image";
import Link from "next/link";

// reactjs imports
import { useEffect, useRef, useState } from "react";

// style imports
import styles from "../../styles/comps/Post.module.css";

function Post({ count, separate }) {
  const [caption_expand, setCaption_expand] = useState(separate || false);

  const CustomLink = !separate ? Link : "div";

  const seeLessBtn = useRef();

  useEffect(() => {
    const { current } = seeLessBtn;
    if (current) {
      current.onclick = () => {
        setCaption_expand(false);
      };
    }
  }, [caption_expand]);

  const prior = count === 1;

  return (
    <div className={`bg-secondary bg-opacity-25 rounded-1 p-4 mx-auto`}>
      <div className="d-flex flex-column align-items-center justify-content-between gap-4 p-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link href="/user" className={`d-flex align-items-center gap-2`}>
            <Image
              src="/preview_img.png"
              width={40}
              height={40}
              priority={prior}
              alt="op dp"
              className={`rounded-circle objectFit-contain bg-secondary`}
            />
            <div className="d-flex flex-column">
              <small>user9898</small>
              <small className={`text-muted ${styles.post_creation_date}`}>
                19 Aug, 1966
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
              height={25}
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
            className={`text-wrap text-break m-0 position-relative${
              !caption_expand ? ` cursor` : ""
            } ${styles.post_caption}`}
            onClick={() => {
              setCaption_expand(true);
            }}
          >
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              aperiam repellendus sed at eos. Modi ad illo, repellat debitis
              tempora, temporibus ipsa quo laudantium commodi repudiandae
              consectetur et quod voluptas. Nostrum vero ratione ab in nihil
              voluptatibus quisquam dolorum laborum obcaecati, error, molestiae
              possimus incidunt, illo sequi deleniti esse nulla! Ullam rem
              ratione voluptatem dolorum dicta cumque possimus, et obcaecati!
              Atque, doloribus. Eum, illum repellendus? Molestiae dolor odit,
              sed, iste reiciendis dolorum rem consequatur quibusdam obcaecati
              velit, earum molestias perferendis maxime beatae voluptatibus non
              facilis illo voluptas. Atque, deleniti. Sapiente. Nihil cum
              praesentium maxime excepturi expedita, omnis consequuntur numquam
              quis nisi. Ducimus illo fugit consectetur, sequi optio officiis
              ratione consequatur dicta voluptate eum nobis ab autem nulla.
              Laborum, voluptatibus voluptates? Nesciunt atque sunt aliquam
              dicta dignissimos non ipsum harum placeat, ratione assumenda
              possimus aliquid illo totam illum esse minus accusantium
              laboriosam distinctio perferendis eos pariatur quisquam quasi aut
              voluptate? Rem! Minima mollitia debitis nisi repellat inventore
              iure, non unde voluptatibus excepturi ut, fugiat voluptas rem id
              reiciendis quam eaque architecto incidunt delectus porro aperiam.
              Laboriosam reiciendis deleniti obcaecati odio quisquam.
              Voluptatum, quas veritatis. Dolorem ipsam esse ducimus,
              consequuntur optio perferendis cum quis ipsum soluta iure earum
              voluptates laborum saepe aspernatur a labore illo assumenda sunt
              et temporibus. Aut, tempora odio. Dolor, aperiam quae, esse
              explicabo aliquam nesciunt earum doloremque quasi maiores non
              nostrum architecto alias atque dolorum tenetur facilis doloribus
              rerum. Nesciunt inventore quidem quaerat, beatae voluptas error
              modi totam? Non unde distinctio vel officiis nesciunt nulla
              voluptate ea quibusdam odit nemo, dolor, dignissimos consequuntur
              quo, repellendus maxime voluptates quas? Fuga temporibus vero
              facere sequi mollitia quae dolore suscipit? Id. Sapiente rem non
              molestias, sint quisquam molestiae error odio quo reprehenderit
              velit in, asperiores corrupti saepe suscipit. Iste minima
              explicabo nihil quis recusandae consectetur quos, deserunt,
              praesentium corrupti repudiandae deleniti.
            </>
            {caption_expand && !separate && (
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
          <CustomLink
            href={!separate ? `/post` : undefined}
            className={`w-100 d-flex align-items-center justify-content-center position-relative`}
          >
            <Image
              alt="post media"
              src={`/preview_img${count === 1 ? "" : count}.png`}
              fill
              priority={prior}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className={`objectFit-contain position-relative ${styles.post_media}`}
            />
          </CustomLink>
        </div>

        <div
          className={`d-flex align-items-center justify-content-between p-2 w-100 bg-secondary bg-opacity-25 rounded-1 ${styles.react_btn_container}`}
        >
          <button
            className={`btn text-light text-opacity-50 w-25 ${styles.react_btn}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="rgba(255,255,255,0.3)"
              width={30}
              height={30}
            >
              <path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 208c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <sub className="ms-1">(21k)</sub>
          </button>
          <button
            className={`btn text-light text-opacity-50 w-25 ${styles.react_btn}`}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="rgba(255,255,255,0.3)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M25.9374 0.49585H2.9367C1.28038 0.49585 0.25 1.49366 0.25 3.17077V29.4958L5.93797 23.7852H25.9374C27.5953 23.7852 29.25 22.0626 29.25 20.3839V3.17077C29.2484 1.49366 27.5937 0.49585 25.9374 0.49585ZM17.9302 16.534H6.73564V13.3748H17.9302V16.534ZM22.7451 10.0336H6.73564V6.87439H22.7451V10.0336Z" />
            </svg>

            <sub className="ms-1">(21k)</sub>
          </button>
          <button
            className={`btn text-light text-opacity-50 w-25 ${styles.react_btn}`}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 27 28"
              fill="rgba(255,255,255,0.3)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.1406 2.37683L0.989583 16.0468C-0.3125 17.5116 -0.3125 19.8846 0.989583 21.3495L5.15625 26.037C5.78125 26.7401 6.63021 27.1327 7.51562 27.1327H13H13.4896H24.6667C25.5885 27.1327 26.3333 26.2948 26.3333 25.2577C26.3333 24.2206 25.5885 23.3827 24.6667 23.3827H18.2031L25.0104 15.7303C26.3125 14.2655 26.3125 11.8925 25.0104 10.4276L17.8594 2.37683C16.5573 0.911987 14.4479 0.911987 13.1458 2.37683H13.1406ZM13.4896 23.3885H13H7.51042L3.34375 18.701L9.83854 11.3944L16.9948 19.4452L13.4896 23.3885Z" />
            </svg>

            <sub className="ms-1">(21k)</sub>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Post;
