import React, { useState, useEffect } from "react";
import "./Folder.css";
import FolderWindow from "./FolderWindow";
import SubMenu from "../SubMenu";
import { v4 as uuidv4 } from "uuid";

const Folder = (props) => {
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const [name, setName] = useState(props.folderTitle);

  const [deleteMenu, setDeleteMenu] = useState(false);
  const [deleteMenuStyle, setDeleteMenuStyle] = useState({});

  const removeDefaultContext = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("contextmenu", removeDefaultContext);
    setDeleteMenu(false);

    return () => {
      window.removeEventListener("contextmenu", removeDefaultContext);
    };
  }, []);

  const handleContextMenu = (event) => {
    console.log(deleteMenuStyle);
    setDeleteMenu(true);
    var y = event.clientY;
    var x = event.clientX;
    console.log(y, x);
    setDeleteMenuStyle({
      top: y + "px",
      left: x + "px",
    });
    console.log(deleteMenuStyle);
  };

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

  const deleteFolder = () => {
    setDeleteMenu(false);
    setIsAlive(false);
  };

  if (!isAlive) {
    return null;
  }

  return (
    <div
      className="folder-container"
      onClick={() => setDeleteMenu(false)}
      onMouseLeave={() => setDeleteMenu(false)}
    >
      <div className="folder">
        <div
          className="folder-icon"
          onDoubleClick={() => setIsOpen(!isOpen)}
          onContextMenu={handleContextMenu}
        ></div>
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
      {deleteMenu ? (
        <SubMenu style={deleteMenuStyle} delete={deleteFolder} />
      ) : null}
    </div>
  );
};

Folder.defaultProps = {
  folderTitle: "",
  drag: true,
};

export default Folder;
