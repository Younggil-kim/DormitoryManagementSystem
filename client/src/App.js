import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';
import BoardPage from './component/views/BoardPage/BoardPage';
import TotalBoard from './component/views/BoardPage/TotalBoard';
function App() {

  return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/login" component= {LoginPage} />
          <Route exact path="/register" component= {RegisterPage} />
          <Route exact path="/board" component= {BoardPage} />
          <Route exact path="/totalboard" component= {TotalBoard} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
