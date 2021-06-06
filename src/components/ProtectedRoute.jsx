import React from "react";
import { Route, Redirect } from "react-router-dom";
import GoogleAuth from './GoogleAuth.jsx';



const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if (isAuth) {
        return (
          <div >
            <Component />
            <br />
            <br />
            <br />
            <GoogleAuth />
          </div>
        )
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }} />
  )
}

export default ProtectedRoute;
