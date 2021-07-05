import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { useFormContext } from "../Form";

RadioInput.propTypes = {
  label: PropTypes.string,
  rules: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      defaultValue: PropTypes.string,
      checked: PropTypes.bool,
      className: PropTypes.string,
    })
  ),
};

RadioInput.defaultProps = {
  label: "Label",
  className: "",
  options: [],
};

export default function RadioInput({ label, options, className, rules, name }) {
  const { errors, register } = useFormContext();

  return (
    <div className={"field field-radio-group " + className}>
      <span>{label}</span>
      <div className={"radio-group"}>
        {options.map(({ label, value, className }) => (
          <div className={"field-radio " + className} key={label}>
            <div className={"control"}>
              <input
                name={name}
                ref={register(rules)}
                type="radio"
                value={value}
                className={"radio"}
              />
              <div className={"radio-toggle"}>
                <div />
              </div>
            </div>
            <Label value={label} />
          </div>
        ))}
      </div>
      <ErrorMessage error={errors[name]} />
    </div>
  );
}
