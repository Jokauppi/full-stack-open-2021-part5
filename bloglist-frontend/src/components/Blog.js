import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [contentVisible, setContentVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 'fit-content',
    minWidth: '20em',
    borderRadius: 5
  }

  const toggleVisibility = () => {
    setContentVisible(!contentVisible)
  }

  const handleLike = async () => {
    await likeBlog(blog)
  }

  const handleRemove = async () => {
    await deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={
        {
          display: 'flex',
          justifyContent: 'space-between',
          columnGap: 10
        }
      }>
        {blog.title} | {blog.author} <button>{contentVisible ? 'Hide' : 'Show'}</button>
      </div>
      {contentVisible &&
        <div>
          <hr />
          <div style={
            {
              display: 'flex',
              flexDirection: 'column',
              rowGap: 5
            }
          }>
            <div>{blog.url}</div>
            <div>{blog.likes} <button onClick={handleLike}>like</button></div>
            <div>{blog.user.name}</div>
            {blog.user.username === user.username &&
              <button onClick={handleRemove} style={{ width: '5em' }}>remove</button>
            }
          </div>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog