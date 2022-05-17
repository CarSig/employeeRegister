import React, { useState } from "react";

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
      {" "}
      <h4>Employee register App</h4>
      {
        //checks if signed with help of local storage, if values are not there redirects
      }
      {signed && (
        <div className="buttonsHeader">
          <button onClick={gotoDash}>Go to Dashboard</button>
          <button color="default" disableElevation onClick={signOut}>
            Sign out
          </button>
          <p color="textSecondary">hello {signed}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
