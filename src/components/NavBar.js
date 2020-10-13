import React from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import ShoppingCart from './ShoppingCart.js';
const NavBar = (props) => {

  return (
    <React.Fragment>
     <nav>
      <h2>Hello Redux</h2>
      <ul>
        <li>
           <Link to="/">Home</Link>
         </li>
         <li>
           <Link to="/cart">My Cart</Link>
         </li>
      </ul>
      <ShoppingCart cart={props.basketProps.basketNumbers.length}/>
     </nav>
   </React.Fragment>
  );
};

const mapStateToProps = state => ({
  basketProps : state.basketState
})

export default connect(mapStateToProps, { /*getNumbers*/ })(NavBar)