import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard(props) {
  const { content, createdAt, score, user } = props.detail;
  const { layerTwo } = props;
  const {
    image: { png },
    username,
  } = user;

  return (
    <div className={`comment-card-wrapper ${layerTwo && "wrapper-layerTwo"}`}>
      <div className={`comment-card ${layerTwo && "layerTwo"} `}>
        <article>
          <header>
            <img className="avatar" src={png}></img>
            <a className="username" href="#">
              {username}
            </a>
            <span className="date-detail">{createdAt}</span>
          </header>
          <p>{content}</p>
        </article>
        <footer>
          <div className="vote-number d-flex">
            <button className="btn-plus">{plus}</button>
            <span>{score}</span>
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
