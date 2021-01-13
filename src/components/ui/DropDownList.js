import React from "react";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

const DropDownList = (props) => {

  return(
  
      <div className={`drop-down-list ${props.containerClass}`}>
       <input id={props.id} type="checkbox" name={props.name}/>
       <Translation>{(t, { i18n }) =>  <label htmlFor={props.id} className="pointer">
           {t(props.label)} <i className={props.icon ? props.icon : "fas fa-sort"}></i></label>}
       </Translation>
       <ul className="list-group-divided pointer">
       {props.options.map((item, i) => {
           return (
               <li key={i} onClick={(e) => {
                   e.preventDefault();
                   item.action();
               }}>
                <i className={item.icon}></i> {item.label}
               </li>
           )
           })}
      </ul>
     </div>
);
  };

  DropDownList.protoTypes = {
    containerClass: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    label:PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

export default DropDownList;