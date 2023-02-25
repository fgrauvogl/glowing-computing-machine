var weaponModifiers = {};

for (const value of Object.values(Guns)) {
    weaponModifiers[value] = {};
    for (const modifierValue of Object.values(defaultPowerUps)) {
        weaponModifiers[value][modifierValue] = 1;

    }     
}

function applyGunUpgrade(event, button) {
    debugger;
    let powerUpType = button.textContent;
    weaponModifiers[playerWeaponManager.currentGun][powerUpType] = weaponModifiers[playerWeaponManager.currentGun][powerUpType] * 1.05;
}

console.log(weaponModifiers);

function updateCurrentGunText(text) {
    currentGunText.innerText = text;
    shopButtonContainer.innerHTML = '';
    for (const key in defaultPowerUps) {
        const button = document.createElement("button");
        button.addEventListener('click', function () {
            applyGunUpgrade(event, button);
        });

        button.classList.toggle("button-74");
        button.textContent = defaultPowerUps[key];
        shopButtonContainer.appendChild(button);
    }
}