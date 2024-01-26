class Boss {
    constructor(ctx, x, y) {

        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.vy = 1;

        this.w = 50;
        this.h = 50;

        this.hp = 20;

    }

    isDead() {
    
        return this.hp <= 0;
      }

    move() {
        this.y += this.vy;
      }

    draw() {
        this.ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}