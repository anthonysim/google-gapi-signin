import React, { useEffect } from "react";
import { isAuthenticated } from '../actions/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";


const GoogleAuth = () => {
  const { authReducer: isAuth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: 'put in your google client id',
        scope: 'email'
      })
    });
    // eslint-disable-next-line
  }, [])


  async function googleHandler() {
    try {
      const auth = window.gapi.auth2.getAuthInstance();

      if (auth.isSignedIn.get() === false) {
        await auth.signIn();
        await dispatch(isAuthenticated(true));
        return history.push('/protected');
      } else {
        await auth.signOut();
        await dispatch(isAuthenticated(false));
        return history.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="button">
      <button onClick={googleHandler} className="googleSignIn">
        <FcGoogle
          style={{ fontSize: '30px', backgroundColor: 'white', verticalAlign: 'middle' }}
        />
        &nbsp;&nbsp;{isAuth ? 'Sign out' : 'Sign in'}  with Google
      </button>
    </div>
  )
}


export default GoogleAuth;