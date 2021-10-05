import React, { useState } from "react";

import ToDoItem from "./item";

function App() {
  var [text, Change] = useState("");
  var [textArray, Changearr] = useState([]);

  function itemText(event) {
    var value = event.target.value;
    Change(value);
  }

  function itemAdd(event) {
    Changearr((prev) => {
      return [...prev, text];
    });
    event.preventDefault();
  }

  function deleteItem(id)
  {

    Changearr((prev)=>
    {
      return prev.filter((element,ind) =>  ind!=id );
      
    })
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <form onSubmit={itemAdd}>
          <input onChange={itemText} name="item" type="text" value={text} />
          <button type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
      <div>
        <ul>
          {textArray.map(function (name, index) {
            return <ToDoItem name={name} key={index} index={index} id={index} deleteIt={deleteItem} />;
          })}
        </ul>
        <h2>{textArray.length}</h2>
      </div>
    </div>
  );
}

export default App;
