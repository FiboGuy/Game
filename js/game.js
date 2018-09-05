function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.imgMario = new Image();
    this.imgMario.src = "./Img/Mario.png"
    this.marioWidth = 439;
    this.marioHeight = 239;
    this.imgMarioMirror = new Image();
    this.imgMarioMirror.src = "./Img/Mario-mirror.png";


    this.imgLuigi = new Image();
    this.imgLuigi.src = "./Img/luigi.png"
    this.luigiWidth = 439;
    this.luigiHeight = 241;
    this.imgLuigiMirror = new Image();
    this.imgLuigiMirror.src = "./Img/luigi-mirror.png";

    this.imgMarioFire = new Image();
    this.imgMarioFire.src = "./Img/MarioFire.png";

    this.imgLuigiFire = new Image();
    this.imgLuigiFire.src = "./Img/LuigiFire.png";

    this.imgVBoost=new Image();
    this.imgVBoost.src="./Img/start.png"

    this.music = new Audio();
    this.music.src = "./sounds/10 Bowser Castle.mp3"
    this.music.play();

    this.musicVictory = new Audio();
    this.musicVictory.src = "./sounds/33 Battle Win.mp3"

    this.musicImpact = new Audio();
    this.musicImpact.src = "./sounds/smb_bump.wav"

    
    setTimeout(function () {
        this.createBoosters();
        this.boosterVCreated = true;
    }.bind(this), this.randomNumber());

    console.log(this.randomNumber());
    console.log(this.randomNumber());

    this.reset();
}
Game.prototype.keys = function () {
    document.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    }.bind(this));
    document.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    }.bind(this));
}

Game.prototype.start = function () {
    this.interval = setInterval(function () {
        this.clear();
        this.framesCounter++;
        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }
        this.mario.draw();
        this.luigi.draw();
        if (this.boosterVCreated == true) {
            if (this.boostV.took == false) {
                this.boostV.draw();
                this.getBooster();
            }
        }
        this.keys();
        this.commands();
        this.limits();
        this.gameOver();
        this.collision();
        this.lifesText();
        if (keys[t] && this.framesCounter % 10 == 0) {
            this.luigi.shoot();
        }
        if (keys[shift] && this.framesCounter % 10 == 0) {
            this.mario.shoot();
        }
    }.bind(this), 30);
};

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

var top1 = 38;
var down1 = 40;
var right1 = 39;
var left1 = 37;
var top2 = 87;
var down2 = 83;
var right2 = 68;
var left2 = 65;
var keys = [];
var t = 84;
var shift = 16;


Game.prototype.commands = function () {

    if (keys[top1]) {
        this.mario.y -= this.mario.velocity;
        this.mario.vx = 0;
        this.mario.vy = -20;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 6 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 3 / 5);

    }

    if (keys[down1]) {
        this.mario.y += this.mario.velocity;
        this.mario.vx = 0;
        this.mario.vy = 20;
        this.mario.img = this.imgMario;
        this.mario.sx = 0
        this.mario.sy = Math.floor(this.marioHeight * 4 / 5);
    }
    if (keys[right1]) {
        this.mario.x += this.mario.velocity;
        this.mario.vx = 20;
        this.mario.vy = 0;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = 0
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);


    }
    if (keys[left1]) {
        this.mario.x -= this.mario.velocity;
        this.mario.vx = -20;
        this.mario.vy = 0;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 8 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }

    if (keys[top2]) {
        this.luigi.y -= this.luigi.velocity;
        this.luigi.vx = 0;
        this.luigi.vy = -20;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.luigiWidth * 6 / 9);
        this.luigi.sy = Math.floor(this.luigiHeight * 1 / 5);
    }

    if (keys[down2]) {
        this.luigi.y += this.luigi.velocity;
        this.luigi.vx = 0;
        this.luigi.vy = 20;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = 0
        this.luigi.sy = Math.floor(this.luigiHeight * 1 / 5);

    }
    if (keys[right2]) {
        this.luigi.x += this.luigi.velocity;
        this.luigi.vx = 20;
        this.luigi.vy = 0;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 7 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[left2]) {
        this.luigi.x -= this.luigi.velocity;
        this.luigi.vx = -20;
        this.luigi.vy = 0;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.marioWidth * 1 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[top1] && keys[right1]) {
        this.mario.vx = 20;
        this.mario.vy = -20;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = Math.floor(this.marioWidth * 1 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 2 / 5);
    }
    if (keys[down1] && keys[right1]) {
        this.mario.vx = 20;
        this.mario.vy = 20;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = Math.floor(this.marioWidth * 6 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top1] && keys[left1]) {
        this.mario.vx = -20;
        this.mario.vy = -20;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 7 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 2 / 5);
    }
    if (keys[down1] && keys[left1]) {
        this.mario.vx = -20;
        this.mario.vy = 20;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 2 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top2] && keys[right2]) {
        this.luigi.vx = 20;
        this.luigi.vy = -20;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 4 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top2] && keys[left2]) {
        this.luigi.vx = -20;
        this.luigi.vy = -20;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.marioWidth * 4 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[down2] && keys[left2]) {
        this.luigi.vx = -20;
        this.luigi.vy = 20;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = 0
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[down2] && keys[right2]) {
        this.luigi.vx = 20;
        this.luigi.vy = 20;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 8 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }
}




