import { Controller } from "react-hook-form/dist/index.ie11";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { useFormContext } from "../Form";

StandardInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

StandardInput.defaultProps = {
  name: "input",
  label: "Label",
  defaultValue: "",
  className: "",
  value: "",
};

export default function StandardInput({
  name,
  label,
  rules,
  className,
  disabled,
  checked,
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={checked}
      render={({ onChange, value = "" }) => (
        <div className={"field field-checkbox" + className}>
          <div className={"control"}>
            <input
              disabled={disabled}
              onChange={(e) => onChange(e.target.checked)}
              type={"checkbox"}
              name={name}
              value={value}
              checked={value}
              className={"checkbox"}
            />
            <div className={"checkbox-toggle"}>
              <div />
            </div>
          </div>

          <Label value={label} />
          <ErrorMessage error={errors[name]} />
        </div>
      )}
    />
  );
}
