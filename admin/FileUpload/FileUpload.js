import { useRef } from "react";
import { useAdminContext } from "@/admin";

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
      <p>Drag and drop your files anywhere or</p>
      <button type="button">
        <span> Upload File</span>
      </button>
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
