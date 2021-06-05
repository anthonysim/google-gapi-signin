import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import GoogleAuth from './GoogleAuth.jsx';
import { isAuthenticated } from '../actions/index.jsx';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  const dispatch = useDispatch();

  // componentDidMount
  useEffect(() => {
    axios.get('http://localhost:4000/protected', {
      withCredentials: true
    })
      .then(res => console.log(res))
      .catch(err => {
        dispatch(isAuthenticated(false))
        console.error(err)
      })
    // eslint-disable-next-line
  }, [])


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
