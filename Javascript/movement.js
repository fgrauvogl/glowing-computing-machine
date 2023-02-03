var keysPressed = { };
var releaseTime = {};
MAX_KEY_DELAY = 10;

window.addEventListener('keydown', function (e) {
    let key = e.key.toLowerCase();
    var time = new Date().getTime();
    if (releaseTime[event.keyCode] &&
        time < releaseTime[event.keyCode] + MAX_KEY_DELAY) {
        return false;
    }

    keysPressed[event.keyCode] = true;

    keyState[e.keyCode || e.which] = true;
    if (key == "e") {
        playerWeaponManager.switchGunRight();
        updateWeaponExperience();

    }
    else if (key == "`") {
        toggleChat();
    }
    else if (key == "q") {
        playerWeaponManager.switchGunLeft();
        updateWeaponExperience();

    }
    else if (key == "p") {
        isPaused = !isPaused;
        if (!isPaused) {
            unpause();
        }
        else {
            pause();
        }
    }
    else if (key === 'enter') {
        addCommand();
    }
 
}, true);
window.addEventListener('keyup', function (e) {
    delete keysPressed[event.keyCode];
    releaseTime[event.keyCode] = new Date().getTime();
    keyState[e.keyCode || e.which] = false;
}, true);
window.oncontextmenu = function () {
    keyState = {};
}

window.addEventListener('mousedown', function (e) {
    isMouseDown = true;
}, true);
window.addEventListener('mouseup', function (e) {
    isMouseDown = false;
}, true);

window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, true);


window.onclick = function (e) {
    getCursorPosition(canvas, e);
    playerWeaponManager.fireGun();
    }

function getCursorPosition(canvas, event)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const diffx = x - character.x
    const diffy = y - character.y
}
