var enemyid = 1;

class Enemy {
    constructor() {
        this.x = getRandomXCoord();
        this.y = getRandomYCoord(this.x);
        this.EnemyType = getEnemyType();
        this.width = getEnemySize(this.EnemyType);
        this.height = getEnemySize(this.EnemyType);
        this.age = 50 * Math.random();
        this.id = enemyid;
        this.moveSpeed = 1000 / (this.width * this.width);
        this.velocityX = this.moveSpeed;
        this.velocityY = this.moveSpeed;
        this.enemycolor = getEnemyColor(this.EnemyType);
        this.enemyName = getEnemyName(this.EnemyType);
        this.ismovingtowardsplayer = false;
        this.health = getEnemyHealth(this.EnemyType);
        this.strength = this.health / 3;
        this.enemyIsDead = false;
        this.maxHealth = this.health;
        enemyid += 1;
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
        var isCollision = this.collision(character.x, character.y, character.width, character.height, this.x, this.y, this.width, this.height);
        if (isCollision) {
        this.hitPlayer();
        }
        this.draw();
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

            if (this.x + this.width / 2 < character.x + character.width / 2) {
                this.x += this.moveSpeed;
            }
            else {
                this.x -= this.moveSpeed;
            }
            if (this.y + this.height / 2 < character.y + character.height / 2) {
                this.y += this.moveSpeed;
            }
            else {
                this.y -= this.moveSpeed;
            }
        }
        else {
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
        if (enemiesArray.length < 2) {
            return;
        }
        var maxDistance = 10000;
        var closestEnemy;
        enemiesArray.forEach(enemy => {
            if (this.id == enemy.id) {
                return;
            }
            var enemyx = enemy.x;
            var enemyy = enemy.y;
            var difx = this.x - enemyx;
            var dify = this.y - enemyy;
            var distanceToEnemy = Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2));
            if (distanceToEnemy < maxDistance) {
                maxDistance = distanceToEnemy;
                closestEnemy = enemy;
            }
        });

        if (!this.ismovingtowardsplayer) {
          this.moveTowards(closestEnemy);
        }
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
        ctx.fillText(this.enemyName, this.x, this.y);

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

function getEnemyHealth(enemyName) {
    if (enemyName == "grunt") {
        return 10;
    }
    else if (enemyName == "alien") {
        return 100;
    }
    else if (enemyName == "omega") {
        return 300;
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
