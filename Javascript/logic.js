for (let i = 0; i < startingEnemies; i++) {
    enemiesArray.push(new Enemy());
}

var playerWeaponManager = new PlayerWeaponManager();

var character = new Character();


function animate() {
    if (isPaused) { return; }
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
        drawArmorBar(character);
        handleLevelUp();
        playerWeaponManager.update();
        drawAmmoBar();
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

function drawAmmoBar() {
    let currentAmmo = playerWeaponManager.getCurrentAmmoOfCurrentGun();
    if (playerWeaponManager.currentGun == Guns.Pistol) {
        currentAmmo = "Infinite";
    }
    ctx.fillStyle = "black";
    ctx.fillText(`${playerWeaponManager.currentGun} ${currentAmmo}`, 80, canvas.height - 50);
}

function drawHealthBar(character) {

    var maxHealthBarSize = 200;
    var percentHealthLeft = character.health / character.maxHealth;

    ctx.fillStyle = "red";
    ctx.fillRect(40, canvas.height - 40, maxHealthBarSize * percentHealthLeft, 20);
}
    function drawArmorBar(character) {

        var maxArmorBarSize = 200;
        var percentArmorLeft = character.armor / character.maxArmor;

        ctx.fillStyle = "blue";
        ctx.fillRect(40 + (maxArmorBarSize * (1 - percentArmorLeft)), canvas.height - 20, maxArmorBarSize * percentArmorLeft, 5);
        ctx.fillRect(40 + (maxArmorBarSize * (1 - percentArmorLeft)), canvas.height - 45, maxArmorBarSize * percentArmorLeft, 5);
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
        powerUpArray = [];

        for (let i = 0; i < startingEnemies; i++) {
            enemiesArray.push(new Enemy());
        }
        document.getElementById("death-screen").style.display = "none";
        winscreen.style.display = "none";
        heart.style.display = "block";
    }
    canvas.addEventListener("click", event => {
        playerWeaponManager.fireGun();

    })

    const pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            pause();
        }
        else {
            unpause();
        }
    });

function pause() {
    isPaused = true;
    pausemenu.style.display = "inline-block";
}

    function unpause() {
     isPaused = false;
        animate();
        pausemenu.style.display = "none";
}


function handleMute() {
    isMuted = !isMuted;
}

