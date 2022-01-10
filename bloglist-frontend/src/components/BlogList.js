import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, likeBlog, deleteBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => a.likes <= b.likes ? 1 : -1)
        .map(blog => <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog} />)}
    </div>
  )
}

export default BlogList
