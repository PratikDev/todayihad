function Spinner({ size, hiddenText, customClasses, customStyles }) {
  return (
    <div
      class={`spinner-border ${size ? `spinner-border-${size}` : ``} ${
        customClasses ? customClasses : ``
      }`}
      style={customStyles ? { ...customStyles } : null}
      role="status"
      aria-hidden="true"
    >
      <span class="visually-hidden">{hiddenText}...</span>
    </div>
  );
}
export default Spinner;
