import React from "react";
import PropTypes from "prop-types";

const BasicButton = props => (
  <div className={props.containerClass}>
    {props.href ? (
      <a
        className={props.type}
        id={props.id}
        onClick={event => {
          event.preventDefault();
          props.click(event);
        }}
        href={props.href}
        target={props.target}
      >
        {props.icon && <i className={props.icon}></i>}
        {props.title}
      </a>
    ) : (
      <button className={props.type} id={props.id} onClick={props.click}>
          {props.children}
      </button>
    )}
  </div>
);

BasicButton.protoTypes = {
  containerClass: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  click: PropTypes.func
};

export default BasicButton;
