import React, { useState, useEffect } from 'react'

const UserForm = ({user, setUser, loginService}) => {
  
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)

      setUsername('')
      setPassword('')

    } catch (exception) { }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(undefined)
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameFieldChange = event => setUsername(event.target.value)
  const handlePasswordFieldChange = event => setPassword(event.target.value)

  useEffect(() => {
    const initalUser = JSON.parse(window.localStorage.getItem('user'))
    if (initalUser) {
      setUser(initalUser)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div>{user.name} logged in <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )
  }
}

export default UserForm
