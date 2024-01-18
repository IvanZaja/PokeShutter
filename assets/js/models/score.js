class Score {

    constructor (ctx, x, y) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = 35;
        this.h = 35;

        this.sprite = new Image();
        this.sprite.src = '/assets/img/pokeball.png'
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }

        this.points = 0;
    }

    inc() {
        this.points++;
    }

    draw() {

        if(this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );

            this.ctx.save();
            this.ctx.font = '35px Pixelify Sans';
            this.ctx.fillText(this.points, this.x + this.w + 10, Math.ceil(this.y + this.h / 1.3));
            this.ctx.restore();
        }
    }
}