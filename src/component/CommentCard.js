import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard(props) {
  const { content, createdAt, score, user } = props.detail;
  const { layerTwo } = props;
  console.log(layerTwo);
  console.log(props.layerTwo);
  return (
    <div className={`comment-card-wrapper ${layerTwo && "wrapper-layerTwo"}`}>
      <div className="comment-card ">
        <article>
          <header>
            <img className="avatar" src={user.image.png}></img>
            <a href="#">ha</a>
            <span className="date-detail">1 month ago</span>
          </header>
          <p>{content}</p>
        </article>
        <footer>
          <div className="vote-number d-flex">
            <button>{plus}</button>
            <span>12</span>
            <button>{minus}</button>
          </div>
          <button className="reply d-flex">
            {reply}
            <span>Reply</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CommentCard;
