let burnTicks = 10;

const ElementalPowerUps = {
    Fire: "Fire"
}

function ApplyDamage(victim, damage) {
    console.log("Trying to apply burn");
    if (victim.burnsLeft <= 0) { return; }
    victim.health -= damage;
    victim.burnsLeft -= 1;
    
}

function Burn(victim, damage, timeInSeconds) {
    let timeInMs = timeInSeconds * 1000;
    let timePerTick = timeInMs / burnTicks;
    victim.burnsLeft = burnTicks;
    let intervalId = setInterval(function () {
        ApplyDamage(victim, damage / burnTicks);
        if (victim.burnsLeft <= 0 || victim.health <= 0) {
            clearInterval(intervalId);
        }
    }, timePerTick);
}

function ApplyPowerUp(victim, powerUpType, damage) {
    switch (powerUpType) {
        case ElementalPowerUps.Fire: {
            Burn(victim, damage, 5);
        }

        default:
    }
}