import React, { Component } from "react"
import { Editor } from "react-draft-wysiwyg"
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const EditorComponent = () => (
  <Editor
  wrapperClassName="wrapper-class"
  editorClassName="editor-class"
  toolbarClassName="toolbar-class"
  toolbarStyle = {{border:"none",borderBottom:"1px solid #e3e6ea"}}
  wrapperStyle={{ border: "1px solid #e3e6ea",borderRadius:"5px" }}
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
        options: ['bold', 'italic', 'underline', 'strikethrough'],

      },
    }}
  />
)

export default EditorComponent
