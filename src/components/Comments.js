import React from "react"
import { ListGroup } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
const Comments = ({ blog }) => {
  if (!blog.comments) {
    return null
  }
  return (
    <>
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment}>
            <ReactMarkdown>{comment}</ReactMarkdown>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Comments
