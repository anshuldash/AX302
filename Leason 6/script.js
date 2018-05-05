// Declaring all variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// Width and height of canvas
var WIDTH = 600;
var HEIGHT = 600;
// position and radius of player
var x = 300;
var y = 300;
var s = 50;
// Player speed in x-y directions
var mx = 0;
var my = 0;
// Positions, size and collision check of circle
var circleX;
var circleY;
var circleS = 50;
var circleCollision = false;

//Variable for the score
var score = 0;





// Import images onto canvas
function drawPacman(){
  var pacman = new Image();
  pacman.src = "donald.jpg";
  ctx.drawImage(pacman, x, y, s, s);
  }



function drawCircle() {
  var circle = new Image();
  circle.src = "darkvoyager.png";
  ctx.drawImage(circle, circleX, circleY, circleS, circleS);
}




// Wiping canvas
function clear () {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}




// Initialise our animation
function init() {
	// Put circle in random position
  circleX = Math.floor(Math.random()* (WIDTH - circleS));
  circleY = Math.floor(Math.random()* (HEIGHT - circleS));
	// Wait for user to press keyboard
  window.onkeydown = keydownControl;
	// Redraws our canvas every 10ms
	return setInterval(draw, 10);
}







// Repeated draw function
function draw() {
	clear();
  drawPacman();
  drawCircle();
	// Make player bounce off the walls and go in the opposite direction
	if (x + mx > WIDTH - s || x + mx < 0){
		mx = -mx;
	} else if (y + my > WIDTH - s || y + my < 0) {
		my = -my;
	}

	// Moves our player
	x += mx;
	y += my;

	// Check for collisions

  collisionCheck();
  collisionHandle();
}



//Function to check for collisions
function collisionCheck() {
  if ((x+s >= circleX) && (x <= circleX + circleS) && (y+s >= circleY) && (y <= circleY + circleS) ) {
    circleCollision = true;
  } else {
    circleCollision = false;
  }
}

//Function to handle the collision

function collisionHandle() {
  if (circleCollision) {
    circleX = Math.floor(Math.random()*(WIDTH - circleS));
    circleY = Math.floor(Math.random()*(WIDTH - circleS));
    score += 1;
    document.getElementById("score").innerHTML = score;
  }
}

//Function to handle the keypresses


function keydownControl(e) {
  // Change the direction depending button is pressed
  if (e.keyCode == 37) {
    mx = -4;
    my = 0;
  }
  if (e.keyCode == 38) {
    mx = 0;
    my = -4;
  }
  if (e.keyCode == 39) {
    mx = 4;
    my = 0;
  }
  if (e.keyCode == 40) {
    mx = 0;
    my = 4;
  }
}




init();











function click1(){
  document.getElementById("title").style.color = "white";
};
