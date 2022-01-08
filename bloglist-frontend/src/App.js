import React, { useState, useEffect } from 'react'
import UserForm from './components/UserForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(undefined)

  useEffect( () => {
      const initializeBlogs = async () => {
        const initialBlogs = await blogService.getAll()
        setBlogs( initialBlogs )
      }
      initializeBlogs()
    }, []
  )

  return (
    <div>
      {user && <h1>blogs</h1>}
      <UserForm user={user} setUser={setUser} loginService={loginService} />
      <br/>
      {user && <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} blogService={blogService} />}
      <br/>
      {user && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App