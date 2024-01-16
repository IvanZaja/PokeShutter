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
    this.enemies = [new enemy(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];

    this.points = 0;

    this.level = 1;
    
    this.audioDead = new Audio("/assets/sounds/ballshake.wav");
    this.audioGameOver = new Audio("/assets/sounds/buzzer.wav");
    this.audioGameStarts = new Audio('/assets/sounds/gameBattle.wav')

    this.addEnemyBackoff = 3000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
  }

  onKeyEvent(event) {
    this.player.onKeyEvent(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.audioGameStarts.play();
        this.audioGameStarts.volume = 0.05;
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.endGame();
      }, this.fps);
    }
  }




  levelUp() {
    if(this.points % 10 === 0) {
      this.level++;
    }
  } 

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  endGame() {
    this.enemies.forEach((enemy) => {
      if (enemy.x < FINISH_LINE) {
        console.log ('collision');
        this.gameOver();
        this.audioGameOver.play();
        this.audioGameOver.volume = 0.1;
      }
    })
  }


  checkCollisions(){
    this.endGame();

    this.player.shouts = this.player.shouts.filter((shout) => {
      const enemy = this.enemies.find(enemy => enemy.collidesWith(shout));
      if (enemy) {
        enemy.hp--;
        if (enemy.isDead()) {
          this.audioDead.play();
          this.audioDead.volume = 0.1;
          this.points++;
          console.log(`${this.points} points`);
          console.log(`${this.level} level`);
          this.levelUp();
        }
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
        new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), this.level)
      );
    }
    this.addEnemyBackoff = Math.floor(Math.random() * 3 + 1) * 1000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
  }

  move() {
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
  }

  draw() {
    
    this.background.draw();
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
