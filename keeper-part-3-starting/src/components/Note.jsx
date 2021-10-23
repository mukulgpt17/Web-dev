import React from "react";

function Note(props) {

  function deleteNote(event)
  {
    props.deleteNt(props.id);
    event.preventDefault();
  }

  return (
    
  
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>DELETE</button>
    </div>
  );
}

export default Note;
