import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Comments from "../utils/Comments";

const Home = () => {
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        fetch("http://localhost:4000/api/all/posts")
          .then((res) => res.json())
          .then((data) => setPostList(data.posts))
          .catch((err) => console.error(err));
      }
    };
    checkUser();
  }, [navigate]);

  const createPost = () => {
    fetch("http://localhost:4000/api/create/post", {
      method: "POST",
      body: JSON.stringify({
        post,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setPostList(data.posts);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setPost("");
  };
  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Post</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="post" className="homeLabel">
              Title / Description
            </label>
            <input
              type="text"
              name="post"
              required
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <button className="homeBtn">create post</button>
        </form>
        <div className="post__container">
          {postList.map((post) => (
            <div className="post__item" key={post.id}>
              <p>{post.title}</p>
              <div className="react__container">
                <Comments
                  numberOfComments={post.replies.length}
                  postId={post.id}
                  title={post.title}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
