import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Container, Row, Col, FloatingLabel, Stack } from "react-bootstrap";

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
        <h2>log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Stack gap={2}>
            <Form.Group>
              <FloatingLabel label="Username">
                <Form.Control
                  id="username"
                  type="text"
                  name="Username"
                  onChange={handleUsernameFieldChange}
                  value={username}
                  placeholder="Username"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel label="Password">
                <Form.Control
                  id="password"
                  type="password"
                  name="Password"
                  onChange={handlePasswordFieldChange}
                  value={password}
                  placeholder="Password"
                />
              </FloatingLabel>
            </Form.Group>
            <Button type="submit">Login</Button>
          </Stack>
        </Form>
      </div>
    );
  } else {
    return (
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>blogs</h1>
          </Col>
          <Col md="auto">
            <div>
              Logged in as {user.name}{" "}
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>
          </Col>
        </Row>
      </Container>
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
