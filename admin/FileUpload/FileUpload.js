import { useRef } from "react";
import { useAdminContext } from "@/admin";
import { uploadIcon } from "@/admin/components/Icons";

FileUpload.propTypes = {
  label: PropTypes.string,
};

export default function FileUpload({ label }) {
  const fileInputField = useRef(null);
  const { uploadMedia } = useAdminContext();

  const handleUpload = (event) => {
    uploadMedia(event.target.files[0]);
  };
  return (
    <section>
      <label>{label}</label>
      <p>
        Upload File
        <span>{uploadIcon}</span>
      </p>
      <input
        type="file"
        ref={fileInputField}
        title=""
        value=""
        onChange={handleUpload}
      />
    </section>
  );
}
