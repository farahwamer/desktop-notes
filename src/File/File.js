import React, { useState, useEffect } from "react";
import SubMenu from "../SubMenu";
import "./File.css";
import FileWindow from "./FileWindow";
import { AiFillCloseCircle } from "react-icons/ai";

const File = (props) => {
  const [title, setTitle] = useState(props.fileTitle);
  const [body, setBody] = useState(props.fileBody);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [deleteMenuStyle, setDeleteMenuStyle] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

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

  const closeWindow = () => {
    setIsOpen(false);
  };

  const saveFile = (title, body, id) => {
    props.saveFile(title, body, id);
  };

  const deleteFile = () => {
    setDeleteMenu(false);
    setIsAlive(false);
    if (props.inFolder) {
      props.deleteFile(props.id);
    }
  };

  if (!isAlive) {
    return null;
  }

  return (
    <div
      className="file-container"
      onClick={() => setDeleteMenu(false)}
      onMouseLeave={() => setDeleteMenu(false)}
    >
      <div className="file">
        <div
          className="file-icon"
          onDoubleClick={() => setIsOpen(!isOpen)}
          onContextMenu={handleContextMenu}
        >
          <img
            src={process.env.PUBLIC_URL + "img/file-berry.svg"}
            className="file-icon"
            alt="file icon"
          />
        </div>
        <p className="file-title">{title}</p>
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
          closeWindow={closeWindow}
        />
      ) : null}
      {deleteMenu ? (
        <SubMenu style={deleteMenuStyle} delete={deleteFile} />
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
  drag: true,
};

export default File;
