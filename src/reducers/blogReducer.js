import blogService from "../services/blogs"
import {
  successMessage,
  errorMessage,
  clearMessage,
} from "./notificationReducer"

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data.blogs
    case "NEW_BLOG":
      return [...state, action.data.newBlog]
    case "LIKE_BLOG":
      const updatedBlog = action.data.updatedBlog
      const id = updatedBlog.id
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    case "COMMENT_BLOG":
      const updatedBlogComment = action.data.updatedBlog
      return state.map((blog) =>
        blog.id !== updatedBlogComment.id ? blog : updatedBlogComment
      )
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id)
    case "CLEAR_BLOGS":
      return []
    default:
      return state
  }
}
export const commentBlog = (blogObject, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateComments(blogObject, comment)
    dispatch({
      type: "COMMENT_BLOG",
      data: { updatedBlog },
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: "NEW_BLOG",
        data: { newBlog },
      })
      dispatch(
        successMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} created`
        )
      )
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    } catch (exception) {
      dispatch(errorMessage(`Error creating a new blog ${exception}`))
    }
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateLikes(blogObject)
      dispatch({
        type: "LIKE_BLOG",
        data: { updatedBlog },
      })
    } catch (exception) {
      dispatch(errorMessage(`error updating the vlog, error:${exception}`))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogObject)
      dispatch(successMessage(`The blog ${blogObject.title} has been deleted.`))
      dispatch({
        type: "DELETE_BLOG",
        data: { id: blogObject.id },
      })
    } catch (exception) {
      dispatch(errorMessage(`error deleting the vlog, error: ${exception}`))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 3000)
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: { blogs },
    })
  }
}

export const clearBlogs = () => {
  return {
    type: "CLEAR_BLOGS",
  }
}

export default blogReducer
