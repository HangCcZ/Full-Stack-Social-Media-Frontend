import React from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import "../index.css"
const SortButton = ({ showSortButton, setSortBy, sortBy }) => {
  return (
    <div className={showSortButton === true ? "displaySortButton" : "hide"}>
      <DropdownButton
        id='dropdown-basic-button'
        title={`SORT BY: ${sortBy}`}
        variant='dark'
      >
        <Dropdown.Item
          onClick={() => {
            setSortBy("Newest to Oldest")
          }}
        >
          Newest to Oldest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortBy("Oldest to Newest")
          }}
        >
          Oldest to Newest
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            setSortBy("Least to Most Likes")
          }}
        >
          Least Likes to Most Likes
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortBy("Most to Least Likes")
          }}
        >
          Most Likes to Least Likes
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default SortButton
