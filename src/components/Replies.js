import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Replies = () => {
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const addReply = () => {
    fetch("http://localhost:4000/api/create/reply", {
      method: "POST",
      body: JSON.stringify({
        id,
        userId: localStorage.getItem("_id"),
        reply,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchReplies = () => {
      fetch("http://localhost:4000/api/post/replies", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReplyList(data.replies);
          setTitle(data.title);
        })
        .catch((err) => console.error(err));
    };
    fetchReplies();
  }, [id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    setReply("");
  };

  return (
    <main className="replies">
      <form onSubmit={handleSubmitReply}>
        <label htmlFor="reply">share reply</label>
        <textarea
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          name="reply"
        />

        <button>send</button>
      </form>

      <div className="post__container">
        {replyList.map((reply) => (
          <div className="post__item">
            <p>{reply.text}</p>
            <div className="react__container">
              <p style={{ opacity: "0.5" }}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
