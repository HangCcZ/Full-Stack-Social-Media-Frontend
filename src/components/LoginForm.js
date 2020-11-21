import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button } from "react-bootstrap"
import { loginUser } from "../reducers/userReducer"

import { inputUsername, inputPassword } from "../reducers/loginInfoReducer"

const LoginForm = () => {
  const { username, password } = useSelector((state) => state.loginInfo)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>

        <Form.Control
          type='text'
          value={username}
          id='username'
          name='Username'
          onChange={({ target }) => dispatch(inputUsername(target.value))}
        />

        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => dispatch(inputPassword(target.value))}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        login
      </Button>
    </Form>
  )
}

export default LoginForm
