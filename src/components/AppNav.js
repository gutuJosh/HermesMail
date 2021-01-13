import React from "react";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import LogoHolder from './LogoHolder.js';
import NavItem from './ui/NavItem.js';
import { setLayoutConfig } from '../actions/addAction.js';
import { Translation } from 'react-i18next';

const navItems = [
  {'url' : '/read/inbox', 'label' : 'Inbox', 'icon' : 'fas fa-inbox'},
  {'url' : '/read/sent', 'label' : 'Sent', 'icon' : 'far fa-paper-plane'},
  {'url' : '/read/trash', 'label' : 'Trash', 'icon' : 'fas fa-trash'},
  {'url' : '/read/spam', 'label' : 'Spam', 'icon' : 'fas fa-exclamation-circle'}
]

const configLayout = (props, item) => {
  let layout = props.layoutProps.layoutState;
  layout.currentPage = item.label;
  props.setLayoutConfig(layout);
  props.history.push(item.url);
}


const AppNav = (props) => {


  return (
    <section className="app-nav">
      <LogoHolder />
     <nav className="main-nav">

       <Link to="/new-message" className="btn btn-info btn-full new-message-btn" onClick={() => configLayout(props, {'url' : '/new-message', 'label' : 'New-message'})}>
        <i className="fas fa-envelope pad-x-5"></i>
        <Translation>{(t, { i18n }) => <span title={t('Compose message')}>{t('New message')}</span>}</Translation>
       </Link>
      
       <ul className="app-sections">
          {navItems.map((item, i) => {
           
          return (
            <NavItem key={i} click={() => configLayout(props, item)} {...item} pathname={props.layoutProps.layoutState.currentPage}/>
          );
        })}
        
       </ul>
     </nav>
   </section>
  );
};

const mapStateToProps = state => ({
  layoutProps: state.layoutState
});


export default connect(mapStateToProps, { setLayoutConfig })(AppNav);