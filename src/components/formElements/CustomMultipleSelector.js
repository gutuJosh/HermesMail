import PropTypes from "prop-types";
import { useState } from "react";

const CustomMultipleSelector = props => {
  const [selected, setSelected] = useState(
    !props.selectedValues ? [] : props.selectedValues
  );
  const [values] = useState(selected.map(item => item.value));
  let close;

  function handleStatusChange(selected) {
    setSelected(selected);
    props.change("selectedValues", selected);
  }

  function removeItem(event) {
    let getSelectedValues = selected.filter(element => {
      if (element.value !== event.target.dataset.value) {
        return element;
      } else {
        document.querySelector(
          "#" + props.name + ' input[value="' + element.value + '"]'
        ).checked = false;
      }
    });
    handleStatusChange(getSelectedValues);
  }

  let counter = 0;

  return (
    <div className={props.containerClass}>
      <label className="selector-label">{props.label}</label>
      <div className="custom-selector">
        <input
          type="checkbox"
          id={props.selectorId}
          className="open-select-list"
        />
        <label className="placeholder pointer" htmlFor={props.selectorId}>
          {props.placeholder}
        </label>
        <div className="select-menu">
          <ul className="select-options list-group" id={props.name}>
            {props.options.map((item, i) => {
              counter++;
              return (
                <li key={i}>
                  <input
                    type="checkbox"
                    name={props.name}
                    id={props.name + "_" + counter}
                    value={item.value}
                    data-title={item.title}
                    className="custom-option"
                    defaultChecked={
                      values.join().indexOf(item.value) !== -1 ? true : false
                    }
                    onChange={event => {
                      let getPreviousSelectedValues = selected;
                      if (event.target.checked === true) {
                        getPreviousSelectedValues.push({
                          value: event.target.value,
                          title: event.target.dataset.title
                        });
                      } else {
                        getPreviousSelectedValues = selected.filter(element => {
                          if (element.value !== event.target.value) {
                            return element;
                          }
                        });
                      }
                      handleStatusChange(getPreviousSelectedValues);
                    }}
                  />
                  <label
                    className="pointer"
                    htmlFor={props.name + "_" + counter}
                  >
                    {item.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="selected-options-container flex wrap">
        {selected.map((item, i) => {
          return (
            <span
              className="selected-label pointer"
              data-value={item.value}
              key={i}
              onClick={removeItem}
            >
              {item.title}
            </span>
          );
        })}
      </div>
      <span className="text-error small mtop10">{props.errorMessage}</span>
      <span className="text-warning small mtop10">{props.warningMessage}</span>
      <span className="text-success small mtop10">{props.successMessage}</span>
    </div>
  );
};

CustomMultipleSelector.protoTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string,
  selectorId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object.isRequired,
  name: PropTypes.string,
  selectedValues: PropTypes.array.isRequired,
  change: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string
};
export default CustomMultipleSelector;
