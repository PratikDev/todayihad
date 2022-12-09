function OffCanvas({ children, show, setShow }) {
  return (
    <div
      tabIndex={-1}
      aria-modal
      role="dialog"
      className={`vw-100 vh-100 align-items-center justify-content-center bg-light bg-opacity-25 offcanvas offcanvas-start ${show}`}
      onClick={({ target: { classList } }) => {
        if (classList.contains("offcanvas")) {
          setShow("");
        }
      }}
    >
      {children}
    </div>
  );
}
export default OffCanvas;
