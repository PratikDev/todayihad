// comps imports
import { useState } from "react";
import Post from "../comps/Page_User/Post";
import UserInfo from "../comps/Page_User/UserInfo";

// utils
import OffCanvas from "../comps/utils/OffCanvas";

// styles imports
import styles from "./../styles/User.module.css";

function User() {
  const [offCanvasShow, setOffCanvasShow] = useState("");
  return (
    <div
      className={`d-flex justify-content-center gap-5 py-3 mx-auto ${styles.content}`}
    >
      <div
        className={`${styles.post_list} d-flex flex-column align-items-center justify-content-center gap-3`}
      >
        {[1, 2, 3].map((x, index) => (
          <Post key={index} count={x} />
        ))}
      </div>
      <UserInfo />
      <button
        className={`btn position-fixed bottom-0 end-0 bg-white p-0 pt-3 ps-3 rounded-0 d-lg-none d-block ${styles.menu_btn}`}
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
        <UserInfo offcanvas />
      </OffCanvas>
    </div>
  );
}
export default User;
