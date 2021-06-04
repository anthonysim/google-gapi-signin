import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, isAuthenticated } from '../actions/index.jsx';
import axios from 'axios';


const Login = () => {
  const { authReducer: isAuth } = useSelector(state => state);
  const dispatch = useDispatch();

  const { register, formState: { errors }, handleSubmit } = useForm();
  const history = useHistory();

  // redirect to protected page if state changes (from false to true)
  useEffect(() => {
    if (isAuth) {
      return history.push('/protected');
    }
  }, [isAuth])

  // submitting login info handler
  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data)

    let url = `http://localhost:3000/local`;
    dispatch(fetchData(url, data));
    e.target.reset();
  };

  // google strategy handler
  const googleHandler = () => {
    axios.get('http://localhost:3000/auth/google')
      .then(res => {
        if (res.status === 200) {
          dispatch(isAuthenticated(true))
        }
      })
    console.log('google signin!')
  }

  return (
    <div className="App">
      <h1>Log In!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="andersonsilva@gmail.com"
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && "Last name is required"}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          {errors.password && "Last name is required"}
        </div>

        <input type="submit" value="login" />
      </form>
      <div className="button">
        <button onClick={googleHandler} className="googleSignIn" style={{ fontWeight: 'bold' }}><FcGoogle style={{ fontSize: '30px', backgroundColor: 'white', verticalAlign: 'middle' }} />&nbsp;&nbsp;&nbsp;Sign in with Google</button>
      </div>
    </div>
  )
};

export default Login;