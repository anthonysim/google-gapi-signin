import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, isAuthenticated } from '../actions/index.jsx';
import { useHistory } from "react-router-dom";


const Login = () => {
  const { authReducer: isAuth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, formState: { errors }, handleSubmit } = useForm();

  // redirect to protected page if state changes (from false to true)
  useEffect(() => {
    if (isAuth) {
      return history.push('/protected');
    }
    // eslint-disable-next-line
  }, [isAuth])

  // submitting login info handler
  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data)

    dispatch(fetchData('/local', data));
    e.target.reset();
  };

  // google strategy handler
  const googleHandler = (e) => {
    e.preventDefault();
    dispatch(isAuthenticated(true));
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
        <a
          href="/signup"
          onClick={googleHandler}
          className="googleSignIn"
        ><FcGoogle style={{ fontSize: '30px', backgroundColor: 'white', verticalAlign: 'middle' }} />
        &nbsp;Sign in with Google</a>
      </div>
    </div>
  )
};

export default Login;