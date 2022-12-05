// nextjs imports
import Image from "next/image";

// comps imports
import UserInfo from "../comps/Page_User/UserInfo";

// styles imports
import styles from "./../styles/User.module.css";

function user() {
  return (
    <div className={`d-flex justify-content-center h-100 gap-5 py-3`}>
      <div className={`${styles.post_list}`}>
        {[1, 2].map((x, index) => (
          <div
            className={`bg-secondary bg-opacity-25 mb-3 rounded-1`}
            style={{ height: 350 }}
            key={index}
          >
            Post {x}
          </div>
        ))}
      </div>
      <UserInfo />
    </div>
  );
}
export default user;
