import React, { useState, useImperativeHandle } from "react"
import { Button } from "react-bootstrap"
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  // visible = true: then show the form
  const hideWhenVisible = { display: visible ? "none" : "flex" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          id='showForm'
          style={{ marginLeft: "auto" }}
        >
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>{props.children}</div>
    </div>
  )
})

export default Togglable
