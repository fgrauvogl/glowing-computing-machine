let projectileID = 0;
let grenadePellets = 10;

class Projectile extends BaseObject {
    isArmorPiercing = false;
    constructor(x, y, speed, endingx, endingy, angle = 0, gunType = null) {
        super();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.endingx = endingx;
        this.endingy = endingy;
        this.id = projectileID;
        projectileID += 1;
        this.projectileHeight = 2;
        this.projectileWidth = 6;
        if (angle == 0) {
            this.angle = Math.atan2(endingy - this.y, endingx - this.x);
        }
        else {
            this.angle = angle;
        }
        this.damage = 10;
        this.enemiesHit = {};
        this.isImpactOnHit = false;
        this.isGrenade = false;
        this.isRocket = false;
        this.isNuke = false;
        this.lifespan = -1;
        this.radius = 5;
        this.isEnemyProjectile = false;
        this.color = "red";
        this.gunType = gunType;
        this.hasHit = false;
        this.hasPowerUp = false;
        this.png = bulletPng;
        this.pngWidth = 3;
        this.pngHeight = 12;
        this.setMidPoint();
        this.acceleration = 0;
        this.calculateDirectionalVelocities();

    }
    calculateDirectionalVelocities() {
        this.dx = this.speed * Math.cos(this.angle);
        this.dy = this.speed * Math.sin(this.angle);
    }

    setMidPoint() {
        this.midPointX = this.x + this.width / 2;
        this.midPointY = this.y + this.height / 2;
    }

    setPowerUp(powerUp) {
        if (!powerUp) { return; }

        this.powerUp = powerUp;

        this.powerUpImg = "Images/FireBullet.png";

        this.hasPowerUp = true;
    }

    collision(x1, y1, w1, h1, x2, y2, w2, h2) {
        const right1 = x1 + w1;
        const bottom1 = y1 + h1;
        const right2 = x2 + w2;
        const bottom2 = y2 + h2;
        return (x1 < right2 && right1 > x2 && y1 < bottom2 && bottom1 > y2);
    }

    recordShotsHit() {
        playerWeaponExp[this.gunType] += 1;
        updateWeaponExperience();

        if (shotsHit[this.gunType]) {
            shotsHit[this.gunType] += 1;
        }
        else {
            shotsHit[this.gunType] = 1;
        }
    }

    checkForCharacterCollisions() {

        var result = this.collision(this.x, this.y, this.projectileHeight, this.projectileWidth, character.x, character.y, character.width, character.height);

        if (result) {
            playAudio("./Audio/impact.mp3");
            character.hitPlayer(this.damage);
            if (character.health <= 0) {
                character.isDead = true;
                showDeathScreen();
            }
            if (!this.isArmorPiercing) {
                removeEnemyProjectile(this.id);
            }
        }
    }
    checkForEnemyCollisions() {
        enemiesArray.forEach(enemy => {
            if (enemy.id in this.enemiesHit) {
                return;
            }

            var result = this.collision(this.x, this.y, this.projectileHeight, this.projectileWidth, enemy.x, enemy.y, enemy.width, enemy.height);


            if (result) {
                if (!this.isArmorPiercing) { this.hasHit = true; }
                if (this.powerUp) { ApplyPowerUp(enemy, this.powerUp, this.damage / 2); }
                playAudio("./Audio/impact.mp3");
                enemy.health -= this.damage;
                this.enemiesHit[enemy.id] = enemy.id;
                if (enemy.health <= 0) {
                    removeEnemy(enemy.id);
                }
                if (!this.isArmorPiercing) {
                    removeProjectile(this.id);
                }
                this.recordShotsHit();
            }
        });

    }
    removeMyself() {
        if (this.isEnemyProjectile) {
            removeEnemyProjectile(this.id);
        }
        else {
            removeProjectile(this.id);
        }
    }

