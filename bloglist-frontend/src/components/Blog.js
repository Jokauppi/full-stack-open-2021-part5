import React, { useState } from 'react'
const Blog = ({blog}) => {
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
          <hr/>
          <div style={
            {
              display: 'flex',
              flexDirection: 'column',
              rowGap: 5
            }
          }>
            <div>{blog.url}</div>
            <div>{blog.likes} <button>like</button></div>
            <div>{blog.user.name}</div>
          </div>
        </div>
      }
    </div>  
)}

export default Blog