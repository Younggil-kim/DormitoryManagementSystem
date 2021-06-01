import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';
import TokenPostPage from './component/views/BoardPage/TokenPost';
import TokenBoardPage from './component/views/BoardPage/TokenBoard'
function App() {

  return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/login" component= {LoginPage} />
          <Route exact path="/register" component= {RegisterPage} />
          <Route exact path="/tokenpost" component= {TokenPostPage} />
          <Route exact path="/tokenboard" component= {TokenBoardPage} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
