let burnTicks = 10;

const ElementalPowerUps = {
    Fire: "Fire"
}

function ApplyDamage(victim, damage) {
    victim.health -= damage;
}

function Burn(victim, damage, timeInSeconds) {
    let timeInMs = timeInSeconds * 1000;
    let timePerTick = timeInMs / burnTicks;
    for (var i = 0; i < burnTicks; i++) {
        setTimeout(function () {
            ApplyDamage(victim, damage / burnTicks);
        }, i * timePerTick);
    }
}

function ApplyPowerUp(victim, powerUpType, damage) {
    switch (powerUpType) {
        case ElementalPowerUps.Fire: {
            Burn(victim, damage, 5);
        }
        default:
    }
}