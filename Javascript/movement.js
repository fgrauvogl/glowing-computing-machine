

window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
    if (e.key == "e") {
        playerWeaponManager.switchGunRight();
    }
    else if (e.key == "q") {
        playerWeaponManager.switchGunLeft();
    }
}, true);
window.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
}, true);

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
