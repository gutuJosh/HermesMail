import React from "react";
import { connect } from 'react-redux';
import { setUserInfo } from '../actions/addAction';
import AppUrls from '../config/appUrls';
import Store from '../helpers/Storage';
import { gmailLoadApi, authenticate} from '../config/gmailApi.v2';


class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        btnStatus: {display:'none'},
        redirectPage: '/read/inbox'
      
    };
    this._isMounted = false;
    this.whenAuthenticated = this.whenAuthenticated.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  async componentDidMount(){
     
     this._isMounted = true;

     if(Store.getLocal('layout') !== false){//redirect user after login to last seen page
        const getLayout = JSON.parse(Store.getLocal('layout'));
        for (const [key, value] of Object.entries(AppUrls)) {
          
          if(value === getLayout.currentPage){ 
             this.setState({'redirectPage' : key});
              break;
          }
        }
     }
     
      window.onSignIn = (googleUser) => {
          this.getUserInfo(googleUser);
      }
      
      await gmailLoadApi();
      this.setState({'btnStatus':{display:'block'}});
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  whenAuthenticated(authResult){
   if( this._isMounted === true ){
    
      if(authResult !== false) {
      //After a sign-in, the API is called to get user avatar
      try{
        this.setState({'btnStatus':{display:'none'}}, () => {
          document.querySelector('#authorizeButton').remove();
          const link = document.querySelector('.g-signin2');
          link.dispatchEvent(new Event('click'));
        });
        
      }
      catch(e){
        console.log(e.message);
      }
      } else {
        this.setState({'btnStatus':{display:'block'}});
      }
    }
}

  handleAuth(){
    const self = this;
    authenticate().then((authResult) => self.whenAuthenticated(authResult));
  }

  /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately.
  */
  getUserInfo(googleUser) {

    var profile = googleUser.getBasicProfile();
    this.props.setUserInfo({
        name : profile.getName(),
        avatar: profile.getImageUrl(),
        email: profile.getEmail(),
        login: true
    });
    //redirect user
    this.props.history.push(this.state.redirectPage);
  }



  render(){
    return (
      <React.Fragment>
       <div id="authorizeContiner">
         <span className="logo-holder"></span>
         <div className="authorize-btn-continer"> 
         <button id="authorizeButton" style={this.state.btnStatus} onClick={this.handleAuth}>Authorize</button>
         <div className="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
       </div>
     </React.Fragment>
    );
 }
}

const mapStateToProps = state => ({
    userProps : state.userState
});

export default connect(mapStateToProps, { setUserInfo })(Login);