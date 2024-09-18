import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../services/postService";
import "./MyPosts.css";
import { Link } from "react-router-dom";

export const MyPosts = ({ currentUser }) => {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
    });
  }, []);

  useEffect(() => {
    const matchedPosts = posts.filter((post) => {
      return post.userId === user.id;
    });
    setMyPosts(matchedPosts);
  }, [posts, user]);

  const handleDeletePost = (event) => {
    const postId = event.target.value;
    deletePost(postId).then(() => {
      getAllPosts().then((postArray) => {
        setPosts(postArray);
      });
    });
  };
  return (
    <div>
      <div className="posts-container">
        <h1>My Posts</h1>
        <div className="my-posts">
          {myPosts.map((post) => {
            return (
              <div key={post.id}>
                <Link to={`/details/${post.id}`}>
                  <div className="my-post-container">
                    <div>{post.title}</div>
                  </div>
                </Link>
                <button
                  className="delete-post-button"
                  value={post.id}
                  onClick={(event) => handleDeletePost(event)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
