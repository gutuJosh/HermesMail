import PropTypes from 'prop-types';


const AlertLabel = (props) => {


  return(
  
       <div className={`alert-label ${props.active} ${props.type}`}>
         <span className="close" onClick={props.close}>
          <i className="fas fa-times"></i>
         </span>
         <p className="m0 small">{props.message}</p>
       </div>
     
);
  };

AlertLabel.protoTypes = {
    active: PropTypes.string,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    icon:PropTypes.string
}

export default AlertLabel;