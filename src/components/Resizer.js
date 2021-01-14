import React from "react";
import { connect } from 'react-redux';
import { setLayoutConfig } from '../actions/addAction.js';

const resize = () => {
  
  return new Promise((resolve) => {   
    const menuWidth = document.querySelector('.app-nav').offsetWidth;
    const preview = 360;
    document.querySelector('.circular-menu-overlay').classList.add('resizing');
    window.onmousemove = (event) => {
        event.preventDefault();
         let size = window.innerWidth - event.pageX;
         if(size < (window.innerWidth - (menuWidth + preview))){
           document.querySelector('.app-sidebar').style.width = size + 'px';
        }
    }

    window.onmouseup = (event) => {
         window.onmousemove=null;

         const resizer = document.querySelector('.app-sidebar');
         if(resizer !== null){
           document.querySelector('.circular-menu-overlay').classList.remove('resizing');
           resolve(resizer.offsetWidth);
         }

    }

  });

}


const startResize = () => {
  return new Promise( (resolve) => {   
       const menuWidth = document.querySelector('.app-nav').offsetWidth;
       const preview = 360;
       document.querySelector('.circular-menu-overlay').classList.add('resizing');

       document.querySelector('.resizer').addEventListener('touchmove', (e) =>{
          e.preventDefault();
           const touchobj = e.changedTouches[0];// reference first touch point (ie: first finger)
           let startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
           let size = window.innerWidth - startx;
           if(size < (window.innerWidth - (menuWidth + preview))){
            document.querySelector('.app-sidebar').style.width = size + 'px';
           }

       }, false);

       document.querySelector('.resizer').addEventListener('touchend', () =>{
          const resizer = document.querySelector('.app-sidebar');
          if(resizer !== null){
           document.querySelector('.circular-menu-overlay').classList.remove('resizing');
           resolve(resizer.offsetWidth);
         }

       }, false);



  });
}


const Resizer = (props) => {
  
  return (
    <div className="resizer" onMouseDown={
      (e) => {
        e.preventDefault();
        resize().then((response) => {
          let layout = props.layoutProps.layoutState;
          layout.appSidebar = {'width': response+'px'};
          props.setLayoutConfig(layout);
        });
      }}
      onTouchStart={
         (e) => {
           e.preventDefault();
           startResize().then( response => {
                let layout = props.layoutProps.layoutState;
                layout.appSidebar = {'width': response+'px'};
                props.setLayoutConfig(layout);
           });
         }
      }
      >  
    </div>
  );

};

const mapStateToProps = state => ({
  layoutProps: state.layoutState
})

export default connect(mapStateToProps, { setLayoutConfig })(Resizer);
