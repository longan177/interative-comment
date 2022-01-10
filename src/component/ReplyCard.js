import React, { useState } from "react";

function ReplyCard(props) {
  const { layerTwo } = props;
  const { comment, setcomments, currentUser } = props;
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput("");
    addComment();
  };

  function addComment() {
    const newComment = {
      user: currentUser,
      id: Math.random(),
      content: input,
      createdAt: "1 min ago",
      score: 0,
      replies: [],
    };
    const commentClone = [...comment];
    console.log(newComment);
    console.log(commentClone);
    commentClone.push(newComment);
    setcomments(commentClone);
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`comment-card-wrapper ${layerTwo && "wrapper-layerTwo"}`}
    >
      <div className={`reply-card ${layerTwo && "layerTwo"} `}>
        <div className="textarea-wrapper">
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows="4"
            cols="50"
            placeholder="Add a comment.."
          ></textarea>
        </div>
        <img className="avatar" src="/images/avatars/image-amyrobson.png"></img>
        <button className="btn-send d-flex">SEND</button>
      </div>
    </form>
  );
}

export default ReplyCard;
