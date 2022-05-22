import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Comment from "./components/Comment";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";

import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
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

      <Landing />
    </div>
  );
}

export default App;
