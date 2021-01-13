import PropTypes from "prop-types";
const AlertLabel = props => {
  return (
    <div className={`alert-label ${props.containerClass}`}>
      <span
        className="close"
        onClick={event => {
          event.target.parentNode.parentNode.classList.remove("alert-on");
        }}
      >
        <i className="fas fa-times"></i>
      </span>
      <p className="m0 small">{props.placeholder}</p>
    </div>
  );
};
AlertLabel.protoTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  containerClass: PropTypes.string
};
export default AlertLabel;
