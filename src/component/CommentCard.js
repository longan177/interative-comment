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
    if (!layerTwo) {
      const index = commentdetail.comments.findIndex(
        (comment) => comment.id === id
      );
      const content = commentdetail.comments[index].content;

      setInput(content);
    } else {
      const index = commentdetail.comments.findIndex((comment) => {
        return comment.replies.some((reply) => reply.id === id);
      });
      const replyindex = commentdetail.comments[index].replies.findIndex(
        (reply) => reply.id === id
      );
      const replycontent =
        commentdetail.comments[index].replies[replyindex].content;

      setInput(replycontent);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!layerTwo) {
      const editIndex = commentdetail.comments.findIndex(
        (comment) => comment.id === id
      );
      const modifiedcomment = commentdetail.comments.map((comment, index) => {
        if (index === editIndex) {
          return { ...comment, content: input };
        }
        return comment;
      });
      commentdetail.setcomments(modifiedcomment);
    } else {
      const editIndex = commentdetail.comments.findIndex((comment) => {
        return comment.replies.some((reply) => reply.id === id);
      }); //firstlayer
      const replyindex = commentdetail.comments[editIndex].replies.findIndex(
        (reply) => reply.id === id
      ); //2ndlayer
      const replycontent =
        commentdetail.comments[editIndex].replies[replyindex].content;
      const modifiedcomment = commentdetail.comments.map((comment, index) => {
        if (index === editIndex) {
          const clonereply = [...comment.replies];
          const deeperclonereply = clonereply.map((reply) => {
            if (reply.id === id) {
              return { ...reply, content: input };
            }
            return reply;
          });
          return { ...comment, replies: deeperclonereply };
        }
        return comment;
      });
      commentdetail.setcomments(modifiedcomment);
    }

    setisEditing(!isEditing);
  }

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
          <form onSubmit={(e) => handleSubmit(e)}>
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
            <aside
              className={`btn-update ${isEditing ? "btn-update-show" : ""}`}
            >
              <button>UPDATE</button>
            </aside>
          </form>
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
