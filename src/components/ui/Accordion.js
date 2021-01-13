import PropTypes from 'prop-types';


const Accordion = (props) => {

 let counter = 0;

  return(
  
      <div className={`accordion ${props.type}`}>
      {props.children.map((component, i) => {
           counter++;
           return (
               <div className="accordion-item" key={i} >
                 <input type="checkbox" 
                  id={props.name+'_'+counter} 
                  defaultChecked={props.activeItem === component.key ? true : false}
                  />
                  <label htmlFor={props.name+'_'+counter}>{props.labels[i]}</label>
                 <div className="accordion-content">
                  {component}
                 </div>
               </div>
           )
           })}
      </div>
);
  };

Accordion.protoTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    labels:PropTypes.array.isRequired,
    children: PropTypes.element.isRequired
}

export default Accordion;