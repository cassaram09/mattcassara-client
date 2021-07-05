import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { Controller } from "react-hook-form/dist/index.ie11";
import Select from "react-select";
import { useFormContext } from "../Form";
import { motion } from "../utils/FramerMotion";

SelectInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  options: PropTypes.array,
  className: PropTypes.string,
  variants: PropTypes.object,
};

SelectInput.defaultProps = {
  className: "",
  backgroundColor: "",
};

export default function SelectInput({
  name,
  placeholder,
  label,
  options = [],
  rules,
  className,
  variants,
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ onChange, value }) => {
        return (
          <motion.div
            variants={variants}
            className={"field field-select " + className}
          >
            <Label value={label} />
            <div className={"control"}>
              <Select
                aria-labelledby="aria-label"
                name={name}
                label={label}
                placeholder={placeholder}
                value={options.find((rec) => rec.value === value)}
                onChange={(selected) =>
                  onChange(selected ? selected.value : null)
                }
                options={options}
                classNamePrefix={"select"}
                className={"select"}
                isSearchable={false}
              />
            </div>
            <ErrorMessage error={errors[name]} />
          </motion.div>
        );
      }}
    />
  );
}
