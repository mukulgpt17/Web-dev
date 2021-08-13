function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

 var pl1=getRandomIntInclusive(1,6);
 var pl2=getRandomIntInclusive(1,6);

//  alert(pl1+" "+pl2);

var xx=document.getElementById("i1");
xx.innerHTML="checkl";
 if (pl1==pl2)
 {
    document.getElementById("i1").innerHTML="Its a Draw";
 }
 else if (pl1>pl2)
 {
    document.getElementById("i1").innerHTML="Player 1 Winss";

 }
 else{
    document.getElementById("i1").innerHTML="Player 2 Winrss";

 }

 document.querySelector(".img1").src="images/dice"+pl1+".png";
 document.querySelector(".img2").src="images/dice"+pl2+".png";
