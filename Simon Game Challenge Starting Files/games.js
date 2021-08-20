

button_col=["red","blue","green","yellow"];

function nextSeq()
{

    return Math.floor(Math.random() * 4);
}

var arr=[];
var ind=0;
var lev=0;



$("#green").click(
        
    function ()
    {
        if (arr[ind]=="green")
        {
            if(ind==arr.length-1)
            {
                arr.push(button_col[nextSeq()]);
                ind=0;
                lev++;
                $("#level-title").text("Level "+lev);
                console.log(arr[ind]);
            }
            else
            {
                ind++;
                console.log(arr[ind]);
            }
        }
        else
        {
            GameEnd();
        }
        var gs=new Audio("sounds/blue.mp3");
        gs.play();

    }
)

$("#red").click(
        
    function ()
    {
        if (arr[ind]=="red")
        {
            if(ind==arr.length-1)
            {
                arr.push(button_col[nextSeq()]);
                ind=0;
                lev++;
                $("#level-title").text("Level "+lev);
                console.log(arr[ind]);
            }
            else
            {
                ind++;
                console.log(arr[ind]);
            }
        }
        else
        {
            GameEnd();
            console.log(arr[ind]);
        }
       
        var rs=new Audio("sounds/blue.mp3");
        
        rs.play();
    }
 )

$("#blue").click(
        
    function ()
    {
      
        if (arr[ind]=="blue")
        {
            if(ind==arr.length-1)
            {
                arr.push(button_col[nextSeq()]);
                ind=0;
                lev++;
                $("#level-title").text("Level "+lev);
                console.log(arr[ind]);
            }
            else
            {
                ind++;
                console.log(arr[ind]);
            }
        }
        else
        {
            GameEnd();
        }
      
        var bs=new Audio("sounds/blue.mp3");
      
        bs.play();
    }
 )

        
$("#yellow").click(

    function ()
    {
        if (arr[ind]=="yellow")
        {
            if(ind==arr.length-1)
            {
                arr.push(button_col[nextSeq()]);
                ind=0;
                lev++;
                $("#level-title").text("Level "+lev);
                console.log(arr[ind]);
            }
            else
            {
                ind++;
                console.log(arr[ind]);
            }    
        
        }
        else
        {
            GameEnd();
        }
        var ys=new Audio("sounds/blue.mp3");
        ys.play();
    }
)



function Starter()
{
    $(document).keypress(function()
    {
    GameStart();
    console.log("check 1");
    })
}
Starter();
function GameStart()
{
    $(document).unbind("keypress"); 
    lev=1;  
    $("#level-title").text("Level "+lev);
    arr=[];
    ind=0;
    arr.push(button_col[nextSeq()]);
    console.log(arr[ind]);
}  

function GameEnd()
{

    $("#level-title").text("Game Over press any key to start a new Game");
    var go=new Audio("sounds/wrong.mp3");
    go.play();
    
    Starter();
}




