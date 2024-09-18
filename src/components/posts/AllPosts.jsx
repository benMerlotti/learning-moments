import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import "./AllPosts.css";
import { AllPostsFilters } from "./AllPostsFilters";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

export const AllPosts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicSelect, setTopicSelect] = useState("");

  // fetch all the posts once on component mount
  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
      setFilteredPosts(postArray);
    });
  }, []);

  // filter posts based on the search term
  useEffect(() => {
    const foundPosts = posts.filter((post) => {
      const matchesSearchTerm = post.body
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTopic =
        topicSelect === "" || post.topic.name === topicSelect;
      return matchesSearchTerm && matchesTopic; // Must match both conditions
    });
    setFilteredPosts(foundPosts);
  }, [topicSelect, searchTerm, posts]);

  return (
    <div>
      <div className="posts-container">
        <h1>All Posts</h1>
        <AllPostsFilters
          setSearchTerm={setSearchTerm}
          setTopicSelect={setTopicSelect}
          posts={posts}
        />
        <div className="posts">
          {filteredPosts.map((postObject) => {
            return <Post post={postObject} key={postObject.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
