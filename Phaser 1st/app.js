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
}