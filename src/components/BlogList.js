import React from "react"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
dayjs.extend(relativeTime)

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const renderUserLink = ({ user }) => {
    // const blogUser = users.find((user) => user.id === blogUserId)
    return <Link to={`/users/${user.id}`}>{user.username}</Link>
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>

                <td>
                  Posted by {renderUserLink(blog)}
                  {` ${dayjs().from(dayjs(blog.date), true)} ago`}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
