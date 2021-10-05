import React from "react";

function Footer()
{
    var dt=new Date().getFullYear();
    
    return (
       <footer> <p className= "footer">
            Copyright {dt} 
        </p>
        </footer>
    )
}

export default Footer;