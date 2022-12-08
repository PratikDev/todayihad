// nextjs imports
import Image from "next/image";
import Link from "next/link";

// reactjs imports
import { useEffect, useRef, useState } from "react";

// style imports
import styles from "../../styles/comps/Post.module.css";

function Post({ count }) {
  const [caption_expand, setCaption_expand] = useState(false);

  const seeLessBtn = useRef();

  useEffect(() => {
    const { current } = seeLessBtn;
    if (current) {
      current.onclick = () => {
        setCaption_expand(false);
      };
    }
  }, [caption_expand]);

  return (
    <div className={`bg-secondary bg-opacity-25 rounded-1 p-4`}>
      <div className="d-flex flex-column align-items-center justify-content-between gap-4 p-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link href="/user" className={`d-flex align-items-end gap-1`}>
            <Image
              src="/preview_img.png"
              width={40}
              height={40}
              alt="op dp"
              className={`rounded-circle objectFit-contain bg-secondary`}
            />
            <small>user9898</small>
          </Link>
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
            {caption_expand && (
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
