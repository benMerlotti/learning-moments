import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/postService";
import "./AllPosts.css";
import { AllPostsFilters } from "./AllPostsFilters";

export const AllPosts = () => {
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
          {filteredPosts.map((post) => {
            return (
              <div className="post-container" key={`post ${post.id}`}>
                <div className="post">
                  <div className="post-title-topic-container">
                    <div className="post-title">{post.title}</div>
                    <div className="post-topic">{post.topic.name}</div>
                  </div>
                  <div>
                    <div className="post-body">{post.body}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
