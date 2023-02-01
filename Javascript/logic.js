for (let i = 0; i < startingEnemies; i++) {
    enemiesArray.push(new Enemy());
}

var character = new Character();

let frame = 0;


function animate() {
    if (isPaused || character.isDead) { return; }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
    });
    characterProjectileArray.forEach(projectile => {
        projectile.update();
    });
    enemyProjectileArray.forEach(projectile => {
        projectile.enemyProjectileUpdate();
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

function clearCtx() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    itemCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

}

function toggleDoomMode() {
    if (gameMode == GameModes.Doom) {
        gameMode = null;
        music.pause();
    }
    else {
        gameMode = GameModes.Doom;
        music = new Audio();
        music.src = ("./Audio/Doom.mp3");
        levelCounter.innerText = "DOOM";
        doomLoop();
        if (!isMuted) {
            music.play();
        }
    }
    restart(false);
}

function doomLoop() {
    if (gameMode != GameModes.Doom) {
        return;
    }

    if (currentDoomCountDown <= 0 && enemiesArray.length == 0) { winGame(); }

    enemiesArray.push(new Enemy());

    currentDoomCountDown -= 10;

    if (currentDoomCountDown < 100) { setTimeout(doomLoop, 100); }
    else {
        setTimeout(doomLoop, currentDoomCountDown);
    }

}

function handleLevelUp() {
    switch (gameMode) {

        case GameModes.Doom:

            break;
        default: {
            if (enemiesArray.length == 0) {

                if (level == maxLevel) {
                    winGame();
                }
                else {
                    levelUp();
                }
            }
        }
            break;
    }
}

function winGame() {
    winscreen.style.display = "block";
    heart.style.display = "none";
}

function levelUp() {
    level += 1;

    levelCounter.innerText = level;

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
    music.pause();
}

function restart(needsAnimationReset = true) {
    keyState = {};
    clearCtx();
    unpause();
    pausemenu.style.display = "none";
    level = 1;
    characterProjectileArray = [];
    enemyProjectileArray = [];
    character = new Character();
    enemiesArray = [];
    powerUpArray = [];
    playerWeaponManager.currentGun = Guns.Pistol;
    playerWeaponManager.setStartingAmmo();
    currentDoomCountDown = startingDoomCountDown
    if (gameMode != GameModes.Doom) {
        startLevel();
    }
    if (!isMuted) {
        music.play();
    }
    document.getElementById("death-screen").style.display = "none";
    winscreen.style.display = "none";
    heart.style.display = "block";
    if (needsAnimationReset) {
        animate();
    }
}
canvas.addEventListener("click", event => {
    playerWeaponManager.fireGun();

})

function startLevel() {
    for (let i = 0; i < startingEnemies; i++) {
        enemiesArray.push(new Enemy());
    }
    levelCounter.innerText = level;
}

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
    let text = (shotsHit[playerWeaponManager.currentGun] / shotsFired[playerWeaponManager.currentGun]) * 100;
    accuracyText.innerText = text.toFixed(2) + "%";

}

function unpause() {
    isPaused = false;
    animate();
    pausemenu.style.display = "none";
}


function handleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        music.pause();
        audioOnImage.style.display = "none";
        muteImage.style.display = "inline-block";
        
    }
    else {
        if (gameMode == GameModes.Doom) {
            music.play();
        }
        audioOnImage.style.display = "inline-block";
        muteImage.style.display = "none";
    }
}

