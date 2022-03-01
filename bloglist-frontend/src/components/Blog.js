import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col, Stack } from "react-bootstrap";


const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [contentVisible, setContentVisible] = useState(false);

  const toggleVisibility = () => {
    setContentVisible(!contentVisible);
  };

  const handleLike = async () => {
    await likeBlog(blog);
  };

  const handleRemove = async () => {
    await deleteBlog(blog);
  };

  return (
    <tr className="blog">
      <Container >
        <Row className="align-items-center">
          <Col>
            {blog.title}
            {contentVisible && (
              <Stack gap={2}>
                <div className="url">{blog.url}</div>
                <div>{blog.user.name}</div>
                <Stack direction="horizontal" gap={2} className="likes">
                  {blog.likes}
                  <Button variant="success" onClick={handleLike}>Like</Button>
                </Stack>
                {blog.user.username === user.username && (
                  <Button variant="danger" onClick={handleRemove}>
                    Remove
                  </Button>
                )}
              </Stack>
            )}
          </Col>
          <Col>
            {blog.author}
          </Col>
          <Col md="auto">
            <Button variant="secondary" onClick={toggleVisibility}>{contentVisible ? "Hide" : "Show"}</Button>
          </Col>
        </Row>
      </Container>
    </tr>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
