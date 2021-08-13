
for (var i=0;i<7;i++)
{
    document.querySelectorAll(".drum")[i].addEventListener("click",
        
        function ()
        {
            
            makeSound(this.innerHTML);
            makeAnimation(this.innerHTML);
        }
        )
}





document.addEventListener("keypress",function(event)
    {
        makeSound(event.key);
        makeAnimation(event.key);
    }
);




function makeSound(event)
{

    switch(event)
            {
                case 'w':
                   var te= new  Audio("sounds/crash.mp3");
                   te.play();
                
                case 'a':
                    var te=new Audio("sounds/kick-bass.mp3");
                    te.play();


                case 's':
                    var te=new Audio("sounds/snare.mp3");
                    te.play();
                
                case 'd':
                    var te= new Audio("sounds/tom-1.mp3");   
                    te.play();                 
                case 'j':
                    var te=new Audio("sounds/tom-2.mp3")  ;
                    te.play();   
            
                case 'k':
                    var te=new Audio("sounds/tom-3.mp3");
                    te.play();
                
                case 'l':
                   var te= new Audio("sounds/tom-4.mp3")
                    te.play();
            }


}


function makeAnimation(event)
{

var elem=document.querySelector("."+event);
elem.classList.add("pressed");
setTimeout(function()
{
   elem.classList.remove("pressed");
},100);

}