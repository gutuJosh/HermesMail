import PropTypes from "prop-types";
const TextArea = props => {
  return (
    <div className={`form-group ${props.containerClass}`}>
      <textarea
        className="textarea"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        readOnly={props.readonly}
        disabled={props.disabled}
        required={props.required}
        onFocus={props.focus}
        onBlur={props.blur}
        onInput={props.input}
        maxLength={props.maxLength}
      >
        {props.defaultValue}
      </textarea>
      <span className="text-error small mtop10">{props.errorMessage}</span>
      <span className="text-warning small mtop10">{props.warningMessage}</span>
      <span className="text-success small mtop10">{props.successMessage}</span>
    </div>
  );
};
TextArea.protoTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  containerClass: PropTypes.string,
  maxLength: PropTypes.number,
  focus: PropTypes.func,
  blur: PropTypes.func,
  input: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string
};
export default TextArea;
