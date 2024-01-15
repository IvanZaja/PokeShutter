class shout {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.w = Math.ceil(10);
    this.h = Math.ceil(10);

    this.x = x;
    this.vx = SPEED_SHOUT;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/pokeball.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
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
    this.x += this.vx;
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

  collidesWith (element) {

    return(
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y + this.h > element.h &&
      this.y < element.y + element.h 
    );
  }
}
