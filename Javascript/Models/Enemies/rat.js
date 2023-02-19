class Rat extends Enemy {
    constructor() {
        super();
        this.image = ratPng;
        this.width = 20;
        this.height = 20;
        this.isFacingLeft = false;
        this.spriteRow = 0;
        this.drawWidth = 64;
        this.drawHeight = 64;
        this.spriteFrame = 0;
        this.maxSpriteFrame = 5;
        this.isAnimationPaused = false;
        this.stopAtLastAnimation = false;
    }

    draw() {
        this.SetSprite();
        let spriteFrame = Math.floor(this.spriteFrame);
        ctx.drawImage(this.image, spriteFrame * ratPngWidthAndHeight, ratPngWidthAndHeight * this.spriteRow, ratPngWidthAndHeight, ratPngWidthAndHeight, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }

    hitPlayer() {
        console.log(this.hasHitCharacterRecently);
        if (this.hasHitCharacterRecently) { return; }
        setTimeout(this.resetSprite.bind(this), this.enemyHitCoolDown * 1000);
        this.spriteFrame = 0;
        this.stopAtLastAnimation = true;
        if (this.hitAudio) { playAudio(this.hitAudio); }
        this.applyDamageToCharacter();
    }

    resetSprite() {
        this.stopAtLastAnimation = false;
    }

    SetSprite() {
        if (!this.isAnimationPaused) {
            this.UpdateFrame();
        }
        this.isFacingLeft = this.x > character.x;

        if (this.isFacingLeft) {
            this.image = ratPngLeft;
        }
        else {
            this.image = ratPng;
        }
        if (this.hasHitCharacterRecently) {
            this.spriteRow = 1;
        }

        else {
            this.spriteRow = 0;
        }

    }

    UpdateFrame() {
        this.spriteFrame += .1;

        if (this.stopAtLastAnimation && this.spriteFrame >= this.maxSpriteFrame) {
            this.spriteFrame = this.maxSpriteFrame;
            return;
        }

        if (this.spriteFrame >= 6) {
            this.spriteFrame = 0;
        }

    }
}