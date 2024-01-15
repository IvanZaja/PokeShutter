class player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = SPEED_MOVE;
    this.w = Math.ceil(115 / 2.7);
    this.h = Math.ceil(153 / 2.7);

    this.audioShout = new Audio("/assets/sounds/throw.wav");
    this.audioReload = new Audio('/assets/sounds/ItemGet.wav')
    this.audioNoPokeballs = new Audio('/assets/sounds/exclaim.wav')

    this.reaction = new Image();
    this.reaction.src = '/assets/img/NoBalls.png';
    this.reaction.verticalFrames = 1;
    this.reaction.verticalFrameIndex = 0;
    this.reaction.horizontalFrames = 1;
    this.reaction.horizontalFrameIndex = 0;

    this.reaction.w = Math.ceil(163 / 5.5);
    this.reaction.h = Math.ceil(160 / 5.5);


    this.reaction.onload = () => {
      this.reaction.isReady = true;
      this.reaction.frameWidth = Math.ceil(
        this.reaction.width / this.reaction.horizontalFrames
      );
      this.reaction.frameHeight = Math.ceil(
        this.reaction.height / this.reaction.verticalFrames
      );
    };

    this.sprite = new Image();
    this.sprite.src = "/assets/img/pj-sprite.png";
    this.sprite.verticalFrames = 3;
    this.sprite.verticalFrameIndex = 2;
    this.sprite.horizontalFrames = 3;
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

    this.pokeballs = 6;

    this.shouts = [];

    this.movements = {
      up: false,
      down: false,
      isShutting: false,
    };

    this.animationTick = PJ_ANIMATION_TICK;
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
      case KEY_FIRE:
        if (enabled) {
          this.fire();
        }
        break;
    }
  }

  fire() {
    const disabled = event.type === "keyup"
    if (this.pokeballs === 0) {
      this.audioNoPokeballs.play();
      KEY_FIRE = disabled;
    }

    if (!this.movements.isShutting) {
      this.movements.isShutting = true;
      this.audioShout.play();
      this.pokeballs--;
      console.log(this.pokeballs)
      this.shouts.push(
        new shout(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2))
      );
      setTimeout(() => (this.movements.isShutting = false), PJ_SHOUT_INTERVAL);
    }
  }

  clear() {
    this.shouts = this.shouts.filter(
      (shout) => shout.x < this.ctx.canvas.width
    );
  }

  move() {
    this.shouts.forEach((shout) => shout.move());

    if (this.movements.up) {
      this.y -= this.vy;
    } else if (this.movements.down) {
      this.y += this.vy;
    }
  }

  draw() {


    
    if (this.reaction.isReady && this.pokeballs === 0) {
      this.reaction.src = "/assets/img/NoBalls.png";
      this.ctx.drawImage(
        this.reaction,
        this.reaction.horizontalFrameIndex * this.reaction.frameWidth,
        this.reaction.verticalFrameIndex * this.reaction.frameHeight,
        this.reaction.frameWidth,
        this.reaction.frameHeight,
        this.x + 7,
        this.y - 30,
        this.reaction.w,
        this.reaction.h
      );
    }

    if (this.y < PJ_TOP_LIMIT) {
      this.y = PJ_TOP_LIMIT;
      this.audioReload.play();
      this.pokeballs = 6;
      if (this.reaction.isReady) {
        this.reaction.src = "/assets/img/reloaded.png";
        this.ctx.drawImage(
          this.reaction,
          this.reaction.horizontalFrameIndex * this.reaction.frameWidth,
          this.reaction.verticalFrameIndex * this.reaction.frameHeight,
          this.reaction.frameWidth,
          this.reaction.frameHeight,
          this.x + 7,
          this.y - 30,
          this.reaction.w,
          this.reaction.h
        );
      }
    } else if (this.y > PJ_BOTTOM_LIMIT) {
      this.y = PJ_BOTTOM_LIMIT;
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

      this.shouts.forEach((shout) => shout.draw());

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

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
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
