function Sidebar({ offcanvas }) {
  return (
    <div
      className={
        !offcanvas ? `position-sticky top-0 d-lg-block d-none` : `w-100`
      }
      style={{
        height: `fit-content`,
      }}
    >
      Sidebar
    </div>
  );
}
export default Sidebar;
