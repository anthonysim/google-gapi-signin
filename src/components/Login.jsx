import React from "react";
import GoogleAuth from './GoogleAuth.jsx';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  // submitting login info handler
  const onSubmit = (data, e) => {
    e.preventDefault();

    axios.post('/login', data)
      .then(res => {
        console.log(res)
      })
    e.target.reset();
  };

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
          {errors.email && "Email is required"}
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
          {errors.password && "Password is required"}
        </div>

        <input type="submit" value="login" />
      </form>
      <GoogleAuth />
    </div>
  )
};

export default Login;