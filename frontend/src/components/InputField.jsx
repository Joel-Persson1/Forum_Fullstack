export const InputField = ({
  label,
  id,
  type = "text",
  refProp,
  error,
  children,
}) => (
  <div className="inputField">
    <label htmlFor={id}>{label}</label>
    <p className={error ? "error" : ""}>{children}</p>
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
