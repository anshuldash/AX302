var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    {preload:preload, create:create, update:update});
// Phaser.AUTO automatically detect whether to use the WebGL or Canvas renderer.
//'' places canvas in the body tag of this element id 

var score = 0;
var life = 3;

function preload(){
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Create the sky
    game.add.sprite(0, 0, 'sky');
    // Create group of platforms
    platforms = game.add.physicsGroup();
    platforms.enableBody = true;
    // Create the ground
    var ground = platforms.create(0, 550, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    // Create the ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 250, 'ground');
    ledge.body.immovable = true;

    //set text style
    var style = {font: "bold 32px Arial", fill: "#fff"}
    //positioning the score
    scorelabel = game.add.text(300,560, "Score: ", style);
    scoretext = game.add.text(420, 560, score,style);
    scorelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
    scoretext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

    //positioning the lives
    lifelabel = game.add.text(10,5, "Lives: ", style);
    lifetext = game.add.text(120,5, life,style);
    lifelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
    lifetext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

    //Creating the player sprite
    player = game.add.sprite(32,400, 'dude');
    //Animating the player sprite
    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true; 

    //Creating the enemy sprite
    enemy1 = game.add.sprite(760, 20, 'baddie');

    // Animating the enemy1
    enemy1.animations.add('left', [0,1], 10, true);
    enemy1.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy1);
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 500;
    enemy1.body.collideWorldBounds = true;


    // Creating the stars
    stars = game.add.physicsGroup();
    stars.enableBody = true;

    // Creating 12 stars evenly spaced
    for(var i = 0; i < 12; i++){
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //Creating keyboard entries
    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(enemy1, platforms);

    //reset the player's velocity if no events.
    player.body.velocity.x = 0;

    //player movement by keys
    if(cursors.left.isDown){
        //move left
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if(cursors.right.isDown){
        //move right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    //allow the player to jump if touching the ground
    if(cursors.up.isDown && player.body.touching.down){
        //setting velocity.y negative values move up, positive move down  
        player.body.velocity.y = -300;
    }
    game.physics.arcade.overlap(player, stars, collectStar);
    game.physics.arcade.overlap(player, enemy1, loseLife);

    moveEnemy();

    if(life < 0){
        endGame();


    }
}

function collectStar(player,star){
    score = score +1;
    scoretext.setText(score);
    star.kill();
    star.reset(Math.floor(Math.random()*750),0)

}

function loseLife(player,enemy){
    life = life -1;
    lifetext.setText(life);
    enemy.kill();
    enemy.reset(10, 20);
}

function moveEnemy(){
    if(enemy1.x > 759){
        enemy1.animations.play('left');
        enenmy1.body.velocity.x = -120;
    }else if(enemy1.x <405){
        enemy1.animations.play('right');
        enenmy1.body.velocity.x = 120;  
    }
    }
function endGame(){
    player.kill();
    scorelabel.text="GAME OVER! YOU SCORED " + score;
    scoretext.visible = false;
    lifelabel.visible = false;
    lifetext.visible = false;


}


