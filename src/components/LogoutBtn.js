import React from "react";
import { connect } from 'react-redux';
import { setUserInfo } from '../actions/addAction';
import { handleSignout } from '../config/gmailApi.v2';

const LogoutBtn = (props) => {

  return (
    <a href="/" className="tip-left" data-tip="Logout" onClick={(e) => {
        e.preventDefault();
        props.setUserInfo({
            name : '',
            avatar: '',
            email: '',
            login: false
        });
        handleSignout();
        window.location = "/";
    }}>
     <i className="fas fa-power-off"></i>
   </a>
  );
};

const mapStateToProps = state => ({
    userProps : state.userState
});

export default connect(mapStateToProps, {setUserInfo })(LogoutBtn);