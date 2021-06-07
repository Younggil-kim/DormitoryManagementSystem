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
import TokenBoardPage from './component/views/BoardPage/TokenBoard';
import MainPage from './component/views/MainPage/MainPage';
import PredictPage from './component/views/PredictPage/PredictPage';
import AdminPage from './component/views/MainPage/AdminMainPage';
import Auth from './hoc/auth';


function App() {

  return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component= {Auth(LoginPage, false)} />
          <Route exact path="/register" component= {Auth(RegisterPage ,false)} />
          <Route exact path="/tokenpost" component= {Auth(TokenPostPage, true)} />
          <Route exact path="/tokenboard" component= {Auth(TokenBoardPage, true)} />
          <Route exact path="/main" component= {Auth(MainPage, true)} />
          <Route exact path="/predict" component= {Auth(PredictPage,null)}/>
          <Route exact path="/admin" component= {Auth(AdminPage, true, true)}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
