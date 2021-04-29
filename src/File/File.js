import React, { useState } from "react";
import "./File.css";
import FileWindow from "./FileWindow";

const File = (props) => {
  const [title, setTitle] = useState(props.fileTitle);
  const [body, setBody] = useState(props.fileBody);

  const [isOpen, setIsOpen] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const saveFile = (title, body, id) => {
    props.saveFile(title, body, id);
  };

  const deleteFile = () => {
    setIsAlive(false);
  };

  if (!isAlive) {
    return null;
  }

  return (
    <div className="file-container">
      <div
        className="delete-icon"
        onClick={props.inFolder ? () => props.deleteFile(props.id) : deleteFile}
        // onClick={deleteFile}
      ></div>
      <div className="file">
        <div className="file-icon" onClick={() => setIsOpen(!isOpen)}></div>
        <p>{title}</p>
      </div>
      {isOpen ? (
        <FileWindow
          title={title}
          body={body}
          changeTitle={(event) => setTitle(event.target.value)}
          changeBody={(event) => setBody(event.target.value)}
          id={props.id}
          saveFile={saveFile}
          deleteFile={deleteFile}
        />
      ) : null}
    </div>
  );
};

File.defaultProps = {
  fileTitle: "",
  fileBody: "",
  inFolder: false,
  saveFile: function () {
    return null;
  },
};

export default File;
