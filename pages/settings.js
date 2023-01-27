// reactjs imports
import { useEffect, useState } from "react";

// firebase functions imports
import { userSignOut } from "../firebase/firebase_functions";

// firebase init imports
import { auth } from "../firebase/firebase_init";

// style imports
import styles from "../styles/Pages/Settings.module.css";

export default function settings() {
  const [data, setData] = useState({
    hideMe: undefined,
    hideUsername: undefined,
    hideEmail: undefined,
    feedSetting: undefined,
    initialized: false,
  });
  const [saving, setSaving] = useState(false);

  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      const { uid } = user;

      (async () => {
        try {
          const { doc, getDoc } = await import(`firebase/firestore`);
          const { db } = await import(`../firebase/firebase_init`);

          // users ref
          const usersRef = doc(db, "users", uid);

          const userDocSnapShot = await getDoc(usersRef);

          const { hideMe, hideEmail, hideUsername, feedSetting } =
            userDocSnapShot.data();

          const newData = {
            hideMe,
            hideEmail,
            hideUsername,
            feedSetting,
            initialized: true,
          };

          setData(newData);
        } catch (error) {}
      })();
    }
  }, [user]);

  const { hideMe, hideEmail, hideUsername, feedSetting, initialized } = data;

  async function handleSubmit(e) {
    e.preventDefault();

    const { uid } = user;

    if (!uid) return;

    const { hide_me, hide_username, hide_email, feed_setting } = e.target;

    const acceptableValues = ["recent", "like", "comment", "reach"];
    const containsValidValue = acceptableValues.some((value) =>
      feed_setting.value.includes(value)
    );

    if (!containsValidValue) {
      return;
    }

    // if any of the data changed, only then we write new data in DB
    if (
      hide_me.checked !== hideMe ||
      hide_username.checked !== hideUsername ||
      hide_email.checked !== hideEmail ||
      feed_setting.value !== feedSetting
    ) {
      setSaving(true);
      const { doc, updateDoc } = await import(`firebase/firestore`);
      const { db } = await import(`../firebase/firebase_init`);

      const userDocRef = doc(db, "users", uid);

      await updateDoc(userDocRef, {
        hideMe: hide_me.checked,
        hideEmail: hide_email.checked,
        hideUsername: hide_username.checked,
        feedSetting: feed_setting.value,
      });

      setSaving(false);
    }
  }

  return (
    <>
      <div
        className={`d-flex flex-column justify-content-between gap-5 w-75 mx-auto pt-3 pb-5 ${styles.wrapper}`}
      >
        <h2>Settings</h2>

        <form onSubmit={handleSubmit} className={`d-flex flex-column gap-3`}>
          {/* hide profile */}
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_me">
              <h6 className={`${styles.title}`}>Hide Me</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Prevent users to check my profile
              </p>
            </label>
            {hideMe === undefined ? (
              <div className="placeholder-glow">
                <div className="p-2 ps-3 pt-3 rounded-1 placeholder"></div>
              </div>
            ) : (
              <input
                type="checkbox"
                className={`cursor ${styles.checkbox}`}
                id="hide_me"
                defaultChecked={hideMe}
              />
            )}
          </div>

          {/* hide username */}
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_username">
              <h6 className={`${styles.title}`}>Hide Username</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Don't show my username on my posts
              </p>
            </label>
            {hideUsername === undefined ? (
              <div className="placeholder-glow">
                <div className="p-2 ps-3 pt-3 rounded-1 placeholder"></div>
              </div>
            ) : (
              <input
                type="checkbox"
                className={`cursor ${styles.checkbox}`}
                id="hide_username"
                defaultChecked={hideUsername}
              />
            )}
          </div>

          {/* hide email */}
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_email">
              <h6 className={`${styles.title}`}>Hide Email</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Keep my email private
              </p>
            </label>
            {hideEmail === undefined ? (
              <div className="placeholder-glow">
                <div className="p-2 ps-3 pt-3 rounded-1 placeholder"></div>
              </div>
            ) : (
              <input
                type="checkbox"
                className={`cursor ${styles.checkbox}`}
                id="hide_email"
                defaultChecked={hideEmail}
              />
            )}
          </div>

          {/* feed setting */}
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="feed_setting">
              <h6 className={`${styles.title}`}>Feed Settings</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Sort my feed based on...
              </p>
            </label>

            {feedSetting === undefined ? (
              <div className="placeholder-glow w-25">
                <div className="col-12 py-3 rounded-1 placeholder"></div>
              </div>
            ) : (
              <select
                className={`bg-dark border rounded p-1 cursor ${styles.select}`}
                id="feed_setting"
                defaultValue={feedSetting}
              >
                <option value="like" className={`${styles.option}`}>
                  Like
                </option>
                <option value="comment" className={`${styles.option}`}>
                  Comment
                </option>
                <option
                  value="reach"
                  title="Like + Comment"
                  className={`${styles.option}`}
                >
                  Reach (Like & Comment)
                </option>
                <option value="recent" className={`${styles.option}`}>
                  Recent Posts
                </option>
              </select>
            )}
          </div>

          {initialized ? (
            <button
              type="submit"
              disabled={saving}
              className={`btn btn-light mt-3 ${styles.button}`}
            >
              {saving ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2 text-dark"
                    role="status"
                  ></div>
                  <span className="visually-hidden">Saving</span>
                  Saving...
                </>
              ) : (
                <>Save Changes</>
              )}
            </button>
          ) : (
            <div className="placeholder-glow mt-3 w-25">
              <div className="col-6 py-3 rounded-1 placeholder bg-light"></div>
            </div>
          )}
        </form>

        <div>
          <h2
            className={`border-bottom border-secondary border-opacity-50 pb-3 text-danger ${styles.title_danger}`}
          >
            Danger Zone
          </h2>
          <small className={`text-muted ${styles.small}`}>
            Once you delete your account, there is no going back. Please be
            certain
          </small>
          <br />
          <button className={`btn btn-outline-danger mt-3 ${styles.button}`}>
            Delete My Account
          </button>
        </div>
      </div>

      <small
        className={`position-fixed bottom-0 start-0 text-muted mb-2 px-1 text-center w-100 ${styles.small}`}
      >
        Got any feedback/feature request for{" "}
        <b className="text-light">TodayiHad</b> ?{" "}
        <a
          href="https://twitter.com/pratik_and_dev"
          target={`_blank`}
          className="text-decoration-underline"
        >
          Pratik
        </a>{" "}
        would love to hear from your{" "}
        <a href="http://www.google.com" className="text-info text-underline">
          here
        </a>
      </small>
    </>
  );
}
