import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserForm = ({ user, setUser, loginService, notify }) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      notify.failure("Wrong username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(undefined);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameFieldChange = (event) => setUsername(event.target.value);
  const handlePasswordFieldChange = (event) => setPassword(event.target.value);

  useEffect(() => {
    const initalUser = JSON.parse(window.localStorage.getItem("user"));
    if (initalUser) {
      setUser(initalUser);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              id="username"
              type="text"
              name="Username"
              onChange={handleUsernameFieldChange}
              value={username}
            />
          </div>
          <div>
            password{" "}
            <input
              id="password"
              type="password"
              name="Password"
              onChange={handlePasswordFieldChange}
              value={password}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          Logged in as {user.name}{" "}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
};

UserForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  loginService: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
};

export default UserForm;
