var enemyid = 1;

class Enemy {
    constructor() {
        this.angle = 0;
        this.x = getRandomXCoord();
        this.y = getRandomYCoord(this.x);
        this.EnemyType = getEnemyType();
        this.width = getEnemySize(this.EnemyType);
        this.height = getEnemySize(this.EnemyType);
        this.age = 50 * Math.random();
        this.id = enemyid;
        this.moveSpeed = 50 / (this.width);
        this.velocityX = this.moveSpeed;
        this.velocityY = this.moveSpeed;
        this.enemycolor = getEnemyColor(this.EnemyType);
        this.enemyName = getEnemyName(this.EnemyType);
        this.ismovingtowardsplayer = false;
        this.health = getEnemyHealth(this.EnemyType);
        this.strength = this.health / 3;
        this.enemyIsDead = false;
        this.maxHealth = this.health;
        this.gun = this.getGun();
        this.isWeaponCoolDown = false;
        this.experienceGranted = 1;

        enemyid += 1;
    }
    setWeaponCoolDown(timeInMilliSeconds) {
        let cooldown = timeInMilliSeconds ?? 1000;

        this.isWeaponCoolDown = true;

        setTimeout(this.removeWeaponCoolDown.bind(this), cooldown);
    }
    removeWeaponCoolDown() {

        this.isWeaponCoolDown = false;
    }

    getGun() {
        if (this.EnemyType != "omega") { return; }

        let randomGunIndex = Math.floor(mobGunsList.length * Math.random());

        return mobGunsList[randomGunIndex];

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

    resetPosition() {
        this.x = Math.random() * canvas.width;
        this.y = 1000;
    }
    makeBaby() {
        let Baby = new Enemy();
        Baby.age = 0;

        if (enemiesArray.length <= maxEnemies) {
            enemiesArray.push(new Enemy());
            this.resetPosition();
        }
    }

    update() {
        this.handleAge();
        this.handleMovement();
        this.handleCollision();
        this.fireGun();
        var isCollision = this.collision(character.x, character.y, character.width, character.height, this.x, this.y, this.width, this.height);
        if (isCollision) {
        this.hitPlayer();
        }
        this.draw();
    }

    fireGun() {
        if (isPaused || this.isWeaponCoolDown || !this.gun) {
            return;
        }
        this.setWeaponCoolDown(automaticGuns[this.gun]);

        let characterMidX = character.GetXMidPoint();

        let characterMidY = character.GetYMidPoint();

        switch (this.gun) {

            case Guns.ShotGun: {

                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 8, characterMidX, characterMidY);

                projectile.isEnemyProjectile = true;

                projectile.color = this.enemycolor;

                enemyProjectileArray.push(projectile);

                for (var i = 0; i < shotGunPellets; i++) {
                    let projectile2 = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 8, characterMidX, characterMidY, projectile.angle + .3 * (.5 - Math.random()));
                    projectile2.color = this.enemycolor;
                    projectile2.isEnemyProjectile = true;
                    enemyProjectileArray.push(projectile2);
                }

                break;
            }
            case Guns.GrenadeLauncher: {


                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 8, characterMidX, characterMidY);
                projectile.isEnemyProjectile = true;
                projectile.radius = 12;
                projectile.color = this.enemycolor;
                projectile.damage = 40;
                projectile.isGrenade = true;
                projectile.isImpactOnHit = true;
                enemyProjectileArray.push(projectile);


                break;
            }
            case Guns.MachineGun: {


                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 12, characterMidX, characterMidY);

                projectile.color = this.enemycolor;

                projectile.isEnemyProjectile = true;

                enemyProjectileArray.push(projectile);

