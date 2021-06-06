import React from "react";
import Login from './Login.jsx';
import PageNotFound from './PageNotFound.jsx';
import Protected from './Protected.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const App = () => {
  const { authReducer: isAuth } = useSelector(state => state);

  return (
    <div>
      <div className="links">
      </div>
      <Switch>
        <Redirect exact from="/" to="login" />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/protected" component={Protected} isAuth={isAuth} />
        <Route component={PageNotFound} />
      </Switch>
    </div >
  )
};

export default App;