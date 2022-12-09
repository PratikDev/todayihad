import Image from "next/image";
import styles from "../styles/signin.module.css";

function signin() {
  return (
    <div
      className={`d-flex align-items-center justify-content-evenly h-100 ${styles.wrapper}`}
    >
      <div
        className={`${styles.left} d-flex flex-column align-items-center justify-content-center w-50`}
      >
        <div className={`${styles.img_container} position-relative w-50`}>
          <Image src="/logo.png" fill alt="Today i Had logo" />
        </div>
        <p
          className={`text-wrap text-break text-center w-50 light ${styles.desc}`}
        >
          Post what you had today
        </p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 w-50">
        <button
          className={`btn d-flex align-items-center justify-content-evenly gap-2 border rounded-1 w-75 text-light py-2 ${styles.sign_in_btn}`}
        >
          <svg
            enableBackground="new 0 0 128 128"
            id="Social_Icons"
            version="1.1"
            viewBox="0 0 128 128"
            width={50}
            height={50}
            className="py-1 box-sizing-content"
          >
            <g id="_x31__stroke">
              <g id="Google">
                <rect
                  clipRule="evenodd"
                  fill="none"
                  fillRule="evenodd"
                  height="128"
                  width="128"
                />
                <path
                  clipRule="evenodd"
                  d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
                  fill="#FBBC05"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
                  fill="#EA4335"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
                  fill="#34A853"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
                  fill="#4285F4"
                  fillRule="evenodd"
                />
              </g>
            </g>
          </svg>
          <p className={`m-0 fs-5 light`}>Go with Google</p>
        </button>
        <button
          className={`btn d-flex align-items-center justify-content-evenly gap-2 border rounded-1 w-75 text-light py-2 ${styles.sign_in_btn}`}
        >
          <svg
            fillRule="evenodd"
            clipRule={`evenodd`}
            strokeLinejoin="round"
            strokeMiterlimit={2}
            version="1.1"
            viewBox="0 0 512 512"
            width={50}
            height={50}
            className="py-1 box-sizing-content"
          >
            <g>
              <path
                d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
                fill="#1877f2"
                fillRule="nonzero"
              />
              <path
                d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
                fill="#fff"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <p className={`m-0 fs-5 light`}>Go with Facebook</p>
        </button>
      </div>
    </div>
  );
}
export default signin;
