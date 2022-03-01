import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";

const BlogList = ({ blogs, user, likeBlog, deleteBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes <= b.likes ? 1 : -1))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
