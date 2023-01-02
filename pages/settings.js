import styles from "../styles/Pages/Settings.module.css";

function settings() {
  return (
    <>
      <div
        className={`d-flex flex-column justify-content-between gap-5 w-75 mx-auto pt-3 pb-5 ${styles.wrapper}`}
      >
        <div className={`d-flex flex-column gap-3`}>
          <h2>Settings</h2>
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_me">
              <h6 className={`${styles.title}`}>Hide Me</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Prevent users to check my profile
              </p>
            </label>
            <input
              type="checkbox"
              className={`cursor ${styles.checkbox}`}
              id="hide_me"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_username">
              <h6 className={`${styles.title}`}>Hide Username</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Don't show my username on my posts
              </p>
            </label>
            <input
              type="checkbox"
              className={`cursor ${styles.checkbox}`}
              id="hide_username"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="hide_email">
              <h6 className={`${styles.title}`}>Hide Email</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Keep my email private
              </p>
            </label>
            <input
              type="checkbox"
              className={`cursor ${styles.checkbox}`}
              id="hide_email"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 px-3 border-bottom border-secondary border-opacity-25">
            <label htmlFor="feed_pref">
              <h6 className={`${styles.title}`}>Feed Settings</h6>
              <p className={`text-muted mb-2 ${styles.desc}`}>
                Sort my feed based on...
              </p>
            </label>
            <select
              className={`bg-dark border rounded p-1 cursor ${styles.select}`}
              id="feed_pref"
            >
              <option value="Like" className={`${styles.option}`}>
                Like
              </option>
              <option value="Comment" className={`${styles.option}`}>
                Comment
              </option>
              <option
                value="Reach"
                title="Like + Comment"
                className={`${styles.option}`}
              >
                Reach
              </option>
              <option value="Recent Posts" className={`${styles.option}`}>
                Recent Posts
              </option>
            </select>
          </div>
          <button
            type="submit"
            className={`btn btn-light mt-3 ${styles.button}`}
          >
            Save Changes
          </button>
        </div>

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
export default settings;
