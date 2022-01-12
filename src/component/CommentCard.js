import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";
import ReplyCard from "./ReplyCard";

function CommentCard(props) {
  const { content, createdAt, score, user, id } = props.detail;
  const {
    layerTwo,
    currentUser,
    handleDelete,
    commentdetail,
    idNum,
    comments,
  } = props;
  const [toReply, settoReply] = useState(true);
  const [isEditing, setisEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [setEditType, setSetEditType] = useState(null);
  const [input, setInput] = useState("");
  const {
    image: { png },
    username,
  } = user;

  function handleEdit() {
    setisEditing(!isEditing);
    console.log("comment detail", commentdetail);
    console.log("commentdetail.comment", commentdetail.comments);
  }

  // console.log(currentUser);
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
          {isEditing ? (
            <textarea
              className="textarea-edit"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows="4"
              cols="50"
              placeholder="Add a comment.."
              required
            ></textarea>
          ) : (
            <p>{content}</p>
          )}
          <aside className={`btn-update ${isEditing ? "btn-update-show" : ""}`}>
            <button>UPDATE</button>
          </aside>
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
              <button
                onClick={() =>
                  handleDelete(id, `${layerTwo ? "reply" : "comment"}`)
                }
                className="delete d-flex"
              >
                {deleteIcon}
                <span>Delete</span>
              </button>
            ) : (
              ""
            )}

            {currentUser.username === username ? (
              <button onClick={handleEdit} className="reply d-flex">
                {reply}
                <span>Edit</span>
              </button>
            ) : (
              <button
                onClick={() => settoReply(!toReply)}
                className="reply d-flex"
              >
                {reply}
                <span>Reply</span>
              </button>
            )}
          </div>
        </footer>
      </div>
      <ReplyCard
        commentdetail={commentdetail}
        toReply={toReply}
        username={username}
        idNum={idNum}
        comments={comments}
        currentUser={currentUser}
        currentId={id}
        layerTwo={layerTwo}
        settoReply={settoReply}
      />
    </div>
  );
}

export default CommentCard;
