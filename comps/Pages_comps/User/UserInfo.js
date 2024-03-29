// nextjs imports
import Image from "next/image";
import Link from "next/link";

// reactjs imports
import { useContext, useRef } from "react";

// contexts imports
import { NotificationContext } from "../../../contexts/NotificationContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { AuthContext } from "../../../contexts/AuthContext";

// helper functions imports
import { validateImg } from "../../../helpers/validateImg";

// styles imports
import styles from "../../../styles/comps/Page_User/UserInfo.module.css";

export default function UserInfo({
  offcanvas,
  displayName,
  email,
  photoURL,
  uid: autherID,
}) {
  // using notification context
  const showNotification = useContext(NotificationContext);

  // using modal context
  const showModal = useContext(ModalContext);

  // using auth context
  const authContext = useContext(AuthContext);
  const loading = authContext === undefined;
  const { uid } = authContext || {};

  const isOwner = uid === autherID;

  // image upload btn ref
  const img_upload = useRef();

  // function for handling selected img
  function handleSelectedImg(event) {
    const photo = event.target.files[0];

    // getting result of img validation
    const { result: isValid, errorCode } = validateImg(photo);

    if (!isValid) {
      showNotification({
        title: `Oppss!!`,
        message:
          errorCode === `size`
            ? `Max image size is 2MB😟`
            : `Only JPG, JPEG or PNG images are allowed😟`,
        variant: `danger`,
      });
      return;
    }

    // calling showModal func
    showModal({ data: photo, newPost: false });
  }

  return (
    <>
      <div
        className={`${
          !offcanvas ? `position-sticky top-0 d-lg-block d-none` : `w-100`
        }`}
        style={{ height: `fit-content` }}
      >
        <div
          className={`${
            offcanvas ? "" : styles.user_info_sec
          } rounded-1 p-4 d-flex align-items-center justify-content-center flex-column gap-5 position-relative`}
        >
          <div
            className={`position-relative d-flex align-items-center justify-content-center mx-auto ${styles.user_dp_sec}`}
          >
            {!loading ? (
              <>
                <Image
                  src={photoURL || `/blank_user.jpg`}
                  alt={displayName || `user`}
                  width={150}
                  height={150}
                  priority={!offcanvas ? true : false}
                  className={`rounded-circle border border-2 border-white bg-secondary bg-opacity-50 objectFit-contain`}
                />
                <label htmlFor="profile-photo">
                  <div
                    className={`position-absolute d-flex align-items-center justify-content-center top-0 end-0 translate-middle-x rounded-circle border border-2 border-white cursor ${styles.edit_dp_btn}`}
                    role="button"
                    aria-labelledby="file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="rgba(0, 0, 0, 0.64)"
                      width={15}
                      height={15}
                    >
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                    <span hidden>Edit profie picture</span>
                  </div>
                </label>
                <input
                  ref={img_upload}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  id="profile-photo"
                  aria-hidden
                  hidden
                  onChange={(e) => {
                    handleSelectedImg(e);

                    // reseting input field
                    e.target.value = null;
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className={`${styles.skeleton} bg-secondary bg-opacity-50 rounded-circle border`}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                ></div>
              </>
            )}
          </div>

          <div className={`d-flex flex-column gap-3 w-100`}>
            <div
              className={`d-flex align-items-center justify-content-center gap-2 w-100`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="rgba(var(--bs-secondary-rgb),0.40)"
                width={30}
                height={30}
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <span
                className={`${
                  loading ? styles.skeleton : ``
                } flex-grow-1 bg-secondary bg-opacity-25 rounded-1 py-${
                  !loading ? `2` : `3`
                } px-3 ${styles.ltr_space_2} ${styles.user_info_text_length}`}
                title={displayName || `username`}
              >
                {!loading && (displayName || `username`)}
              </span>
            </div>

            <div
              className={`d-flex align-items-center justify-content-center gap-2 w-100`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="rgba(var(--bs-secondary-rgb),0.40)"
                width={30}
                height={30}
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <span
                className={`${
                  loading ? styles.skeleton : ``
                } flex-grow-1 bg-secondary bg-opacity-25 rounded-1 py-${
                  !loading ? `2` : `3`
                } px-3 ${styles.ltr_space_2} ${styles.user_info_text_length}`}
                title={email || `user email`}
              >
                {!loading && (email || `user email`)}
              </span>
            </div>
          </div>

          {isOwner ? (
            <button
              className={`btn bg-secondary bg-opacity-75 rounded-1 text-light d-flex align-items-center justify-content-center gap-2 w-100 border-0 ${
                loading ? `${styles.skeleton} py-3` : ``
              }`}
              disabled={loading}
              onClick={() => {
                !loading ? showModal({ data: null, newPost: true }) : null;
              }}
            >
              {!loading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="rgba(255,255,255,0.75)"
                    width={18}
                    height={18}
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                  <span className={`${styles.ltr_space_2}`}>Post Your TiH</span>
                </>
              ) : (
                ``
              )}
            </button>
          ) : (
            ``
          )}

          {!loading && isOwner ? (
            <Link href="/settings" className={`position-absolute top-0 end-0 `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="rgba(255,255,255,0.75)"
                width={23}
                height={23}
                className={`p-2 pt-3 pe-3 box-sizing-content`}
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
              </svg>
            </Link>
          ) : (
            ``
          )}
        </div>
      </div>
    </>
  );
}
