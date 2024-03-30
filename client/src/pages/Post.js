import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
          setNewComment("");
          alert(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id={postObject.id}>
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.content}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            value={newComment}
            placeholder="Comment..."
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
              </div>
            );
          })}
        </div>
      </div>
      ;
    </div>
  );
}

export default Post;
