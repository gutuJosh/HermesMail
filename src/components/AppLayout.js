import React from "react";
import { connect } from 'react-redux';
import Login from "../pages/Login";

const AppLayout = props => {



 if(props.userProps.userState.login === true){

  
    return (
            <main className={`app-container ${props.layoutProps.layoutState.appContainer}`}>
                {props.children}
            </main>
    );
  }
  else{
    
      props.history.replace({ pathname: '/'});
      return (
         <main className="app-container anonymous">
            <Login history={props.history} /> 
         </main>
      );
  }
}

const mapStateToProps = state => ({
    userProps : state.userState,
    layoutProps: state.layoutState
});

export default connect(mapStateToProps, { })(AppLayout);
