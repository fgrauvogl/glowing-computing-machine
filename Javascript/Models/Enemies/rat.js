class SpriteEnemy extends Enemy {
    constructor(width, height, spriteWidth, spriteHeight) {
        super();
        this.image = null;
        this.imageLeft = null
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.isFacingLeft = false;
        this.spriteRow = 0;
        this.spriteFrame = 0;
        this.maxSpriteFrame = 5;
        this.isAnimationPaused = false;
        this.stopAtLastAnimation = false;
    }

    draw() {
        this.SetSprite();
        let spriteFrame = Math.floor(this.spriteFrame);
        ctx.drawImage(this.image, spriteFrame * this.spriteWidth, this.spriteHeight * this.spriteRow, this.spriteWidth, this.spriteHeight, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }

    hitPlayer() {
        console.log(this.hasHitCharacterRecently);
        if (this.hasHitCharacterRecently) { return; }
        playAudio();
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