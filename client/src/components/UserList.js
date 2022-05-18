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
    <div>
      <h4 variant="h4" color="textSecondary">
        Employee list
      </h4>
      <p>click on employee field to go on personal details page</p>
      <ul>
        {users.map((employee) => {
          return (
            <li key={employee._id}>
              <a href={`users/${employee._id}`}>
                <div>
                  {" "}
                  <p>{employee.username}</p>
                </div>

                <p>
                  {employee.firstname} {employee.lastName}
                </p>
                <p color="textSecondary">{employee.email}</p>
                <p color="textSecondary">{employee.role}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
