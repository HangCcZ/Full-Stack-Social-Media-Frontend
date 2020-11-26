import React from "react"
import { useSelector } from "react-redux"
import { Button, Navbar, Nav } from "react-bootstrap"

import { Link, useLocation, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearBlogs } from "../reducers/blogReducer"
import { logoutUser } from "../reducers/userReducer"
import { clearMessage, infoMessage } from "../reducers/notificationReducer"
const padding = {
  padding: 5,
}

const margins = {
  margin: 5,
}

const Header = () => {
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogOut = async (event) => {
    const name = user.name
    window.localStorage.removeItem("loggedBlogUser")
    history.push("/")
    dispatch(logoutUser())
    dispatch(clearBlogs())
    dispatch(infoMessage(`User ${name} logged out`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 3000)
  }

  if (!user) {
    return (
      <Navbar collapseOnSelect expand='lg' bg='light'>
        <Navbar.Brand>
          <Link style={padding} to='/'>
            Hang's Blog App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>

          {location.pathname === "/signup" ? (
            <Nav className='justify-content-end'>
              <Nav.Link as={Link} to='/'>
                Sign in
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className='justify-content-end'>
              <Nav.Link as={Link} to='/signup'>
                Sign up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }

  const renderLoginMessage = () => {
    return (
      <Navbar.Text>
        Hi, {user.name}
        <Button variant='secondary' style={margins} onClick={handleLogOut}>
          Sign out
        </Button>
      </Navbar.Text>
    )
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
      <Navbar.Brand>
        <Link style={padding} to='/'>
          Hang's Blog App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='users'>
            Users
          </Nav.Link>
        </Nav>

        <Nav className='justify-content-end'> {renderLoginMessage()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