                break;
            }
            case Guns.ChainGun: {


                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 15, characterMidX, characterMidY);

                projectile.color = this.enemycolor;

                projectile.isEnemyProjectile = true;

                enemyProjectileArray.push(projectile);

                break;
            }
            case Guns.MegaGatling: {


                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 20, characterMidX, characterMidY);

                projectile.color = this.enemycolor;

                projectile.isEnemyProjectile = true;

                enemyProjectileArray.push(projectile);

                for (var i = 0; i < 100; i++) {
                    let projectile2 = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 20, characterMidX, characterMidY, projectile.angle + .5 * (.5 - Math.random()));
                    projectile.isEnemyProjectile = true;
                    projectile.color = this.enemycolor;
                    enemyProjectileArray.push(projectile2);
                }

                break;
            }
            case Guns.Sniper: {

                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 30, characterMidX, characterMidY);

                projectile.isEnemyProjectile = true;

                projectile.color = this.enemycolor;

                projectile.damage = 20;

                projectile.radius = 3;

                enemyProjectileArray.push(projectile);

                break;
            }
            case Guns.FiftyCal: {


                let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 30, characterMidX, characterMidY);

                projectile.isEnemyProjectile = true;

                projectile.color = this.enemycolor;

                projectile.damage = 50;

                projectile.radius = 10;

                projectile.isArmorPiercing = true;

                enemyProjectileArray.push(projectile);

                break;
            }

            default:
                {
                    let projectile = new Projectile(this.x + this.width / 2, this.y + this.height / 2, 4, characterMidX, characterMidY);

                    projectile.color = this.enemycolor;

                    projectile.isEnemyProjectile = true;

                    enemyProjectileArray.push(projectile);
                }
        }
    }

    moveTowards(enemy) {
        if (!enemy) {
            return;
        }
        if (this.x < enemy.x) {
            this.x += this.moveSpeed;
        }
        else {
            this.x -= this.moveSpeed;
        }
        if (this.y < enemy.y) {
            this.y += this.moveSpeed;
        }
        else {
            this.y -= this.moveSpeed;
        }
    }

    handleMovement() {
        var distanceToCharacter = this.calculateDistanceToCharacter();

        if (distanceToCharacter < 10000) {
            this.ismovingtowardsplayer = true;

            this.angle = Math.atan2(character.y + character.height / 2 - (this.y + this.height / 2), character.x + character.width / 2 - (this.x + this.width / 2));

            this.x = this.x + this.width / 2 + this.moveSpeed * Math.cos(this.angle) - this.width / 2;
            this.y = this.y + this.height / 2 + this.moveSpeed * Math.sin(this.angle) - this.height / 2;

        } else {
            this.ismovingtowardsplayer = false;
        }
    }

    calculateDistanceToCharacter() {
        var difx = this.x - character.x;
        var dify = this.y - character.y;
        var distanceToEnemy = Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2));
        return distanceToEnemy;
    };

    handleCollision() {
        enemiesArray.forEach(enemy => {
            if (collision(character.x, character.y, character.width, character.height, enemy.x, enemy.y, enemy.width, enemy.height)) {
                const center1X = character.x + character.width / 2;
                const center1Y = character.y + character.height / 2;
                const center2X = enemy.x + enemy.width / 2;
                const center2Y = enemy.y + enemy.height / 2;
                const deltaX = center1X - center2X;
                const deltaY = center1Y - center2Y;
                const overlapX = (character.width + enemy.width) / 2 - Math.abs(deltaX);
                const overlapY = (character.height + enemy.height) / 2 - Math.abs(deltaY);
                this.hitPlayer();
                if (overlapX > 0 && overlapY > 0) {
                    if (overlapX < overlapY) {
                        if (deltaX > 0) {
                            enemy.x -= overlapX;
                        } else {
                            enemy.x += overlapX;
                        }
                    } else {
                        if (deltaY > 0) {
                            enemy.y -= overlapY;
                        } else {
                            enemy.y += overlapY;
                        }
                    }
                }
            }
        });
    }

    fight(closestEnemy) {

    }

    draw() {
        ctx.fillStyle = this.enemycolor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        var currentHealthPercentage = this.health / this.maxHealth;
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y + this.height), this.width * currentHealthPercentage, this.height / 8);
        ctx.fillStyle = "black";
        ctx.font = "10px Tahoma";
        ctx.fillText(this.enemyName, this.x + (this.width /2), this.y);

    }
    handleAge() {
        this.age = this.age + .01 * Math.random();
        if (this.age > 60) {
            removeEnemy(this.id);
        }
    }
    hitPlayer() {
        character.armor -= this.strength;
        if (character.armor < 0) {
            character.armor = 0;
            character.health -= this.strength;
            if (character.health < 0) {
                character.health = 0;
                character.isDead = true;
                showDeathScreen();
            }
        }
    }
}

