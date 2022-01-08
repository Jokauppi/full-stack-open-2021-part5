import React, { useState, useEffect } from 'react'

const UserForm = ({user, setUser, loginService}) => {
  
  const handleLogin = async event => {
    event.preventDefault()

    try {

      const user = await loginService.login({ username, password })
      setUser(user)

      setUsername('')
      setPassword('')

    } catch (exception) { }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameFieldChange = event => setUsername(event.target.value)
  const handlePasswordFieldChange = event => setPassword(event.target.value)

  if (!user) {
    return (
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username <input type="text" name="Username" onChange={handleUsernameFieldChange} value={username} />
            </div>
            <div>
              password <input type="password" name="Password" onChange={handlePasswordFieldChange} value={password} />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in</div>
      </div>
    )
  }
}

export default UserForm
