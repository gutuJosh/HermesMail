import React from "react";
import PropTypes from 'prop-types';
import { getParent } from "../../helpers/Dom.js";
import { Translation } from 'react-i18next';

const NavItem = (props) => {

  return (
    <li className={props.url.indexOf(props.pathname.toLowerCase()) !== -1 ? "flex active" : "flex pointer"} onClick={(e) => {
        try{
         document.querySelector('.app-sections li.active').classList.remove('active');
        }
        catch(e){
          //console.log(e);
        }
        const self = getParent(e.target, 'li');
        self.classList.add('active');
        props.click();
    }}>
     <div className="nav-icon">
       <Translation>{(t, { i18n }) =>  <a title={t(props.label)} href="/" onClick={(e) => e.preventDefault()}><i className={props.icon}></i></a>}</Translation>
     </div>
     <div className="nav-label flex-item auto">
        <Translation>{(t, { i18n }) => <a title={t(props.label)} href="/" onClick={(e) => e.preventDefault()}><span>{t(props.label)}</span></a>}</Translation>
     
      {props.badge && 
       <span className="badge" data-badge={props.badge}></span>
      }
     </div>
    </li> 
  );
};

NavItem.protoTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    badge: PropTypes.number
}


export default NavItem;