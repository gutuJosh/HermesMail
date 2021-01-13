import PropTypes from "prop-types";

const Switcher = props => (
  <div className={props.containerClass}>
    <label className={`switch ${props.type}`}>
      <input
        type="checkbox"
        id={props.id}
        onChange={props.change}
        defaultChecked={props.checked}
      />
      <span className={"slider " + props.round}></span>
    </label>
  </div>
);

Switcher.protoTypes = {
  containerClass: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  round: PropTypes.string,
  change: PropTypes.func
};

export default Switcher;
