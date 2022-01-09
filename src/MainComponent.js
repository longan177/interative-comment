import React from "react";
import CommentCard from "./component/CommentCard";
import ReplyCard from "./component/ReplyCard";

function MainComponent() {
  return (
    <div className="comment-container">
      <CommentCard />
      <ReplyCard />
    </div>
  );
}

export default MainComponent;
