import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Employee Register</h1>
          <p className="lead">Create employee profile and comment </p>
          <div className="buttons">
            <a href="/register" className="btn btn-primary">
              Sign up
            </a>
            <a href="/login" className="btn ">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
