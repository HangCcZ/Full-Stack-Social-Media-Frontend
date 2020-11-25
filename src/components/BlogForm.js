/* eslint-disable indent */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button, Form, Alert } from "react-bootstrap"
const BlogForm = ({ createBlog, onCancleClick }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const handleNewBlogChange = (event) => {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value)
        break
      case "author":
        setAuthor(event.target.value)
        break
      case "url":
        setUrl(event.target.value)
        break
      default:
        break
    }
  }

  const clearBlogFields = () => {
    setTitle("")
    setUrl("")
    setAuthor("")
  }
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    clearBlogFields()
  }

  return (
    <>
      <Alert variant='primary'>
        <h2>Create a new blog</h2>
      </Alert>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>

          <Form.Control
            id='title'
            type='text'
            value={title}
            name='title'
            onChange={handleNewBlogChange}
          />

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
      </Form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
