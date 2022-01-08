import React, { useState, useEffect } from 'react'
import UserForm from './components/UserForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

  return (
    <div>
      {user ? <h1>blogs</h1> : <h2>log in to application</h2>}
      <Notification message={successNotification} setNotification={setSuccessNotification} color={{ main: 'green', back: '#ccffcc' }} />
      <Notification message={failNotification} setNotification={setFailNotification} color={{ main: 'firebrick', back: '#ffcccc' }} />
      <UserForm user={user} setUser={setUser} loginService={loginService} notify={notify} />
      <br />
      {user && <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} blogService={blogService} notify={notify} />}
      <br />
      {user && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App