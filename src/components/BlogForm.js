/* eslint-disable indent */
import React from "react"
import PropTypes from "prop-types"
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
        initialValues={{ title: "", author: "", url: "" }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
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
        {/* <Form.Group>
          

          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            id='author'
            value={author}
            name='author'
            onChange={handleNewBlogChange}
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='url'
            id='url'
            onChange={handleNewBlogChange}
          />
        </Form.Group>
        <div style={{ display: "flex" }}>
          <Button
            variant='secondary'
            id='cancel-button'
            onClick={onCancleClick}
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
      </Form> */}
      </Formik>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
