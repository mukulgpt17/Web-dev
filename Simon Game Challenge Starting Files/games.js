

button_col=["red","blue","green","yellow"];

function nextSeq()
{

    return Math.floor(Math.random() * 4);
}

$("#green").click(
        
    function ()
    {
        var gs=new Audio("sounds/blue.mp3");
        gs.play();
    }
)

$("#red").click(
        
    function ()
    {
        var rs=new Audio("sounds/blue.mp3");
        rs.play();
    }
 )

$("#blue").click(
        
    function ()
    {
        var bs=new Audio("sounds/blue.mp3");
        bs.play();
    }
 )

        
$("#yellow").click(

    function ()
    {
        var ys=new Audio("sounds/blue.mp3");
        ys.play();
    }
)
            

    






