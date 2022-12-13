// nextjs imports
import Link from "next/link";
import { useRouter } from "next/router";

// styles imports
import styles from "../styles/pages/Notifications.module.css";

function Notifications() {
  const router = useRouter();

  const handleClick = ({ target: { classList } }) => {
    if (!classList.contains("user_link")) {
      router.push(`/post`);
    }
  };
  return (
    <div className={`py-3 mx-auto ${styles.wrapper}`}>
      <h3>Notifications</h3>
      <div className="list-group">
        {[1, 2, 3, 4].map((e, index) => (
          <div
            key={index}
            className={`list-group-item list-group-item-action bg-dark bg-opacity-50 text-light border-secondary py-4 cursor ${styles.notif}`}
            onClick={handleClick}
          >
            <Link href={`/user`} className="fw-bold user_link">
              user9898
            </Link>
            {` `}
            <span className="light">gave a cookie to your TiH. Enjoy 🍪</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Notifications;
