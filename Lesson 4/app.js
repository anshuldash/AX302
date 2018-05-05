console.log("test....");

var c = document.getElementById("myCanvas");
var ctx =c.getContext("2d");
var img = new Image();
img.src = "bluesquire.png";
img.onload = function(){
	ctx.drawImage(img,300,200,100,200);
};