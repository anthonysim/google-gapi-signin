import React, { useState, useEffect } from "react";
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import PageNotFound from './PageNotFound.jsx';
import Protected from './Protected.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '../actions/index.jsx';
import axios from 'axios';


const App = () => {
  const { authReducer: isAuth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  function protectedHandler() {
    if (!isAuth) {
      console.log('fu')
    }
  }

  function logoutHandler() {
    try {
      axios.get('http://localhost:3000/logout')
        .then(res => {
          dispatch(isAuthenticated(false));
          alert(res.data);
          return history.push('/login');
        })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/signup" >Signup</Link>
        <Link onClick={protectedHandler} to="/protected" >Protected</Link>
        <button id="logout" onClick={logoutHandler} >Logout</button>
      </div>

      <Switch>
        <Route exact path="/" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/protected" component={Protected} isAuth={isAuth} />
        <Route component={PageNotFound} />
      </Switch>
    </div >
  )
};

export default App;