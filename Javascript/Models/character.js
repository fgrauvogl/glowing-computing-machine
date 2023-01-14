var listONames = ["Clint", "Mark", "Crumb"];

class Character {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 30;
        this.height = 30;
        let nameIndex = Math.floor(Math.random() * (listONames.length - 1));
        this.name = listONames[nameIndex];
    }
    Movement(x, y) {
        this.x += x;
        this.y += y;

    }
    draw() {
        ctx.fillStyle = "rgb(10, 75, 77)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

}
