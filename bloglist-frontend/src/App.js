import React, { useState, useEffect, useRef } from 'react'
import UserForm from './components/UserForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(undefined)

  const [successNotification, setSuccessNotification] = useState(null)
  const [failNotification, setFailNotification] = useState(null)

  const notify = {
    success: setSuccessNotification,
    failure: setFailNotification
  }

  useEffect(() => {
    const initializeBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    initializeBlogs()
  }, []
  )

  const blogFormRef = useRef()

  const createBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog, user)

      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      notify.success(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify.failure(`Blog creation failed`)
    }
  }

  const likeBlog = async blog => {
    
    const blogId = blog.id
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const likedBlog = await blogService.like(blogId, newBlog)
      
      setBlogs(blogs.map(b => (b.id === likedBlog.id ? likedBlog : b)))
    } catch (exception) {
      notify.failure(`Blog like failed`)
    }


  }

  return (
    <div>
      {user ? <h1>blogs</h1> : <h2>log in to application</h2>}
      <Notification message={successNotification} setNotification={setSuccessNotification} color={{ main: 'green', back: '#ccffcc' }} />
      <Notification message={failNotification} setNotification={setFailNotification} color={{ main: 'firebrick', back: '#ffcccc' }} />
      <UserForm user={user} setUser={setUser} loginService={loginService} notify={notify} />
      <br />
      {user &&
        <Togglable showLabel="Add a new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      }
      <br />
      {user && <BlogList blogs={blogs} likeBlog={likeBlog} />}
    </div>
  )
}

export default App