    moveTowards() {
        // Update the position of the projectile
        if (this.acceleration) {
            this.speed += this.acceleration;
            this.calculateDirectionalVelocities();
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    projectileDisappearCheck(targetx, targety) {
        if (this.x < 0 || this.x > canvas.width) {
            if (this.isEnemyProjectile) {
                removeEnemyProjectile(this.id);
            } else {
                removeProjectile(this.id);

            }
        }
        if (this.y < 0 || this.y > canvas.height) {
            if (this.isEnemyProjectile) {
                removeEnemyProjectile(this.id);
            } else {
                removeProjectile(this.id);

            }
        }

    }

    draw() {
        // Draw the projectile on the canvas
        if (this.hasHit) { return; }
        ctx.save();
        ctx.translate(this.x, this.y + 2);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.drawImage(bulletPng, 0, 0, this.projectileWidth, this.projectileHeight);
        this.drawPowerUp();
        ctx.fill();
        ctx.restore();
    }

    drawPowerUp() {
        if (!this.hasPowerUp) { return }

        ctx.drawImage(smallFirePng, 0 * fireImageWidth * (currentFrame % 6), 0, fireImageWidth, fireImageHeight, -this.radius / 2, Math.ceil(- this.radius / 2) - 5, 10, 10);

    }

    testFunction() {
        if (this.lifespan == -1) {
            return;
        }
        if (this.lifespan < 0) {
            return;
        }
        this.lifespan -= 1;

        if (this.lifespan <= 0) {
            this.removeMyself();

        }
    }

    update() {
        this.setMidPoint();
        this.moveTowards();
        this.checkForEnemyCollisions();
        this.handleAdditionalProjectileRules();
        this.testFunction();
        this.projectileDisappearCheck(this.endingx, this.endingy);
        this.draw();
    }

    enemyProjectileUpdate() {
        this.moveTowards();
        this.checkForCharacterCollisions();
        this.handleAdditionalProjectileRules();
        this.testFunction();
        this.projectileDisappearCheck(this.endingx, this.endingy);
        this.draw();
    }

    handleAdditionalProjectileRules() {
        if (this.isImpactOnHit) {
            this.targetHit();
        }
    }

    targetHit() {
        let diffx = Math.abs(this.x - this.endingx);
        let diffy = Math.abs(this.y - this.endingy);
        let diffxSquared = diffx * diffx;
        let diffySquared = diffy * diffy;
        var distance = Math.sqrt(diffxSquared + diffySquared);

        if (distance <= 5) {
            this.explosion();

        }
    }
    
    explosion() {
        if (this.isEnemyProjectile) {
            removeEnemyProjectile(this.id);
        } else {
            removeProjectile(this.id);

        }
        if (this.isGrenade) {
            this.grenadeExplosion();
        }
        else if (this.isRocket) {

        }
        else if (this.isNuke) {

        }
    }

    grenadeExplosion() { 

        playAudio("./Audio/GrenadeExplosion.mp3");

        for (var i = 0; i < grenadePellets; i++) {
            let randomAngle = (Math.random() - .5) * 10;
            let randomSpeed = (10 + Math.random() * 10);
            let projectile = new Projectile(this.x + this.projectileWidth / 2, this.y + this.projectileHeight / 2, randomSpeed, this.x, this.y, randomAngle);
            projectile.color = this.color;
            projectile.gunType = this.gunType;
            projectile.damage = 15;
            projectile.lifespan = 5 + Math.random() * 7;
         
            if (this.isEnemyProjectile) {
                projectile.isEnemyProjectile = true;
            };

            if (this.isEnemyProjectile) {
                enemyProjectileArray.push(projectile);
            }
            else {
                characterProjectileArray.push(projectile);
            }
        }
    }

}

class EnemyProjectile extends Projectile {
    draw() {
        if (this.hasHit) { return; }
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        this.drawPowerUp();
        ctx.fill();
        ctx.restore();
    }
}

function removeProjectile(id) {
    let obj = characterProjectileArray.find(x => x.id === id);
    let index = characterProjectileArray.indexOf(obj);
    characterProjectileArray.splice(index, 1);
}

function removeEnemyProjectile(id) {
    let obj = enemyProjectileArray.find(x => x.id === id);
    let index = enemyProjectileArray.indexOf(obj);
    enemyProjectileArray.splice(index, 1);
}