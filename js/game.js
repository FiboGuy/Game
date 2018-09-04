function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
        this.gameOver();
        this.lifesText();
        this.keys();
        this.commands();
        this.limits();
        this.mario.draw();
        this.luigi.draw();
        this.collision();
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
        this.mario.y -= 10
        this.mario.vx = 0;
        this.mario.vy = -15;
    }

    if (keys[down1]) {
        this.mario.y += 10
        this.mario.vx = 0;
        this.mario.vy = 15;
    }
    if (keys[right1]) {
        this.mario.x += 10
        this.mario.vx = 15;
        this.mario.vy = 0;
    }
    if (keys[left1]) {
        this.mario.x -= 10
        this.mario.vx = -15;
        this.mario.vy = 0;
    }

    if (keys[top2]) {
        this.luigi.y -= 10
        this.luigi.vx = 0;
        this.luigi.vy = -15;
    }

    if (keys[down2]) {
        this.luigi.y += 10
        this.luigi.vx = 0;
        this.luigi.vy = 15;
    }
    if (keys[right2]) {
        this.luigi.x += 10
        this.luigi.vx = 15;
        this.luigi.vy = 0;
    }
    if (keys[left2]) {
        this.luigi.x -= 10
        this.luigi.vx = -15;
        this.luigi.vy = 0;
    }
    if (keys[top1] && keys[right1]) {
        this.mario.vx = 15;
        this.mario.vy = -15;
    }
    if (keys[down1] && keys[right1]) {
        this.mario.vx = 15;
        this.mario.vy = 15;
    }
    if (keys[top1] && keys[left1]) {
        this.mario.vx = -15;
        this.mario.vy = -15;
    }
    if (keys[down1] && keys[left1]) {
        this.mario.vx = -15;
        this.mario.vy = 15;
    }
    if (keys[top2] && keys[right2]) {
        this.luigi.vx = 15;
        this.luigi.vy = -15;
    }
    if (keys[top2] && keys[left2]) {
        this.luigi.vx = -15;
        this.luigi.vy = -15;
    }
    if (keys[down2] && keys[left2]) {
        this.luigi.vx = -15;
        this.luigi.vy = 15;
    }
    if (keys[down2] && keys[right2]) {
        this.luigi.vx = 15;
        this.luigi.vy = 15;
    }
}

Game.prototype.reset = function () {
    this.luigi = new Player(this, 100, this.canvas.height / 2, "green", 15, 0);
    this.mario = new Player(this, this.canvas.width - 100, this.canvas.height / 2, "red", -15, 0);
    this.framesCounter = 0;
}

Game.prototype.limits = function () {
    if (this.mario.x >= canvas.width) {
        this.mario.x = 10
    }
    if (this.mario.x < 5) {
        this.mario.x = canvas.width - 10;
    }
    if (this.mario.y >= canvas.height) {
        this.mario.y = 10
    }
    if (this.mario.y < 5) {
        this.mario.y = canvas.height - 10
    }
    if (this.luigi.x >= canvas.width) {
        this.luigi.x = 10
    }
    if (this.luigi.x < 5) {
        this.luigi.x = canvas.width - 10;
    }
    if (this.luigi.y >= canvas.height) {
        this.luigi.y = 10
    }
    if (this.luigi.y < 5) {
        this.luigi.y = canvas.height - 10
    }
}
Game.prototype.collision=function(){
    for (var i=0;i<this.luigi.bullets.length;i++){
        if(this.mario.distance(this.mario.x,this.mario.y,this.luigi.bullets[i].x,this.luigi.bullets[i].y)<23){
            this.luigi.bullets.splice(i,1);
            this.mario.lifes.splice(0,1);
        }
    }
    for (var i=0;i<this.mario.bullets.length;i++){
        if(this.luigi.distance(this.luigi.x,this.luigi.y,this.mario.bullets[i].x,this.mario.bullets[i].y)<23){
            this.mario.bullets.splice(i,1);
            this.luigi.lifes.splice(0,1);
        }
    }
}
Game.prototype.gameOver=function(){
    if(this.mario.lifes.length===0){
        clearInterval(this.interval);
       
    }
    else if (this.luigi.lifes.length===0){
        clearInterval(this.interval);
    }

}


Game.prototype.lifesText=function(){
    this.ctx.font = '24px serif';
    this.ctx.fillText('Luigi:'+ this.luigi.lifes.join(""), 100, 34);
    this.ctx.font="24 px serif";
    this.ctx.fillStyle="red";
    this.ctx.fillText("Mario: " +this.mario.lifes.join(""),this.canvas.width-200,34);
}













