export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts?_expand=topic").then((res) =>
    res.json()
  );
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?&_expand=user&_expand=topic`
  ).then((res) => res.json());
};

export const getAllTopics = () => {
  return fetch("http://localhost:8088/topics").then((res) => res.json());
};

export const deletePost = (post) => {
  return fetch(`http://localhost:8088/posts/${post}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
