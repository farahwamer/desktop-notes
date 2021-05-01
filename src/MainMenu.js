import React, { useState } from "react";
import "./MainMenu.css";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

const MainMenu = (props) => {
  const [subMenu, setSubMenu] = useState(false);
  return (
    <div style={props.style}>
      <ul className="context-menu" style={props.style}>
        <div
          className="item-container"
          onClick={props.newFolder}
          onMouseEnter={() => setSubMenu(false)}
        >
          <li className="item">New Folder</li>
        </div>
        <div
          className="item-container"
          onClick={props.newFile}
          onMouseEnter={() => setSubMenu(false)}
        >
          <li className="item">New File</li>
        </div>
        <hr className="divider" />
        <div className="item-container" onMouseEnter={() => setSubMenu(true)}>
          <li className="item" id="sub-menu">
            Change Theme
            {subMenu ? (
              <AiFillCaretDown className="arrow" />
            ) : (
              <AiFillCaretRight className="arrow" />
            )}
          </li>
        </div>
        {subMenu ? (
          <ul
            className="context-menu"
            id="sub-context-menu"
            onMouseLeave={() => setSubMenu(false)}
          >
            <div className="item-container">
              <li className="item">Cool Berry</li>
            </div>
            <div className="item-container">
              <li className="item">Peachy</li>
            </div>
          </ul>
        ) : null}
      </ul>
    </div>
  );
};

export default MainMenu;
