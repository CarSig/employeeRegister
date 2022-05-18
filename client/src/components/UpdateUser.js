import React from "react";
import axios from "axios";

const UpdateUser = ({ user, setUser, handleChange, getID, params, updateUserFunc }) => {
  // update user receives error, there are two tires, once is in parent file passed as pro (updateUSer Function)

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: user.username,
      firstname: user.firstName,
      lastName: user.lastName,
      address: user.address,
      role: user.role,
      email: user.email,
      password: user.password,
    };

    axios({
      url: `/api/users/${getID}`,
      method: "patch",
      data: payload,
    })
      .then(() => {
        alert("Updated was succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input type="text" name="username" placeholder="username" value={user.username} onChange={handleChange("username")} />
        </div>
        <div className="form-input">
          <input type="email" name="email" placeholder="email" value={user.email} onChange={handleChange("email")} />
        </div>
        <div className="form-input">
          <input type="text" name="firstName" placeholder="firstName" value={user.firstName} onChange={handleChange("firstName")} />
        </div>
        <div className="form-input">
          <input type="text" name="lastName" placeholder="lastName" value={user.lastName} onChange={handleChange("lastName")} />
        </div>
        <div className="form-input">
          <input type="text" name="address" placeholder="address" value={user.address} onChange={handleChange("address")} />
        </div>{" "}
        <div className="form-input">
          <input type="text" name="role" placeholder="role" value={user.role} onChange={handleChange("role")} />
          <br />
          <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange("password")} />
        </div>
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default UpdateUser;
