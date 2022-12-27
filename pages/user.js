// reactjs imports
import { useEffect, useState } from "react";

// nextjs imports
import { useRouter } from "next/navigation";

// comps imports
import Post from "../comps/Pages_comps/Post";
import UserInfo from "../comps/Pages_comps/User/UserInfo";
import OffCanvas from "../comps/utils/OffCanvas";
import PostSkeleton from "../comps/utils/Post_Skeleton";

// styles imports
import styles from "../styles/Pages/User.module.css";

function User({ signedIn }) {
  // checking signed state
  const router = useRouter();
  useEffect(() => {
    if (signedIn === false) {
      router.push(`/signin`);
      return;
    }
  }, [signedIn]);

  const [offCanvasShow, setOffCanvasShow] = useState("");
  return (
    <div
      className={`d-flex justify-content-center gap-5 py-3 mx-auto ${styles.content}`}
    >
      <UserInfo
        username={signedIn?.displayName}
        useremail={signedIn?.email}
        userphoto={signedIn?.photoURL}
        loading={signedIn === undefined}
      />

      <div
        className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3`}
      >
        {signedIn === undefined
          ? [1, 2, 3, 4].map((x) => <PostSkeleton key={x} />)
          : [1, 2, 3, 4].map((x, index) => <Post key={index} count={x} />)}
      </div>
      <button
        className={`btn position-fixed bottom-0 start-0 bg-white p-0 pt-3 pe-3 rounded-0 d-lg-none d-block ${styles.menu_btn}`}
        onClick={() => {
          setOffCanvasShow("show");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={25}
          height={25}
          fill={`black`}
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>

      <OffCanvas show={offCanvasShow} setShow={setOffCanvasShow}>
        <UserInfo
          offcanvas
          username={signedIn?.displayName}
          useremail={signedIn?.email}
          userphoto={signedIn?.photoURL}
          loading={signedIn === undefined}
        />
      </OffCanvas>
    </div>
  );
}
export default User;
