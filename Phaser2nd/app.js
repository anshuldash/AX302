var game = new Phaser.Game(800, 600, Phaser.AUTO, '' , {preload:preload, create:create, update:update});

var score=0;
var lives=3;


function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png');
    game.load.spritesheet('baddie', 'assets/baddie.png');
}

function create(){
	game.physics.startSystem(Phase.Physics.ARCADE);
    
    //making the sky
	game.add.sprite(0,0, 'sky');

	//creating a group of platforms
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	// creating the ground
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	//creating a ledge
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground')
	ledge.body.immovable = true;

	//set the text style
	var style = {font: "bold 32px Arial", fill: "#fff"}
    
    //positioning the score
    scorelabel = game.add.text(300,560, "Score: ", style);
    scoretext = game.add.text(420, 560, score,style);
    scorelabel.setShadow(3,3, 'rgba(0,0,0,0,5)',2);
    scoretext.setShadow(3,3, 'rgba(0,0,0,0,5)',2);

    //positioning the lives
    liveslabel = game.add.text(300,560, "Lives: ", style);
    livestext = game.add.text(420, 560, lives,style);
    liveslabel.setShadow(3,3, 'rgba(0,0,0,0,5)',2);
    livestext.setShadow(3,3, 'rgba(0,0,0,0,5)',2);

    //creating the player sprite
    player = game.add.sprite(32, 400, 'dude');

    //animating the player sprite
    player.animations.add('left',[0, 1, 2, 3],10,true);
    player.animations.add('right',[5, 6, 7, 8],10,true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBonus = true;

    //creating the enemy sprite
    enemy1 = game.add.sprite(760, 20, 'baddie');

    //animating enemy1
    enemy1.animations.add('left',[0, 1],10,true);
    enemy1.animations.add('right',[2, 3],10,true);
    game.physics.arcade.enable(player);
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 300;
    enemy1.body.collideWorldBounds = true;

    //creating the stars
    stars = game.add.physicsGroup();
    stars.enableBody = true;

    //creating 12 stars evenly spaced
    for(var i = 0; i < 12; i++){
    	var star = stars.create(i * 70, 0, 'star');
    	star.body.gravity.y = 200;
    	star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    //creating keyboard entries
    cursors = game.input.keyboard.createCursorsKeys();

    //updating function
    function update(){
    	game.physics.arcde.collide(player, platforms);
    	game.physics.arcde.collide(stars, platforms);
    	game.physics.arcde.collide(enemy1, platforms);

    	//reseting the players velocity if no events
    	player.body.velocity.x = 0;
    }
}