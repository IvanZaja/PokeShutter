class Mario {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.vx = SPEED_MOVE;
    this.y = y;
    this.y0 = this.y;
    this.vy = 0;
    this.w = 50;
    this.h = 50;

    this.movements = {
      right: false,
      left: false,
      isJumping: false
    }
  }

  onKeyEvent(event) {
    const enabled = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = enabled;
        break;
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_UP:
        if (enabled) {
          this.jump();
        }
        break;
    }
  }

  jump() {
    if (!this.movements.isJumping) {
      this.movements.isJumping = true;
      this.y -= Math.ceil(this.h / 2);
      this.vy = -SPEED_JUMP;
    }
  }

  move() {
    if (this.movements.right) {
      this.x += this.vx;
    } else if (this.movements.left) {
      this.x -= this.vx;
    }

    if (this.y < this.y0) {
      this.vy += ACCELERATION;
      this.y += this.vy;
    } else {
      this.y = this.y0;
      this.movements.isJumping = false;
    }
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

}