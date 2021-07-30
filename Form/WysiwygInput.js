import { Controller } from "react-hook-form/dist/index.ie11";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { useFormContext } from "../Form";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

WysiwygInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

WysiwygInput.defaultProps = {
  name: "wysiwyg",
  label: "Label",
  placeholder: "Text...",
  defaultValue: "",
  className: "",
};

export default function WysiwygInput({
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
            <Editor
              editorState={value}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(data) => {
                console.log(data);
                onChange(data);
              }}
            />
            ;
          </div>
          <ErrorMessage error={errors[name]} />
        </div>
      )}
    />
  );
}
