// styles import
import styles from "../../styles/comps/utils/Post_Skeleton.module.css";

const PostSkeleton = () => (
  <>
    <div
      className={`bg-secondary bg-opacity-25 rounded-1 p-4 pb-3 mx-auto w-100 ${styles.wrapper}`}
    >
      <div className="d-flex flex-column align-items-center justify-content-between gap-4 p-1">
        <div className={`d-flex align-self-start align-items-center gap-2`}>
          <div
            className={`${styles.skeleton} rounded-circle bg-secondary bg-opacity-50 p-4 ${styles.dp}`}
          ></div>
          <div className="d-flex flex-column">
            <div
              className={`${styles.skeleton} bg-secondary bg-opacity-50 w-75 px-2 py-2 mb-2 ${styles.name}`}
            ></div>
            <div
              className={`${styles.skeleton} bg-secondary bg-opacity-50 px-5 py-2 pb-1 ${styles.time}`}
            ></div>
          </div>
        </div>

        <div className="w-100">
          {[1, 2, 3, 4].map((value) => (
            <div
              key={value}
              className={`${styles.skeleton} bg-secondary bg-opacity-25 w-${
                value === 4 ? `50` : `100`
              } py-1 mb-2`}
            ></div>
          ))}
          <div
            className={`${styles.skeleton} bg-secondary bg-opacity-50 rounded-1 w-100 ${styles.media}`}
          />
        </div>

        <div
          className={`d-flex align-items-center justify-content-between p-2 w-100 bg-secondary bg-opacity-25 rounded-1 ${styles.reactBtnWrapper}`}
        >
          <div
            className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3 ${styles.reactBtn}`}
          ></div>
          <div
            className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3 ${styles.reactBtn}`}
          ></div>
          <div
            className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3 ${styles.reactBtn}`}
          ></div>
        </div>
      </div>
    </div>
  </>
);
export default PostSkeleton;
