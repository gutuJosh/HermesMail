import PropTypes from 'prop-types';
import React, { useState } from 'react';

const VerticalTabs = (props) => {

 const [active, setActive] = useState(props.activeTab);
 let counter = 0;

 function switchTab(event){
   setActive(event.target.value);
 }

  return(
    <div className={`tabs-container-vertical flex ${props.flexType}`}>
      <nav className="tab-menu flex">
       <ul>
       {props.tabs.map((item, i) => {
           counter++;
           return (
               <li key={i}>
                 <input 
                  type="radio" 
                  id={props.name.replace(/ /g, '-')+'_'+counter} 
                  name={props.name}
                  value={item.id}
                  onChange={switchTab}
                  defaultChecked={props.activeTab === item.id ? true : false}
                 />
                 <label htmlFor={props.name.replace(/ /g, '-')+'_'+counter}>{item.title}</label>
               </li>
           )
           })}
       </ul>
      </nav>
      <div className="tab-list pad20">
      {props.children.map((component, i) => {
           counter++;
           return (
               <div className={component.key === active ? 'active' : ''} key={i} >
                 {component} 
               </div>
           )
           })}
      </div>
    </div>
);
  };

  VerticalTabs.protoTypes = {
    flexType: PropTypes.string,
    tabs: PropTypes.array.isRequired,
    children: PropTypes.element.isRequired
    
}

export default VerticalTabs;