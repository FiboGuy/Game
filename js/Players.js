function Player(game,x,y,velocity,color){
    this.game=game;
    this.x=x;
    this.y=y;
    this.velocity=velocity;
    this.color=color;
};

Player.prototype.draw=function(){
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle=this.color;
    this.game.ctx.arc(this.x,this.y,10,0,Math.PI*2,false);
    this.game.ctx.fill();
};









