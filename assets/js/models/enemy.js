class enemy {
  constructor(ctx, x, y, level) {
    this.ctx = ctx;

    this.x = x;
    this.vx = ENEMY_SPEED_MOVE * level;
    this.y = y;
    
    this.w = Math.ceil(137 / 4);
    this.h = Math.ceil(114 / 4);

    this.sprite = new Image();
    this.sprite.src = "/assets/img/enemy.png";
    this.sprite.verticalFrames = 3;
    this.sprite.verticalFrameIndex = 2;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;


    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.ceil(
        this.sprite.height / this.sprite.verticalFrames
      );
    };

    this.animationTick = ENEMY_ANIMATION_TICK;

    this.hp = 1;
  }

  isDead() {
    
    return this.hp <= 0;
  }

  move() {
    this.x -= this.vx;
  }

  draw() {
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
  }

  animate() {
    this.animationTick++;

    if (this.animationTick >= ENEMY_ANIMATION_TICK) {
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
