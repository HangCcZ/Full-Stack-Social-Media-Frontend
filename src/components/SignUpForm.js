import React from "react";
import signUpService from "../services/signup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Form as styleForm, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  successMessage,
  errorMessage,
  clearMessage,
} from "../reducers/notificationReducer";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long")
    .required("Required"),
});

const validatePasswords = (values) => {
  const errors = {};
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Must be the same as password above";
  }
  return errors;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div style={{ marginTop: "1rem" }}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validatePasswords}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (values.password === values.confirmPassword) {
            try {
              setSubmitting(true);
              const newUser = await signUpService.signUp({
                username: values.username,
                password: values.password,
              });
              dispatch(
                successMessage(`New user ${newUser.username} signed up`)
              );
              setTimeout(() => {
                dispatch(clearMessage());
              }, 3000);
              setSubmitting(false);
              resetForm({
                values: {
                  username: "",
                  password: "",
                  confirmPassword: "",
                },
              });
              history.push("/");
            } catch (err) {
              dispatch(errorMessage(err));
            }
          }
        }}
      >
        {() => (
          <Form>
            <styleForm.Group>
              <styleForm.Label>Username:</styleForm.Label>
              <Field
                name="username"
                type="input"
                as={styleForm.Control}
                autoComplete="off"
              />

              <ErrorMessage name="username">
                {(msg) => <Alert variant="warning">{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Password:</styleForm.Label>
              <Field
                name="password"
                type="password"
                as={styleForm.Control}
                autoComplete="off"
              />
              <ErrorMessage name="password">
                {(msg) => <Alert variant="warning">{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Confirm Password:</styleForm.Label>
              <Field
                type="password"
                name="confirmPassword"
                as={styleForm.Control}
                autoComplete="off"
              />
              <ErrorMessage name="confirmPassword">
                {(msg) => <Alert variant="warning">{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
