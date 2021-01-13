import PropTypes from "prop-types";
import { useState } from "react";

const ButtonGroup = props => {
  const [toggle, setToggle] = useState(false);
  let counter = 0;
  return (
    <div className={`btn-group ${props.type}`}>
      <input
        type="checkbox"
        id={props.id}
        className="open-list"
        checked={toggle}
        onChange={event => {
          let btn = event.target.parentNode;
          if (event.target.checked === true) {
            setToggle(true);
            let getPosition = btn.getBoundingClientRect().y;
            let listHeight = btn.lastChild.offsetHeight;
            if (getPosition + listHeight > window.innerHeight) {
              btn.lastChild.classList.add("top");
            }
          } else {
            setToggle(false);
            btn.lastChild.classList.remove("top");
          }
        }}
      />
      <label htmlFor={props.id}>{props.placeholder}</label>
      <ul className="dropdown-menu">
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
                className="btn-option"
                onChange={event => {
                  setToggle(false);
                  props.change;
                }}
              />
              <label className="pointer" htmlFor={props.name + "_" + counter}>
                {item.title}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ButtonGroup.protoTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.object.isRequired,
  change: PropTypes.func
};
export default ButtonGroup;
