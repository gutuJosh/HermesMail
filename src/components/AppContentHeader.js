import React from "react";
import DropDownList  from './ui/DropDownList';
import TrashBtn  from './ui/TrashBtn';
import BasicCheckBox from './formElements/BasicCheckBox';

const AppContentHeader = (props) => {

  return (
    <header className="app-content-header">
     <nav className="flex inbox-menu">
       <div className="flex-item select-all-messages">
       <BasicCheckBox 
        containerClass="checkbox-container"
        labelClass="selectAllMessagess"
        id="selectAllMessagess"
        name="select-messages"
        checkmark="default"
        change={(e) => {
          const inputBox =  document.querySelectorAll('input[name="message"]');
          if(e.target.checked === true){
            inputBox.forEach( (item) => item.checked = true);
          }
          else{
            inputBox.forEach( (item) => item.checked = false);
          }
        }}
       >&nbsp;</BasicCheckBox>
       </div>
      <DropDownList 
       containerClass="flex-item"
       id="markBtn"
       name="inbox-nav"
       label="Mark as"
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
           },
           {
            'icon' : 'fas fa-exclamation-circle',
            'label' : 'Spam',
            'action' : () => false
           }
       ]}
      />
       <DropDownList 
       containerClass="flex-item"
       id="moveBtn"
       name="inbox-nav"
       label="Move to"
       options={[
           {
            'icon' : 'fas fa-share-alt',
            'label' : 'Social',
            'action' : () => false
           },
           {
            'icon' : 'fas fa-sync-alt',
            'label' : 'Updates',
            'action' : () => false
           },
           {
            'icon' : 'fas fa-comment',
            'label' : 'Forum',
            'action' : () => false
           },
           {
            'icon' : 'fas fa-shopping-bag',
            'label' : 'Promotions',
            'action' : () => false
           }
       ]}
      />
      <TrashBtn containerClass="flex-item auto flex flex-right flex-middle" tip="Delete forever" icn="fas fa-trash-alt pad-x-10"/>
     </nav>
   </header>
  );
};



export default AppContentHeader;