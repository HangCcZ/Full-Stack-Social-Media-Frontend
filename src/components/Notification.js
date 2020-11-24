import React from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
const Notification = () => {
  const { messageBody, messageStyle } = useSelector(
    (state) => state.notification
  )

  if (messageBody === "") {
    return null
  }

  return (
    <Alert key={messageBody} variant={messageStyle}>
      {messageBody}
    </Alert>
  )
}

export default Notification
