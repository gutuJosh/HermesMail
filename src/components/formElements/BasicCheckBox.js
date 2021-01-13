import React from "react";
import PropTypes from "prop-types";

const BasicCheckBox = props => (
  <div className={props.containerClass}>
    <label className={"custom-checkbox " + props.labelClass} htmlFor={props.id}>
      <input
        id={props.id}
        className={props.fieldClass}
        name={props.name}
        type="checkbox"
        onChange={props.change}
        defaultChecked={props.checked}
        value={props.value}
      />
      <span className={`checkmark ${props.checkmark}`}>&nbsp;</span>
      {props.children}
    </label>
    {props.errorMessage &&
     <span className="text-error small mtop10">{props.errorMessage}</span>
    }
  </div>
);

BasicCheckBox.protoTypes = {
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  checked: PropTypes.bool,
  change: PropTypes.func,
  errorMessage: PropTypes.string,
  checkmark: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default BasicCheckBox;
