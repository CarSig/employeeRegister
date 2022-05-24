import React from "react";

const UpdateUser = ({ user, handleChange, updateUserFunc }) => {
  return (
    <div>
      <form className="form" onSubmit={updateUserFunc}>
        <div className="form-group">
          <input type="text" name="username" placeholder="username" value={user.username} onChange={handleChange("username")} />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="email" value={user.email} onChange={handleChange("email")} />
        </div>
        <div className="form-group">
          <input type="text" name="firstName" placeholder="firstName" value={user.firstName} onChange={handleChange("firstName")} />
        </div>
        <div className="form-group">
          <input type="text" name="lastName" placeholder="lastName" value={user.lastName} onChange={handleChange("lastName")} />
        </div>
        <div className="form-group">
          <input type="text" name="address" placeholder="address" value={user.address} onChange={handleChange("address")} />
        </div>{" "}
        <div className="form-group">
          <input type="text" name="role" placeholder="role" value={user.role} onChange={handleChange("role")} />
          <br />
          <input type="password" name="password" placeholder="password" value={user.password} onChange={handleChange("password")} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default UpdateUser;
