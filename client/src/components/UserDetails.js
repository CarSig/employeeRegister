import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import UpdateUser from "./UpdateUser";
import Comment from "./Comment";

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    lastName: "",
    firstName: "",
    address: "",
    role: "",
    password: "",
    comments: "",
  });
  const [comment, setComment] = useState({
    author: localStorage.getItem("username"),
    targetID: "",
    text: "",
  });
  const [posts, setPosts] = useState([]);

  const [updateReady, setUpdateReady] = useState(false);

  const params = useParams();

  const getID = params.id || user._id;

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const deleteUser = () => {
    axios.delete(`/api/users/${getID}`).then((res) => console.log("Deleted Sucessfully"));
    navigate("/");
  };
  const updateUserFunc = (e) => {
    e.preventDefault();

    axios.put(`/api/users/${getID}`, { user }).then((res) => console.log("updated sucessfully"));
  };

  const handleChange = (input) => (e) => {
    setUser({ ...user, [input]: e.target.value });
    console.log(user);
  };

  const handleCommentChange = () => (e) => {
    setComment({ author: localStorage.getItem("username"), targetID: user._id, text: e.target.value });
    console.log(comment);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const payload = {
      author: comment.author,
      targetID: comment.targetID,
      text: comment.text,
    };
    axios({
      url: "/api/comment",
      method: "POST",
      data: payload,
    }).catch((error) => {
      console.log(error);
    });
    window.location.reload();
  };

  const getUser = () => {
    axios
      .get(`/api/users/${params.id}`)
      .then(async (response) => {
        const data = await response.data;

        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  };

  const getPosts = async () => {
    const posts = await axios
      .get("/api/comments")
      .then((response) => {
        const data = response.data;
        setPosts(data);
        console.log(data);
      })
      .catch(() => {
        alert("Error retrieving data!");
      });
    return posts;
  };

  const toggleReady = () => {
    setUpdateReady(!updateReady);
  };

  return (
    <section className="container ">
      <h1 className="large text-primary ">{user.username}</h1>

      <div className="profile-grid my-4">
        <div className="profile-top bg-primary p-2">
          <img className="round-img" src={`https://randomuser.me/api/portraits/${user.gender === "male" ? "men" : "women"}/${user.imgNumber}.jpg`} alt="" />
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "30px" }}>
              <p color="textSecondary">Username</p>
              <p color="textSecondary">Email</p>
              <p color="textSecondary">First and Last Name</p>

              <p color="textSecondary">Address</p>
              <p color="textSecondary">Role</p>
            </div>
            <div>
              <p color="textPrimary">{user.username}</p>
              <p color="textPrimary">{user.email}</p>
              <p color="textPrimary">
                {user.firstName} {user.lastName}
              </p>

              <p color="textPrimary">{user.address}</p>
              <p color="textPrimary">{user.role}</p>
            </div>
          </div>
        </div>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{user.firstName}'s Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis distinctio magnam reprehenderit pariatur optio culpa libero odio at odit tempore!
          </p>
          <div className="line"></div>
        </div>
      </div>

      <button className="btn btn-primary " onClick={toggleReady}>
        {updateReady ? "Cancel" : "Update User"}
      </button>

      {updateReady && (
        <UpdateUser user={user} setUser={setUser} handleChange={handleChange} params={params} getID={getID} updateUserFunc={updateUserFunc}></UpdateUser>
      )}

      <button onClick={deleteUser} className="btn btn-danger m-2">
        {" "}
        Delete User{" "}
      </button>

      {localStorage.getItem("username") === user.username ? null : (
        <div>
          {" "}
          <div className="form bg-light my-2 p-1">
            <form>
              <div className="form-group"></div>

              <p color="textSecondary">Add comment</p>

              <textarea className="py-2" onChange={handleCommentChange()} placeholder={"your comment..."}></textarea>

              <div />
              <button className="btn btn-dark" onClick={submitComment}>
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <section className="container">
          <h4 className="text-primary lead"> Comments</h4>

          {posts
            .filter((post) => {
              const filteredPost = post.targetID === user._id;
              return filteredPost;
            })
            .reverse()
            .map((post) => {
              return <Comment key={post._id} author={post.author} date={post.date} text={post.text} _id={post._id} />;
            })}
        </section>
      </div>
    </section>
  );
};

export default UserDetails;
