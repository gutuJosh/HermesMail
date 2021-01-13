import React from "react"; 
import { connect } from 'react-redux';
import Resizer from '../components/Resizer.js';
import MessageBox from '../components/ui/MessageBox.js'
import AppContentHeader from '../components/AppContentHeader.js';
import AppSidebarHeader from '../components/AppSidebarHeader.js';
import ResizeComponent from "../helpers/ResizeComponents";
import { getParent } from "../helpers/Dom";
import Store from '../helpers/Storage.js';
import { listMessages } from '../config/gmailApi.v2';




class ReadEmail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      section : this.props.layoutProps.layoutState.currentPage,
      pageToken : false
    };
    this.loadMessages = this.loadMessages.bind(this);
    this.getHeader = this.getHeader.bind(this);
  }


  async componentDidMount(){
   
    /*listLabels().then ((response) => {
      console.log(response);
    }); */
    new ResizeComponent({
      breakpoints: {
        "xs" : 767,
        "sm" : 768,
        "md" : 992,
        "lg" : 1200
     },
     items: '[data-observe-resizes]',
    });


    this.loadMessages(this.state.section);
    
  }

  componentDidUpdate(nextProps){
    if(nextProps !== this.props){
      let section = nextProps.layoutProps.layoutState.currentPage;
      if(this.state.section !== section){
        this.setState({'section' : nextProps.layoutProps.layoutState.currentPage, 'pageToken': false, 'msglist' : []},  () => {
          this.loadMessages(nextProps.layoutProps.layoutState.currentPage);
          document.getElementById('selectAllMessagess').checked = false;
        });
      }
    }
  }

  

 loadMessages(label, token = false){
 
  const self = this;
  //read messages from session
  if(Store.getSession('messages') !== false && token === false){
     const getMessages = JSON.parse(Store.getSession('messages'));
     const section = label.toLowerCase();
     if(typeof getMessages[section] !== 'undefined'){
       self.setState({'msglist': getMessages[section], 'pageToken' : getMessages[`${section}PageToken`]});
       console.log('Read from session');
       return false; //exit
     }
  }
  //interogate gmail
  listMessages(label.toUpperCase(), token).then( async (response) => {
        if(response.length === 0 ){//there are no more message to show
          self.setState({'pageToken': false});
          return;
        }
        else{
          var messages = await listMessages(self.state.section.toUpperCase(), token);
          let pageToken = messages[0].pageToken;
          self.setState({'pageToken': pageToken}, () => {
            console.log('interogate gmail');
            var emailData = [];
            response.forEach( item => {
               let info = {};
               if(item.id !== undefined){ 
                  info.id = item.id;
                  info.historyId = item.historyId;
                  info.internalDate = item.internalDate;
                  info.snippet = item.snippet;
                  info.labelIds = item.labelIds;
                  info.date = this.getHeader(item.payload.headers, 'Date');
                  info.from = this.getHeader(item.payload.headers, 'From');
                  info.subject = this.getHeader(item.payload.headers, 'Subject');
                  emailData.push(info);
               }   
            });
            //save data in session
            const getMessages = Store.getSession('messages') !== false ? JSON.parse(Store.getSession('messages')) : {};
            const label = self.state.section.toLowerCase();
            if(typeof getMessages[label] === 'undefined'){
              getMessages[label] = emailData;
            }else{
              emailData.forEach( item => getMessages[label].push(item) );
            }
            getMessages[`${label}PageToken`] = pageToken;
            Store.setSession('messages', JSON.stringify(getMessages));
            //update state
            self.setState({'msglist': getMessages[label]});
          });
        }
    
      }).catch( (resp) => {
        console.log(resp);
    });
  }

  readMessage(e){

    const element = e.target.tagName.toLowerCase();
    const label = ['label', 'a', 'input', 'span', 'i'];
    if(label.includes(element)){
        return;
    }
    else{
      const active = document.querySelector('.message-list li.active');
      if(active !== null){
        active.classList.remove('active');
      }
      const li = getParent(e.target, 'li');
      if(li === null){
        return;
      }
      li.classList.add('active');
      const msgId = li.dataset.id;
    }

  }

  getHeader(headers, index){
    let header = '';
    headers.forEach( (item) => {
      if(item.name.toLowerCase() === index.toLowerCase()){
        header = item.value;
      }
    });
    return header;
  }


  render(){
    
    return (
      <React.Fragment>
      <section className="app-content">
        <AppContentHeader />
        <div className="result-container" data-observe-resizes data-breakpoints='{"xs":"479","sm":"480","md":"790","lg":"992"}'>
        {this.state.msglist !== undefined ?
          <MessageBox data={this.state.msglist} click={this.readMessage} pageToken={this.state.pageToken} loadMore={this.loadMessages} section={this.state.section}/>
          :
          <p>No messages</p>
         }
        </div>
      </section>
      <section className="app-sidebar" style={this.props.layoutProps.layoutState.appSidebar}>
        <AppSidebarHeader subject="Mail subject here"/>
        <Resizer/>
      </section>
    </React.Fragment>
    );
 }
}

const mapStateToProps = state => ({
    userProps : state.userState,
    layoutProps: state.layoutState
});


export default connect(mapStateToProps, { })(ReadEmail);