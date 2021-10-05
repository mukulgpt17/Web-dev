import React, { useState } from "react";

function ToDoItem(props) {
  var [strike, changeStrike] = useState(false);

  function clicked() {
    props.deleteIt(props.id);
  }

  return (
    <li
      onClick={clicked}
      style={{ textDecoration: strike ? "line-through" : null }}
      key={props.index}
    >
      {props.name}
    </li>
  );
}

export default ToDoItem;
