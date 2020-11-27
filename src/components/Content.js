import React, { useState, useImperativeHandle } from "react"
import { convertFromRaw, EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const EditorComponent = React.forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  // can be broght to higher level, convert to raw after submit is clicked
  // if (!content) {
  //   setEditorState(convertFromRaw(content))
  // }
  useImperativeHandle(ref, () => {
    return {
      editorContent: editorState.getCurrentContent(),
    }
  })
  // call convertToRaw() at the end

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
      toolbarClassName='toolbar-class'
      toolbarStyle={{ border: "none", borderBottom: "1px solid #d4d9de" }}
      wrapperStyle={{ border: "1px solid #d4d9de", borderRadius: "5px" }}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "list",
          "link",
          "emoji",
          "image",
          "history",
        ],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["bold", "italic", "underline", "strikethrough"],
        },
      }}
    />
  )
})

export default EditorComponent
