import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import store from './store.js'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NavBar from './components/NavBar.js';

function App() {
  return (
    <Provider store={store}>
     <div className="App">
      <header>
       <NavBar />
      </header>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
     </div>
    </Provider>
  );
}

export default App;
