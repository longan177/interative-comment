import React, { useState, useEffect } from "react";
import CommentCard from "./component/CommentCard";
import ReplyCard from "./component/ReplyCard";

function MainComponent() {
  const [comments, setcomments] = useState([]);
  const [currentUser, setcurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [idAmount, setidAmount] = useState(0);
  const [replies, setreplies] = useState([]);
  const url =
    "https://my-json-server.typicode.com/longan177/mockjson-comment-interative/db";
  const urltest = "./data.txt";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setcomments(data.comments);
      setcurrentUser(data.currentUser);
    };
    fetchData();
  }, []);

  function handleDelete(id, type = "comment") {
    console.log(type);
    if (type === "reply") {
      setcomments(
        comments.map((comment) => {
          if (comment.replies.length === 0) {
            return comment;
          }
          const clonereply = [...comment.replies];
          const modifiedclonereply = clonereply.filter((reply) => {
            return reply.id !== id;
          });
          const modifiedcomment = { ...comment, replies: modifiedclonereply };

          return modifiedcomment;
        })
      );
    } else {
      setcomments(comments.filter((comment) => comment.id !== id));
    }
  }

  useEffect(() => {
    getId();
    const replies = [];
    comments.forEach((comment) => {
      const clone = comment.replies;
      replies.push(clone);
    });
    setreplies(replies);
  }, [comments]);
  function getId() {
    let totalComment = comments.length;
    let totalReply = 0;
    comments.forEach((comment) => (totalReply += comment.replies.length));
    const idNum = totalComment + totalReply;

    setidAmount(idNum);
  }
  return (
    <div className="comment-container">
      <ul>
        {comments.map((comment) => {
          const { id, replies } = comment;
          const layerTwo = false;
          return (
            <li key={id}>
              <CommentCard
                detail={comment}
                layerTwo={layerTwo}
                currentUser={currentUser}
                handleDelete={handleDelete}
                id={id}
              />
              {replies.length > 0 && (
                <ul>
                  {replies.map((reply) => {
                    const layerTwo = true;
                    return (
                      <CommentCard
                        key={reply.id}
                        detail={reply}
                        layerTwo={layerTwo}
                        currentUser={currentUser}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <ReplyCard
        currentUser={currentUser}
        setcomments={setcomments}
        comment={comments}
        idAmount={idAmount}
      />
    </div>
  );
}

export default MainComponent;
