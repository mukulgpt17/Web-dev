import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  var [NoteData,Notes]=useState([]);

  function addData(title)
  {
    Notes(prev => 
      {
        return [...prev,title]
      })
  }

  function delteData(id)
  {
    Notes(prev => 
      {
        return prev.filter((elem,ind)=> 
        {
          return ind!==id;
        })
      })
  }
  return (
    <div>
      <Header />
      <CreateArea 
        addData={addData}
      />
      {NoteData.map((element, index) =>{ return <Note key={index} title={element.title} content={element.content} id={index} deleteNt={delteData}/> })
      }
      <Footer />
    </div>
  );
}

export default App;
