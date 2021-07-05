ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default function ErrorMessage({ error }) {
  if (error) {
    return <span className={"field-error"}>{error.message || "Error"}</span>;
  }

  return null;
}
