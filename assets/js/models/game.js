class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;

    this.ctx = this.canvas.getContext("2d");

    this.fps = FPS;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.endline = new endline(this.ctx, FINISH_LINE - 520, FINISH_LINE + 200);
    this.player = new player(this.ctx, PJ_X_PADDING, PJ_Y_PADDING);
    this.enemies = [new enemy(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];

    this.addEnemyBackoff = 3000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);
  }

  start() {

    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  checkCollisions(){
    this.enemies.forEach((enemy) => {
      if (enemy.collidesWith(this.endline)) {
        console.log ('collision');
        this.gameOver();
      }
    })

    this.player.shouts = this.player.shouts.filter((shout) => {
      const enemy = this.enemies.find(enemy => enemy.collidesWith(shout));
      if (enemy) {
        enemy.hp--;
        return false;
      } else {
        return true;
      }
    })
  }

  

  addEnemy() {
    if (this.drawIntervalId) {
      console.log(`Adding enemy, elapsed time ${this.addEnemyBackoff}ms...`)
      this.enemies.push(
        new enemy(
          this.ctx,
          this.canvas.width,
          Math.floor(
            Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100
          )
        )
      );
    }
    this.addEnemyBackoff = Math.floor(Math.random() * 6 + 1) * 1000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
  }

  move() {
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
  }

  draw() {
    this.background.draw();
    this.endline.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
  }

  clear() {
    this.player.clear();
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead())
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver () {
    this.stop();
  }
}
