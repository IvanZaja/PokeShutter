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
    this.enemies2 = [new Enemy2(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];
    this.enemies3 = [new Enemy3(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];

    this.enemyTick = 1;
    

    // SISTEMAS DE PUNTUACION ////////

    this.score = new Score(this.ctx, 10, 26);
    this.catched = 0;
    this.level = 1;

    /////////////////////////////////
    
    
    this.audioDead = new Audio("/assets/sounds/ballshake.wav");
    this.audioGameOver = new Audio("/assets/sounds/buzzer.wav");
    this.audioGameStarts = new Audio('/assets/sounds/gameBattle.wav');
    this.audioLvlUp = new Audio("/assets/sounds/StatUp.wav");

    this.addEnemyBackoff = 3000;
    this.addEnemy2Backoff = 6000;
    this.addEnemy3Backoff = 6000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
    setTimeout(() => this.addEnemy2(), this.addEnemy2Backoff);
    setTimeout(() => this.addEnemy3(), this.addEnemy3Backoff);
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


  transition() {
    const transition = document.getElementById('blackIn');
    if(transition.className === 'hidden') {
      transition.classList.remove('hidden');
      transition.classList.add('transition1');
      setTimeout(() => {
        transition.classList.add('transition2');
        transition.classList.remove('transition1');
        setTimeout(() => {
          if (transition.classList.value === 'transition2') {
            transition.classList.add('hidden');
            transition.classList.remove('transition2');
          }
        }, 1000)
      }, 1000);
    }  
  }


  levelUp() {
    if(this.score.points % 10 === 0) {
      this.level++;   
      this.audioLvlUp.play();
    }

    if(this.score.points === 20) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg2.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      
      
    } else if (this.score.points === 30) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg3.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      
      
    } else if (this.score.points === 40) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg4.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      
      
    } else if (this.score.points === 50) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
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

    this.enemies2.forEach((Enemy2) => {
      if (Enemy2.x < FINISH_LINE) {
        console.log ('collision');
        this.gameOver();
        this.audioGameOver.play();
        this.audioGameOver.volume = 0.1;
      }
    })

    this.enemies3.forEach((Enemy3) => {
      if (Enemy3.x < FINISH_LINE) {
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
          this.score.inc();
          console.log(`${this.score.points} points`);
          console.log(`${this.level} level`);
          this.levelUp();
        }
        return false;
      } else {
        return true;
      }
    })

    this.player.shouts = this.player.shouts.filter((shout) => {
      const enemy = this.enemies2.find(Enemy2 => Enemy2.collidesWith(shout));
      if (enemy) {
        enemy.hp--;
        enemy.x += 20;
        this.audioDead.play();
        this.audioDead.volume = 0.1;
        if (enemy.isDead()) {
          this.score.inc();
          console.log(`${this.score.points} points`);
          console.log(`${this.level} level`);
          this.levelUp();
        }
        return false;
      } else {
        return true;
      }
    })

    this.player.shouts = this.player.shouts.filter((shout) => {
      const enemy = this.enemies3.find(Enemy3 => Enemy3.collidesWith(shout));
      if (enemy) {
        enemy.hp--;
        enemy.x += 20;
        this.audioDead.play();
        this.audioDead.volume = 0.1;
        if (enemy.isDead()) {
          this.score.inc();
          console.log(`${this.score.points} points`);
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

        if (this.score.points < 10) {
          
          this.enemies.push(
            new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } else if (this.score.points >= 10 && this.score.points < 20) {
          this.enemies.push(
            new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 2)
          );
        } else if (this.score.points >= 30 && this.score.points < 40) {
          this.enemies.push(
            new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } 
    }
    this.addEnemyBackoff = Math.floor(Math.random() * 3 + 1) * 1000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
  }

  addEnemy2() {
    if (this.drawIntervalId) {
      console.log(`Adding enemy, elapsed time ${this.addEnemyBackoff}ms...`)

        if (this.score.points >= 20 && this.score.points < 30) {
          
          this.enemies2.push(
            new Enemy2(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );

        } else if (this.score.points >= 30 && this.score.points < 40) {
          this.enemies2.push(
            new Enemy2(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 2)
          );
        } else if (this.score.points >= 40 && this.score.points < 50) {
          this.enemies2.push(
            new Enemy2(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } 
    }
    this.addEnemy2Backoff = Math.floor(Math.random() * 3 + 1) * 1000;
    setTimeout(() => this.addEnemy2(), this.addEnemy2Backoff);
  }

  addEnemy3() {
    if (this.drawIntervalId) {
      console.log(`Adding enemy, elapsed time ${this.addEnemyBackoff}ms...`)

        
        if (this.score.points >= 40 && this.score.points < 50) {
          this.enemies3.push(
            new Enemy3(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } 
    }
    this.addEnemy3Backoff = Math.floor(Math.random() * 3 + 1) * 1000;
    setTimeout(() => this.addEnemy3(), this.addEnemy3Backoff);
  }

  move() {
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
    this.enemies2.forEach((Enemy2) => Enemy2.move());
    this.enemies3.forEach((Enemy3) => Enemy3.move()); 
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.enemies2.forEach((Enemy2) => Enemy2.draw());
    this.enemies3.forEach((Enemy3) => Enemy3.draw());
    this.score.draw();
  }

  clear() {
    this.player.clear();
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead());
    this.enemies2 = this.enemies2.filter((Enemy2) => !Enemy2.isDead());
    this.enemies3 = this.enemies3.filter((Enemy3) => !Enemy3.isDead());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOver () {
    this.stop();
    this.saveScoreName('Ivan');
    const gameOverPanel = document.getElementById('panelGameOver');
    gameOverPanel.classList.remove('hidden');
    
  }

  saveScoreName(name) {
    const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
    scores[name] = this.score.points;
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  }
}
