import React from "react"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Table, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
dayjs.extend(relativeTime)

const BlogList = ({ sortBy }) => {
  const blogs = useSelector((state) => state.blogs)

  const renderUserLink = ({ user }) => {
    return <Link to={`/users/${user.id}`}>{user.username}</Link>
  }

  const sortByMostLikes = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const sortByLeastLikes = () => {
    return blogs.sort((a, b) => a.likes - b.likes)
  }

  const sortByOldest = () => {
    return blogs.sort((a, b) => a.date - b.date)
  }

  const sortByNewest = () => {
    return blogs.sort((a, b) => b.date - a.date)
  }

  const renderTableData = (sortedBlogs) => {
    return sortedBlogs.map((blog) => (
      <tr key={blog.id}>
        <td>
          <Badge variant='light'>{blog.likes} LIKES</Badge>
        </td>
        <td>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </td>

        <td>
          Posted by {renderUserLink(blog)}
          {` ${dayjs(blog.date).fromNow()}`}
        </td>
      </tr>
    ))
  }

  const sortBlogs = () => {
    switch (sortBy) {
      case "NEWEST_OLDEST":
        return sortByNewest()
      case "OLDEST_NEWEST":
        return sortByOldest()
      case "LEAST_MOST_LIKES":
        return sortByLeastLikes()
      case "MOST_LEAST_LIKES":
        return sortByMostLikes()
      default:
        return sortByNewest()
    }
  }

  return (
    <div>
      <Table striped>
        <tbody>{renderTableData(sortBlogs())}</tbody>
      </Table>
    </div>
  )
}

export default BlogList
