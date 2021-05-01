import React, { useState } from "react";
import "./FileWindow.css";
import { AiFillCloseCircle } from "react-icons/ai";

const FileWindow = (props) => {
  var title = props.title;
  var body = props.body;

  const [didMove, setDidMove] = useState(false);
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [windowIsDragging, setWindowIsDragging] = useState(false);
  const [windowStyles, setWindowStyles] = useState({});

  const windowDragStart = (e) => {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setWindowIsDragging(true);
  };

  const windowDragging = (e) => {
    if (windowIsDragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;

      setWindowStyles({
        position: "absolute",
        left: left,
        top: top,
      });
    }
  };

  const windowDragEnd = () => {
    setWindowIsDragging(false);
  };
  return (
    <div
      className={!props.inFolder ? "file-window" : "file-window-in-folder"}
      style={didMove ? windowStyles : {}}
      onMouseOver={() => setDidMove(true)}
      onMouseDown={windowDragStart}
      onMouseMove={windowDragging}
      onMouseUp={windowDragEnd}
      onMouseLeave={windowDragEnd}
    >
      <div
        className="file-header"
        onMouseDown={windowDragStart}
        onMouseMove={windowDragging}
        onMouseUp={windowDragEnd}
      >
        <AiFillCloseCircle
          className="close-button"
          size={13}
          onClick={props.closeWindow}
        />
      </div>
      <div className="file-body">
        <div className="title">
          <input
            className="title-input"
            placeholder="TITLE"
            type="text"
            value={props.title}
            onChange={props.changeTitle}
          />
          <hr className="title-line" />
        </div>

        <textarea
          placeholder="Notes go here..."
          type="text"
          value={props.body}
          onChange={props.changeBody}
          className="text-body-input"
        />
        <button
          className="text-body-button"
          onClick={
            props.inFolder
              ? (props.saveFile(title, body, props.id), props.closeWindow)
              : null
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

FileWindow.defaultProps = {
  drag: true,
  inFolder: false,
};

export default FileWindow;
