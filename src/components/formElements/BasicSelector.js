import PropTypes from "prop-types";

const BasicSelector = props => {
  let counter = 0;
  return (
    <div className={`select-box ` + props.containerClass}>
      <label className="selector-label">{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={props.fieldClass}
        required={props.required}
        defaultValue={props.selectedValue}
      >
        {props.options.map((item, i) => {
          counter++;
          return (
            <option key={i} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
      <span className={!props.label ? "arrow" : "arrow2"}></span>
      <span className="text-error small mtop10">{props.errorMessage}</span>
      <span className="text-warning small mtop10">{props.warningMessage}</span>
      <span className="text-success small mtop10">{props.successMessage}</span>
      <span className="text-disabled small mtop10">
        {props.disabledMessage}
      </span>
    </div>
  );
};
BasicSelector.protoTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  fieldClass: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.object.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  change: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string,
  disabledMessage: PropTypes.string
};
export default BasicSelector;
