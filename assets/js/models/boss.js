class Boss {
    constructor(ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vy = 1;

        this.w = Math.ceil(44 * 3);
        this.h = Math.ceil(34 * 3);

        this.hp = 5;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/enemies/EnemyBoss.png";
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(
              this.sprite.width / this.sprite.horizontalFrames
            );
            this.sprite.frameHeight = Math.ceil(
              this.sprite.height / this.sprite.verticalFrames
            );
        };

        this.shouts = [];
        this.isShutting = false;

        this.animationTick = ENEMY_ANIMATION_TICK;
    }

  clear() {
    this.shouts = this.shouts.filter(
      (attack) => attack.y < 500
    );
  }

    move() {
        this.shouts.forEach((attack) => attack.move());

        this.y += this.vy;
    }

    isDead() {
        return this.hp <= 0;
        
    }

    draw() {

        if (this.y < 30) {
            this.y = PJ_TOP_LIMIT;
          }

        if (this.y > 100) {
        this.y = PJ_TOP_LIMIT;
        }

        if (this.sprite.isReady) {
          this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.w,
            this.h
          );
          this.animate();
        }

        setTimeout(() => this.attack(), 2000);
        this.shouts.forEach((attack) => attack.draw());
        console.log(this.shouts);
    }

    

    attack() {
        
        if (!this.isShutting) {
            this.isShutting = true;
            this.shouts.push(
              new Attack(this.ctx, POKEATTACK_X[Math.floor(Math.random() * 12)] + this.w, this.y + Math.ceil(this.h / 2))
            );
            setTimeout(() => (this.isShutting = false), 500);
          }
        }
    

      animate() {
        this.animationTick++;
    
        if (this.animationTick >= BOSS_ANIMATION_TICK) {
          this.animationTick = 0;
    
          this.sprite.horizontalFrameIndex++;
    
          if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0;
          }
        }
      }

      collidesWith (element) {

        return(
          
          this.x + this.w > element.x &&
          this.x < element.x + element.w &&
          this.y + this.h > element.y &&
          this.y < element.y + element.h 
        );
      }
}