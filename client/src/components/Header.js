import React, { useEffect, useState } from "react";

import { BsPeopleFill } from "react-icons/bs";

const Header = () => {
  const [signed, setSigned] = useState("");

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("username");
    setSigned(storedAuthToken);
    console.log(signed);
  }, [localStorage]);

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="header">
      <nav className="navbar bg-dark">
        <div>
          <a href="/">
            <BsPeopleFill style={{ fontSize: "2rem", marginRight: "0.3rem" }} />
            Employee register App
          </a>

          <small color="textSecondary">hello {signed}</small>
        </div>

        {
          //checks if signed with help of local storage, if values are not there redirects
        }
        {signed && (
          <ul>
            <li>
              <a href="/">Go to Dashboard</a>
            </li>
            <li>
              <a href="login" color="default" onClick={signOut}>
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
