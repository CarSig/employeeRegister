import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsPeopleFill } from "react-icons/bs";

const Header = () => {
  const [signed, setSigned] = useState(localStorage.getItem("username"));

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const gotoDash = () => {
    window.location.href = "/dashboard";
  };
  return (
    <div className="header">
      <nav className="navbar bg-dark">
        <div>
          <a href="/dashboard">
            <BsPeopleFill style={{ fontSize: "2rem", marginRight: "0.3rem" }} />
            Employee registry App
          </a>

          <small color="textSecondary">hello {signed}</small>
        </div>

        {
          //checks if signed with help of local storage, if values are not there redirects
        }
        {signed && (
          <ul>
            <li>
              {" "}
              <a onClick={gotoDash}>Go to Dashboard</a>
            </li>
            <li>
              {" "}
              <a color="default" onClick={signOut}>
                Sign out
              </a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
