class Drone extends BaseObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.image = dronePng;
        this.currentGun = Guns.pistol;
        this.damage = 20;
        this.projectileSpeed = 30;
        this.hoverDistance = 75;
        this.ally = null;
        this.speed = 2.5 + Math.random();
        this.distanceToAlly = 0;
        this.midPointX = this.x + this.width / 2;
        this.midPointY = this.y - this.height / 2;
        this.attackRange = 400;
        this.closestEnemy = null;
        this.isCoolDown = false;
        this.coolDownLength = 1000;
    }
    update(ally) {
        this.setMidPoint();
        this.getNearestEnemy();
        this.fireAtClosestEnemy();
        this.ally = ally;
        this.handleMovement();
        this.draw();
    }

    updateMovement(x, y) {
        this.x += x;
        this.y += y;
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

    getNearestEnemy() {
        var closestEnemy;
        var distanceToClosestEnemy = this.attackRange;

        enemiesArray.forEach(enemy => {
            let distance = calculateDistance(this.midPointX, this.midPointY, enemy.x, enemy.y);
            if (distance < this.attackRange && distance < distanceToClosestEnemy) {
                distanceToClosestEnemy = distance;
                closestEnemy = enemy;
            }
        });

        if (closestEnemy) {
            this.closestEnemy = closestEnemy;
        }
        else {
            this.closestEnemy = null;
        }
    }

    fireAtClosestEnemy() {
        if (!this.closestEnemy || this.isCoolDown) {
            return;
        }
        this.fireTheLaserBeam();
        this.isCoolDown = true;
        setTimeout(this.setCooldown.bind(this), this.coolDownLength);

    }

    fireTheLaserBeam() {
        let newDroneProjectile = new Projectile(this.midPointX, this.midPointY, this.projectileSpeed, this.closestEnemy.midPointX, this.closestEnemy.midPointY);
        newDroneProjectile.radius = 100;
        newDroneProjectile.pngWidth = laserPngWidth;
        newDroneProjectile.pngHeight = laserPngHeight;
        newDroneProjectile.projectileWidth = 50;
        newDroneProjectile.projectileHeight = 3;
        newDroneProjectile.png = laserPng;
        characterProjectileArray.push(newDroneProjectile);

    }

    setMidPoint() {
        this.midPointX = this.x + this.width / 2;
        this.midPointY = this.y + this.height / 2;
    }

    setCooldown() {
        this.isCoolDown = false;
    }
}