import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard(props) {
  const { content, createdAt, score, user } = props.detail;
  const { layerTwo, currentUser } = props;
  const {
    image: { png },
    username,
  } = user;

  const [currentScore, setcurrentScore] = useState(score);
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
            <button
              onClick={() => {
                if (currentScore - score !== 1) {
                  setcurrentScore(currentScore + 1);
                }
              }}
              className="btn-plus"
            >
              {plus}
            </button>
            <span>{currentScore}</span>
            <button
              onClick={() => {
                if (currentScore - score !== -1) {
                  setcurrentScore(currentScore - 1);
                }
              }}
            >
              {minus}
            </button>
          </div>

          <div className="btn-reposnse">
            {username === currentUser.username ? (
              <button className="delete d-flex">
                {deleteIcon}
                <span>Delete</span>
              </button>
            ) : (
              ""
            )}
            <button className="reply d-flex">
              {reply}
              <span>Reply</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CommentCard;
