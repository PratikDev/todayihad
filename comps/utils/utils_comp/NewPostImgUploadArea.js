// reactjs imports
import { useRef, useState } from "react";

// styles import
import styles from "../../../styles/comps/utils/utils_comp/NewPostImgUploadArea.module.css";

function NewPostImgUploadArea() {
  // uploaded img state
  const [img, setImg] = useState(undefined);

  // dropable area ref
  const dropAreaRef = useRef(null);

  // show media
  function showMedia(data) {
    // data isn't available
    if (!data) return;

    // checking if image has acceptable extension
    const { type } = data;
    const acceptableExt = ["png", "jpg", "jpeg"];
    const containsItem = acceptableExt.some((item) => type.includes(item));
    // if image doesn't have acceptable extension
    if (!containsItem) return;

    // setting img src in state
    const src = URL.createObjectURL(data);
    setImg(src);
  }

  // handle media drop enter
  function handleDropEnter(e) {
    e.preventDefault();
    const { current } = dropAreaRef;
    if (!current) return;
    current.classList.add(`border-light`);
  }

  // handle media drop leave
  function handleDropLeave(e) {
    e.preventDefault();
    const { current } = dropAreaRef;
    if (!current) return;
    current.classList.remove(`border-light`);
  }

  // handle media drop
  function handleDrop(e) {
    e?.preventDefault();
    const { current } = dropAreaRef;
    if (!current) return;
    current.classList.remove(`border-light`);
    const data = e.dataTransfer.files[0];
    showMedia(data);
  }

  // handle cancel media
  function handleCancelMedia() {
    setImg(undefined);
  }

  return (
    <>
      {!!img && (
        <div className="position-relative">
          <div
            className="position-absolute end-0 top-0 p-2 me-2 mt-2 rounded-circle bg-dark bg-opacity-75 d-flex align-items-center justify-content-center cursor border border-secondary border-opacity-75"
            onClick={handleCancelMedia}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width={20}
              height={20}
              fill="white"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </div>
          <img
            src={img}
            alt="uploadable photo"
            className={`${styles.post_img_preview} rounded-1 w-100 h-100 objectFit-contain`}
          />
        </div>
      )}
      {!img && (
        <>
          <label
            htmlFor="post-media"
            role={`button`}
            className={`${styles.dropArea} dropArea border-secondary border-2 rounded-1 d-flex align-items-center justify-content-center w-100 flex-grow-1 py-4 px-5 text-center text-secondary`}
            ref={dropAreaRef}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={(e) => handleDropEnter(e)}
            onDragLeave={(e) => handleDropLeave(e)}
            onDrop={(e) => handleDrop(e)}
          >
            Drop your photo here or Choose a File
          </label>
          <input
            accept=".jpg, .jpeg, .png"
            type="file"
            id="post-media"
            onChange={(e) => {
              const data = e.target.files[0];
              showMedia(data);
            }}
            hidden
            aria-hidden
            tabIndex={-1}
          />
        </>
      )}
    </>
  );
}
export default NewPostImgUploadArea;