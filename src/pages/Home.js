import React from "react";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction.js';

const Home = (props) => {

  return (
    <React.Fragment>
    <h1>New products:</h1>
    <ul>
     <li><a href="#" onClick={() => props.addBasket({'name' : 'Puma', 'price': '100', 'id': 1})}>Add item</a></li>
     <li><a href="#" onClick={() => props.addBasket({'name' : 'Nike', 'price': '120', 'id': 2})}>Add item</a></li>
     <li><a href="#" onClick={() => props.addBasket({'name' : 'Adidas', 'price': '100', 'id': 3})}>Add item</a></li>
    </ul>
   </React.Fragment>
  );
};

export default connect(null, { addBasket })(Home);