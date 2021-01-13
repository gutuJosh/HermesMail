
import PropTypes from 'prop-types';
const HamburgerMenuIcon = (props) => {
  
    return(
        <div className={`hamburger ${props.type} text-center pointer`} onClick={props.action}>
          <ul className="hamburger-icon">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
   );
  };


  HamburgerMenuIcon.protoTypes = {
    type: PropTypes.string,
    action: PropTypes.func.isRequired
}
    
  export default HamburgerMenuIcon;