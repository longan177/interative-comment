import React, { useState, useEffect } from "react";
import CommentCard from "./component/CommentCard";
import ReplyCard from "./component/ReplyCard";

function MainComponent() {
  const [comments, setcomments] = useState([]);
  const [currentUser, setcurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [idAmount, setidAmount] = useState(0);
  const [replies, setreplies] = useState([]);
  const [showAPI, setshowAPI] = useState(false);

  const url =
    "https://my-json-server.typicode.com/longan177/mockjson-comment-interative/db";
  const urltest = "./data.txt";

  const [toReply, settoReply] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setcomments(data.comments);
      setcurrentUser(data.currentUser);
    };
    fetchData();
  }, []);

  // for api reference
  const jsondata = JSON.stringify(comments, null, 4);

  // for api reference

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
                idNum={idAmount}
                comments={comments}
                commentdetail={{
                  currentUser,
                  setcomments,
                  comments,
                }}
              />

              {replies.length > 0 && (
                <ul>
                  {replies.map((reply) => {
                    const layerTwo = true;
                    return (
                      <React.Fragment>
                        <CommentCard
                          key={reply.id}
                          detail={reply}
                          layerTwo={layerTwo}
                          currentUser={currentUser}
                          handleDelete={handleDelete}
                          idNum={idAmount}
                          commentdetail={{
                            currentUser,
                            setcomments,
                            comments,
                          }}
                        />
                      </React.Fragment>
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
      <button onClick={() => setshowAPI(!showAPI)} className="btn-showAPI">
        Show JSON data
      </button>
      <fieldset className={`${showAPI ? "showAPI" : ""}`}>
        <legend style={{ textAlign: "center" }}>
          <h1>API</h1>
        </legend>
        <pre className="rock">
          <code>{jsondata}</code>
        </pre>
      </fieldset>
    </div>
  );
}

export default MainComponent;
