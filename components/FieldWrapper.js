import { useAppState } from "@/providers";

FieldWrapper.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  className: PropTypes.string,
};

FieldWrapper.defaultProps = {
  className: "",
};

export default function FieldWrapper({ children, name, className }) {
  const { setActiveField } = useAppState();
  return (
    <div
      className={"field_wrapper " + className}
      onClick={() => setActiveField(name)}
    >
      {children}
    </div>
  );
}
