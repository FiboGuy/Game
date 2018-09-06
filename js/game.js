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

    this.imgVBoost = new Image();
    this.imgVBoost.src = "./Img/start.png"

    this.imgDBoost = new Image();
    this.imgDBoost.src = "./Img/doubleShot.png"

    this.imgLBoost = new Image();
    this.imgLBoost.src = "./Img/Heart.png"

    this.music = new Audio();
    this.music.src = "./sounds/10 Bowser Castle.mp3"
    this.music.play();

    this.musicVictory = new Audio();
    this.musicVictory.src = "./sounds/33 Battle Win.mp3"

    this.musicImpact = new Audio();
    this.musicImpact.src = "./sounds/smb_bump.wav"

    this.musicBooster = new Audio();
    this.musicBooster.src = "./sounds/boosterSound.wav"

    this.musicLife = new Audio();
    this.musicLife.src = "./sounds/smb_1-up.wav"

    this.createBoosters();

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

        if (this.boosterDCreated == true) {
            if (this.boostD.took == false) {
                this.boostD.draw();
                this.getBooster();
            }
        }

        if (this.boosterLCreated == true) {
            if (this.boostL.took == false) {
                this.boostL.draw();
                this.getBooster();
            }
        }
        
        this.keys();
        this.commands();
        this.limits();
        this.gameOver();
        this.collision();
        this.lifesText();
        if (keys[t] && this.framesCounter % this.luigi.framesVelocity == 0) {
            this.luigi.shoot();
        }
        if (keys[shift] && this.framesCounter % this.mario.framesVelocity == 0) {
            this.mario.shoot();
        }
    }.bind(this), 1000/60);
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
        this.mario.vy = -this.mario.bulletSpeed;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 6 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 3 / 5);

    }

    if (keys[down1]) {
        this.mario.y += this.mario.velocity;
        this.mario.vx = 0;
        this.mario.vy = this.mario.bulletSpeed;
        this.mario.img = this.imgMario;
        this.mario.sx = 0
        this.mario.sy = Math.floor(this.marioHeight * 4 / 5);
    }
    if (keys[right1]) {
        this.mario.x += this.mario.velocity;
        this.mario.vx = this.mario.bulletSpeed;
        this.mario.vy = 0;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = 0
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);


    }
    if (keys[left1]) {
        this.mario.x -= this.mario.velocity;
        this.mario.vx = -this.mario.bulletSpeed;
        this.mario.vy = 0;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 8 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }

    if (keys[top2]) {
        this.luigi.y -= this.luigi.velocity;
        this.luigi.vx = 0;
        this.luigi.vy = -this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.luigiWidth * 6 / 9);
        this.luigi.sy = Math.floor(this.luigiHeight * 1 / 5);
    }

    if (keys[down2]) {
        this.luigi.y += this.luigi.velocity;
        this.luigi.vx = 0;
        this.luigi.vy = this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = 0
        this.luigi.sy = Math.floor(this.luigiHeight * 1 / 5);

    }
    if (keys[right2]) {
        this.luigi.x += this.luigi.velocity;
        this.luigi.vx = this.luigi.bulletSpeed;
        this.luigi.vy = 0;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 7 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[left2]) {
        this.luigi.x -= this.luigi.velocity;
        this.luigi.vx = -this.luigi.bulletSpeed;
        this.luigi.vy = 0;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.marioWidth * 1 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[top1] && keys[right1]) {
        this.mario.vx = this.mario.bulletSpeed;
        this.mario.vy = -this.mario.bulletSpeed;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = Math.floor(this.marioWidth * 1 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 2 / 5);
    }
    if (keys[down1] && keys[right1]) {
        this.mario.vx = this.mario.bulletSpeed;
        this.mario.vy = this.mario.bulletSpeed;
        this.mario.img = this.imgMarioMirror;
        this.mario.sx = Math.floor(this.marioWidth * 6 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top1] && keys[left1]) {
        this.mario.vx = -this.mario.bulletSpeed;
        this.mario.vy = -this.mario.bulletSpeed;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 7 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 2 / 5);
    }
    if (keys[down1] && keys[left1]) {
        this.mario.vx = -this.mario.bulletSpeed;
        this.mario.vy = this.mario.bulletSpeed;
        this.mario.img = this.imgMario;
        this.mario.sx = Math.floor(this.marioWidth * 2 / 9);
        this.mario.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top2] && keys[right2]) {
        this.luigi.vx = this.luigi.bulletSpeed;
        this.luigi.vy = -this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 4 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[top2] && keys[left2]) {
        this.luigi.vx = -this.luigi.bulletSpeed;
        this.luigi.vy = -this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = Math.floor(this.marioWidth * 4 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 1 / 5);
    }
    if (keys[down2] && keys[left2]) {
        this.luigi.vx = -this.luigi.bulletSpeed;
        this.luigi.vy = this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigi;
        this.luigi.sx = 0
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }

    if (keys[down2] && keys[right2]) {
        this.luigi.vx = this.luigi.bulletSpeed;
        this.luigi.vy = this.luigi.bulletSpeed;
        this.luigi.img = this.imgLuigiMirror;
        this.luigi.sx = Math.floor(this.marioWidth * 8 / 9);
        this.luigi.sy = Math.floor(this.marioHeight * 4 / 5);
    }
}


