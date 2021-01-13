import React from "react";
import { connect } from 'react-redux';
import Resizer from '../components/Resizer.js';

class ComposeEmail extends React.Component {
  
  constructor(props) {
    super(props);
  }




  render(){
   
    return (
      <React.Fragment>
      <section className="app-content">
        
      </section>
      <section className="app-sidebar" style={this.props.layoutProps.layoutState.appSidebar}>
        <Resizer/>
        <h3>Compose email</h3>
      </section>
    </React.Fragment>
    );
 }
}

const mapStateToProps = state => ({
    layoutProps: state.layoutState
});

export default connect(mapStateToProps, { })(ComposeEmail);