import React from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Notes from "./Notes.jsx";

function App()
{
    return (
        <div>
            <Header />
            <Notes title="I am title " content="I am content,So i should be little larger." />
            <Footer />  
        </div>
    )
}

export default App;

