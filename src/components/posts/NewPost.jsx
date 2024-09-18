import { useEffect, useState } from "react";
import "./NewPost.css";
import { getAllTopics } from "../../services/postService";
import { useNavigate } from "react-router-dom";

export const NewPost = ({ currentUser }) => {
  const [user, setUser] = useState("");
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const handleTopicChange = (event) => {
    const chosenTopic = event.target.value;
    const matchedTopicId = topics.find((topic) => {
      return topic.name === chosenTopic;
    });
    setTopic(matchedTopicId);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSaveNewPost = () => {
    const newPost = {
      userId: user.id,
      title,
      body,
      date: formatDate(new Date()),
      topicId: topic.id,
    };

    fetch(`http://localhost:8088/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then(() => {
      navigate("/myposts");
    });
  };

  return (
    <div className="new-post-container">
      <div className="new-post-header">
        <h1>NEW POST</h1>
      </div>
      <select className="new-post-topic-container" onChange={handleTopicChange}>
        <option value="0">Select a topic</option>
        {topics.map((topic) => {
          return (
            <option value={topic.name} key={topic.id}>
              {topic.name}
            </option>
          );
        })}
      </select>
      <div className="new-post-title-container">
        <input
          className="title-input"
          type="text"
          placeholder="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div className="new-post-body-container">
        <input
          className="body-input"
          type="text"
          placeholder="Body"
          onChange={handleBodyChange}
        />
      </div>
      <div className="new-post-button-container">
        <button onClick={handleSaveNewPost}>SAVE</button>
      </div>
    </div>
  );
};
