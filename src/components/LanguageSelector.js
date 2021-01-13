import React from "react";
import { connect } from 'react-redux';
import { changeLanguage } from '../actions/addAction.js';
import i18n from '../config/i18n';
import CustomSelector from '../components/formElements/CustomSelector';


const LanguageSelector = (props) => {


  return (
    <React.Fragment>
     <CustomSelector 
        containerClass="language-selector"
        selectorId="languageSelector"
        name="browsers"
        placeholder={ i18n.language.toLocaleUpperCase() }
        options={[
        {'value': 'en','title':'EN'},
        {'value': 'it','title':'IT'},
        {'value': 'de','title':'DE'}
      ]}
      selectedValue={i18n.language}
      change={(event) => {
        i18n.changeLanguage(event.target.value);
        props.changeLanguage(event.target.value);
      }}
      />
   </React.Fragment>
  );
};

const mapStateToProps = state => ({
  languageProps : state.languageState
})

export default connect(mapStateToProps, { changeLanguage })(LanguageSelector)