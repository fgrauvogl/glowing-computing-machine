class Rat extends Enemy {
    constructor() {
        super();
        this.image = ratPng;
        this.width = 16;
        this.height = 16;
        this.isFacingLeft = false;
        this.spriteRow = 1;
        this.drawWidth = 64;
        this.drawHeight = 64;

    }

    draw() {
        this.SetSprite();
        ctx.drawImage(this.image, currentFrame % 5 * ratPngWidthAndHeight, ratPngWidthAndHeight * this.spriteRow, ratPngWidthAndHeight, ratPngWidthAndHeight, Math.floor(this.x), Math.floor(this.y), this.drawWidth, this.drawHeight);
        ctx.rec
    }

    SetSprite() {
        this.isFacingLeft = this.x > character.x;
    }
}