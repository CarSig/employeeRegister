import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("api/users")
      .then(async (response) => {
        const data = await response.data;

        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Employee list</h1>

      <p className="lead">Employee list</p>
      <div className="profiles">
        <ul>
          {users.map((employee) => {
            return (
              <li className="profile bg-light" key={employee._id}>
                <img
                  className="round-img"
                  src={`https://randomuser.me/api/portraits/${employee.gender === "male" ? "men" : "women"}/${employee.imgNumber}.jpg`}
                />
                <div className="my-1">
                  {" "}
                  <p className="text-primary lead">{employee.username}</p>
                  <p>
                    {employee.firstname} {employee.lastName}
                  </p>
                  <p color="textSecondary">{employee.email}</p>
                  <p color="textSecondary">{employee.role}</p>
                  <a href={`users/${employee._id}`} className="btn btn-primary">
                    View Profile
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default UserList;
