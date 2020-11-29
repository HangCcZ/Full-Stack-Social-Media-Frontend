import React from "react"
import Comments from "./Comments"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import CommentForm from "./CommentForm"
import { Button, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import ReactMarkdown from "react-markdown"
const Blog = ({ blog, clickLike, removeBlog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  if (!user) {
    history.push("/")
  }

  if (!blog) {
    return null
  }

  const onLikesClick = () => {
    clickLike(blog)
  }

  const onRemoveClick = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      removeBlog(blog)
    }
  }

  const addComment = (comment) => {
    dispatch(commentBlog(comment, blog))
  }

  const showRemove = () => {
    if (blog.user.id === user.id) {
      return (
        <>
          <Button
            variant='danger'
            onClick={onRemoveClick}
            className='delete-button'
          >
            remove
          </Button>
        </>
      )
    }
    return null
  }

  const blogDetail = () => {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </Card.Text>

            <Card.Text>
              {blog.likes} likes{" "}
              <Button
                variant='outline-success'
                onClick={onLikesClick}
                className='likeButton'
              >
                Like
              </Button>
              {showRemove()}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <CommentForm blog={blog} addComment={addComment} />
          </Card.Body>

          <Card.Body>
            <Comments blog={blog} />
          </Card.Body>
        </Card>
      </div>
    )
  }

  return blogDetail()
}

export default Blog
