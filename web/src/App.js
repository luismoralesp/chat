import React from 'react';
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />  
        </Route>
        <Route path="/register">
          <Register />  
        </Route>
        <Route>
          <Main path="/" />  
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
