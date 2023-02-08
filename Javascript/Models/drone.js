class Drone extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.image = dronePng;
        this.currentGun = Guns.Pistol;
        this.hoverDistance = 100;
        this.ally = null;
        this.speed = 3;
    }
    update(ally) {
        this.ally = ally;
        this.handleMovement();
        this.draw();
    }

    moveTowardsAlly() {

        this.ismovingtoward = true;

        this.angle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        this.x = this.x + this.width / 2 + this.speed * Math.cos(this.angle) - this.width / 2;

        this.y = this.y + this.height / 2 + this.speed * Math.sin(this.angle) - this.height / 2;
    }

    handleMovement() {

        let distanceToCharacter = calculateDistance(this.x, this.y, this.ally.x, this.ally.y);

        if (distanceToCharacter > this.hoverDistance) {
            this.moveTowardsAlly();
        }

        this.strafe();

    }

    strafe() {

        let angleToAlly = Math.atan2(this.ally.y + this.ally.height / 2 - (this.y + this.height / 2), this.ally.x + this.ally.width / 2 - (this.x + this.width / 2));

        let perpendicularAngle;

        if (this.isStrafingfLeft) {
            perpendicularAngle = angleToAlly + (Math.PI / 2);
        }
        else {
            perpendicularAngle = angleToAlly - (Math.PI / 2);
        }

        this.x += this.speed * Math.cos(perpendicularAngle);

        this.y += this.speed * Math.sin(perpendicularAngle);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, 20, 20);
    }

}