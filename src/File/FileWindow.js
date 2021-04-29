import React, { useState } from "react";
import "./FileWindow.css";

const FileWindow = (props) => {
  var title = props.title;
  var body = props.body;
  return (
    <div className="fileWindow">
      <input
        placeholder="TITLE"
        type="text"
        value={props.title}
        onChange={props.changeTitle}
      />
      <textarea
        placeholder="Notes go here..."
        type="text"
        value={props.body}
        onChange={props.changeBody}
      />
      <button onClick={props.saveFile(title, body, props.id)}>Save</button>
    </div>
  );
};

export default FileWindow;
