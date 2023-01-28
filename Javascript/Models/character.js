var listONames = ["Clint", "Mark", "Crumb"];

class Character {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 30;
        this.height = 30;
        let nameIndex = Math.floor(Math.random() * (listONames.length - 1));
        this.name = listONames[nameIndex];
        this.health = this.getCharacterHealth();
        this.maxHealth = this.health;
        this.isDead = false;
        this.currentGun = Guns.ShotGun;
        this.armor = 0;
    }
    Movement(x, y) {
        if (this.isDead) {
            return;
        }

        this.x += x;
        this.y += y;

        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
    }
    draw() {
        ctx.fillStyle = "rgb(10, 75, 77)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.x, this.y);

    }
    update() {
        this.draw();
        this.move();
    }
    move() {

        // checks for up and left
        if (keyState[87] && keyState[65]) {
            character.Movement(-2, 0);
            character.Movement(0, -2);
        }
        // checks for up and right
        else if (keyState[87] && keyState[68]) {
            character.Movement(2, 0);
            character.Movement(0, -2);
        }
        // checks for down and left
        else if (keyState[83] && keyState[65]) {
            character.Movement(-2, 0);
            character.Movement(0, 2);
        }
        // checks for down and right
        else if (keyState[83] && keyState[68]) {
            character.Movement(2, 0);
            character.Movement(0, 2);
        }
        // checks for up
        else if (keyState[87]) {
            character.Movement(0, -2);
        }
        // checks for down
        else if (keyState[83]) {
            character.Movement(0, 2);
        }
        // checks for right
        else if (keyState[68]) {
            character.Movement(2, 0);
        }
        // checks for left
        else if (keyState[65]) {
            character.Movement(-2, 0);
        }
    }


    getCharacterHealth() {
        if (this.name == "Crumb") {
            return 100;
        }
        else if (this.name == "Mark") {
            return 1000;
        }
        else if (this.name == "Clint") {
            return 10000;
        }
    }

}