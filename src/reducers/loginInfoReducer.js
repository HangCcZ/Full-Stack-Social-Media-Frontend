const loginInfoReducer = (state = { username: "", password: "" }, action) => {
  switch (action.type) {
    case "UPDATE_INPUT_USERNAME":
      return { ...state, username: action.data }
    case "UPDATE_INPUT_PASSWORD":
      return { ...state, password: action.data }
    case "CLEAR_INPUTS":
      return { username: "", password: "" }
    default:
      return state
  }
}

export const inputUsername = (username) => {
  return {
    type: "UPDATE_INPUT_USERNAME",
    data: username,
  }
}

export const inputPassword = (password) => {
  return {
    type: "UPDATE_INPUT_PASSWORD",
    data: password,
  }
}

export const clearInputFields = () => {
  return {
    type: "CLEAR_INPUTS",
  }
}

export default loginInfoReducer
