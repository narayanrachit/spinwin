
let prizes_config = {
    count:12,
    prize_names : ["01","02","03","04","05","06","07","08","09","10", "11","12"]
}



let config = {
    type : Phaser.CANVAS,
    width : 800,
    height:360,
    
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
   
};
let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background','back.jpg');
    console.log(this);
    this.load.image('wheel','wheel.png');
    this.load.image('pin','pin.png');
    this.load.image('stand','stand.png');
       
}
function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 120,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-120,"pin");
    pin.setScale(0.25);
    pin.depth = 1;
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.20); 
    //this.wheel.alpha = 0.5;
    
    
    
    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    
    
    
}

//Game Loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
}

function spinwheel(){
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*35;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You got " + prizes_config.prize_names[idx]);
        },
    });
    
}
