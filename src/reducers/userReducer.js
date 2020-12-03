import loginService from "../services/login"
import blogService from "../services/blogs"
import { initializeBlogs } from "./blogReducer"
import {
  errorMessage,
  successMessage,
  clearMessage,
} from "./notificationReducer"
function userReducer(state = null, action) {
  switch (action.type) {
    case "SUCCESS":
      return action.data.user
    case "TOKEN_USER":
      return action.data.user
    case "SIGNOUT":
      return null
    case "FAIL":
      return null
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: "SUCCESS",
        data: { user },
      })
      dispatch(successMessage(`User ${user.username} logged in`))
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch({ type: "FAIL" })
      dispatch(errorMessage("Wrong username or password"))
    }
    setTimeout(() => {
      dispatch(clearMessage())
    }, 2000)
  }
}

export const logoutUser = () => {
  return {
    type: "SIGNOUT",
  }
}

export const userFromToken = (user) => {
  blogService.setToken(user.token)
  return {
    type: "TOKEN_USER",
    data: { user },
  }
}

export default userReducer