function getEnemyType() {
    var number = 100 * Math.random();
    if (number < 70) {
        return enemynames[2];
    }
    else if (number > 70 && number < 98) {
        return enemynames[1];
    }
    else if (number > 98) {
        return enemynames[0];
    }
}
function removeEnemy(id) {
    let obj = enemiesArray.find(x => x.id === id);
    let index = enemiesArray.indexOf(obj);
   
    if (Enemy.health < 0) {
        Enemy.health = 0;
        Enemy.enemyIsDead = true;
    }
    if (this.enemyDead = true) {
        enemiesArray.splice(index, 1);
        getDrop(obj);
    }
}

function collision(x1, y1, w1, h1, x2, y2, w2, h2) {
    const right1 = x1 + w1;
    const bottom1 = y1 + h1;
    const right2 = x2 + w2;
    const bottom2 = y2 + h2;
    if (x1 <= right2 && right1 >= x2 && y1 <= bottom2 && bottom1 >= y2) {
        return true;
    } else {
        return false;
    }
}

function getDrop(Enemy) {

    if (!isLootDropped(Enemy.EnemyType)) {
        return;
    }

    var lootRolls = getLootRolls(Enemy.EnemyType);
    let rolls = [];
    for (var i = 0; i < lootRolls; i++) {
        rolls.push(Math.random() * 100);
    }
    var maxRoll = Math.max(...rolls);
    var newDrop = new PowerUp(Enemy.x, Enemy.y,maxRoll);
    powerUpArray.push(newDrop);
}

function isLootDropped(enemyName) {
    var lootChance;

    if (enemyName == "grunt") {
        lootChance = Math.random() * 12;
    }
    else if (enemyName == "alien") {
        lootChance = Math.random() * 20;
    }
    else if (enemyName == "omega") {
        lootChance = Math.random() * 60;
    }
    if (lootChance > 10) {
        return true;
    }
    else {
        return false;
    }
}


function getLootRolls(enemyName) {
    if (enemyName == "grunt") {
        return 1;
    }
    else if (enemyName == "alien") {
        return 3;
    }
    else if (enemyName == "omega") {
        return 7;
    }
}

function getEnemyColor(enemyName) {
    if (enemyName == "grunt") {
        return "rgb(255, 153, 51)";
    }
    else if (enemyName == "alien") {
        return "rgb(16, 143, 39)";
    }
    else if (enemyName == "omega") {
        return "rgb(94, 17, 122)";
    }
}

function getEnemyName(enemyName) {

    var randomNumber = Math.floor(1000 * Math.random());

    if (enemyName == "grunt") {
        return gruntNames[randomNumber];
    }
    else if (enemyName == "alien") {
        return alienNames[randomNumber];
    }
    else if (enemyName == "omega") {
        return omegaNames[randomNumber];
    }
}

function getEnemySize(enemyName) {
    if (enemyName == "grunt") {
        return 40;
    }
    else if (enemyName == "alien") {
        return 60;
    }
    else if (enemyName == "omega") {
        return 170;
    }
}

function getEnemyHealth(enemyType) {
    switch (enemyType) {
        case MobTypes.Grunt:
            return 10;
            break;
        case MobTypes.Alien:
            return 200;
            break;
        case MobTypes.Omega:
            return 300;
            break;
        default:
    }
}

function getRandomXCoord() {
    var randomNumber = Math.ceil(2 * Math.random());
    var randomNumberTwo = Math.ceil(2 * Math.random());

    if (randomNumber == 1) {
        return canvas.width * Math.random();
    }
    else {
        if (randomNumberTwo == 1) {
            return -100;
        }
        else {
            return canvas.width + 100;
        }
    }
}

function getRandomYCoord(x) {
    if (x < 0 || x > canvas.width) {
        return canvas.height * Math.random();
    }
    else {
        var randomNumber = Math.ceil(2 * Math.random());

        if (randomNumber == 1) {
            return -100;
        }
        else {
            return canvas.height + 100;
        }
    }
}
