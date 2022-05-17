import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Comment from "./components/Comment";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      {" "}
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />}>
            {" "}
          </Route>
          <Route path="/login" exact element={<Login />}>
            {" "}
          </Route>
          <Route path="/register" exact element={<Register />}>
            {" "}
          </Route>
          <Route path="/comment" exact element={<Comment />}>
            {" "}
          </Route>
          <Route path="/dashboard" exact element={<Dashboard />}>
            {" "}
          </Route>
          <Route path="/users/:id" element={<UserDetails />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
