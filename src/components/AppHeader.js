import React from "react";
import LanguageSelector from './LanguageSelector.js';
import ProfileImage from './ProfileImage';
import CurrentPage from './ui/CurrentPage';
import HamburgerMenu from './ui/HamburgerMenu';


const AppHeader = (props) => {

  return (
    <header className="app-header">
        
     <div className="flex-grid">
      <div className="flex-xs-4 flex-sm-4 flex flex-middle">
       <HamburgerMenu />
       <CurrentPage />
     </div>
     <div className="flex-xs-8 flex-sm-8">
      <nav className="flex flex-right">
       <LanguageSelector/>
       <ProfileImage history={props.history} />
      </nav>
     </div>
    </div>
   
   </header>
  );
};



export default AppHeader;