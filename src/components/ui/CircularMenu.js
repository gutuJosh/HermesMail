import React from "react";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

const CircularMenu = (props) => {

  return(
  
      <React.Fragment>
       	  <input type="checkbox" id="cn-button"/>
		  <label for="cn-button" className="circular-menu-button"><i className="fas fa-plus"></i></label>
		  <nav className="circular-menu-wrapper" id="circular-menu-wrapper">
		   <ul>
            <li>
            <Translation>{(t, { i18n }) =>  <a href="/" title={t("Spam")}><span><i className="fas fa-exclamation-circle"></i></span></a>}</Translation>
            </li>
            <li>
            <Translation>{(t, { i18n }) =>  <a href="/" title={t("Replay all")}><span><i className="fas fa-reply-all"></i></span></a>}</Translation>
            </li>
            <li>
            <Translation>{(t, { i18n }) =>  <a href="/" title={t("Replay")}><span><i className="fas fa-reply"></i></span></a>}</Translation>
            </li>
            <li>
            <Translation>{(t, { i18n }) =>  <a href="/" title={t("Forward")}><span><i className="fas fa-share"></i></span></a>}</Translation>
            </li>
            <li>
            <Translation>{(t, { i18n }) =>  <a href="/" title={t("Trash")}><span><i className="fas fa-trash"></i></span></a>}</Translation>
            </li>
		   </ul>
		  </nav>
	    <div id="circular-menu-overlay" className="circular-menu-overlay"></div>
      </React.Fragment>
      
  
);
  };

  CircularMenu.protoTypes = {
    messageId: PropTypes.string,  
}

export default CircularMenu;