/* eslint-disable indent */
import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Button, Form as styleForm, Alert } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import Content from "../components/Content"
import { convertFromRaw, convertToRaw } from "draft-js"

const BlogForm = ({ toggleForm }) => {
  const [rawContent, setRawContent] = useState({})
  const dispatch = useDispatch()
  const editorRef = useRef()
  const handleEditorSubmit = (rawContent) => {
    setRawContent(rawContent)
  }

  return (
    <>
      <Alert variant='primary'>
        <h2>Create a new blog</h2>
      </Alert>

      <Formik
        initialValues={{ title: "", author: "", url: "" }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          console.log(
            "Content from the rich editor",
            convertToRaw(editorRef.current.editorContent)
          )
          const newBlog = {
            title: values.title,
            author: values.author,
            url: values.url,
          }
          dispatch(createBlog(newBlog))
          setSubmitting(false)
          resetForm({
            values: {
              title: "",
              author: "",
              url: "",
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
              <Content ref={editorRef} />
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

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

export default BlogForm
