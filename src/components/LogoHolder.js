import React from "react";


const LogoHolder = (props) => {


  return (
    <header className="logo-holder">
     <span id="logo"></span>
     <a href="/" className="close-menu">
      <i className="fas fa-angle-left"></i>
     </a>
   </header>
  );
};


export default LogoHolder;