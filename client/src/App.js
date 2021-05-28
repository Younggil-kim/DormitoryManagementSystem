import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './component/views/LoginPage/LoginPage';


function App() {

  return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/login" component= {LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
