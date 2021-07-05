import { useAppState } from "@/providers";

FieldWrapper.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

FieldWrapper.defaultProps = {
  className: "",
  style: {},
};

export default function FieldWrapper({
  children,
  name,
  className,
  type,
  style,
}) {
  const { setActiveField, activeField } = useAppState();
  return (
    <div
      className={
        "field_wrapper " +
        className +
        `${activeField === name ? " active" : ""}`
      }
      style={style}
    >
      <div className={"field_wrapper__edit_button"}>
        <button onClick={() => setActiveField(name, type)}>Edit</button>
      </div>
      {children}
    </div>
  );
}
