import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => a.likes <= b.likes ? 1 : -1)
        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
    </div>
  )
}

export default BlogList
