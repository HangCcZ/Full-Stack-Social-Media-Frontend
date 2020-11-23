import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form as styleForm, Button } from "react-bootstrap"
import { loginUser } from "../reducers/userReducer"
import { Formik, Field, Form } from "formik"

const LoginForm = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onFormSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true)
    dispatch(loginUser(values.username, values.password))
    setSubmitting(false)
    if (user === null) {
      resetForm({ values: { username: values.username, password: "" } })
    } else {
      resetForm({ values: { username: "", password: "" } })
    }
  }

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onFormSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <styleForm.Group>
              <styleForm.Label>Username:</styleForm.Label>
              <Field name='username' type='input' as={styleForm.Control} />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Password:</styleForm.Label>
              <Field name='password' type='password' as={styleForm.Control} />
            </styleForm.Group>

            <Button variant='primary' type='submit'>
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    // <Form onSubmit={handleLogin}>
    //   <Form.Group>
    //     <Form.Label>Username:</Form.Label>

    //     <Form.Control
    //       type='text'
    //       value={username}
    //       id='username'
    //       name='Username'
    //       onChange={({ target }) => dispatch(inputUsername(target.value))}
    //     />

    //     <Form.Label>Password:</Form.Label>
    //     <Form.Control
    //       type='password'
    //       id='password'
    //       value={password}
    //       name='Password'
    //       onChange={({ target }) => dispatch(inputPassword(target.value))}
    //     />
    //   </Form.Group>
    //   <Button variant='primary' type='submit'>
    //     Log In
    //   </Button>
    // </Form>
  )
}

export default LoginForm
