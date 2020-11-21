import React from "react"
import { ListGroup } from "react-bootstrap"
const Comments = ({ blog }) => {
  if (!blog.comments) {
    return null
  }
  return (
    <div>
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Comments
