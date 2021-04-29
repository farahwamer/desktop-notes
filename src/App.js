import "./App.css";
import { useState, useEffect } from "react";
import File from "./File/File";
import Folder from "./Folder/Folder";
import MainMenu from "./MainMenu";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [obj, setObj] = useState([]);
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsMenuShowing(true);
    var y = event.offsetY;
    var x = event.offsetX;
    console.log(y);
    console.log(x);
    setMenuStyle({
      top: `${y}px`,
      left: `${x}px`,
    });
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const newFile = () => {
    setObj((obj) => [
      ...obj,
      { title: "", body: "", id: uuidv4(), type: "file" },
    ]);
    console.log(obj);
  };

  const newFolder = () => {
    setObj((obj) => [
      ...obj,
      { title: "", files: [], id: uuidv4(), type: "folder" },
    ]);
    console.log(obj);
  };

  const deleteObj = (id) => {
    setObj(obj.filter((obj) => obj.id !== id));
  };

  const saveFile = (title, body, id) => {
    const index = obj.findIndex((object) => object.id === id);
    obj[index].title = title;
    obj[index].body = body;
  };

  const saveFolder = (title, files, id) => {
    const index = obj.findIndex((object) => object.id === id);
    obj[index].title = title;
    obj[index].files = files;
  };

  return (
    <div className="app" onClick={() => setIsMenuShowing(false)}>
      {isMenuShowing ? (
        <MainMenu
          newFile={newFile}
          newFolder={newFolder}
          delete={deleteObj}
          saveFile={saveFile}
          saveFolder={saveFolder}
          style={menuStyle}
        />
      ) : null}

      {obj.map((obj) => {
        if (obj.type === "file") {
          return (
            <File
              fileTitle={obj.title}
              fileBody={obj.body}
              id={obj.id}
              key={obj.id}
            />
          );
        } else {
          return (
            <Folder
              folderTitle={obj.title}
              folderFiles={obj.files}
              id={obj.id}
              key={obj.id}
            />
          );
        }
      })}
    </div>
  );
}

export default App;
