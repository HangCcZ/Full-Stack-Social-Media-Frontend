import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
import dayjs from "dayjs"
const User = ({ user, indexOfFirstPost, indexOfLastPost, setTotalBlogs }) => {
  console.log("user from User Component", user)

  useEffect(() => {
    setTotalBlogs(user ? user.blogs.length : 0)
  }, [user, setTotalBlogs])

  if (!user) {
    return null
  }

  const renderBlogs = () => {
    const blogLists = user.blogs
      .slice(indexOfFirstPost, indexOfLastPost)
      .map((blog) => (
        <tr key={blog.id}>
          <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </td>
          <td>{` ${dayjs(blog.date).fromNow()}`}</td>
        </tr>
      ))
    return blogLists
  }

  return (
    <div>
      <h2>{`All Blogs By ${user.name}`}</h2>

      <Table striped>
        <thead>
          <tr>
            <th>BLOG</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>{renderBlogs()}</tbody>
      </Table>
    </div>
  )
}

export default User
