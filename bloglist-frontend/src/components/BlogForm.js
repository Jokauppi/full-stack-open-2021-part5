import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleFieldChange = (event) => setTitle(event.target.value);
  const handleAuthorFieldChange = (event) => setAuthor(event.target.value);
  const handleUrlFieldChange = (event) => setUrl(event.target.value);

  const addBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title{" "}
          <input
            id="title-field"
            type="text"
            name="Title"
            onChange={handleTitleFieldChange}
            value={title}
          />
        </div>
        <div>
          author{" "}
          <input
            id="author-field"
            type="text"
            name="Author"
            onChange={handleAuthorFieldChange}
            value={author}
          />
        </div>
        <div>
          url{" "}
          <input
            id="url-field"
            type="text"
            name="Url"
            onChange={handleUrlFieldChange}
            value={url}
          />
        </div>
        <div>
          <button id="create-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
