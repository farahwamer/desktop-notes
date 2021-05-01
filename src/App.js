import "./App.css";
import { useState, useEffect } from "react";
import File from "./File/File";
import Folder from "./Folder/Folder";
import MainMenu from "./MainMenu";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [obj, setObj] = useState([]);
  const [isMainMenuShowing, setIsMainMenuShowing] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const [prompt, setPrompt] = useState(true);
  const [theme, setTheme] = useState("berry");

  const handleContextMenu = (event) => {
    if (
      event.target.className === "app-berry" ||
      event.target.className === "app-peach"
    ) {
      event.preventDefault();
      setIsMainMenuShowing(true);
      var y = event.offsetY;
      var x = event.offsetX;
      setMenuStyle({
        top: `${y}px`,
        left: `${x}px`,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const newFile = (event) => {
    console.log(obj);
    setObj((obj) => [
      ...obj,
      {
        title: "",
        body: "",
        id: uuidv4(),
        type: "file",
      },
    ]);
  };

  const newFolder = (event) => {
    setObj((obj) => [
      ...obj,
      {
        title: "",
        files: [],
        id: uuidv4(),
        type: "folder",
      },
    ]);
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

  console.log(theme);

  return (
    <div
      className={theme === "berry" ? "app-berry" : "app-peach"}
      onClick={() => setIsMainMenuShowing(false)}
      onContextMenu={() => setPrompt(false)}
    >
      {prompt ? <p className="prompt">Right Click Anywhere to Start</p> : null}
      {isMainMenuShowing ? (
        <MainMenu
          newFile={newFile}
          newFolder={newFolder}
          setTheme={setTheme}
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
              theme={theme}
              id={obj.id}
              key={obj.id}
            />
          );
        } else {
          return (
            <Folder
              folderTitle={obj.title}
              folderFiles={obj.files}
              theme={theme}
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
