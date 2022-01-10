import React, { useEffect, useState } from "react";
import { deleteIcon, minus, plus, reply } from "./Icon";

function CommentCard() {
  const [comment, setcomment] = useState("");
  const [currentUser, setcurrentUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/longan177/mockjson-comment-interative/db"
      );
      const data = await response.json();
      setcomment(data.comments);
      setcurrentUser(data.currentUser);
      console.log(data);
      console.log(comment);
    };
    fetchData();
  }, []);

  return (
    <div className="comment-card-wrapper">
      <div className="comment-card layerTwo">
        <article>
          <header>
            {currentUser.username}
            <img
              className="avatar"
              src="/images/avatars/image-amyrobson.png"
            ></img>
            <a href="#">amyrobson</a>
            <span className="date-detail">1 month ago</span>
          </header>
          <p>
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible.You 've nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </article>
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
      </div>
    </div>
  );
}

export default CommentCard;
