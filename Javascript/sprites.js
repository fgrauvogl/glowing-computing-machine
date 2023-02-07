let characterIdleX = 0;
let characterIdleY = 0;
let characterIdleWidth = 240/5;
let characterIdleHeight = 40;

let characterIdlePNG = new Image();
characterIdlePNG.src = "Images/Sprites/CHARACTER_SPRITES/Blue/Gunner_Blue_Idle.png";

let bulletPng = new Image();
bulletPng.src = "Images/Sprites/EXTRAS/Bullet.png";

function changeCharacterColor(color) {
    characterIdlePNG.src = `Images/Sprites/CHARACTER_SPRITES/${color}/Gunner_${color}_Idle.png`;
}