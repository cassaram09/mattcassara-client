import styles from "../assets/styles/forms/form_fields.module.scss";
import { _classes } from "../utils/helpers";
import { Controller } from "react-hook-form";
import Select from "react-select";

const cl = _classes(styles);

const renderError = (error) => {
  if (error) {
    return error.message || "Field failed validation.";
  }
};

export const StandardInput = ({
  name,
  placeholder,
  type = "text",
  label,
  error,
  register,
}) => (
  <div className={cl("field")}>
    {label && <label className={cl("field__label")}>{label}</label>}
    <input
      type={type}
      name={name}
      ref={register}
      placeholder={placeholder}
      className={cl("field__input")}
    />
    <span className={cl("field__error")}>{renderError(error)}</span>
  </div>
);

export const BooleanInput = ({
  name,
  label,
  error,
  control,
  rules,
  options = ["Yes", "No"],
}) => (
  <div className={cl("field")}>
    {label && <span className={cl("field__label")}>{label}</span>}
    <ul className={cl("field__boolean__wrapper")}>
      {options.map((opt) => (
        <li key={opt}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ onChange, onBlur, value }) => (
              <input
                type="radio"
                id={`${name}_${opt}`}
                name={name}
                onChange={onChange}
                className={cl("field__boolean")}
                value={opt}
              />
            )}
          />

          <div className={cl("check")}></div>
          <label for={`${name}_${opt}`}>{opt}</label>
        </li>
      ))}
    </ul>

    <span className={cl("field__error")}>{renderError(error)}</span>
  </div>
);

export const ScaleInput = ({
  name,
  label,
  error,
  control,
  options = [1, 2, 3, 4, 5],
  rules,
}) => (
  <div className={cl(["field", "scale"])}>
    {label && <label className={cl("field__label")}>{label}</label>}
    <ul className={cl("field__scale__wrapper")}>
      {options.map((opt) => (
        <li key={opt}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ onChange, onBlur, value }) => (
              <input
                type="radio"
                id={`${name}_${opt}`}
                name={name}
                className={cl("field__scale")}
                value={opt}
                onChange={(e) => onChange(parseInt(e.target.value))}
              />
            )}
          />
          {/* <div className={cl("check")}></div> */}
          <label for={`${name}_${opt}`}>{opt}</label>
        </li>
      ))}
    </ul>

    <span className={cl("field__error")}>{renderError(error)}</span>
  </div>
);

export const TextArea = ({ name, placeholder, label, error, register }) => (
  <div className={cl("field")}>
    {label && <label className={cl("field__label")}>{label}</label>}
    <textarea
      name={name}
      ref={register}
      placeholder={placeholder}
      className={cl("field__textarea")}
    ></textarea>
    <span className={cl("field__error")}>{renderError(error)}</span>
  </div>
);

export const SelectInput = ({
  name,
  placeholder,
  label,
  error,
  control,
  options = [],
  rules,
}) => (
  <div className={cl("field")}>
    {label && <label className={cl("field__label")}>{label}</label>}
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ onChange, onBlur, value }) => (
        <Select
          name={name}
          label={label}
          placeholder={placeholder}
          value={options.find((rec) => rec.value === value)}
          onChange={(selected) => onChange(selected ? selected.value : null)}
          options={options}
          classNamePrefix={"form_select"}
          className={"form_select"}
        />
      )}
    />
    <span className={cl("field__error")}>{renderError(error)}</span>
  </div>
);

export const SubmitField = ({ value = "Submit" }) => {
  return (
    <div className={cl("field__submit")}>
      <input type="submit" value={value} />
    </div>
  );
};
