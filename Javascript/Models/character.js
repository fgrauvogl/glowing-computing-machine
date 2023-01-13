var listONames = ["Clint", "Mark", "Crumb"];

class Character {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 10;
        this.height = 10;
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
    }
}