import React, { useState } from "react";
import File from "../File/File";
import Folder from "./Folder";
import "./FolderWindow.css";

const FolderWindow = (props) => {
  const saveFile = (title, body, id) => {
    props.saveFile(title, body, id);
  };

  const deleteFile = (id) => {
    props.deleteFile(id);
  };

  return (
    <div className="folder-window">
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
          />
        );
      })}
      <button onClick={props.newFile}>New File</button>
    </div>
  );
};

export default FolderWindow;
