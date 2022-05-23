import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiLogIn } from "react-icons/fi";

import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleChange = (input) => (e) => {
    setValues({ ...values, [input]: e.target.value });
    console.log(values);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const payload = {
      username: values.username,

      password: values.password,
    };

    const response = await axios({
      url: "/api/login",
      method: "POST",
      data: payload,
    });

    const data = await response;
    console.log(data);

    // AUTHENTICATION 2
    if (data.data.user) {
      localStorage.setItem("token", data.data.user);
      localStorage.setItem("username", payload.username);
      console.log(data.data.user);

      setInvalidCredentials(false);
      window.location.href = "/";
    } else {
      setInvalidCredentials(true);
    }
    ///
  };

  return (
    <section className="container">
      {/*Alert*/}
      {invalidCredentials && <div className="alert alert-danger">Invalid Credentials</div>}

      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        {" "}
        <FiLogIn />
        Sign into your account
      </p>
      <form className="form" onSubmit={loginUser}>
        <div className="form-group">
          <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange("username")} />
        </div>

        <div className="form-group">
          <input type="password" name="password" placeholder="password" value={values.password} onChange={handleChange("password")} />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/register"> Register</Link>
      </p>
    </section>
  );
};

export default Login;
