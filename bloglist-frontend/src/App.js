import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import UserForm from './components/UserForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <UserForm user={user} setUser={setUser} loginService={loginService} />
      <br></br>
      {user && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App