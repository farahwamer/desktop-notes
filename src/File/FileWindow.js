import React, { useState } from "react";
import "./FileWindow.css";

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
      className="fileWindow"
      style={didMove ? windowStyles : null}
      onMouseOver={() => setDidMove(true)}
      onMouseDown={windowDragStart}
      onMouseMove={windowDragging}
      onMouseUp={windowDragEnd}
      onMouseLeave={windowDragEnd}
    >
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
      <button
        onClick={(props.saveFile(title, body, props.id), props.closeWindow)}
      >
        Save
      </button>
    </div>
  );
};

FileWindow.defaultProps = {
  drag: true,
};

export default FileWindow;
