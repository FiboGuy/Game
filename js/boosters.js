function Booster(game, img) {
    this.game = game;
    this.x = Math.floor(Math.random() * this.game.canvas.width);
    this.y = Math.floor(Math.random() * this.game.canvas.height);
    this.wd = 40;
    this.wh = 40;
    this.img = img;
    this.took = false;
}

Booster.prototype.draw = function () {
    if (this.took == false) {
        this.game.ctx.drawImage(this.img, this.x, this.y, this.wd, this.wh)
    }
}