import { Controller } from "react-hook-form/dist/index.ie11";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { useFormContext } from "../Form";
import { motion } from "../utils/FramerMotion";

StandardInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variants: PropTypes.object,
  onUpdate: PropTypes.func,
};

StandardInput.defaultProps = {
  name: "input",
  label: "Label",
  placeholder: "",
  type: "text",
  defaultValue: "",
  className: "",
  onUpdate: () => null,
};

export default function StandardInput({
  name,
  placeholder,
  type,
  label,
  rules,
  className,
  defaultValue,
  disabled,
  variants,
  onUpdate,
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, value = "" }) => (
        <motion.div
          variants={variants}
          className={"field field-input " + className}
          style={{ display: type === "hidden" ? "none" : "block" }}
        >
          <Label value={label} />
          <div className={"control"}>
            <input
              disabled={disabled}
              onChange={(e) => {
                onChange(e);
                onUpdate(e);
              }}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder}
              className={"input"}
            />
          </div>
          <ErrorMessage error={errors[name]} />
        </motion.div>
      )}
    />
  );
}
