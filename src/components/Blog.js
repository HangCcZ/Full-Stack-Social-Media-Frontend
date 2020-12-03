import React from "react"
import Comments from "./Comments"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import CommentForm from "./CommentForm"
import { Button, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"
import { errorMessage, clearMessage } from "../reducers/notificationReducer"
const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  if (!user) {
    history.push("/")
  }

  if (!blog) {
    return null
  }

  const onLikesClick = () => {
    console.log(`blog user id:`, blog.user.id)
    console.log(`user id from state`, user.id)
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(errorMessage("error updating the vlog"))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }

  const onRemoveClick = () => {
    // add a confirmation component here
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        dispatch(deleteBlog(blog))
        history.push("/")
      } catch (exception) {
        dispatch(errorMessage(`error deleting the vlog, error: ${exception}`))
        setTimeout(() => {
          dispatch(clearMessage())
        }, 3000)
      }
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
            REMOVE
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
          <Card.Header>{blog.title}</Card.Header>
          <Card.Body>
            <ReactMarkdown>{blog.content}</ReactMarkdown>

            <Card.Text>
              {blog.likes} likes{" "}
              <Button
                variant='outline-success'
                onClick={onLikesClick}
                className='likeButton'
              >
                LIKE
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
