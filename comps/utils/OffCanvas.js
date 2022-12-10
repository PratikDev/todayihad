function OffCanvas({ children, show, setShow }) {
  return (
    <>
      <div
        className={`d-flex align-items-center offcanvas offcanvas-end ${show}`}
        tabIndex={-1}
        style={{
          backgroundColor: `#27363E`,
          zIndex: 1,
          visibility: `visible`,
        }}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="position-absolute p-2 bottom-0 end-0"
          fill="rgba(255,255,255,0.75)"
          width={50}
          height={50}
          onClick={() => {
            setShow("");
          }}
        >
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </div>
      <div
        className="vh-100 vw-100 bg-dark bg-opacity-75 position-fixed top-0 backdrop"
        style={{
          opacity: `${show.length ? `1` : `0`}`,
          pointerEvents: `${show.length ? `unset` : `none`}`,
        }}
        onClick={() => {
          setShow("");
        }}
      ></div>
    </>
  );
}
export default OffCanvas;
