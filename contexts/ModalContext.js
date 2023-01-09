// reactjs imports
import { createContext, useContext, useEffect, useRef, useState } from "react";

// firebase functions imports
import { createPost } from "../firebase/firebase_functions";

// comps imports
import Spinner from "../comps/utils/Spinner";
import NewPostImgUploadArea from "../comps/utils/utils_comp/NewPostImgUploadArea";

// context imports
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";

// styles imports
import styles from "../styles/contexts/ModalContext.module.css";
import footerBtnStyles from "../styles/comps/utils/utils_comp/FooterBtn.module.css";

// dp img previewer ui
const DpImgPreviewUI = ({ photo }) => (
  <>
    <div className={`d-flex flex-column justify-content-center flex-grow-1`}>
      <img
        src={photo ? URL.createObjectURL(photo) : null}
        alt="modal"
        className={`${styles.modal_img} objectFit-contain w-100`}
      />
    </div>
  </>
);

// new post ui
const NewPostUI = ({ setModal, textarea }) => (
  <>
    <textarea
      ref={textarea}
      name="caption"
      id="caption"
      placeholder="Write what you had today..."
      className={`${footerBtnStyles.textarea} bg-transparent rounded-1 flex-grow-1 p-3 mb-5`}
    ></textarea>
    <NewPostImgUploadArea setModal={setModal} />
  </>
);

export const ModalContext = createContext();

function ModalContextComponent({ children }) {
  // using auth context
  const authContext = useContext(AuthContext);

  // getting info based on auth context
  const loading = authContext === undefined;
  const { displayName, uid } =
    authContext ||
    {}; /* use en empty object if authContext is undefined (can't destructure object keys from undefined) */

  // using notification context
  const showNotification = useContext(NotificationContext);

  // mounting state
  const [modal, setModal] = useState({
    show: false,
    photo: null,
    newPost: false,
  });

  // uploading state
  const [uploading, setUploading] = useState(false);

  // destructuring state values
  const { show, photo, newPost } = modal;

  // textarea ref
  const textarea = useRef();

  // modal wrapper ref
  const modalWrapper = useRef();

  // handle post function
  async function handlePost() {
    if (!textarea?.current) return;

    const {
      current: { value },
    } = textarea;

    const content = value.trim();

    if (!content) {
      showNotification({
        title: `Ah shit!!`,
        message: `You forgot to write something😖`,
        variant: `danger`,
      });
      return;
    }

    const creatingPostResp = await createPost({
      autherName: displayName,
      autherID: uid,
      content,
      photo,
      setUploading,
    });

    const failurMessage = {
      title: `Oppss!!`,
      message: `Something went wrong. Please try again😟`,
      variant: `danger`,
    };
    const successMessage = {
      title: `Hurrayy`,
      message: `Posted Successfully🥳🥳`,
      variant: `success`,
    };

    showNotification(creatingPostResp ? successMessage : failurMessage);

    if (!creatingPostResp) return;

    closeModal();
  }

  // handle dp change function
  function handleDp() {
    console.log(photo);
  }

  // show modal function
  function showModal({ data, newPost }) {
    setModal({ show: true, photo: data, newPost });
  }

  // close modal function
  function closeModal() {
    if (!modalWrapper.current) return;

    // adding animation class
    modalWrapper.current?.classList.add(styles["modal-reverse"]);

    // changing state after 100ms
    const timeout = setTimeout(function () {
      setModal({ show: false, photo: null, newPost: false });
    }, 100);

    !show && clearTimeout(timeout);
  }

  // handle submit
  function handleSubmit() {
    // if uploading
    if (uploading) return;

    // if it's not for new post and have photo
    if (!newPost && !!photo) {
      handleDp();
      return;
    }

    // if it's new post
    if (newPost) handlePost();
  }

  // effect for esc key press
  useEffect(() => {
    function escFunc(event) {
      if (event.key === `Escape`) {
        closeModal();
      }
    }

    document.addEventListener(`keydown`, escFunc, true);

    return () => {
      document.removeEventListener(`keydown`, escFunc, true);
    };
  }, [closeModal]);

  return (
    <>
      <ModalContext.Provider value={showModal}>
        {!loading && show && (
          <>
            <div
              className={`${styles.customModal} modal-backdrop vw-100 vh-100 bg-dark bg-opacity-75 position-fixed top-0 start-0 d-flex align-items-center justify-content-center`}
              tabIndex="-1"
              aria-labelledby="modal"
              aria-hidden="true"
              onClick={({ target: { classList } }) => {
                if (classList.contains(`modal-backdrop`)) {
                  closeModal();
                }
              }}
            >
              <div
                ref={modalWrapper}
                className={`${styles.customModalDialogWrapper} d-flex align-items-center justify-content-center p-5 h-100 w-100`}
              >
                <div
                  className={`${styles.customModalDialog} h-100 w-100 p-4 rounded-1 overflow-auto`}
                >
                  <div className="d-flex flex-column h-100">
                    {newPost ? (
                      <NewPostUI setModal={setModal} textarea={textarea} />
                    ) : (
                      <DpImgPreviewUI photo={photo} />
                    )}
                    <div className={`customModal-footer mt-3 text-end`}>
                      <button
                        type="button"
                        className={`btn btn-outline-secondary ${footerBtnStyles.modalBtn}`}
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={uploading}
                        className={`btn btn-light ms-2 ${footerBtnStyles.modalBtn}`}
                        onClick={handleSubmit}
                      >
                        {uploading ? (
                          <Spinner
                            size={`sm`}
                            hiddenText={`Uploading...`}
                            customClasses={`mx-2`}
                          />
                        ) : newPost ? (
                          `Post`
                        ) : (
                          `Upload`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {children}
      </ModalContext.Provider>
    </>
  );
}

export default ModalContextComponent;
