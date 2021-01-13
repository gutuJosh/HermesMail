import React from "react";
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { setUserInfo } from '../actions/addAction';
import { handleSignout } from '../config/gmailApi.v2';



const ProfileImage = props => {

    const logout =(e) => {
        e.preventDefault();
        props.setUserInfo({
            name : '',
            avatar: '',
            email: '',
            login: false
        });
        handleSignout();
        document.querySelector('.app-container').classList.add('anonymous');
        window.location = "/";
    }

    let timer;
 
    return (
            <React.Fragment>
             <input type="checkbox" id="profileImage" />
             <label htmlFor="profileImage" className="pointer">
               <img src={props.userProps.userState.avatar} alt="avatar thumbnail" />
             </label>
             <div 
             className="profile-image text-center" 
             onMouseLeave={
                 () => {
                    timer = setTimeout(() => {
                     document.querySelector('#profileImage').checked = false; 
                    }, 300);
                  }
             }
             onMouseEnter={() => clearTimeout(timer)}> 
              <figure>
                  <img src={props.userProps.userState.avatar} alt="avatar" />
                  <figcaption>
                    <strong>{props.userProps.userState.name}</strong>
                 </figcaption>
              </figure>
              <p>{props.userProps.userState.email}</p>
              <Translation>
                    {
                        (t, { i18n }) => <button onClick={logout} className="btn btn-info mbottom20"><i className="fas fa-power-off"></i> {t('Sign out')}</button>
                    }
              </Translation>
              </div>
            </React.Fragment>
    );
 
}

const mapStateToProps = state => ({
    userProps : state.userState
});

export default connect(mapStateToProps, { setUserInfo })(ProfileImage);
