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
    <div style={{ marginTop: "1rem" }}>
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
  )
}

export default LoginForm
