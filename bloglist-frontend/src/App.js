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
      newBlog.user = user

      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      notify.success(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify.failure(`Blog creation failed`)
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
          <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} blogService={blogService} createBlog={createBlog} notify={notify} />
        </Togglable>
      }
      <br />
      {user && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App