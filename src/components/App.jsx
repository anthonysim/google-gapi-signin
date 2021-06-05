import React from "react";
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import PageNotFound from './PageNotFound.jsx';
import Protected from './Protected.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '../actions/index.jsx';


const App = () => {
  const { authReducer: isAuth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  async function logoutHandler() {
    console.log('logged out!');
    dispatch(isAuthenticated(false));
    return history.push('/login');
  }

  return (
    <div>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/signup" >Signup</Link>
        <Link to="/protected" >Protected</Link>
        <button onClick={logoutHandler} id="logout" >Logout</button>
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