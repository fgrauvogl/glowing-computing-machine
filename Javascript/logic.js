for (let i = 0; i < startingEnemies; i++) {
    enemiesArray.push(new Enemy());
}

    var character = new Character();

    function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
    });
        projectileArray.forEach(projectile => {
            projectile.update();
        });
        character.update();
        drawHealthBar(character);
        window.requestAnimationFrame(animate);
        console.log(projectileArray);
}

animate();

function drawHealthBar(character) {
   
    var maxHealthBarSize = 200;
    var percentHealthLeft = character.health / character.maxHealth;

    ctx.fillStyle = "red";
    ctx.fillRect(40, canvas.height - 40, maxHealthBarSize * percentHealthLeft, 20);
    ctx.fill
}

function showDeathScreen() {
    document.getElementById("death-screen").style.display = "block";
}

function restart() {
    character = new Character();
    enemiesArray = [];
 for (let i = 0; i < startingEnemies; i++) {
        enemiesArray.push(new Enemy());
    }
    document.getElementById("death-screen").style.display = "none";
}
canvas.addEventListener("click", event => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 20, x, y);
    projectileArray.push(projectile);

    // Move the projectile towards the click point
    projectile.moveTowards(x, y);

})