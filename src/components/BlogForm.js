/* eslint-disable indent */
import React from "react"
import { Button, Form as styleForm, Alert } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Alert variant='primary'>
        <h2>Create a new blog</h2>
      </Alert>

      <Formik
        initialValues={{ title: "", author: "", url: "", content: "" }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          const newBlog = {
            title: values.title,
            author: values.author,
            url: values.url,
            content: values.content,
          }
          dispatch(createBlog(newBlog))
          setSubmitting(false)
          resetForm({
            values: {
              title: "",
              author: "",
              url: "",
              content: "",
            },
          })
          toggleForm()
        }}
      >
        {() => (
          <Form>
            <styleForm.Group>
              <styleForm.Label>Title:</styleForm.Label>
              <Field
                name='title'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Author:</styleForm.Label>
              <Field
                name='author'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Url:</styleForm.Label>
              <Field
                name='url'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Content:</styleForm.Label>
              <Field name='content'>
                {({ field }) => (
                  <styleForm.Control
                    as='textarea'
                    rows={4}
                    {...field}
                  ></styleForm.Control>
                )}
              </Field>
            </styleForm.Group>

            <div style={{ display: "flex" }}>
              <Button
                variant='secondary'
                id='cancel-button'
                onClick={toggleForm}
                style={{ marginRight: "auto" }}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                id='create-button'
                type='submit'
                style={{ marginLeft: "auto" }}
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default BlogForm
