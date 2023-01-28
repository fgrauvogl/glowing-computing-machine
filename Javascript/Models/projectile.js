let projectileID = 0;
let grenadePellets = 10;

class Projectile {
    constructor(x, y, speed, endingx, endingy, angle = 0) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.endingx = endingx;
        this.endingy = endingy;
        this.id = projectileID;
        projectileID += 1;
        this.projectileHeight = 5;
        this.projectileWidth = 5;
        if (angle == 0) {
            this.angle = Math.atan2(endingy - this.y, endingx - this.x);
        }
        else {
            this.angle = angle;
        }
        this.enemyType = getEnemyType();
        this.damage = 10;
        this.enemiesHit = {};
        this.isImpactOnHit = false;
        this.isGrenade = false;
        this.isRocket = false;
        this.isNuke = false;
        this.lifespan = -1;
        this.radius = 5;

    }

    collision(x1, y1, w1, h1, x2, y2, w2, h2) {
        const right1 = x1 + w1;
        const bottom1 = y1 + h1;
        const right2 = x2 + w2;
        const bottom2 = y2 + h2;
        if (x1 < right2 && right1 > x2 && y1 < bottom2 && bottom1 > y2) {
            return true;
        } else {
            return false;
        }
    }

    checkForEnemyCollisions() {
        enemiesArray.forEach(enemy => {
            if (enemy.id in this.enemiesHit) {
                return;
            }

            var result = this.collision(this.x, this.y, this.projectileHeight, this.projectileWidth, enemy.x, enemy.y, enemy.width, enemy.height);

            if (result) {
                enemy.health -= this.damage;
                this.enemiesHit[enemy.id] = enemy.id;
                removeProjectile(this.id);
                if (enemy.health <= 0) {
                    removeEnemy(enemy.id);
                }
            }
        });

    }

    moveTowards() {


        // Update the position of the projectile
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    projectileDisappearCheck(targetx, targety) {
        if (this.x < 0 || this.x > canvas.width) {
            removeProjectile(this.id);
        }
        if (this.y < 0 || this.y > canvas.height) {
            removeProjectile(this.id);
        }

    }


    draw() {
        // Draw the projectile on the canvas
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    testFunction() {
        if (this.lifespan < 0) {
            return;
        }
        this.lifespan -= 1;

        if (this.lifespan <= 0) {
            removeProjectile(this.id);

        }
    }

    update() {
        this.moveTowards();
        this.checkForEnemyCollisions();
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
        removeProjectile(this.id);
        if (this.isGrenade) {
            this.grenadeExplosion();
        }
        else if (this.isRocket) {

        }
        else if (this.isNuke) {

        }
    }

    grenadeExplosion() {
        for (var i = 0; i < grenadePellets; i++) {
            var randomAngle = (Math.random() - .5) * 10;
            var randomSpeed = (10 + Math.random() * 10)
            let projectile = new Projectile(this.x + this.projectileWidth / 2, this.y + this.projectileHeight / 2, randomSpeed, this.x, this.y, randomAngle);
            projectile.damage = 15;
            projectile.lifespan = 3+ Math.random() * 7;

            projectileArray.push(projectile);


        }
    }

}
function removeProjectile(id) {
    let obj = projectileArray.find(x => x.id === id);
    let index = projectileArray.indexOf(obj);
    projectileArray.splice(index, 1);
}

