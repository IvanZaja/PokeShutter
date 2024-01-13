class enemy {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.vx = SPEED_MOVE;
    this.y = y;
    this.w = Math.ceil(137/4);
    this.h = Math.ceil(114/4);

    this.sprite = new Image();
    this.sprite.src = "/assets/img/enemy.png";
    this.sprite.verticalFrames = 3;
    this.sprite.verticalFrameIndex = 2;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    };
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
    }
  }
}
