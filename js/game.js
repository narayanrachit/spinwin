log = function(message){
    console.log( message);
}

let config = {
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update
    }
};
let spining = false;
let game = new Phaser.Game(config);
let curAngle = 0;
function preload(){
    log("Preload called");
    this.load.image('bg','assets/back.jpg');
    this.load.image('wheel','assets/wheel.png');
    this.load.image('oWheel','assets/outerWheel.png');
    this.load.image('pin','assets/pin.png');
    this.load.image('stand','assets/stand.png');
                                                        this.load.image('spinBtn','assets/spin-btn.png');
    this.load.image('spinBtn-spinning','assets/spin-btn-spinning.png');
    this.load.image('spinLogo','assets/spin-n-win-logo.png');
                                                                this.load.audio('spinSound', ['assets/spin-sound.ogg']);
    this.load.audio('spinClick', ['assets/spin-click.ogg']);
    this.load.audio('popup', ['assets/popup-sound.ogg']);
}
function create(){
    log("Create called");
    let width = game.config.width;
    let height = game.config.height;
    this.background =this.add.sprite(width/2,height/2,'bg');
    this.background.depth = -10;
    this.oWheel = this.add.sprite(width/2,height/2,'oWheel');
    this.oWheel.depth = 0;
    this.oWheel.setScale(0.20);
    this.wheel = this.add.sprite(width/2,height/2,'wheel');
    this.wheel.setScale(0.20);
    this.wheel.depth = 1;
    
    this.pin = this.add.sprite(width/2,height/2-250,'pin');
    this.pin.setScale(0.25);
    this.pin.depth = 2;
    this.stand = this.add.sprite(width/2,height/2+250,'stand');
    this.stand.setScale(0.20);
    this.stand.depth = -1;
    this.spinLogo = this.add.image(width, height, 'spinLogo', this);
    this.spinLogo.setScale(0.25);
    this.spinLogo.setPosition(width/2 /*- this.spinLogo.width * this.spinLogo.scale/2*/,height -this.spinLogo.height * this.spinLogo.scale/2);

    //this.spinBtn = this.add.sprite(0,0,'spinBtn');
    this.spinBtn = this.add.image(0, 0, 'spinBtn', this).setInteractive();
    this.spinBtn.setScale(0.25);
    this.spinBtn.setPosition(this.spinBtn.width * this.spinBtn.scale/2,this.spinBtn.height * this.spinBtn.scale/2);
    this.spinBtn.inputEnabled = true;
    this.spinBtn.on('pointerover', function(){this.spinBtn.setTint(0xf0ff00);}, this)
    this.spinBtn.on('pointerout', function(){this.spinBtn.setTint(0xffffff);}, this)
    this.spinBtn.on('pointerdown', spinwheel,this);
    this.spinSound = this.sound.add('spinSound');

    this.spinClick = this.sound.add('spinClick');
    this.popupSound = this.sound.add('popup');

}
function update(){
    log("Update called");

}
function actionOnClick(){
    log("Click action ");
    spinwheel();
}
function spinwheel(){
    if(spining)return;
    //this.spinClick.play();
    this.spinSound.play();
    this.spinBtn.setTexture('spinBtn-spinning');
    spining = true;
    let rounds = Phaser.Math.Between(2,4);
    let spinAngle = rounds*1000 + Math.random()*360;
    curAngle += spinAngle;
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: spinAngle,
        delay: 0,
        ease:"Cubic.easeOut",
        durability: 10000,
        onComplete: function(){log("Completed");game.scene.scenes[0].spinBtn.setTexture('spinBtn');game.sound.sounds[0].pause();game.sound.sounds[2].play();spining = false;calculatePrize(this.targets[0].angle,12,{
            1: "3000 CB CREDITS",
            2: "35% OFF",
            3: "HARD LUCK",
            4: "70% OFF",
            5: "CB SWAGPACK",
            6: "100% OFF",
            7: "NETFLIX SUBS.",
            8: "50% OFF",
            9: "AMAZON VOUCHER",
            10: "2 EXTRA SPIN",
            11: "CB TSHIRT",
            12: "CB BOOK"
        }),this}
    });
    let tweenOuter = this.tweens.add({
        targets: this.oWheel,
        angle: -spinAngle,
        delay: 0,
        ease:"Cubic.easeOut",
        durability: 10000
    });
    let tweenPin = this.tweens.add({
        targets: this.pin,
        angle: 60,
        delay: 0,
        durability: 10000,
    });
    let tweenRevert = this.tweens.add({
        targets: this.pin,
        angle: 0,
        delay: 10000,
        durability: 11000,
    });

    tweenOuter.frameBased = true;
    tweenOuter.timeScale =  0.05;
    tween.frameBased = true;
    tween.timeScale =  0.05;
    log(tween);


}


function calculatePrize(angle,splits,prizes){
    var perPiece = (360/splits);
    angle += perPiece/2;
    if(angle<0){
        angle *= -1;
    }else{
        angle = 360 - angle;
    }
    var resAngle = parseInt((angle)/perPiece)+1 ;
    
    log(resAngle + " is your prize!");
    log(prizes[resAngle]);
    log("Resultant Angle = " + (angle));
    log("Per Piece Angle = " + (360/splits));
    swal("Congrats!", ", You won " + prizes[resAngle] + "!", "success");
}
