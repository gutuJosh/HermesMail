import React from "react";
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';

const CurrentPage = (props) => {

  return (
    <h3 className="m0 pad-x-10 flex-item auto">
     <Translation>{(t, { i18n }) => <span>{t(props.layoutProps.layoutState.currentPage)}</span>}</Translation>
    </h3>
  );
};

const mapStateToProps = state => ({
    layoutProps: state.layoutState
});

export default connect(mapStateToProps, { })(CurrentPage);