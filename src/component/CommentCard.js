import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard({ content, createdAt, score, user }) {
  console.log(content);
  return (
    <div className="comment-card-wrapper">
      <div className="comment-card ">
        <article>
          <header>
            <img
              className="avatar"
              src="/images/avatars/image-amyrobson.png"
            ></img>
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
