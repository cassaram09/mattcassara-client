import styles from "./media_library.module.scss";
import { _classes } from "@/utils/helpers";
import Image from "@/admin/components/Image";
import { closeIcon, deleteIcon, selectIcon } from "@/admin/components/Icons";
import { useState } from "react";
import { FileUpload, useAdminContext, Button } from "@/admin";

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
  allowSelect: false,
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
  const { media, deleteMedia, updateMedia } = useAdminContext();
  const [selected, setMedia] = useState();
  const [search, setSearch] = useState("");

  const selectMedia = (item) => {
    onSelect(item);
    onClose();
  };

  const renderSelect = () => (
    <div className={cl("preview")}>
      {selected && (
        <div>
          <p>Name: {selected.key}</p>
          <p>
            URL: <input value={selected.src} disabled />
          </p>
          <p>
            Alt:{" "}
            <input
              value={selected.alt}
              onChange={(e) => setMedia({ ...selected, alt: e.target.value })}
            />
          </p>
          <Button
            text="Save"
            onClick={() => updateMedia(selected)}
            icon="selectIcon"
          />
        </div>
      )}

      {selected && <img src={selected.src} />}
    </div>
  );

  const renderUpload = () => (
    <div>
      <input
        className={cl("search_input")}
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
          <ul className={cl(["list"])}>
            {media
              .filter((image) => image.key.match(search))
              .map((item) => (
                <li
                  className={cl([
                    "list__item",
                    selected && selected.key === item.key ? "selected" : "",
                  ])}
                  key={item.id}
                  onClick={() => setMedia(item)}
                >
                  <Image src={item.src} />
                </li>
              ))}
          </ul>
        </div>

        <div className={cl("detail")}>
          {renderUpload()}
          {renderSelect()}

          {selected && (
            <div className={cl("options")}>
              <Button
                text="Delete"
                onClick={() => {
                  deleteMedia(selected.key);
                  setMedia(null);
                }}
                icon="deleteIcon"
              />
              {allowSelect && (
                <Button
                  text="Select"
                  onClick={() => selectMedia(selected)}
                  icon="selectIcon"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
