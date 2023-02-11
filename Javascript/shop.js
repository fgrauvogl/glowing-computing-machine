let shopMenu = document.getElementById('shop-menu');
const text = document.querySelector("#text");
const upArrow = document.querySelector("#up-arrow");
const downArrow = document.querySelector("#down-arrow");
const shopButtonContainer = document.querySelector("#shop-button-container");



upArrow.addEventListener("click", function () {
    playerWeaponManager.switchGunRight();
    updateCurrentGunText(playerWeaponManager.currentGun);
    
});

downArrow.addEventListener("click", function () {
    playerWeaponManager.switchGunLeft();
    updateCurrentGunText(playerWeaponManager.currentGun);

});

for (const key in defaultPowerUps) {
    const button = document.createElement("button");
    button.classList.toggle("button-74");
    button.textContent = defaultPowerUps[key];
    button.addEventListener("click", function () {
        console.log(`Selected Power Up: ${defaultPowerUps[key]}`);
    });
    shopButtonContainer.appendChild(button);
}

