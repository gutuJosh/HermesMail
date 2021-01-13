import React from "react";
import { connect } from 'react-redux';
import { removeBasket } from '../actions/addAction.js';


const Cart = (props) => {

  return (
    <React.Fragment>
    <h3>Your cart:</h3>
    <ul className="packs-holder custom-scroll-bar flex wrap">
    {props.basketProps.basketNumbers.map((item, i) => (
        <li key={i}>
         <a href="#" onClick={() => props.removeBasket(item.id)}>X</a>...
         <strong>{item.name}</strong> ....<span>{parseFloat(item.price).toFixed(2)}</span>
        </li>
    ))}
    </ul>
    <p><strong>Current language is: {props.languageProps.languageState}</strong></p>
   </React.Fragment>
  );
};
const mapStateToProps = state => ({
    basketProps : state.basketState,
    languageProps : state.languageState
})

export default connect(mapStateToProps, { removeBasket })(Cart)