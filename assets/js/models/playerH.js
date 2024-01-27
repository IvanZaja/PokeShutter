class PlayerH {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = SPEED_MOVE;
    this.w = Math.ceil(115 / 3.3);
    this.h = Math.ceil(153 / 3.3);

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
    this.sprite.src = "/assets/img/playerH.png";
    this.sprite.verticalFrames = 3;
    this.sprite.verticalFrameIndex = 2;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;

    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    };

    this.pokeballs = 6;

    this.shouts = [];

    this.movements = {
      left: false,
      right: false,
      isShutting: false,
    };

    this.animationTick = PJ_ANIMATION_TICK;
  }

  onKeyEvent(event) {
    const enabled = event.type === "keydown";
    

    switch (event.keyCode) {
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_RIGHT:
        this.movements.right = enabled;
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
      this.audioNoPokeballs.volume = 0.1;
      KEY_FIRE = disabled;
        
    }
  

    if (!this.movements.isShutting) {
      this.movements.isShutting = true;
      this.audioShout.play();
      this.audioShout.volume = 0.1;
      this.pokeballs--
      this.sprite.horizontalFrameIndex = 1;
      this.sprite.verticalFrameIndex = 2;
      console.log(this.pokeballs)
      this.shouts.push(
        new shoutV(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2))
      );
      setTimeout(() => (this.movements.isShutting = false), PJ_SHOUT_INTERVAL);
    }
  }

  clear() {
    this.shouts = this.shouts.filter(
      (shoutV) => shoutV.y < 500
    );
  }

  move() {
    this.shouts.forEach((shoutV) => shoutV.move());

    if (this.movements.left) {
      this.x -= this.vx;
    } else if (this.movements.right) {
      this.x += this.vx;
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
        this.x + 3,
        this.y - 34,
        this.reaction.w,
        this.reaction.h
      );
    }

    if (this.x < PJ_LEFT_LIMIT) {
      this.x = PJ_LEFT_LIMIT;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.verticalFrameIndex = 0;
      this.audioReload.play();
      this.audioReload.volume = 0.1;
      this.pokeballs = 6;
      if (this.reaction.isReady) {
        this.reaction.src = "/assets/img/reloaded.png";
        this.ctx.drawImage(
          this.reaction,
          this.reaction.horizontalFrameIndex * this.reaction.frameWidth,
          this.reaction.verticalFrameIndex * this.reaction.frameHeight,
          this.reaction.frameWidth,
          this.reaction.frameHeight,
          this.x + 3,
          this.y - 34,
          this.reaction.w,
          this.reaction.h
        );
      }
    } else if (this.x > PJ_RIGHT_LIMIT) {
      this.x = PJ_RIGHT_LIMIT;
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

      if (this.movements.left) {
        this.animateLeft();
      } else if (this.movements.right) {
        this.animateRight();
      } else {
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 2;
      }
    }
  }

  animateLeft() {
    this.animationTick += 9;

    if (this.movements.left) {
      this.sprite.horizontalFrameIndex = 1;
      this.sprite.verticalFrameIndex = 0;

      if (this.animationTick >= PJ_RUN_ANIMATION_TICK) {
        this.animationTick = PJ_ANIMATION_TICK;
        this.sprite.horizontalFrameIndex++;
  
        if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames -1) {
          this.sprite.horizontalFrameIndex = 0;
        }
      }
    }  
  }

  animateRight() {
    this.animationTick += 9;

    if (this.movements.right) {
      this.sprite.horizontalFrameIndex = 1;
      this.sprite.verticalFrameIndex = 1;

      if (this.animationTick >= PJ_RUN_ANIMATION_TICK) {
        this.animationTick = PJ_ANIMATION_TICK;
        this.sprite.horizontalFrameIndex++;
        this.sprite.verticalFrameIndex = 1;
  
        if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
          this.sprite.horizontalFrameIndex = 0;
          this.sprite.verticalFrameIndex = 1;
        }
      }
    }
    }  
  }
