import React from "react";

function ReplyCard() {
  return (
    <div className="reply-card">
      <div className="textarea-wrapper">
        <textarea rows="4" cols="50" placeholder="Add a comment.."></textarea>
      </div>

      <img className="avatar" src="/images/avatars/image-amyrobson.png"></img>
      <button className="btn-send d-flex">SEND</button>
    </div>
  );
}

export default ReplyCard;
