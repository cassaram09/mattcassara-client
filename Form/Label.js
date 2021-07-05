Label.propTypes = {
  value: PropTypes.string,
};

export default function Label({ value }) {
  if (value) {
    return <label className={"label"}>{value}</label>;
  }

  return null;
}
