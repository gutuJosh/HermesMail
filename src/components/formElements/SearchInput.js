import PropTypes from "prop-types";
import UnorderedList from "../ui/UnorderedList";
import React, { useState } from "react";

const SearchInput = props => {
  const [suggestions, setSuggestions] = useState(false);

  var timer;

  return (
    <div className={`form-group ${props.containerClass}`}>
      {props.label && (
        <label htmlFor={!props.id ? props.name : props.id}>{props.label}</label>
      )}
      <input
        autoComplete="off"
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue === false ? "" : props.defaultValue}
        readOnly={props.readonly}
        disabled={props.disabled}
        className={props.fieldClass}
        required={props.required}
        onFocus={props.focus}
        onBlur={event => {
          const el = event.target;
          timer = setTimeout(() => {
            if (props.performSearch) {
              props.performSearch(props.name, el.value);
            }
            el.nextSibling.classList.remove("active");
          }, 300);
        }}
        onInput={async event => {
          let element = event.target.nextSibling;
          if (event.target.value.length > 2) {
            let values = await props.input(
              event.target.name,
              event.target.value
            );
            setSuggestions(values);
            if (values !== false) {
              element.classList.add("active");
            }
          } else if (element !== null) {
            element.classList.remove("active");
          }
          //where on home page
          if (
            props.name === "where" &&
            document.querySelector(`input[name="tab"]`) !== null
          ) {
            document.querySelector(`input[name="tab"]`).value = "";
          }
        }}
        onKeyUp={event => {
          clearTimeout(timer);
          if (props.keyup) {
            props.keyup(event);
          }
        }}
      />

      <div className="suggestions-container">
        <div className="category-list">
          <UnorderedList
            containerClass="list-group"
            options={suggestions}
            itemClass={props.name}
            click={event => {
              clearTimeout(timer);
              event.preventDefault();
              const element = document.querySelector(
                `input[name="${props.name}"]`
              );
              let tab = "";
              if (event.target.dataset.value !== undefined) {
                let split = event.target.dataset.value.split("|");
                element.value = split[0];
                tab = split[1];
              } else {
                element.value = event.target.getAttribute("title");
              }
              element.nextSibling.classList.remove("active");
              //home page
              if (
                props.name === "where" &&
                document.querySelector(`input[name="tab"]`) !== null
              ) {
                document.querySelector(`input[name="tab"]`).value = tab;
              }
              //search page
              if (props.performSearch) {
                let value =
                  event.target.dataset.value !== undefined
                    ? event.target.dataset.value
                    : element.value;
                props.performSearch(props.name, value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

SearchInput.protoTypes = {
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
  sugestions: PropTypes.array.isRequired,
  performSearch: PropTypes.func
};

export default SearchInput;
