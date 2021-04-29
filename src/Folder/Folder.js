import React, { useState } from "react";
import "./Folder.css";
import FolderWindow from "./FolderWindow";
import { v4 as uuidv4 } from "uuid";
const Folder = (props) => {
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(props.folderTitle);

  const newFile = () => {
    if (files.length === 0) {
      setFiles([{ title: "", body: "", id: uuidv4() }]);
    } else {
      setFiles((files) => [...files, { title: "", body: "", id: uuidv4() }]);
    }
  };

  const saveFile = (title, body, id) => {
    const index = files.findIndex((fileObject) => fileObject.id === id);
    files[index].title = title;
    files[index].body = body;
  };

  const deleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="folder-container">
      <div className="folder">
        <div className="folder-icon" onClick={() => setIsOpen(!isOpen)}></div>
        <textarea
          type="text"
          placeholder="folder"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="folder-name"
          maxLength="22"
        />
      </div>
      {isOpen ? (
        <FolderWindow
          name={name}
          files={files}
          newFile={newFile}
          saveFile={saveFile}
          deleteFile={deleteFile}
        />
      ) : null}
    </div>
  );
};

Folder.defaultProps = {
  folderTitle: "",
};

export default Folder;
