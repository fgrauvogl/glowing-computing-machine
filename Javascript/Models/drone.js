class Drone extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.image = dronePng;
        this.currentGun = Guns.Pistol;
        this.hoverDistance = 50;
        this.ally = null;
        this.speed = 3;
        this.distanceToAlly = 0;
    }
    update(ally) {
        this.ally = ally;
        this.handleMovement();
        this.draw();
    }

    moveTowardsAlly() {

        this.ismovingtoward = true;

        this.angle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

        let speed = Math.max(this.speed * (this.distanceToAlly / 100) - 2, .2);

        this.x = this.x + this.width / 2 + speed * Math.cos(this.angle) - this.width / 2;

        this.y = this.y + this.height / 2 + speed / 1.5 * Math.sin(this.angle) - this.height / 2;
    }

    handleMovement() {

        this.distanceToAlly = calculateDistance(this.x, this.y, this.ally.x, this.ally.y);

        if (this.distanceToAlly > this.hoverDistance) {
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
        let speed = Math.max(this.speed * (this.distanceToAlly / 100), .3);

        this.x += speed * Math.cos(perpendicularAngle);

        this.y += speed * Math.sin(perpendicularAngle);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, 20, 20);
    }

}