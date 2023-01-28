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
       powerUpArray.forEach(powerUp => {
            powerUp.update();
        });
        character.update();
        drawHealthBar(character);
        handleLevelUp();
        window.requestAnimationFrame(animate);
}

animate();

function handleLevelUp() {
    if (enemiesArray.length == 0) {

        if (level == maxLevel) {
            winGame();
        }
        else {
            levelUp();
        }
    }
}

function winGame() {
    winscreen.style.display = "block";
    heart.style.display = "none";
}

function levelUp() {
    level += 1;

    for (let i = 0; i < monstersPerLevel * level; i++) {
        enemiesArray.push(new Enemy());
    }
}


function drawHealthBar(character) {
   
    var maxHealthBarSize = 200;
    var percentHealthLeft = character.health / character.maxHealth;

    ctx.fillStyle = "red";
    ctx.fillRect(40, canvas.height - 40, maxHealthBarSize * percentHealthLeft, 20);
}

function showDeathScreen() {
    document.getElementById("death-screen").style.display = "block";
    heart.style.display = "none";
}

function restart() {
    level = 1;
    projectileArray = [];
    character = new Character();
    enemiesArray = [];
 for (let i = 0; i < startingEnemies; i++) {
        enemiesArray.push(new Enemy());
    }
    document.getElementById("death-screen").style.display = "none";
    winscreen.style.display = "none";
    heart.style.display = "block";
}
canvas.addEventListener("click", event => {

    fireGun();

})

function fireGun() {

    let rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left;

    let y = event.clientY - rect.top;

    switch (character.currentGun) {

        case Guns.ShotGun: {
            const audio = new Audio("./Audio/bestshotgun.mp3");

            audio.play();

            let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y);

            projectileArray.push(projectile);

            for (var i = 0; i < shotGunPellets; i++) {
                let projectile2 = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, projectile.angle + .3 * (.5 - Math.random()));
                projectileArray.push(projectile2);
            }

            break;
        }
        case y:
            // code block
            break;
        default:
            {
                const audio = new Audio("./Audio/pew.mp3");

                audio.play();

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 4, x, y);

                projectileArray.push(projectile);
            }
    } 
}