import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Profile() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    username: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUserInfo({
        username: response.data.username,
      });
    });
    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username : {userInfo.username}</h1>
      </div>
      <div className="listOfPost">
        {posts.map((value, key) => {
          return (
            <div
              onClick={() => navigate("/post/" + value.id)}
              key={key}
              className="post"
            >
              <div className="title">{value.title}</div>
              <div className="body">{value.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
