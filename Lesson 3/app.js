console.log("test....");

var c1 = document.getElementById("myCanvas1");
var ctx1 = c1.getContext("2d");
ctx1.beginPath();
ctx1.arc(150,150,120,0,6.28);
ctx1.closePath();
ctx1.stroke();
ctx1.fillStyle = "cyan";
ctx1.fill();

var c2 = document.getElementById("myCanvas2");
var ctx2 = c2.getContext("2d");
ctx2.beginPath();
ctx2.moveTo(150,25);
ctx2.lineTo(225, 150);
ctx2.lineTo(75, 150);
ctx2.closePath();
ctx2.fillStyle = "green";
ctx2.fill();
ctx2.strokeStyle = "lime";
ctx2.stroke();





     //  . .                    
     // . .  .          .
     //  . .      .     . .
     //       .... :     .  .
     //  . .      .     . .
     // . . .           .
     //  . .
           
     //            ||
     //  <=========||
     //            ||