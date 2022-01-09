import React from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard() {
  return (
    <div className="comment-card">
      <header>
        <img className="avatar" src="/images/avatars/image-amyrobson.png"></img>
        <a href="#">amyrobson</a>
        <span className="date-detail">1 month ago</span>
      </header>
      <article>
        <p>
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible.You 've nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
        <footer>
          <div className="vote-number d-flex">
            <button>{plus}</button>
            <span>12</span>
            <button>{minus}</button>
          </div>
          <button className="reply d-flex">
            {reply}
            <span>Reply</span>
          </button>
        </footer>
      </article>
    </div>
  );
}

export default CommentCard;
