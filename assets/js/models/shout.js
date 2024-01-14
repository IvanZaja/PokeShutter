class shout {

    constructor(ctx, x, y){
        this.ctx = ctx;
        
        this.w = 5;
        this.h = 5;

        this.x = x;
        this.vx = SPEED_SHOUT ;
        this.y = y;
    }

    move() {
      this.x += this.vx;
    }

    draw() {
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }


}