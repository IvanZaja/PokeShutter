class Attack {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.w = Math.ceil(222/3);
    this.h = Math.ceil(250/3);

    this.x = x;
    this.vy = 5;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/attack.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
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
  }

  move() {
    this.y += this.vy;
  }

  draw() {
    if(this.sprite.isReady) {
      this.ctx.drawImage (
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
    }
  }

  animate() {
    this.animationTick++;

    if (this.animationTick >= 15) {
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
      this.y + this.h > element.h &&
      this.y < element.y + element.h 
    );
  }
}
