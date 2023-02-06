
class AvoidingEnemy extends Enemy {
    constructor() {
        super();
        this.shootingRange = 400;
        this.isStrafingfLeft = false;
        this.flipStragingFlag();
        this.minShootingRange = 200;
        this.distanceToCharacter = 0;
        this.gun = Guns.Pistol;
    }

    handleMovement() {

        this.distanceToCharacter = this.calculateDistanceToCharacter();

        if (this.isOccupiedAvoidingMouse()) {

            return;
        }
     
        if (this.distanceToCharacter > this.shootingRange && this.distanceToCharacter > this.minShootingRange) {
            this.moveTowardsPlayer();
            return;
        }

        else {
            this.Strafe();
        }
    }

    Strafe() {

        let angleToCharacter = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        let perpendicularAngle;

        if (this.isStrafingfLeft) {
            perpendicularAngle = angleToCharacter + (Math.PI / 2);
        }
        else {
            perpendicularAngle = angleToCharacter - (Math.PI / 2);
        }

        this.x += this.moveSpeed * Math.cos(perpendicularAngle);

        this.y += this.moveSpeed * Math.sin(perpendicularAngle);

        if (this.distanceToCharacter < 300) {

            let angleAwayFromCharacter = angleToCharacter + (Math.PI);

            this.x += this.moveSpeed * Math.cos(angleAwayFromCharacter);

            this.y += this.moveSpeed * Math.sin(angleAwayFromCharacter);
        }

    }

    moveTowardsPlayer() {

        this.ismovingtowardsplayer = true;

        this.angle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        this.x = this.x + this.width / 2 + this.moveSpeed * Math.cos(this.angle) - this.width / 2;

        this.y = this.y + this.height / 2 + this.moveSpeed * Math.sin(this.angle) - this.height / 2;
    }

    flipStragingFlag() {

        this.isStrafingfLeft = !this.isStrafingfLeft;

        let nextFlipTIme = 8 + 2 * Math.random();

        setTimeout(this.flipStragingFlag.bind(this), nextFlipTIme * 1000);
    }

    isOccupiedAvoidingMouse() {

        let distanceToMouse = calculateDistance(this.x + (this.width / 2), this.y + (this.height/2), mouseX, mouseY);

        if (distanceToMouse > this.width * 2) { return false; }

        let angleToMouse = Math.atan2(mouseY - (this.y + this.height / 2), mouseX - (this.x + this.width / 2));

        let angleAwayFromMouse = angleToMouse + Math.PI;

        this.x = this.x + this.width / 2 + this.moveSpeed * 2 * Math.cos(angleAwayFromMouse) - this.width / 2;

        this.y = this.y + this.height / 2 + this.moveSpeed * 2 * Math.sin(angleAwayFromMouse) - this.height / 2;

        return true;
    }
}