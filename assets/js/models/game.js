class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;

    this.ctx = this.canvas.getContext("2d");

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.player = new player(this.ctx, PJ_X_PADDING, PJ_Y_PADDING);
    this.enemy = new enemy(this.ctx, this.canvas.width -50, ENEMY_Y_PADDING);
    //  this.shout = new shout(this.ctx, 250, 250);
  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);
  }

  onClickEvent(event) {
    this.shout.onClickEvent(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  move() {
    this.player.move();
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemy.draw();
    // this.shout.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
