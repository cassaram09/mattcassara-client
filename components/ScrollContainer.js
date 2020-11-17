import { Waypoint } from "react-waypoint";
import zenscroll from "zenscroll";

zenscroll;
class ScrollContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    path: PropTypes.string,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    path: "",
    className: "",
    onEnter: () => null,
    onLeave: () => null,
  };

  onEnter = () => {
    const { onEnter, path } = this.props;
    console.log("ENTER!");
    onEnter(path, this.section);
  };

  onLeave = () => {
    const { onLeave, path } = this.props;
    onLeave(path, this.section);
  };

  render() {
    const { path, children, className } = this.props;

    return (
      <div className={className} ref={(el) => (this.section = el)} id={path}>
        <Waypoint
          onEnter={this.onEnter}
          onLeave={this.onLeave}
          fireOnRapidScroll={false}
        />
        {children}
      </div>
    );
  }
}

export default ScrollContainer;
