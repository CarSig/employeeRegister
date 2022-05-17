import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "" });

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
      alert("Login Succesful");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid username or password");
    }
    ///
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div className="form-input">
          <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange("username")} />
        </div>

        <div className="form-input">
          <input type="text" name="password" placeholder="password" value={values.password} onChange={handleChange("password")} />
        </div>
        <button>Submit</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
