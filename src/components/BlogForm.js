/* eslint-disable indent */
import React, { useState, useRef } from "react"
import { Button, Form as styleForm, Alert } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import * as Yup from "yup"

const NewBlogSchema = Yup.object().shape({
  title: Yup.string().min(8, "Too Short!").required("Required"),
  author: Yup.string().min(8, "Too Short!").required("Required"),
  url: Yup.string().min(8, "Too Short!").required("Required"),
  content: Yup.string().min(8, "Too Short!").required("Required"),
})

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()
  const [files, setFiles] = useState(null)
  const fileRef = useRef(null)
  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  return (
    <>
      <Alert variant='primary'>
        <h2>Create a new blog</h2>
      </Alert>

      <Formik
        initialValues={{
          title: "",
          author: "",
          url: "",
          content: "",
        }}
        validationSchema={NewBlogSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true)

          const formData = new FormData()
          for (const file in files) {
            formData.append("files", files[file])
          }

          const newBlog = {
            title: values.title,
            author: values.author,
            url: values.url,
            content: values.content,
            date: Date.now(),
          }

          for (const [key, value] of Object.entries(newBlog)) {
            formData.append(key, value)
          }

          dispatch(createBlog(formData))
          setSubmitting(false)
          setFiles(null)
          fileRef.current.value = ""
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
              <ErrorMessage name='title'>
                {(msg) => <Alert variant='warning'>{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Author:</styleForm.Label>
              <Field
                name='author'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
              <ErrorMessage name='author'>
                {(msg) => <Alert variant='warning'>{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.Label>Url:</styleForm.Label>
              <Field
                name='url'
                type='input'
                as={styleForm.Control}
                autoComplete='off'
              />
              <ErrorMessage name='url'>
                {(msg) => <Alert variant='warning'>{msg}</Alert>}
              </ErrorMessage>
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
              <ErrorMessage name='content'>
                {(msg) => <Alert variant='warning'>{msg}</Alert>}
              </ErrorMessage>
            </styleForm.Group>

            <styleForm.Group>
              <styleForm.File
                id='image'
                label='Upload images'
                onChange={handleFileChange}
                ref={fileRef}
                multiple
              />
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
