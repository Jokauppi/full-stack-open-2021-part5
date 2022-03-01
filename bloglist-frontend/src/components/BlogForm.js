import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, FloatingLabel, Stack } from "react-bootstrap";

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
      <Form onSubmit={addBlog}>
        <Stack gap={2}>
          <Form.Group>
            <FloatingLabel label="Title">
              <Form.Control
                id="title-field"
                type="text"
                name="Title"
                onChange={handleTitleFieldChange}
                value={title}
                placeholder="title"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Author">
              <Form.Control
                id="author-field"
                type="text"
                name="Author"
                onChange={handleAuthorFieldChange}
                value={author}
                placeholder="author"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group> 
            <FloatingLabel label="Url">
              <Form.Control
                id="url-field"
                type="text"
                name="Url"
                onChange={handleUrlFieldChange}
                value={url}
                placeholder="url"
              />
            </FloatingLabel>
          </Form.Group>
          <Button id="create-button" type="submit">Create</Button>
        </Stack>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
