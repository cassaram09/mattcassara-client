import { AnimatePresence, motion } from "@/utils/FramerMotion";
import { _classes } from "@/utils/helpers";
import styles from "./admin_panel.module.scss";
import {
  StandardInput,
  SubmitInput,
  FormProvider,
  WysiwygInput,
} from "../../Form";
import { useAdminContext } from "@/admin";

const cl = _classes(styles);

AdminPanel.propTypes = {
  enabled: PropTypes.bool,
};
export default function AdminPanel({ enabled }) {
  const {
    activeField,
    page,
    updateField,
    save,
    toggle,
    setActiveField,
    fieldType,
    user,
    logout,
  } = useAdminContext();

  if (!user || !page) {
    return null;
  }

  const renderFields = () => {
    if (!activeField || !fieldType) {
      return null;
    }

    if (fieldType === "wysiwyg") {
      return (
        <div className="row">
          <WysiwygInput
            name={activeField}
            label={activeField}
            defaultValue={page[activeField]}
            rules={{ required: "Field is required" }}
          />
        </div>
      );
    }

    return (
      <div className="row">
        <StandardInput
          name={activeField}
          label={activeField}
          defaultValue={page[activeField]}
          rules={{ required: "Field is required" }}
        />
      </div>
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {enabled && (
        <motion.div
          key="admin"
          animate={{ x: 0 }}
          initial={{ x: -400 }}
          exit={{ x: -400 }}
          transition={{ easing: "ease-in-out", duration: 0.5 }}
          className={cl(["_", enabled && "active"])}
        >
          <div className={cl("content")}>
            <FormProvider
              onSubmit={save}
              onSuccess={(resp, formData) => updateField(formData[activeField])}
            >
              {renderFields()}
              <SubmitInput />
            </FormProvider>
            <button
              className={cl("toggle")}
              onClick={() => {
                toggle(!enabled);
                setActiveField(null);
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
      {user && (
        <div className={cl("logout_button")}>
          <button onClick={logout}>LOGOUT</button>
        </div>
      )}
    </AnimatePresence>
  );
}
