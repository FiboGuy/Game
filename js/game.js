function Game(canvasId){
    this.canvas=document.getElementById(canvasId);
    this.ctx=this.canvas.getContext("2d");
    this.canvas.width=window.innerWidth;
    this.canvas.height=window.innerHeight;
    this.reset();
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});




Game.prototype.start=function(){
    this.interval=setInterval(function(){
    this.clear();
    this.movement();
    this.mario.draw();
    this.luigi.draw();
    }.bind(this),30);
};

Game.prototype.clear=function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}
var top1=38;
var down1=40;    
var right1=39;
var left1=37;
var top2=87;
var down2=83;
var right2=68;
var left2=65;
var keys = [];


Game.prototype.movement=function(){
    if (keys[top1]) {
        this.mario.y-=5
    }

    if (keys[down1]) {
        this.mario.y+=5
    }
    if (keys[right1]) {
        this.mario.x+=5
    }
    if (keys[left1]) {
        this.mario.x-=5
    }

    if (keys[top2]) {
        this.luigi.y-=5
    }

    if (keys[down2]) {
        this.luigi.y+=5
    }
    if (keys[right2]) {
        this.luigi.x+=5
    }
    if (keys[left2]) {
        this.luigi.x-=5
    }
}

Game.prototype.reset=function(){
    this.luigi=new Player(this,100,this.canvas.height/2,1,"green");
    this.mario=new Player(this,this.canvas.width-100,this.canvas.height/2,1,"red");

}





