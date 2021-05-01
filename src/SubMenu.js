import React from "react";
import "./MainMenu.css";

const SubMenu = (props) => {
  return (
    <div style={props.style}>
      <ul className="context-menu" id="delete" style={props.style}>
        <div className="item-container" onClick={props.delete}>
          <li className="item">Delete</li>
        </div>
      </ul>
    </div>
  );
};

export default SubMenu;
