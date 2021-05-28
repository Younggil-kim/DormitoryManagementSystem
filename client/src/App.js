import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';

function App() {

  return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/login" component= {LoginPage} />
          <Route exact path="/register" component= {RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
