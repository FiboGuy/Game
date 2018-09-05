function Bullet(game, x, y, vx, vy,img) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.img=img;
}

//ctx.drawImage(image, dx, dy, dWidth, dHeight);


Bullet.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.x, this.y,15,15);
}

Bullet.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
}

