Game.prototype.reset = function () {
    this.luigi = new Player(this, this.imgLuigiMirror,
        Math.floor(this.luigiWidth * 7 / 9), Math.floor(this.luigiHeight * 4 / 5), Math.floor(this.luigiWidth / 9),
        Math.floor(this.luigiHeight / 5), 100, this.canvas.height / 2 - 100, "green", 10, 0, this.imgLuigiFire);
    this.mario = new Player(this, this.imgMario,
        Math.floor(this.marioWidth * 8 / 9), Math.floor(this.marioHeight * 1 / 5), Math.floor(this.marioWidth / 9),
        Math.floor(this.marioHeight / 5), this.canvas.width - 200, this.canvas.height / 2 - 100, "red", -10, 0, this.imgMarioFire);
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
        if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.luigi.bullets[i].x, this.luigi.bullets[i].y) < 45) {
            this.luigi.bullets.splice(i, 1);
            this.mario.lifes.splice(0, 1);
            this.musicImpact.play();
        }
    }
    for (var i = 0; i < this.mario.bullets.length; i++) {
        if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.mario.bullets[i].x, this.mario.bullets[i].y) < 45) {
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
    this.percentageW=this.canvas.width/100;
    this.percentageH=this.canvas.height/100;
    this.ctx.fillText('luigi ' + this.luigi.lifes.join(""), this.percentageW*15, this.percentageH*9);
    this.ctx.fillStyle = "red";
    this.ctx.fillText("mario " + this.mario.lifes.join(""), this.percentageW*55, this.percentageH*9);
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
    setTimeout(function () {
        this.boostV = new Booster(this, this.imgVBoost);
        this.boosterVCreated = true;
    }.bind(this), this.randomNumber());
    setTimeout(function () {
        this.boostD = new Booster(this, this.imgDBoost);
        this.boosterDCreated = true;
    }.bind(this), this.randomNumber());
    setTimeout(function () {
        this.boostL = new Booster(this, this.imgLBoost);
        this.boosterLCreated = true;
    }.bind(this), this.randomNumber());
};

Game.prototype.getBooster = function () {
    if (this.boosterVCreated == true) {
        if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.boostV.x + 20, this.boostV.y + 20) < 70) {
            this.boostV.took = true;
            this.boostV = 0;
            this.musicBooster.play();
            this.mario.velocity = 10;
        }
        if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.boostV.x + 20, this.boostV.y + 20) < 70) {
            this.boostV.took = true;
            this.boostV = 0;
            this.musicBooster.play();
            this.luigi.velocity = 10;
        }
    }
    if (this.boosterDCreated == true) {
        if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.boostD.x + 20, this.boostD.y + 20) < 70) {
            this.boostD.took = true;
            this.boostD = 0;
            this.musicBooster.play();
            this.mario.framesVelocity = 10;
        }
        if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.boostD.x + 20, this.boostD.y + 20) < 70) {
            this.boostD.took = true;
            this.boostD = 0;
            this.musicBooster.play();
            this.luigi.framesVelocity = 10;
        }
    }
    if (this.boosterLCreated == true) {
        if (this.mario.distance(this.mario.x + 50, this.mario.y + 50, this.boostL.x + 20, this.boostL.y + 20) < 70) {
            this.boostL.took = true;
            this.boostL = 0;
            this.musicLife.play();
            this.mario.lifes.push(["❤"])
        }
        if (this.luigi.distance(this.luigi.x + 50, this.luigi.y + 50, this.boostL.x + 20, this.boostL.y + 20) < 70) {
            this.boostL.took = true;
            this.boostL = 0;
            this.musicLife.play();
            this.luigi.lifes.push(["❤"]);
        }
    }

}

Game.prototype.randomNumber = function () {
    return Math.floor(Math.random() * (20000 - 8000) + 8000);
}











