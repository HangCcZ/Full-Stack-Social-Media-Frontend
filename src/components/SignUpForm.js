import React from "react"
import { Form as styleForm, Button } from "react-bootstrap"
import signUpService from "../services/signup"

import { Formik, Field, Form } from "formik"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long")
    .required("Required"),
  confirmPassoword: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long")
    .required("Required"),
})

const validatePasswords = (values) => {
  const errors = {}
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Must be the same as password above"
  }
  console.log("error is", errors)
  return errors
}

const SignUpForm = () => {
  const history = useHistory()
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validatePasswords}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (values.password === values.confirmPassword) {
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
                confirmPassword: "",
              },
            })
            history.push("/")
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <styleForm.Group>
              <styleForm.Label>Full Name:</styleForm.Label>
              <Field
                name='name'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Username:</styleForm.Label>
              <Field
                name='username'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Password:</styleForm.Label>
              <Field
                name='password'
                type='password'
                as={styleForm.Control}
                autoComplete='off'
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Confirm Password:</styleForm.Label>
              <Field
                type='password'
                name='confirmPassword'
                as={styleForm.Control}
                autoComplete='off'
              />
              {errors.confirmPassword &&
              (values.confirmPassword !== "" || touched.confirmPassword) ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
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
