import React, { useState, useImperativeHandle } from "react"
import { Button } from "react-bootstrap"
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  // visible = true: then show the form
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    props.setShowSortButton(visible)
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      visible,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} id='showForm'>
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>{props.children}</div>
    </>
  )
})

export default Togglable
