import PropTypes from "prop-types";
import React, { useState } from "react";

//The function gets the user input and show all relevant options
const filterOptions = (val, props) => {
  let pattern = val.toLowerCase();
  if (pattern.length === 0) {
    document.querySelector(`#${props.selectorId}`).value = "";
    document.querySelectorAll(`input[name="${props.name}"]`).forEach(item => {
      item.parentNode.classList.remove("hidden");
      item.checked = false;
    });
  } else {
    document.querySelectorAll(`input[name="${props.name}"]`).forEach(item => {
      let title =
        typeof item.dataset.title !== "undefined"
          ? item.dataset.title.toLowerCase()
          : "";
      if (title.match(new RegExp("^" + pattern + "", "g")) === null) {
        item.parentNode.classList.add("hidden");
      } else {
        item.parentNode.classList.remove("hidden");
      }
    });
  }
};

const SearchSelector = props => {
  const [toggle, setToggle] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);

  let counter = 0;
  let timer;
  return (
    <div
      className={props.containerClass}
      onMouseLeave={() => {
        timer = setTimeout(() => {
          setToggle(false);
          document.querySelector(`#search-${props.selectorId}`).blur();
          document
            .querySelectorAll(`input[name="${props.name}"]`)
            .forEach(item => {
              item.parentNode.classList.remove("hidden");
            });

          if (selectedValue !== false) {
            try {
              document.querySelector(
                `#search-${props.selectorId}`
              ).value = document.querySelector(
                `.select-options li input[value="${selectedValue}"]`
              ).dataset.title;
            } catch (error) {
              //
            }
          }
        }, 300);
      }}
    >
      <label className="selector-label">{props.label}</label>
      <div className="custom-selector filter-on">
        <input
          type="checkbox"
          id={props.selectorId}
          className="open-select-list"
          checked={toggle}
          onChange={event => {
            if (event.target.checked === true) {
              setToggle(true);
            } else {
              setToggle(false);
            }
          }}
          value={!selectedValue ? "" : selectedValue}
        />
        <label className="placeholder pointer" htmlFor={props.selectorId}>
          <input
            id={`search-${props.selectorId}`}
            type="text"
            className="filter-options"
            name={props.selectorId}
            placeholder={props.placeholder}
            onFocus={event => {
              //Show option list
              if (props.options) {
                setToggle(true);
              }
              if (props.focus) {
                props.focus(event);
              }
              document
                .querySelector(`#${props.selectorId}`)
                .parentNode.classList.remove("alert", "succes");
            }}
            onBlur={event => {
              //if we don't have options let the field behave like a simple input text
              let val = event.target.value;
              if (!props.options && val !== "") {
                setSelectedvalue(val);
              }
              //cancel value if nothing was selected
              if (props.options && selectedValue === false) {
                event.target.value = "";
              }
              if (props.blur) {
                props.blur(event);
              }
            }}
            onInput={event => {
              filterOptions(event.target.value, props);
              setSelectedValue(false);
            }}
          />
        </label>
        <div className="select-menu">
          {props.options && (
            <ul className="select-options list-group mtop10">
              <li className="hidden">
                <input
                  type="radio"
                  name={props.name}
                  value=""
                  defaultChecked={true}
                />
              </li>
              {props.options.map((item, i) => {
                counter++;
                return (
                  <li key={i}>
                    <input
                      type="radio"
                      name={props.name}
                      id={props.name + "_" + counter}
                      value={item.value}
                      data-title={item.title}
                      className="custom-option"
                      defaultChecked={
                        props.selectedValue === item.value ? true : false
                      }
                      onChange={event => {
                        let val = event.target.dataset.title;
                        setSelectedValue(event.target.value);
                        document.querySelector(
                          `#search-${props.selectorId}`
                        ).value = val;
                        props.change(event);
                        setToggle(false);
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
          )}
        </div>
      </div>
      <span className="text-alert small mtop10">{props.errorMessage}</span>
      <span className="text-warning small mtop10">{props.warningMessage}</span>
      <span className="text-success small mtop10">{props.successMessage}</span>
    </div>
  );
};

SearchSelector.protoTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string,
  selectorId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object.isRequired,
  name: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  blur: PropTypes.func,
  change: PropTypes.func,
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  successMessage: PropTypes.string
};
export default SearchSelector;
