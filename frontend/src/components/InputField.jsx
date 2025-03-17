export const InputField = ({ label, id, type = "text", refProp, error }) => (
  <div className="inputField">
    <label htmlFor={id}>{label}</label>

    {type === "textarea" ? (
      <textarea className={error ? "error" : ""} id={id} ref={refProp} />
    ) : (
      <input
        className={error ? "error" : ""}
        type={type}
        id={id}
        ref={refProp}
      />
    )}
  </div>
);
