function Bullets(game,x,y,vx,vy,r) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy=vy;
    this.r = r;
}


Bullets.prototype.draw = function () {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.game.ctx.fill();
}





