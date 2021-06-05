import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import GoogleAuth from './GoogleAuth.jsx';
import axios from 'axios';


const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  const [posts, setPosts] = useState([]);

  // componentDidMount
  useEffect(() => {
    axios.get('/posts', {
      withCredentials: true
    })
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err))
  }, [])

  // styling
  const styleOptions = {
    fontSize: '24px'
  }

  const data = posts.map(({ email, title }) => {
    return <div><br /><div>Username: {email}</div><div>Title: {title}</div></div>
  });

  return (
    <Route {...rest} render={(props) => {
      if (isAuth) {
        return (
          <div >
            <Component />
            <br />
            <div className="posts" style={styleOptions}>{data}</div>
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
