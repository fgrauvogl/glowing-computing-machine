

window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
    console.log(keyState);
    if (e.key == "e") {
        playerWeaponManager.switchGunRight();
    }
    else if (e.key == "q") {
        playerWeaponManager.switchGunLeft();
    }
    else if (e.key == "p") {
        isPaused = !isPaused;
        if (!isPaused) {
            unpause();
        }
        else {
            pause();
        }
    }
}, true);
window.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
    console.log(keyState);

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

    }

function getCursorPosition(canvas, event)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const diffx = x - character.x
    const diffy = y - character.y
}
