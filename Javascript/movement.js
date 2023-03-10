var keysPressed = { };
var releaseTime = {};
MAX_KEY_DELAY = 10;
const KEY_DELAY = 200;
const keyProcessing = new Map();

function UpdateCharacterMovement() {
    character.isMoving = keyState[65] || keyState[87] || keyState[68] || keyState[83];
}

window.addEventListener('keydown', function (e) {
    const key = e.keyCode || e.which;
     //if (keyProcessing.has(key)) {
      //  return;
    // }
    keyProcessing.set(key, true);
    keyState[key] = true;
    keyState[e.keyCode || e.which] = true;
    UpdateCharacterMovement();
    if (key == 69) {
        playerWeaponManager.switchGunRight();
        updateWeaponExperience();
        updateCurrentGunText(playerWeaponManager.currentGun);
    }
    else if (key == 192) {
        toggleChat();
    }
    else if (key == 81) {
        playerWeaponManager.switchGunLeft();
        updateWeaponExperience();
        updateCurrentGunText(playerWeaponManager.currentGun);
    }
    else if (key == 80) {
        if (!isChatActive) {
            isPaused = !isPaused;
            if (!isPaused) {
                unpause();
            }
            else {
                pause();
            }
        }
    }
    else if (key === 13) {
        addCommand();
    }
    setTimeout(function () {
        keyProcessing.delete(key);
    }, KEY_DELAY);

}, true);

window.addEventListener('keyup', function (e) {
    delete keysPressed[e.keyCode];
    releaseTime[e.keyCode] = new Date().getTime();
    keyState[e.keyCode || e.which] = false;
    UpdateCharacterMovement();
}, true);

window.oncontextmenu = function () {
    event.preventDefault();
    keyState = {};
    return false;
}
window.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
        playerWeaponManager.switchGunLeft();

    } else {
        playerWeaponManager.switchGunRight();
    }
    updateCurrentGunText(playerWeaponManager.currentGun);
    updateWeaponExperience();
});

window.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    playerWeaponManager.fireGun();
}, true);
window.addEventListener('mouseup', function (e) {
    isMouseDown = false;
}, true);

window.addEventListener("mouseleave", function (e) {
    isMouseDown = false;
}, true);

window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, true);
