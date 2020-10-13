import React from "react";

const ShoppingCart = (props) => {


  return (
    <React.Fragment>
    <p>Items in the cart: {props.cart}</p>
   </React.Fragment>
  );
};

export default ShoppingCart;