// nextjs imports
import { useRouter } from "next/navigation";

// reactjs imports
import { useEffect } from "react";

// comps imports
import Post from "../comps/Pages_comps/Post";

// styles imports
import styles from "../styles/Pages/Home.module.css";

export default function Home({ signedIn }) {
  // checking signed state
  const router = useRouter();
  useEffect(() => {
    if (signedIn === false) {
      router.push(`/signin`);
      return;
    }
  }, [signedIn]);

  const Skeleton = () => (
    <>
      <div className={`bg-secondary bg-opacity-25 rounded-1 p-4 mx-auto w-100`}>
        <div className="d-flex flex-column align-items-center justify-content-between gap-4 p-1">
          <div className={`d-flex align-self-start align-items-center gap-2`}>
            <div
              className={`${styles.skeleton} rounded-circle bg-secondary bg-opacity-50 p-4`}
            ></div>
            <div className="d-flex flex-column">
              <div
                className={`${styles.skeleton} bg-secondary bg-opacity-50 w-75 px-2 py-2 mb-2`}
              ></div>
              <div
                className={`${styles.skeleton} bg-secondary bg-opacity-50 px-5 py-2 pb-1`}
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
              className={`${styles.skeleton} bg-secondary bg-opacity-50 rounded-1 w-100`}
              style={{
                height: 400,
              }}
            />
          </div>

          <div
            className={`d-flex align-items-center justify-content-between p-2 w-100 bg-secondary bg-opacity-25 rounded-1`}
          >
            <div
              className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3`}
            ></div>
            <div
              className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3`}
            ></div>
            <div
              className={`${styles.skeleton} rounded-1 bg-secondary bg-opacity-50 w-25 pt-4 pb-3`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`d-flex justify-content-center gap-5 py-3 mx-auto`}>
      <div
        className={`d-flex flex-column align-items-center justify-content-center gap-3 w-100 ${styles.post_list}`}
      >
        {signedIn === undefined
          ? [1, 2, 3, 4].map((x) => <Skeleton key={x} />)
          : [1, 2, 3, 4].map((x, index) => <Post key={index} count={x} />)}
      </div>
    </div>
  );
}
