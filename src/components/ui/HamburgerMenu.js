import React from "react";
import { connect } from 'react-redux';
import { setLayoutConfig } from '../../actions/addAction.js';

const ToggleNav = () => {
  
  document.querySelector('.app-container').classList.toggle('nav-closed');
  document.querySelector('.open-menu').classList.add('active');
}

const HamburgerMenu = (props) => {

  return (

       <a href="/" className="open-menu" onClick={(e) => {
           e.preventDefault();
           let layout = props.layoutProps.layoutState;
           ToggleNav();
           layout.appContainer = document.querySelector('.app-container').classList.contains('nav-closed') ? 'nav-closed' : '';
           props.setLayoutConfig(layout);
        }}>
         <i className="fas fa-bars"></i>
       </a>
   
  );
};

const mapStateToProps = state => ({
    layoutProps: state.layoutState
})



export default connect(mapStateToProps, { setLayoutConfig })(HamburgerMenu);