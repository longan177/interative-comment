import React, { useState, useEffect } from "react";
import CommentCard from "./component/CommentCard";
import ReplyCard from "./component/ReplyCard";

function MainComponent() {
  const [comments, setcomments] = useState([]);
  const [currentUser, setcurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/longan177/mockjson-comment-interative/db"
      );
      const data = await response.json();
      setcomments(data.comments);
      setcurrentUser(data.currentUser);
      console.log(data);
      console.log(comments);
    };
    fetchData();
  }, []);

  return (
    <div className="comment-container">
      <ul>
        {comments.map((comment) => {
          const { id, replies } = comment;
          return (
            <li>
              <CommentCard key={id} {...comment} />
              {replies.length > 0 && (
                <ul>
                  {replies.map((reply) => {
                    return <CommentCard />;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MainComponent;
