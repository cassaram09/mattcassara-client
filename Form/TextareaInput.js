import { Controller } from "react-hook-form/dist/index.ie11";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { useFormContext } from "../Form";

TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

TextArea.defaultProps = {
  name: "input",
  label: "Label",
  placeholder: "Text...",
  defaultValue: "",
  className: "",
};

export default function TextArea({
  name,
  placeholder,
  label,
  rules,
  className,
  defaultValue,
  disabled,
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, value = "" }) => (
        <div className={"field field-textarea " + className}>
          <Label value={label} />
          <div className={"control"}>
            <textarea
              disabled={disabled}
              onChange={onChange}
              name={name}
              value={value}
              placeholder={placeholder}
              className={"textarea"}
            ></textarea>
          </div>
          <ErrorMessage error={errors[name]} />
        </div>
      )}
    />
  );
}
