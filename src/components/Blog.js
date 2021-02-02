import React, { useState, useEffect } from "react";
import Comments from "./Comments";
import { commentBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import { Button, Card, Carousel, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { deleteBlog, likeBlog, unlikeBlog } from "../reducers/blogReducer";
const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        history.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, history]);

  if (!blog) {
    return null;
  }

  const onLikesClick = () => {
    // dispatch(likeBlog(blog));
    dispatch(likeBlog(blog, user));
  };

  const onUnlikeClick = () => {
    dispatch(unlikeBlog(blog, user));
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog));
    history.push("/");
  };

  const displayModal = () => {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as="h4">{`Delete`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert variant="danger">
            Do you want to delete this blog? This process cannot be undone.
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No! Take me back!
          </Button>
          <Button variant="danger" onClick={removeBlog}>
            Yes Sir!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const addComment = (comment) => {
    dispatch(commentBlog(comment, blog));
  };

  const showRemove = () => {
    if (blog.user.id === user.id) {
      return (
        <>
          <Button
            variant="danger"
            onClick={handleShow}
            className="delete-button"
          >
            DELETE
          </Button>
        </>
      );
    }
    return null;
  };

  const showEdit = () => {
    if (blog.user.id === user.id) {
      return (
        <>
          <Button variant="info">Edit</Button>{" "}
        </>
      );
    }
    return null;
  };

  const showLike = () => {
    if (blog.likes.find((like) => like.username === user.username)) {
      return (
        <Button
          variant="secondary"
          onClick={onUnlikeClick}
          className="likeButton"
        >
          UNLIKE
        </Button>
      );
    } else {
      return (
        <Button variant="success" onClick={onLikesClick} className="likeButton">
          LIKE
        </Button>
      );
    }
  };

  const renderCarousel = () => {
    if (blog.images.length !== 0) {
      return (
        <Carousel
          indicators={false}
          interval={3000}
          controls={blog.images.length === 1 ? false : true}
        >
          {blog.images.map((img) => (
            <Carousel.Item key={img.url}>
              <img
                className="d-block w-100"
                style={{ maxHeight: "25rem", objectFit: "contain" }}
                src={img.thumbnail}
                alt={img.filename}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }
    return null;
  };

  const blogDetail = () => {
    return (
      <div>
        <Card>
          <Card.Header>{blog.title}</Card.Header>
          <Card.Body>
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </Card.Body>
          <Card.Body>{renderCarousel()}</Card.Body>
          <Card.Body>
            <Card.Text>
              {blog.likes.length} likes {showLike()}
              {showRemove()}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <CommentForm blog={blog} addComment={addComment} />
          </Card.Body>

          <Card.Body>
            <Comments blog={blog} />
          </Card.Body>
        </Card>
        {displayModal()}
      </div>
    );
  };

  return blogDetail();
};

export default Blog;
