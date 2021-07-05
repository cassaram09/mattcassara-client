SubmitField.propTypes = {
  text: PropTypes.string,
};

SubmitField.defaultProps = {
  text: "Submit",
};

export default function SubmitField({ text }) {
  return (
    <div className={"field field-submit"}>
      <div className={"control"}>
        <button className="submit">{text}</button>
      </div>
    </div>
  );
}
