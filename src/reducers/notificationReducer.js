const notificationReducer = (
  state = { messageBody: "", messageType: "" },
  action
) => {
  switch (action.type) {
    case "SUCCESS_NOTIFICATION":
      return { messageBody: action.data, messageStyle: "success" }
    case "FAIL_NOTIFICATION":
      return { messageBody: action.data, messageStyle: "warning" }
    case "INFO_NOTIFICATION":
      return { messageBody: action.data, messageStyle: "info" }
    case "CLEAR_NOTIFICATION":
      return { messageBody: "", messageType: "" }
    default:
      return state
  }
}

export const errorMessage = (message) => {
  return {
    type: "FAIL_NOTIFICATION",
    data: message,
  }
}

export const successMessage = (message) => {
  return {
    type: "SUCCESS_NOTIFICATION",
    data: message,
  }
}

export const infoMessage = (message) => {
  return {
    type: "INFO_NOTIFICATION",
    data: message,
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  }
}

export default notificationReducer
