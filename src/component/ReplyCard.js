import React, { useState } from "react";

function ReplyCard(props) {
  const { layerTwo } = props;

  return (
    <div className={`comment-card-wrapper ${layerTwo && "wrapper-layerTwo"}`}>
      <div className={`reply-card ${layerTwo && "layerTwo"} `}>
        <div className="textarea-wrapper">
          <textarea rows="4" cols="50" placeholder="Add a comment.."></textarea>
        </div>
        <img className="avatar" src="/images/avatars/image-amyrobson.png"></img>
        <button className="btn-send d-flex">SEND</button>
      </div>
    </div>
  );
}

export default ReplyCard;