Game.prototype.reset = function () {
    this.luigi = new Player(this, this.imgLuigiMirror,
        Math.floor(this.luigiWidth * 7 / 9), Math.floor(this.luigiHeight * 4 / 5), Math.floor(this.luigiWidth / 9),
        Math.floor(this.luigiHeight / 5), 100, this.canvas.height / 2 - 100, "green", 20, 0, this.imgLuigiFire);
    this.mario = new Player(this, this.imgMario,
        Math.floor(this.marioWidth * 8 / 9), Math.floor(this.marioHeight * 1 / 5), Math.floor(this.marioWidth / 9),
        Math.floor(this.marioHeight / 5), this.canvas.width - 200, this.canvas.height / 2 - 100, "red", -20, 0, this.imgMarioFire);
    this.framesCounter = 0;
}

Game.prototype.limits = function () {
    if (this.mario.x + 50 >= canvas.width) {
        this.mario.x = 0
    }
    if (this.mario.x + 50 < 0) {
        this.mario.x = canvas.width - 50;
    }
    if (this.mario.y + 50 >= canvas.height) {
        this.mario.y = 0
    }
    if (this.mario.y + 50 < 0) {
        this.mario.y = canvas.height - 50
    }
    if (this.luigi.x + 50 >= canvas.width) {
        this.luigi.x = 0
    }
    if (this.luigi.x + 50 < 0) {
        this.luigi.x = canvas.width - 50;
    }
    if (this.luigi.y + 50 >= canvas.height) {
        this.luigi.y = 0
    }
    if (this.luigi.y + 50 < 0) {
        this.luigi.y = canvas.height - 50
    }
}
Game.prototype.collision = function () {
    for (var i = 0; i < this.luigi.bullets.length; i++) {
        if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.luigi.bullets[i].x, this.luigi.bullets[i].y) < 35) {
            this.luigi.bullets.splice(i, 1);
            this.mario.lifes.splice(0, 1);
            this.musicImpact.play();
        }
    }
    for (var i = 0; i < this.mario.bullets.length; i++) {
        if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.mario.bullets[i].x, this.mario.bullets[i].y) < 35) {
            this.mario.bullets.splice(i, 1);
            this.luigi.lifes.splice(0, 1);
            this.musicImpact.play();
        }
    }
}
Game.prototype.gameOver = function () {
    if (this.mario.lifes.length === 0) {
        clearInterval(this.interval);
        this.music.pause();
        this.musicVictory.play();
        setTimeout(function () {
            this.luigiWins();
        }.bind(this), 500);

    }
    else if (this.luigi.lifes.length === 0) {
        clearInterval(this.interval);
        this.music.pause();
        this.musicVictory.play();
        setTimeout(function () {
            this.marioWins();
        }.bind(this), 500);
    }
}


Game.prototype.lifesText = function () {
    this.ctx.font = '3.5vw Super Mario Brothers';
    this.ctx.fillStyle = "rgb(92, 219, 92)";
    this.ctx.fillText('luigi ' + this.luigi.lifes.join(""), 200, 68);
    this.ctx.fillStyle = "red";
    this.ctx.fillText("mario " + this.mario.lifes.join(""), this.canvas.width - 650, 68);
}


Game.prototype.marioWins = function () {
    $("#canvas").remove();
    $("body").addClass("finish");
    $("body").append("<div class='MarioWins'><h2>MARIO WINS!</h2><button id='playAgain' type='button'>play again</button></div>")
    $("#playAgain").click(function () {
        $("body").removeClass("finish")
        $(".MarioWins").remove();
        $("body").append("<canvas id='canvas'></canvas>")
        var game = new Game("canvas");
        game.start();
    }.bind(this));
}


Game.prototype.luigiWins = function () {
    $("#canvas").remove();
    $("body").addClass("finish");
    $("body").append("<div class='LuigiWins'><h2>LUIGI WINS!</h2><button id='playAgain' type='button'>play again</button></div>")
    $("#playAgain").click(function () {
        $("body").removeClass("finish")
        $(".LuigiWins").remove();
        $("body").append("<canvas id='canvas'></canvas>")
        var game = new Game("canvas");
        game.start();
    }.bind(this));
}

Game.prototype.createBoosters = function () {
    this.boostV = new Booster(this,this.imgVBoost);
}

Game.prototype.getBooster = function () {
    if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.boostV.x, this.boostV.y) < 45) {
        this.boostV.took = true;
        this.boostV = 0;
        this.mario.velocity = 30;
    }
    if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.boostV.x, this.boostV.y) < 45) {
        this.boostV.took = true;
        this.boostV = 0;
        this.luigi.velocity = 30;
    }
}

Game.prototype.randomNumber=function(){
    return Math.floor(Math.random() * (20000 - 5000) + 5000);
}











