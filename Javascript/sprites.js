let characterIdleX = 0;
let characterIdleY = 0;
let characterIdleWidth = 240/5;
let characterIdleHeight = 40;
let fireImageWidth = 23;
let fireImageHeight = 36;

let characterIdlePNG = new Image();
characterIdlePNG.src = "Images/Sprites/CHARACTER_SPRITES/Blue/Gunner_Blue_Idle.png";

let characterIdlePNGLeft = new Image();
characterIdlePNGLeft.src = "Images/Sprites/CHARACTER_SPRITES/Blue/LeftGunner_Blue_Idle.png";

let bulletPng = new Image();
bulletPng.src = "Images/Sprites/EXTRAS/Bullet.png";

let smallFirePng = new Image();
smallFirePng.src = "Images/FireBullet.png";

function changeCharacterColor(color) {
    characterIdlePNG.src = `Images/Sprites/CHARACTER_SPRITES/${color}/Gunner_${color}_Idle.png`;
}