import React from "react";
import DropDownList  from './ui/DropDownList';
import { Translation } from 'react-i18next';

const AppSidebarHeader = (props) => {

  return (
    <header className="app-sidebar-header">
     <nav className="flex">
       <div className="flex-item flex-middle pad-x-10">
       <Translation>{(t, { i18n }) =>  <a href="/" title={t('Back')} className="pointer">
            <i className="fas fa-arrow-left"></i></a>}
       </Translation>
       </div>
       <div className="flex-item auto">
        <h6 className="m0 text-ellipsis pad-x-5" title={props.subject}><strong>{props.subject}</strong></h6>
       </div>
      <DropDownList 
       containerClass="flex-item pad-x-10"
       id="singleMessageOptions"
       name="message-options"
       label=""
       icon="fas fa-ellipsis-v"
       options={[
           {
            'icon' : 'far fa-envelope-open',
            'label' : 'Read',
            'action' : () => false
           },
           {
            'icon' : 'far fa-envelope',
            'label' : 'Unread',
            'action' : () => false
           },
           {
            'icon' : 'far fa-star',
            'label' : 'Starred',
            'action' : () => false
           },
           {
            'icon' : 'far fa-bookmark',
            'label' : 'Important',
            'action' : () => false
           }
       ]}
      />
      
     </nav>
   </header>
  );
};

export default AppSidebarHeader;