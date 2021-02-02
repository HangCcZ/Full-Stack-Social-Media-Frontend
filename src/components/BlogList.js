import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const BlogList = ({
  sortBy,
  searchTerm = "",
  indexOfFirstPost,
  indexOfLastPost,
  setTotalBlogs,
}) => {
  const blogs = useSelector((state) => state.blogs);

  const sortByMostLikes = () => {
    return [...blogs].sort((a, b) => b.likes.length - a.likes.length);
  };

  const sortByLeastLikes = () => {
    return [...blogs].sort((a, b) => a.likes.length - b.likes.length);
  };

  const sortByOldest = () => {
    return [...blogs].sort((a, b) => a.date - b.date);
  };

  const sortByNewest = () => {
    return [...blogs].sort((a, b) => b.date - a.date);
  };

  const sortBlogs = () => {
    switch (sortBy) {
      case "Newest to Oldest":
        return sortByNewest();
      case "Oldest to Newest":
        return sortByOldest();
      case "Least to Most Likes":
        return sortByLeastLikes();
      case "Most to Least Likes":
        return sortByMostLikes();
      default:
        return sortByNewest();
    }
  };

  // can be refactored
  const sortedBlogs = sortBlogs();
  const matchedBlogs = sortedBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserLink = ({ user }) => {
    return <Link to={`/users/${user.id}`}>{user.username}</Link>;
  };

  const renderTableData = () => {
    let resultBlogs = searchTerm !== "" ? matchedBlogs : sortedBlogs;
    return [...resultBlogs]
      .slice(indexOfFirstPost, indexOfLastPost)
      .map((blog) => (
        <tr key={blog.id}>
          <td>
            <Badge variant="light">{blog.likes.length} LIKES</Badge>
          </td>
          <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </td>

          <td>
            Posted by {renderUserLink(blog)}
            {` ${dayjs(blog.date).fromNow()}`}
          </td>
        </tr>
      ));
  };

  useEffect(() => {
    setTotalBlogs(matchedBlogs.length);
  }, [matchedBlogs.length, setTotalBlogs]);

  return (
    <>
      <div>
        <Table striped>
          <tbody>{renderTableData()}</tbody>
        </Table>
      </div>
    </>
  );
};

export default BlogList;
