import React from "react";
import { connect } from 'react-redux';

const ShoppingCart = (props) => {


  return (
    <React.Fragment>
    <p>{props.basketProps.basketNumbers.length}</p>
   </React.Fragment>
  );
};
const mapStateToProps = state => ({
  basketProps : state.basketState
})

export default connect(mapStateToProps, { })(ShoppingCart)
