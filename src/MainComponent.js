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
    };
    fetchData();
  }, []);

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
                      />
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <ReplyCard />
    </div>
  );
}

export default MainComponent;
