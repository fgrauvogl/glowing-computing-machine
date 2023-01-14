var enemyid = 1;

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
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

        console.log(`my movement speed is ${this.moveSpeed} my width is ${this.width}`)

        enemyid += 1;
    }
    resetPosition() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
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


        if (distanceToCharacter < 1000) {
            this.ismovingtowardsplayer = true;

            if (this.x < character.x) {
                this.x += this.moveSpeed;
            }
            else {
                this.x -= this.moveSpeed;
            }
            if (this.y < character.y) {
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
        var maxDistance = 1000;
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

       
        if (maxDistance < 10) {
            this.makeBaby();
        }
    }
    draw() {
        ctx.fillStyle = this.enemycolor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillText(this.enemyName, this.x, this.y);
    }
    handleAge() {
        this.age = this.age + .01 * Math.random();
        if (this.age > 50) {
            removeEnemy(this.id);
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
    enemiesArray.splice(index, 1);
}

function getEnemyColor(enemyName) {
    if (enemyName == "grunt") {
        return "rgb(252, 3, 3)";
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
