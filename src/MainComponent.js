import React, { useState, useEffect } from "react";
import CommentCard from "./component/CommentCard";
import ReplyCard from "./component/ReplyCard";

function MainComponent() {
  return (
    <div className="comment-container">
      <ul>
        <li>
          <ReplyCard />
        </li>
        <li>
          <CommentCard />
        </li>
        <li>
          <CommentCard />
        </li>
      </ul>
    </div>
  );
}

export default MainComponent;
