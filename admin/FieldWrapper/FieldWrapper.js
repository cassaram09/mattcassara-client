import { useAdminContext } from "@/admin";
import { _classes } from "@/utils/helpers";
import styles from "./field_wrapper.module.scss";

const cl = _classes(styles);

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
  const { setActiveField, activeField, user } = useAdminContext();

  if (!user) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cl([
        "field_wrapper",
        className,
        activeField === name && "active",
      ])}
      style={style}
    >
      <div className={cl("field_wrapper__edit_button")}>
        <button onClick={() => setActiveField(name, type)}>Edit</button>
      </div>
      {children}
    </div>
  );
}
