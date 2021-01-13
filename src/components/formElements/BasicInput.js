import PropTypes from "prop-types";

const BasicInput = props => (
  <div className={`form-group ${props.containerClass}`}>
    {props.label && (
      <label htmlFor={!props.id ? props.name : props.id}>{props.label}</label>
    )}
    <input
      id={props.id}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      readOnly={props.readonly}
      disabled={props.disabled}
      className={props.fieldClass}
      required={props.required}
      onFocus={props.focus}
      onBlur={props.blur}
      onInput={props.input}
    />

    <span className="text-error small mtop10">{props.errorMessage}</span>
    <span className="text-warning small mtop10">{props.warningMessage}</span>
    <span className="text-success small mtop10">{props.successMessage}</span>
    <span className="text-hint small mtop10">{props.hintMessage}</span>
    <span className="text-disabled small mtop10">{props.disabledMessage}</span>

    {props.hintMessage && (
      <span className="info-sign pointer">
        <i className="fas fa-info-circle"></i>
      </span>
    )}
  </div>
);

BasicInput.protoTypes = {
  containerClass: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldClass: PropTypes.string.isRequired,
  focus: PropTypes.func,
  blur: PropTypes.func,
  input: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string,
  hintMessage: PropTypes.string,
  disabledMessage: PropTypes.string
};

export default BasicInput;
