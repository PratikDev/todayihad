// nextjs imports
import Image from "next/image";

// styles imports
import styles from "./../styles/User.module.css";

function user() {
  return (
    <div className={`${styles.content} d-flex`}>
      <div className={`${styles.post_list}`}>
        {[1, 2].map((x, index) => (
          <div className={styles.post} key={index}>
            Post {x}
          </div>
        ))}
      </div>
      <div className={`${styles.user_info_sec} border`}>
        <div className={`${styles.user_dp_sec} position-relative`}>
          <Image
            className={styles.user_img}
            src="/preview_img.png"
            alt="user9898"
            width={120}
            height={120}
          />
          <button
            className={`position-absolute d-flex align-items-center justify-content-center cursor ${styles.user_dp_edit_btn} ${styles.color_light}`}
            role="button"
            aria-labelledby="file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={15}
              height={15}
              className={styles.dark_icon_var_2}
            >
              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
            </svg>
            <span hidden>Edit profie picture</span>
          </button>
          <input type="file" name="photo" id="photo" aria-hidden hidden />
        </div>

        <div className={`${styles.user_general_info} d-flex flex-column`}>
          <div className={`${styles.user_name} d-flex align-items-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={30}
              height={30}
              className={styles.dark_icon}
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <span>User9898</span>
          </div>

          <div className={`${styles.user_email} d-flex align-items-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={30}
              height={30}
              className={styles.dark_icon}
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            <span>example@user.com</span>
          </div>
        </div>

        <button
          className={`${styles.new_post_btn} d-flex align-items-center justify-content-center cursor w-100`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={15}
            height={15}
            className={`${styles.light_icon}`}
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <span>Post Your TiH</span>
        </button>
      </div>
    </div>
  );
}
export default user;
