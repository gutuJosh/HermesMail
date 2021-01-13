import React from 'react';
import { Route, Switch, useHistory} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store.js'
import AppLayout from "./components/AppLayout";
import ReadEmail from "./pages/ReadEmail";
import ComposeEmail from "./pages/ComposeEmail";
import AppNav from './components/AppNav.js';
import AppHeader from './components/AppHeader.js';


const App = (props) => {

  const history = useHistory();
  
  return (
    <Provider store={store}>
     <AppLayout history={history}>

      <AppNav history={history}/>

      <section className="app-main">
       
       <AppHeader history={history}/>
      
       <div className="app-body">
        <Switch>
          <Route path="/" exact>
            <ReadEmail history={history}/>
          </Route>
          <Route path="/read/:section">
            <ReadEmail history={history}/>
          </Route>
          <Route path="/new-message">
            <ComposeEmail />
          </Route>
        </Switch>
       </div>

      </section>

     </AppLayout>
    </Provider>
  );
 }



export default App;
