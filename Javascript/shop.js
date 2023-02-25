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
