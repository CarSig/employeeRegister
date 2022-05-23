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

      {localStorage.getItem("username") ? (
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/comment" exact element={<Comment />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
