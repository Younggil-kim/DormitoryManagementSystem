import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './component/views/LoginPage/LoginPage';
import rootReducer from './_reducers';
import {createStore} from "redux"


function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component= {LoginPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
  );
}


export default App;
