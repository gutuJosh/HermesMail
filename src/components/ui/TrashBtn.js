import React from "react";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

const TrashBtn = (props) => {

  return(
  
      <div className={`pointer ${props.containerClass}`} onClick={props.action}>
       <Translation>{(t, { i18n }) =>  <span className="tip-left info" data-tip={t(props.tip)}><i className={props.icn}></i></span>}</Translation>
     </div>
);
  };

  TrashBtn.protoTypes = {
    containerClass: PropTypes.string,
    icn: PropTypes.string,
    tip:PropTypes.string,
    action: PropTypes.func.isRequired
}

export default TrashBtn;