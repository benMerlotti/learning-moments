import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  return (
    <div className="post-container" key={`post ${post.id}`}>
      <div className="post">
        <div className="post-title-topic-container">
          <Link to={`/details/${post.id}`} className="post-title">
            {post.title}
          </Link>
          <div className="post-topic">{post.topic.name}</div>
        </div>
        <div>
          <div className="post-body">{post.body}</div>
        </div>
      </div>
    </div>
  );
};
