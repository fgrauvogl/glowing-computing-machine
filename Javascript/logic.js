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
    updateArmor();
    updateHealth();
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
        healthBarColor = "red";
        music.pause();
        document.getElementById("doom-image").style.display = "none";

    }
    else {
        gameMode = GameModes.Doom;
        levelCounter.innerText = "DOOM";
        doomLoop();
        document.getElementById("doom-image").style.display = "inline-block";
        healthBarColor = "blue";

        if (!isMuted) {
            music.src = ("./Audio/Doom.mp3");
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
            if (enemiesArray.length == 0 && stagedEnemiesArray.length == 0) {

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
}

function spawnFromStagedEnemy(timeInMs) {
    if (stagedEnemiesArray.length == 0) { return };
    if (!isPaused) {
        enemiesArray.push(stagedEnemiesArray[0]);
        stagedEnemiesArray.splice(0, 1);
    }
    spawnRate = timeInMs ?? defaultMobSpawnRate;
    setTimeout(spawnFromStagedEnemy, spawnRate);
}

function spawnRandomEnemies() {
    let number = level * monstersPerLevel;
    let spanOfTimeinSeconds = level
    for (let i = 0; i < number; i++) {
        stagedEnemiesArray.push(new Enemy());
    }

    //time in ms needed to spawn each enemy in given timeperiod
    let timeInMs = (spanOfTimeinSeconds * 1000) / number;

    spawnFromStagedEnemy(timeInMs);
}


function levelUp() {

    level += 1;

    levelCounter.innerText = level;

    spawnRandomEnemies();
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
        currentAmmo = "INF";
    }
    ctx.fillStyle = "black";
    ctx.font = "20px Games";
    ctx.fillText(`${currentAmmo}`, canvas.width - 40, canvas.height - 5, 35);
}


function showDeathScreen() {
    playAudio("./Audio/mariodeath.mp3");
    document.getElementById("death-screen").style.display = "block";
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
    updateWeaponExperience();
    if (gameMode != GameModes.Doom) {
        startLevel();
    }
    else {
        if (!isMuted) {
        music.play();
        }
    }
   
    document.getElementById("death-screen").style.display = "none";
    winscreen.style.display = "none";
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

const updateWeaponExperience = () => {

    let currentGunLevel = playerGunLevel[playerWeaponManager.currentGun];

    let expDifferenceNeededForCurrentLevel = weaponExpToLevel[currentGunLevel + 1] - weaponExpToLevel[currentGunLevel];

    let expCharacterHasForCurrentLevelSoFar = playerWeaponExp[playerWeaponManager.currentGun] - weaponExpToLevel[currentGunLevel];

    let progressPercent = (expCharacterHasForCurrentLevelSoFar / expDifferenceNeededForCurrentLevel) * 100;

    let gun = playerWeaponManager.currentGun;

    experienceText.innerText = `${gun} Lvl ${currentGunLevel}: XP ${playerWeaponExp[playerWeaponManager.currentGun]}/${weaponExpToLevel[currentGunLevel + 1]}`;

    experienceBar.style.width = `${progressPercent}%`;

    if (progressPercent >= 100) {
        playerGunLevel[playerWeaponManager.currentGun] += 1;
    }
};

updateWeaponExperience();

const toggleChat = () => {
    isChatActive = !isChatActive;
    if (isChatActive) {
        commandLine.style.display = "inline-block";
    }
    else {
        commandLine.style.display = "none";
    }
};
