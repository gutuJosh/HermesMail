import PropTypes from 'prop-types';


const ModalDialog = (props) => {


  return(
  
      <div className={`mask ${props.active}`}>
       <div className={`modal ${props.type} pad0`}>
        <header className="modal-header pad10" onClick={props.close}></header>
        <div className="modal-body pad10">
          <div className="text-center pad-x-20">
           <icon className={`${props.icon} fa-2x modal-icon`}></icon>
           <h4>{props.message.title}</h4>
           <p className="small">
            {props.message.text}
           </p>
          </div>
        </div>
        <footer className="modal-footer pad20">
         <div className="text-center">
            
            {props.type === 'warning' ?
            <>
            <button className="btn btn-white" onClick={props.warningAction} data-action="mask-off">
             <span className="text-asphalt-grey" data-action="mask-off">Continue</span>
            </button>
            <button className="btn btn-outline-white" onClick={props.close} data-action="mask-off">Cancel</button>
            </>
            :
            <>
            <button className="btn btn-white" onClick={props.close} data-action="mask-off">
             <span className={`text-${props.type}`} data-action="mask-off">Continue</span>
            </button>
            </>
            }
         </div>
        </footer>
       </div>
      </div>
);
  };

ModalDialog.protoTypes = {
    active: PropTypes.string,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    warningAction: PropTypes.func,
    message: PropTypes.object.isRequired,
    icon:PropTypes.string.isRequired
}

export default ModalDialog;