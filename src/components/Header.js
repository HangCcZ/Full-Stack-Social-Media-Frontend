import React from "react";
import { useSelector } from "react-redux";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";

import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBlogs } from "../reducers/blogReducer";
import { logoutUser } from "../reducers/userReducer";
import { clearMessage, infoMessage } from "../reducers/notificationReducer";
const padding = {
  padding: 5,
};

const margins = {
  margin: 5,
};

const Header = ({ setSearchTerm, setCurrentPage }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogOut = async (event) => {
    const username = user.username;
    window.localStorage.removeItem("loggedBlogUser");
    history.push("/");
    dispatch(logoutUser());
    dispatch(clearBlogs());
    dispatch(infoMessage(`User ${username} logged out`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  if (!user) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Brand>
          <Link style={padding} to="/">
            HIFORUM
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>

          {location.pathname === "/signup" ? (
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/">
                Sign in
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }

  const renderLoginMessage = () => {
    return (
      <Navbar.Text>
        Hi, {user.username}
        <Button variant="secondary" style={margins} onClick={handleLogOut}>
          Sign out
        </Button>
      </Navbar.Text>
    );
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand>
        <Link style={padding} to="/">
          HIFORUM
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/">
            HOME
          </Nav.Link>
          <Nav.Link as={Link} to={`/users/${user.id}`}>
            MY POSTS
          </Nav.Link>
        </Nav>
        <Form inline style={{ margin: "0 auto" }}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
        </Form>
        <Nav> {renderLoginMessage()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
