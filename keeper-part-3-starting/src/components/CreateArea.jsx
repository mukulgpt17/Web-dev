import React, { useState } from "react";

function CreateArea(props) {
  
  var [current,currData]=useState({title:"",content:""});
  
  function added(event)
  {
    if(current.title!=="")
   { props.addData(current)

    currData({
      title:"",
      content:""
    })
}
  else
  {
    alert("tile is empty")
  }
    event.preventDefault()  }

  function NoteDataHand(event)
  {
    var {value,name}=event.target;

    if (name==="title")
    {
      currData(prev => {
        return {
          title:value,
          content:prev.content
        }
      })
    }
    else{
      
      currData(prev => {
        return {
          title:prev.title,
          content:value
        }
      })
    }
  }

  return (
    <div>
      <form onSubmit={added}>
        <input name="title" placeholder="Title" value={current.title} onChange={NoteDataHand}/>
        <textarea name="content" placeholder="Take a note..." rows="3" value={current.content} onChange={NoteDataHand} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
