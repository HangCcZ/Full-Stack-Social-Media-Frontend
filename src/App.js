import React, { useEffect, useRef, useState } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"

import { userFromToken } from "./reducers/userReducer"
import { fetchAllUsers } from "./reducers/usersReducer"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import UserList from "./components/UserList"
import Header from "./components/Header"
import User from "./components/User"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import BlogList from "./components/BlogList"
import SortButon from "./components/SortButton"
import Pages from "./components/Pages"
import { Container } from "react-bootstrap"
import "./index.css"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const match = useRouteMatch("/users/:id")
  const matchBlog = useRouteMatch("/blogs/:id")
  const individualUser = match
    ? users.find((user) => user.id === match.params.id)
    : null
  const individualBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  const blogFormRef = useRef()
  const [searchTerm, setSearchTerm] = useState("")
  const [showSortButton, setShowSortButton] = useState(true)
  const [sortBy, setSortBy] = useState("Newest to Oldest")
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const [totalBlogs, setTotalBlogs] = useState(blogs.length)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userFromToken(user))
      dispatch(initializeBlogs())
      dispatch(fetchAllUsers())
    }
  }, [dispatch])

  const onFormCancle = () => {
    blogFormRef.current.toggleVisibility()
  }

  const blogForm = () => (
    <Togglable
      buttonLabel='CREATE POST'
      className='newBlogToggle'
      ref={blogFormRef}
      setShowSortButton={setShowSortButton}
    >
      <div>
        <BlogForm toggleForm={onFormCancle} />
      </div>
    </Togglable>
  )

  const showAllBlogs = () => (
    <div style={{ marginTop: "1rem" }}>
      <div className={showSortButton === true ? "showFlexButtons" : ""}>
        <SortButon
          showSortButton={showSortButton}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        {blogForm()}
      </div>
      <BlogList
        sortBy={sortBy}
        indexOfFirstPost={indexOfFirstPost}
        indexOfLastPost={indexOfLastPost}
        searchTerm={searchTerm}
        setTotalBlogs={setTotalBlogs}
      />
      <Pages
        postsPerPage={postsPerPage}
        totalPosts={totalBlogs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )

  const renderUserList = () => (
    <div>
      <UserList />
    </div>
  )

  const renderUserPanel = () => (
    <div>
      <User
        user={individualUser}
        sortBy={sortBy}
        indexOfFirstPost={indexOfFirstPost}
        indexOfLastPost={indexOfLastPost}
        searchTerm={searchTerm}
        setTotalBlogs={setTotalBlogs}
      />
      <Pages
        postsPerPage={postsPerPage}
        totalPosts={totalBlogs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )

  const renderSingleBlog = () => (
    <div>
      <Blog blog={individualBlog} user={user} />
    </div>
  )

  return (
    <div className='content'>
      <Header setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
      <Container style={{ flex: "1 0 auto" }}>
        <Notification />
        <Switch>
          <Route path='/users/:id'>{renderUserPanel()}</Route>

          <Route exact path='/users'>
            {renderUserList()}
          </Route>

          <Route path='/blogs/:id'>{renderSingleBlog()}</Route>
          <Route path='/signup'>
            <SignUpForm />
          </Route>
          <Route exact path='/'>
            {user === null ? <LoginForm /> : showAllBlogs()}
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App
