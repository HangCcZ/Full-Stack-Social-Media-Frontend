import React from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import "../index.css"
const SortButton = ({ showSortButton, setSortBy }) => {
  return (
    <div className={showSortButton === true ? "displaySortButton" : "hide"}>
      <DropdownButton id='dropdown-basic-button' title='SORT BY' variant='dark'>
        <Dropdown.Item
          onClick={() => {
            setSortBy("NEWEST_OLDEST")
          }}
        >
          Newest to Oldest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortBy("OLDEST_NEWEST")
          }}
        >
          Oldest to Newest
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            setSortBy("LEAST_MOST_LIKES")
          }}
        >
          Least Likes to Most Likes
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setSortBy("MOST_LEAST_LIKES")
          }}
        >
          Most Likes to Least Likes
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default SortButton
