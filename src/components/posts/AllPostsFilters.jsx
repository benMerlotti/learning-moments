export const AllPostsFilters = ({ setSearchTerm, setTopicSelect, posts }) => {
  return (
    <>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Posts"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <form>
        <select
          onChange={(event) => {
            setTopicSelect(event.target.value);
          }}
          name="topics"
          id="topics"
        >
          {posts.map((post) => {
            return (
              <option
                value={post.topic.name}
                key={`topic-${post.topicId}-post${post.id}`}
              >
                {post.topic.name}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};
