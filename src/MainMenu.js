import React, { useState } from "react";
import "./MainMenu.css";

const MainMenu = (props) => {
  const [subMenu, setSubMenu] = useState(false);
  return (
    <div style={props.style}>
      <ul className="context-menu" style={props.style}>
        <div className="item-container" onClick={props.newFolder}>
          <li className="item">New Folder</li>
        </div>
        <div className="item-container" onClick={props.newFile}>
          <li className="item">New File</li>
        </div>
      </ul>
    </div>
  );
};

export default MainMenu;
