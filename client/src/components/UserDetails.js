import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import UpdateUser from "./UpdateUser";

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
  const [edit, setEdit] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  const params = useParams();

  const getID = params.id || user._id;

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const deleteUser = () => {
    axios.delete(`/api/users/${getID}`).then((res) => console.log("Deleted Sucessfully"));
    navigate("/dashboard");
  };
  const updateUserFunc = () => {
    axios.patch(`/api/users/${getID}`, { user }).then((res) => console.log("updated sucessfully"));
  };

  const handleChange = (input) => (e) => {
    setUser({ ...user, [input]: e.target.value });
    console.log(user);
  };

  const handleCommentChange = (input) => (e) => {
    setComment({ author: localStorage.getItem("username"), targetID: user._id, [input]: e.target.value });
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
    })
      .then(() => {
        alert("comment saved");
      })
      .catch((error) => {
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

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const convertedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return convertedDate;
  };

  return (
    <div>
      <h4>User Details</h4>

      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "30px" }}>
            <p color="textSecondary">Username</p>
            <p color="textSecondary">Email</p>
            <p color="textSecondary">First Name</p>
            <p color="textSecondary">Last Name</p>
            <p color="textSecondary">Address</p>
            <p color="textSecondary">Role</p>
          </div>
          <div>
            <p color="textPrimary">{user.username}</p>
            <p color="textPrimary">{user.email}</p>
            <p color="textPrimary">{user.firstName}</p>
            <p color="textPrimary">{user.lastName}</p>
            <p color="textPrimary">{user.address}</p>
            <p color="textPrimary">{user.role}</p>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <button variant="contained" color="primary" onClick={toggleReady}>
        {updateReady ? "Cancel" : "Update User"}
      </button>
      <br></br>
      <br></br>
      {updateReady && (
        <UpdateUser user={user} setUser={setUser} handleChange={handleChange} params={params} getID={getID} updateUserFunc={updateUserFunc}></UpdateUser>
      )}

      <button variant="contained" color="primary" onClick={deleteUser}>
        Delete User
      </button>
      <br></br>
      <br></br>
      <div>
        {" "}
        <form style={{ border: "solid 1px black", marginTop: "20px" }}>
          <p color="textSecondary">Add comment</p>

          <textarea> </textarea>

          <br />
          <br />

          <button onClick={submitComment}>Submit Comment</button>
        </form>
      </div>

      <div>
        <h6>Comments</h6>

        {posts
          .filter((post) => {
            const filteredPost = post.targetID === user._id;
            return filteredPost;
          })
          .reverse()
          .map((post) => {
            return (
              <div key={post._id}>
                <p>
                  submited by {post.author} at date {convertDate(+post.date)}{" "}
                </p>
                <p color="textPrimary">{post.text}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserDetails;
