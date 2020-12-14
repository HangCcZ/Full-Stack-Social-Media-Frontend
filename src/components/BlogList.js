import React from "react"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Table, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
dayjs.extend(relativeTime)

const BlogList = ({ sortBy, indexOfFirstPost, indexOfLastPost }) => {
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
    return [...sortedBlogs]
      .slice(indexOfFirstPost, indexOfLastPost)
      .map((blog) => (
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

  // const fillTableData = () => {
  //   const emptyDataRows = indexOfLastPost - blogs.length

  //   if (emptyDataRows > 0) {
  //     const newRows = Array.from({ length: emptyDataRows })
  //       .fill(0)
  //       .map((item) => (
  //         <tr key={Math.floor(Math.random() * 1000)}>
  //           <td></td>
  //           <td></td>

  //           <td></td>
  //         </tr>
  //       ))
  //     console.log(newRows)
  //     return newRows
  //   }
  //   return null
  // }

  const sortBlogs = () => {
    switch (sortBy) {
      case "Newest to Oldest":
        return sortByNewest()
      case "Oldest to Newest":
        return sortByOldest()
      case "Least to Most Likes":
        return sortByLeastLikes()
      case "Most to Least Likes":
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
