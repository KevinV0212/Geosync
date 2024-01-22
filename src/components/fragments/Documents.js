import React from "react";
import "./Documents.css";

function Documents() {
  return (
    <div className="lists-container">
      <div className="list-container">
        <h2>Mission Statement</h2>
        <ul className="list1">
          <li>
            <a href="#">Mission Statement 1</a>
          </li>
          <li>
            <a href="#">Mission Statement 2</a>
          </li>
          <li>
            <a href="#">Mission Statement 3</a>
          </li>
        </ul>
      </div>
      <div className="list-container">
        <h2>Tasks</h2>
        <ul className="list2">
          <li>
            <a href="#">Task 1</a>
          </li>
          <li>
            <a href="#">Task 2</a>
          </li>
          <li>
            <a href="#">Task 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Documents;
