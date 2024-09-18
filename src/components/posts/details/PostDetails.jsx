import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../../services/postService";

export const PostDetails = () => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    getPostByPostId(postId).then((data) => setCurrentPost(data));
  }, [postId]);

  return (
    <div className="details-container">
      <div className="details">
        <div className="title">{currentPost.title}</div>
      </div>
      <div className="details">
        <div className="author">{currentPost.user?.name}</div>
      </div>
      <div className="details">
        <div className="topic-date-like">{currentPost.topic?.name}</div>
        <div className="topic-date-like">{currentPost.date}</div>
        <div className="topic-date-like">likes</div>
      </div>
      <div className="details">
        <div className="details-body">{currentPost.body}</div>
      </div>
    </div>
  );
};
