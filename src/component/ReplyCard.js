import React, { useState } from "react";

function ReplyCard(props) {
  const { layerTwo } = props;
  const {
    comment,
    setcomments,
    currentUser,
    idAmount,
    toReply,
    commentdetail,
    username,
    comments,
    idNum,
    currentId,
    settoReply,
  } = props;
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }

    switch (toReply) {
      case false:
        setInput("");
        addReply();
        break;
      default:
        setInput("");
        addComment();
    }
  };

  function addReply() {
    const newReply = {
      user: currentUser,
      id: idNum + 1,
      content: `@${username} ${input}`,
      createdAt: "1 min ago",
      score: 0,
      replyingTo: username,
    };

    const modifiedcomment = commentdetail.comments.map((comment) => {
      if (comment.id === currentId) {
        const clonereply = [...comment.replies];

        clonereply.push(newReply);
        return { ...comment, replies: clonereply };
      } else {
        return comment;
      }
    });

    function replyToReply() {
      const findID = commentdetail.comments.findIndex((comment) => {
        return comment.replies.some((reply) => reply.id === currentId);
      });
      const modifiedcommentlayer2 = [...commentdetail.comments];
      modifiedcommentlayer2[findID].replies.push(newReply);
      commentdetail.setcomments(modifiedcommentlayer2);
      settoReply(true);
    }

    if (!layerTwo) {
      commentdetail.setcomments(modifiedcomment);
    } else {
      replyToReply();
    }
  }

  function addComment() {
    const newComment = {
      id: idAmount + 1,
      content: input,
      user: currentUser,
      createdAt: "1 min ago",
      score: 0,
      replies: [],
    };
    const commentClone = [...comment];

    commentClone.push(newComment);
    setcomments(commentClone);
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`comment-card-wrapper ${
        !toReply && "comment-card-wrapper-forReply"
      }  ${layerTwo && "wrapper-layerTwo"} ${toReply && "hidden"}`}
    >
      <div className={`reply-card ${layerTwo && "layerTwo"} `}>
        <div className="textarea-wrapper">
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows="4"
            cols="50"
            placeholder="Add a comment.."
            required
          ></textarea>
        </div>
        <img className="avatar" src="/images/avatars/image-weiloong.png"></img>
        <button className="btn-send d-flex">SEND</button>
      </div>
    </form>
  );
}

export default ReplyCard;
