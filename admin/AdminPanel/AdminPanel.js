import { AnimatePresence, motion } from "@/utils/FramerMotion";
import { _classes } from "@/utils/helpers";
import styles from "./admin_panel.module.scss";
import {
  StandardInput,
  SubmitInput,
  FormProvider,
  WysiwygInput,
} from "../../Form";
import { useAdminContext, Tooltip } from "@/admin";
import MediaLibrary from "@/admin/MediaLibrary/MediaLibrary";
import {
  gearIcon,
  mediaIcon,
  exitIcon,
  lockIcon,
} from "@/admin/components/Icons";
import { useState, useEffect } from "react";

const ICONS = {
  Media: mediaIcon,
  ["Site Settings"]: gearIcon,
  Admin: lockIcon,
};

const TABS = [
  {
    label: "Media",
    type: "modal",
    modal: MediaLibrary,
  },
  {
    label: "Site Settings",
    type: "modal",
  },
  {
    label: "Users",
    type: "modal",
  },
];

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
    openModal,
    closeModal,
  } = useAdminContext();

  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    if (activeTab) {
      if (activeTab.label === "Navigation") {
        openModal(<NavigationModal />);
      }

      if (activeTab.type === "theme") {
        router.push("/theme");
      }
    } else {
      setActiveTab(null);
    }
  }, [activeTab]);

  if (!user) {
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

  const tabLabel = () => activeTab && activeTab.label;

  const options = () => {
    let tabs = TABS;

    if (user && user.role.name === "SuperAdmin") {
      tabs = TABS.concat({ label: "Admin", type: "modal" });
    }

    return tabs.map((opt, index) => (
      <button
        key={opt.label + index}
        className={cl([
          "button",
          "item",
          tabLabel() === opt.label && "visible",
        ])}
        onClick={() => {
          const Component = opt.modal;
          setActiveTab(tabLabel() !== opt.label ? opt : null);
          openModal(
            <Component
              onClose={() => {
                closeModal();
                setActiveTab(null);
              }}
            />
          );
        }}
      >
        {tabLabel() !== opt && <Tooltip text={opt.label} />}
        {ICONS[opt.label]}
      </button>
    ));
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {enabled && user && (
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
        <motion.div
          className={cl("toolbox")}
          key={"toolbox"}
          initial={{ x: -70, y: "-50%" }}
          exit={{ x: -70, y: "-50%" }}
          animate={{ x: 10, y: "-50%" }}
          transition={{
            ease: "easeInOut",
            duration: 0.25,
            delay: 0,
          }}
        >
          <div className={cl("controls")}>{options()}</div>

          <button className={cl(["button", "item", "exit"])} onClick={logout}>
            <Tooltip text={"Logout"} />
            {exitIcon}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
