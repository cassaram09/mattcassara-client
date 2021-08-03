import styles from "./media_library.module.scss";
import { _classes } from "@/utils/helpers";
import Image from "@/admin/components/Image";
import { closeIcon, deleteIcon } from "@/admin/components/Icons";
import { useState } from "react";
import { FileUpload, useAdminContext } from "@/admin";

const cl = _classes(styles);

MediaLibrary.propTypes = {
  onSelect: PropTypes.func,
  allowUpload: PropTypes.bool,
  allowDelete: PropTypes.bool,
  allowSelect: PropTypes.bool,
  onClose: PropTypes.func,
};

MediaLibrary.defaultProps = {
  allowUpload: true,
  allowDelete: true,
  allowSelect: true,
  onSelect: () => null,
  onClose: () => null,
};
export default function MediaLibrary({
  onSelect,
  onClose,
  allowDelete,
  allowUpload,
  allowSelect,
}) {
  const { media } = useAdminContext();
  const [selected, setMedia] = useState();

  const selectMedia = (item) => {
    onSelect(item);
    onClose();
  };

  const deleteButton = (item) => {
    if (allowDelete) {
      return (
        <button
          className={cl("list__item__delete")}
          onClick={() => deleteMedia(item.id)}
        >
          {deleteIcon}
        </button>
      );
    }
  };

  const renderSelect = () => (
    <div>
      {selected && (
        <div>
          <p>Name: {selected.filename}</p>
          <p>
            URL: <input value={selected.src} disabled />
          </p>
        </div>
      )}

      {selected && <img src={selected.src} />}
    </div>
  );

  const renderUpload = () => (
    <div>
      <FileUpload />
    </div>
  );

  return (
    <div className={cl("_")}>
      <button className={cl("close")} onClick={onClose}>
        {closeIcon}
      </button>
      <div className={cl("wrapper")}>
        <div className={cl("list_wrap")}>
          <ul className={cl(["list", allowSelect && "selectable"])}>
            {media.map((item) => (
              <li
                className={cl("list__item")}
                key={item.id}
                onClick={() => setMedia(item)}
              >
                {deleteButton(item)}
                <Image src={item.src} />
              </li>
            ))}
          </ul>
        </div>

        <div className={cl("detail")}>
          {renderUpload()}
          {renderSelect()}

          <div className={cl("select")}>
            {allowSelect && selected && (
              <button
                onClick={() => selectMedia(selected)}
                className="button is-primary"
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
