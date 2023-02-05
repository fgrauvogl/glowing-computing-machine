let chargeTimeInSeconds = 1.5;
let chargeCoolDown = 1.5;


class SpecialEnemy extends Enemy {

    constructor() {
        super();
        this.isStrafing = false;
        this.isCharging = false;
        this.chargeAngle = 0;
        this.isNewMovementAlgoNeeded = true;
        this.isChargingOnCoolDown = false;
    }

    update() {
        if (this.isNewMovementAlgoNeeded) { this.handleMovement() }
        else { this.handleCustomMovement(); }
        this.handleCollision();
        var isCollision = this.collision(character.x, character.y, character.width, character.height, this.x, this.y, this.width, this.height);
        if (isCollision) {
            this.hitPlayer();
        }
        this.draw();
    }

    handleCustomMovement() {
        if (this.isCharging) {
            this.Charge();
        }
    }

    Charge() {
        this.x = this.x + this.width / 2 + (4 * this.moveSpeed * Math.cos(this.chargeAngle)) - this.width / 2;
        this.y = this.y + this.height / 2 + (4 * this.moveSpeed * Math.sin(this.chargeAngle)) - this.height / 2;
    }

    handleMovement() {
        var distanceToCharacter = this.calculateDistanceToCharacter();

        if (distanceToCharacter > 100 && distanceToCharacter < 200 && !this.isChargingOnCoolDown) {
            this.BeginCharge();
        }

        if (distanceToCharacter > 100) {
            this.moveTowardsPlayer();
        }
    }

    BeginCharge() {
        this.chargeAngle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        this.isCharging = true;

        this.isNewMovementAlgoNeeded = false;

        setTimeout(this.stopCharging.bind(this), chargeTimeInSeconds * 1000);
    }

    moveTowardsPlayer() {
        this.ismovingtowardsplayer = true;

        this.angle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        this.x = this.x + this.width / 2 + this.moveSpeed * Math.cos(this.angle) - this.width / 2;
        this.y = this.y + this.height / 2 + this.moveSpeed * Math.sin(this.angle) - this.height / 2;
    }

    stopStafing() {
        this.isStrafing = false;
    }

    stopCharging() {
        this.isCharging = false;
        this.isNewMovementAlgoNeeded = true;
        this.chargeCoolDown = true;
        setTimeout(this.removeChargeCoolDown.bind(this), chargeCoolDown * 1000);
    }

    removeChargeCoolDown() {
        this.chargeCoolDown = false;
    }
}