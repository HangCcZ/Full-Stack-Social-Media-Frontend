import React from "react"
import { useSelector } from "react-redux"
import { Button, Navbar, Nav } from "react-bootstrap"

import { Link, useLocation } from "react-router-dom"

const padding = {
  padding: 5,
}

const margins = {
  margin: 5,
}

const Header = ({ handleLogOut }) => {
  const user = useSelector((state) => state.user)
  const location = useLocation()

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
                Log In
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className='justify-content-end'>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
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
          LOG OUT
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
