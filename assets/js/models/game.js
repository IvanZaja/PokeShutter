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
    this.playerH = new PlayerH(this.ctx, 350, 445);
    this.enemies = [new enemy(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];
    this.enemies2 = [new Enemy2(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];
    this.enemies3 = [new Enemy3(this.ctx, this.canvas.width, ENEMY_Y_PADDING)];
    this.boss = new Boss(this.ctx, BOSS_X_PADDING, BOSS_Y_PADDING);

    this.enemyTick = 1;
    
    this.userName = undefined;

    this.started = false;

    // SISTEMAS DE PUNTUACION ////////

    this.score = new Score(this.ctx, 10, 26);
    this.catched = 0;
    this.level = 1;

    /////////////////////////////////

    this.tutorial = {
      isOpen: false,
      isClose: false,
      isFinish: false
    };
    
    /////////////////////////////////
    
    this.audioDead = new Audio("/assets/sounds/ballshake.wav");
    this.audioGameOver = new Audio("/assets/sounds/buzzer.wav");
    this.audioGameStarts = new Audio('/assets/sounds/gameBattle.wav');
    this.audioLvlUp = new Audio("/assets/sounds/StatUp.wav");
    this.audioWin = new Audio("/assets/sounds/Radio.wav");
    this.audioBoss = new Audio("/assets/sounds/249Cry.ogg");
  

    this.addEnemyBackoff = 3000;
    this.addEnemy2Backoff = 7000;
    this.addEnemy3Backoff = 10000;
    setTimeout(() => this.addEnemy(), this.addEnemyBackoff);
    setTimeout(() => this.addEnemy2(), this.addEnemy2Backoff);
    setTimeout(() => this.addEnemy3(), this.addEnemy3Backoff);
  }




  help() {
    if(!this.tutorial.isOpen || !this.tutorial.isClose || !this.tutorial.isFinish) {
      const tutorialPanel = document.getElementById('main-tutorial');
      const tutorialPanel2 = document.getElementById('main-tutorial2');
      if(!this.tutorial.isOpen) {
        this.tutorial.isOpen = true;
        this.stop();
        tutorialPanel.classList.remove('hidden');
      } else if (!this.tutorial.isFinish) {
        this.tutorial.isFinish = true;
        tutorialPanel.classList.add('hidden');
        tutorialPanel2.classList.remove('hidden');
      } else if (!this.tutorial.isClose) {
        tutorialPanel2.classList.add('hidden');
        this.start();
        this.tutorial.isClose = true;
      }     
    }
  }
  
  onKeyEvent(event) {
    if(this.score.points < 25) {
      this.player.onKeyEvent(event);
    } else {
      this.playerH.onKeyEvent(event);
    }
    
    const enabled = event.type === "keydown";
    switch (event.keyCode) {
      case KEY_FIRE:
        if (enabled && this.player.pokeballs === 0) {
          this.help();
        }
        break;
    }
  }


  start() {

    if(!this.started){
      this.started = true;
      this.userName = prompt("Please enter your name:", "Player");
      if (this.userName != null && this.userName != "") {
        
        if (!this.drawIntervalId) {
          this.drawIntervalId = setInterval(() => {
            this.audioGameStarts.play();
            this.audioGameStarts.volume = 0.05;
            if(this.score.points === 26){
              this.boss.w = 0;
              this.boss.h = 0;
              this.boss.shouts = [];
            this.background.sprite.src = '/assets/img/maps/bgBOSS2.jpg';
            setTimeout(() =>{
            this.congrats();
          }, 1000)
            }
            this.clear();
            this.move();
            this.draw();
            this.checkCollisions();
            this.endGame();
          }, this.fps);
        }
      } else {
      if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
          this.audioGameStarts.play();
          this.audioGameStarts.volume = 0.05;
          if(this.score.points === 26){
            this.boss.w = 0;
            this.boss.h = 0;
            this.boss.shouts = [];
            this.background.sprite.src = '/assets/img/maps/bgBOSS2.jpg';
          setTimeout(() =>{
            this.congrats();
          }, 1000)
          }
          this.clear();
          this.move();
          this.draw();
          this.checkCollisions();
          this.endGame();
        }, this.fps);
      }
    }

    
  } else {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.audioGameStarts.play();
        this.audioGameStarts.volume = 0.05;
        if(this.score.points === 26){
          this.boss.w = 0;
          this.boss.h = 0;
          this.boss.shouts = [];
          this.background.sprite.src = '/assets/img/maps/bgBOSS2.jpg';
          setTimeout(() =>{
            this.congrats();
          }, 1000)
        }
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();
        this.endGame();
      }, this.fps);
    }
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
    if(this.score.points % 5 === 0) {
      this.level++;   
      this.audioLvlUp.play();
      this.audioLvlUp.volume = 0.3;
    }
    if(this.score.points === 10) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg2.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      this.player.shouts = [];
      
    } else if (this.score.points === 15) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg3.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      this.player.shouts = [];
      
    } else if (this.score.points === 20) {
      this.transition();
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bg4.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      this.player.shouts = [];
      
      
    } else if (this.score.points === 25) {
      this.transition();
      this.audioBoss.play();
      this.audioBoss.volume = 0.05;
      setTimeout(() => this.background.sprite.src = '/assets/img/maps/bgBOSS.jpg', 1000);
      this.enemies = [];
      this.enemies2 = [];
      this.enemies3 = [];
      this.player.shouts = [];
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

    this.playerH.shouts = this.playerH.shouts.filter((shoutV) => {
      const boss = this.boss.collidesWith(shoutV);
      if (boss) {
        this.boss.hp--;
        this.boss.y -= 50;
        this.audioDead.play();
        this.audioDead.volume = 0.1;
        console.log(this.boss.hp);
        if (this.boss.isDead()) {
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

    this.boss.shouts = this.boss.shouts.filter((attack) => {
      const playerH = this.playerH.collidesWith(attack);
      if (playerH) {
        this.gameOver();
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

        if (this.score.points < 5) {
          
          this.enemies.push(
            new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } else if (this.score.points >= 5 && this.score.points < 10) {
          this.enemies.push(
            new enemy(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 2)
          );
        } else if (this.score.points >= 15 && this.score.points < 20) {
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

        if (this.score.points >= 10 && this.score.points < 15) {
          
          this.enemies2.push(
            new Enemy2(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );

        } else if (this.score.points >= 15 && this.score.points < 20) {
          this.enemies2.push(
            new Enemy2(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 2)
          );
        } else if (this.score.points >= 20 && this.score.points < 25) {
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

        
        if (this.score.points >= 20 && this.score.points < 25) {
          this.enemies3.push(
            new Enemy3(this.ctx, this.canvas.width, Math.floor (Math.random() * (Math.floor(450) - Math.ceil(200) + 5) + 100), 1)
          );
        } 
    }
    this.addEnemy3Backoff = Math.floor(Math.random() * 3 + 1) * 1000;
    setTimeout(() => this.addEnemy3(), this.addEnemy3Backoff);
  }



  move() {
    if(this.score.points < 25) {
      this.player.move();
    } else {
      this.playerH.move();
    }
    this.enemies.forEach((enemy) => enemy.move());
    this.enemies2.forEach((Enemy2) => Enemy2.move());
    this.enemies3.forEach((Enemy3) => Enemy3.move()); 
    this.boss.move();
  }

  draw() {
    this.background.draw();
    if(this.score.points < 25) {
      this.player.draw();
    } else {
      this.playerH.draw();
    }
    this.enemies.forEach((enemy) => enemy.draw());
    this.enemies2.forEach((Enemy2) => Enemy2.draw());
    this.enemies3.forEach((Enemy3) => Enemy3.draw());
    if(this.score.points >= 25) {
      this.boss.draw();
    }
    this.score.draw();
  }

  clear() {
    if(this.score.points < 25) {
      this.player.clear();
    } else {
      this.playerH.clear();
    }
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead());
    this.enemies2 = this.enemies2.filter((Enemy2) => !Enemy2.isDead());
    this.enemies3 = this.enemies3.filter((Enemy3) => !Enemy3.isDead());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  congrats() {
      this.stop();
      const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
      scores[this.userName] = this.score.points;
      localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
      this.transition();
      this.audioGameStarts.pause();
      this.audioGameStarts.currentTime = 0; 
      setTimeout(() => {
        this.audioWin.play();
        this.audioWin.volume = 0.05;
        const winnerPanel = document.getElementById('winnerPanel');
        winnerPanel.classList.remove('hidden');
      }, 1000);
  }

  

  gameOver () {
    this.stop();
    const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
    scores[this.userName] = this.score.points;
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));

    const points = document.getElementById('points');
    points.textContent = `${this.userName} » ${this.score.points} points`;

    const gameOverPanel = document.getElementById('panelGameOver');
    gameOverPanel.classList.remove('hidden');
  }
}