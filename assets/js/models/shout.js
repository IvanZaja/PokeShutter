class shout {

    constructor(ctx, x, y){
        this.ctx = ctx;
        this.vS = 40;
        this.w = 20;
        this.h = 5;

        this.x = x;
        this.y = y;

        this.movements = {
            up: false,
            down: false,
          }
    }

    MouseEvent(event) {
        const enabled = event.type === 'click';
        switch (event.button) {
          case CLICK:
            this.movements.up = enabled;
            break;
        }
      }

      move() {
        if (this.movements.up) {
          this.y -= this.vS;
        }
      }

    draw() {
        this.ctx.fillRect(this.x ,this.y, this.w, this.h);
      }
}