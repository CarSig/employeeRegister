import React, { useState, useEffect } from "react";

import Login from "./Login";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const addNewUser = () => {
    window.location.href = "/register";
  };

  return (
    <div>
      {/*TODO: remove ! when authorization complete*/}
      {!localStorage.getItem("username") ? (
        <div>
          <h3 variant="h3" color="textSecondary">
            Dashboard
          </h3>

          <div className="buttons">
            <button onClick={addNewUser}>Add New User</button>
          </div>

          <UserList></UserList>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
};

export default Dashboard;
