class player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = SPEED_MOVE;
    this.w = Math.ceil(115 / 2.7);
    this.h = Math.ceil(153 / 2.7);

    this.sprite = new Image();
    this.sprite.src = "/assets/img/pj-sprite.png";
    this.sprite.verticalFrames = 3;
    this.sprite.verticalFrameIndex = 2;
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    };

    this.movements = {
      up: false,
      down: false,
    };

    this.animationTick = 0;
  }

  onKeyEvent(event) {
    const enabled = event.type === "keydown";
    
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = enabled;
        break;
      case KEY_DOWN:
        this.movements.down = enabled;
        break;
    }
  }

  move() {
    if (this.movements.up) {
      this.y -= this.vy;
    } else if (this.movements.down) {
      this.y += this.vy;
    }


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

      if (this.movements.up) {
        this.animateUp();
      } else if (this.movements.down) {
        this.animateDown();
      } else {
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 2;
      }
    }
  }

  animateUp() {
    this.animationTick++;

    if (this.movements.up) {
      this.sprite.horizontalFrameIndex = 1;
      this.sprite.verticalFrameIndex = 1;
    } else if (
      this.animationTick >= PJ_RUN_ANIMATION_TICK &&
      this.movements.up
    ) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;
      this.sprite.verticalFrameIndex = 1;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
        this.sprite.verticalFrameIndex = 1;
      }
    }
  }

  animateDown() {
    this.animationTick++;

    if (this.movements.down) {
      this.sprite.horizontalFrameIndex = 1;
      this.sprite.verticalFrameIndex = 0;
    } else if (
      this.animationTick >= PJ_RUN_ANIMATION_TICK &&
      this.movements.down
    ) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;
      this.sprite.verticalFrameIndex = 0;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
        this.sprite.verticalFrameIndex = 0;
      }
    }
  }
}
