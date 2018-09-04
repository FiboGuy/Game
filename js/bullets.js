function Bullet(game,x,y,vx,vy,color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.r = 5;
    this.vx=vx;
    this.vy=vy;
    this.color=color;
}


Bullet.prototype.draw = function () {
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle=this.color;
    this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.game.ctx.fill();
}

Bullet.prototype.move=function(){
    this.x+=this.vx;
    this.y+=this.vy;
}

















