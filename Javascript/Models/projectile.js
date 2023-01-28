let projectileID = 0;

class Projectile {
    constructor(x, y, speed, endingx, endingy) {
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.endingx = endingx;
        this.endingy = endingy;
        this.id = projectileID;
        projectileID += 1;
        this.projectileHeight = 5;
        this.projectileWidth = 5;
        this.angle = Math.atan2(endingy - this.y, endingx - this.x);
        this.enemyType = getEnemyType();
        this.damage = 10;
        this.enemiesHit = {};
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

            var result = this.collision(this.x,this.y,this.projectileHeight,this.projectileWidth,enemy.x,enemy.y,enemy.width,enemy.height);
          
            if (result) {
                enemy.health -= this.damage;
                this.enemiesHit[enemy.id] = enemy.id;

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
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.moveTowards();
        this.checkForEnemyCollisions();
        this.projectileDisappearCheck(this.endingx, this.endingy);
        this.draw();
 
    }
}

function removeProjectile(id) {
    let obj = projectileArray.find(x => x.id === id);
    let index = projectileArray.indexOf(obj);
    projectileArray.splice(index, 1);
}

