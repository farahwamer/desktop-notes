import React from "react";
import File from "../File/File";
import "./FolderWindow.css";
import { AiFillCloseCircle } from "react-icons/ai";

const FolderWindow = (props) => {
  const saveFile = (title, body, id) => {
    props.saveFile(title, body, id);
  };

  const deleteFile = (id) => {
    props.deleteFile(id);
  };

  return (
    <div className="folder-window">
      <div className="folder-header">
        <AiFillCloseCircle
          className="folder-close-button"
          onClick={props.closeFile}
        />
        <p className="folder-title">{props.name}</p>
      </div>
      <div className="folder-body">
        {props.files.map((fileObject) => {
          return (
            <File
              fileTitle={fileObject.title}
              fileBody={fileObject.body}
              id={fileObject.id}
              saveFile={saveFile}
              deleteFile={deleteFile}
              inFolder={true}
              key={fileObject.id}
              theme={props.theme}
            />
          );
        })}
      </div>
      <div className="folder-footer">
        <button
          className="folder-window-button"
          onClick={props.newFile}
          style={
            props.theme === "peach" ? { backgroundColor: "#E47A7E" } : null
          }
        >
          New File
        </button>
      </div>
    </div>
  );
};

export default FolderWindow;
