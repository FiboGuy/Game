function Player(game, img, sx, sy, dw, dh, x, y, color, vx, vy,imgFire) {
    this.game = game;
    this.img = img;
    this.sx = sx;
    this.sy = sy;
    this.dw = dw;
    this.dh = dh;
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.color = color;
    this.bullets = [];
    this.vx = vx;
    this.vy = vy;
    this.imgFire=imgFire;
    this.lifes = ["|", "|", "|", "|", "|", "|"];

};

Player.prototype.draw = function () {

    this.game.ctx.drawImage(this.img, this.sx, this.sy, this.dw,
        this.dh, this.x, this.y, this.w, this.h);

    this.bullets = this.bullets.filter(function (bullet) {
        return bullet.x < this.game.canvas.width && bullet.x > 0 && bullet.y > 0 && bullet.y < this.game.canvas.height;
    }.bind(this));

    this.bullets.forEach(bullet => {
        bullet.draw();
        bullet.move();
    });
};

Player.prototype.shoot = function () {
    var bullet = new Bullet(this.game,this.x + 50, this.y + 50, this.vx, this.vy,this.imgFire);
    this.bullets.push(bullet);
}

Player.prototype.distance = function (x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}






































