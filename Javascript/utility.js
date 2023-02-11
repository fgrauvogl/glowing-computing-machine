function playAudio(fileLocation) {
    if (isMuted) {
        return;
    }
    const audio = new Audio(fileLocation);

    audio.volume = volume / 100;

    audio.play();
}

let characterExperience = 5;

const updateCharacterExperience = () => {
    characterExperience += 5;
    characterExperienceText.textContent = experience;
    characterExperienceBar.style.width = `${experience}%`;
    if (experience === 100) {
        alert('Character Level up!');
    }
};
const updateArmor = () => {
    let percentArmor = (character.armor / character.maxArmor) * 100;
    armorText.textContent = character.armor;
    armorBar.style.width = `${percentArmor}%`;
};

const updateHealth = () => {
    let percentHealth = (character.health / character.maxHealth) * 100;
    hpText.textContent = percentHealth;
    hpBar.style.width = `${percentHealth}%`;
};

function calculateDistance(x1, y1, x2, y2) {
    var difx = x1 - x2;
    var dify = y1 - y2;
    return Math.sqrt(Math.pow(difx, 2) + Math.pow(dify, 2));
}

function updateCurrentGunText(text) {
    currentGunText.innerText = text;
}