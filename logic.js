/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 1200;
CANVAS_HEIGHT = canvas.height = 800;
const numberOfEnemies = 3;
const enemiesArray = [];
var enemyid = 1;
const listONames = ["Johnny","Jerry","Jenny","Frank","Terry"];
const enemynames = ["omega","alien","grunt"];
var keyState = {};
var maxEnemies = 10;

console.log(alienNames);


window.onkeydown = window.onkeyup = function(e) {
    keyState[e.keyCode] = e.type == 'keydown';
    
    // checks for up and left
    if (keyState[38] && keyState[37]) {
      character.Movement(-2,0);
      character.Movement(0,-2);
    }
    // checks for up and right
    else if (keyState[38] && keyState[39]) {
      character.Movement(2,0);
      character.Movement(0,-2);
    }
    // checks for down and left
    else if (keyState[40] && keyState [37]) {
      character.Movement(-2,0);
      character.Movement(0,2);
    }
    // checks for down and right
    else if(keyState[40] && keyState [39]) {
      character.Movement(2,0);
      character.Movement(0,2);
    }
    // checks for up
    else if (keyState[38]) {
      character.Movement(0,-2);
  }
  }
class Character {
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 10;
        this.height = 10;
        let nameIndex = Math.floor(Math.random() * (listONames.length - 1));
        this.name = listONames[nameIndex];
}
        Movement(x,y){
            this.x += x;
            this.y += y;
            
        }
        draw(){
            ctx.fillStyle = "rgb(10, 75, 77)";
            ctx.fillRect(this.x, this.y, this.width, this.height);   
        }
        update(){
            this.draw();
        }
}
class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.EnemyType = getEnemyType();
        this.width = getEnemySize(this.EnemyType);
        this.height = getEnemySize(this.EnemyType);
        this.age = 50 * Math.random();
        this.id = enemyid;
        this.moveSpeed =   1 / this.width + .1 * Math.random();
        this.velocityX = this.moveSpeed;
        this.velocityY = this.moveSpeed;
        console.log(`Enemy Type is ${this.EnemyType} and our movement speed is ${this.moveSpeed}`);

        this.enemycolor = getEnemyColor(this.EnemyType);

        enemyid += 1;
    
    }
    resetPosition(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }
    makeBaby(){
        let Baby = new Enemy();
        Baby.age = 0;

        if(enemiesArray.length <= maxEnemies){
            enemiesArray.push(new Enemy());
            this.resetPosition();
        }
    }
    
    update(){
        this.handleAge();
        this.handleCollision();
        this.handleMovement();
        this.draw();
    }

    moveTowards(enemy){
        if(!enemy){
            return;
        }
        if(this.x < enemy.x){
            this.x++;
        }
        else{
            this.x--;
        }
        if(this.y < enemy.y){
            this.y++;
        }
        else{
            this.y--;
        }
    }
    handleMovement(){

        var distanceToCharacter = this.calculateDistanceToCharacter();
        console.log(distanceToCharacter);


        if(distanceToCharacter < 100){
            if(this.x < character.x){
                this.x++;
            }
            else{
                this.x--;
            }
            if(this.y < character.y){
                this.y++;
            }
            else{
                this.y--;
            }
        }
    }
    calculateDistanceToCharacter(){
        var difx = this.x - character.x;
        var dify = this.y - character.y;
        var distanceToEnemy = Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2));
        return distanceToEnemy;
    };
    handleCollision(){
        if(enemiesArray.length < 2){
            return;
        }
            var maxDistance = 1000;
            var closestEnemy;
        enemiesArray.forEach(enemy => {
            if(this.id == enemy.id){
                return;
            }
            var enemyx = enemy.x;
            var enemyy = enemy.y;
            var difx = this.x - enemyx;
            var dify = this.y - enemyy;
            var distanceToEnemy = Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2));
            if(distanceToEnemy < maxDistance){
                maxDistance = distanceToEnemy;
                closestEnemy = enemy;
            }
        });
        this.moveTowards(closestEnemy);
        if(maxDistance < 10){
            this.makeBaby();
        }
    }
    draw(){
        ctx.fillStyle = this.enemycolor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }
    handleAge(){
        this.age = this.age + .01 * Math.random();
        if(this.age > 50){
            removeEnemy(this.id);
        }
    }
}
    for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

    var character = new Character();

    function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
    });
    character.update();
    window.requestAnimationFrame(animate);
}

animate();

function removeEnemy(id){
    let obj = enemiesArray.find(x => x.id === id);
    let index = enemiesArray.indexOf(obj);
    enemiesArray.splice(index, 1);
}

function getEnemyType(){
    var number = 100 * Math.random();
    if(number < 70){
        return enemynames[2];
    }
    else if(number > 70 && number < 98){
        return enemynames[1];
    }
    else if(number > 98){
        return enemynames[0];
    }
}

function getEnemyColor(enemyName){
        if(enemyName == "grunt"){
            return "rgb(252, 3, 3)";
        }
        else if(enemyName == "alien"){
            return "rgb(16, 143, 39)";
        }
        else if(enemyName == "omega"){
            return "rgb(94, 17, 122)";
        }
    }

function getEnemySize(enemyName){
    if(enemyName == "grunt"){
        return 40;
    }
    else if(enemyName == "alien"){
        return 60;
    }
    else if(enemyName == "omega"){
        return 170;
    }
}
