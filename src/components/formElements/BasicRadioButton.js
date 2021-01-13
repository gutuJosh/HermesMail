import PropTypes from "prop-types";

const BasicRadioButton = props => (
  <div className={"custom-radio-button-box " + props.containerClass}>
    <label className={"custom-radio-btn inline-block " + props.labelClass}>
      {props.label}
      <input
        type="radio"
        id={props.id}
        value={props.value}
        name={props.name}
        defaultChecked={props.checked}
        disabled={props.disabled}
        onChange={props.change}
      />
      <span className={`checkmark ${props.checkmark}`}>&nbsp;</span>
    </label>
    <span className="text-error mtop10">{props.errorMessage}</span>
  </div>
);

BasicRadioButton.protoTypes = {
  containerClass: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  labelClass: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  change: PropTypes.func,
  checkmark: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};
export default BasicRadioButton;
