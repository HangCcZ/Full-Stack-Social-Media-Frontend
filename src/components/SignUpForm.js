import React from "react"
import { Form as styleForm, Button } from "react-bootstrap"
import signUpService from "../services/signup"

import { Formik, Field, Form } from "formik"
import { useHistory } from "react-router-dom"
const SignUpForm = () => {
  const history = useHistory()
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          confirmPassowrd: "",
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (values.password === values.confirmPassowrd) {
            setSubmitting(true)
            await signUpService.signUp({
              name: values.name,
              username: values.username,
              password: values.password,
            })
            setSubmitting(false)
            resetForm({
              values: {
                name: "",
                username: "",
                password: "",
                confirmPassowrd: "",
              },
            })
            history.push("/")
          } else {
            /* TODO */
            console.log("bad match")
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <styleForm.Group>
              <styleForm.Label>Full Name:</styleForm.Label>
              <Field name='name' type='input' as={styleForm.Control} />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Username:</styleForm.Label>
              <Field name='username' type='input' as={styleForm.Control} />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Password:</styleForm.Label>
              <Field name='password' type='password' as={styleForm.Control} />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Confirm Password:</styleForm.Label>
              <Field
                type='password'
                name='confirmPassowrd'
                as={styleForm.Control}
              />
            </styleForm.Group>

            <Button variant='primary' type='submit'>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
