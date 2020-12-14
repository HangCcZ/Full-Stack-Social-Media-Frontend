import React from "react"
import { Pagination } from "react-bootstrap"
const Pages = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  const items = []
  for (
    let number = 1;
    number <= Math.ceil(totalPosts / postsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={(e) => {
          setCurrentPage(e.target.text)
        }}
      >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default Pages
