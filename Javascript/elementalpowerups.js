let burnTicks = 10;
var simplex = new SimplexNoise();

const ElementalPowerUps = {
    Fire: "Fire",
    Lightning: "Lightning",
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

function LightningEffect(startX, startY, endX, endY, lightningBoltBranches) {
    var randomSeed = Math.floor(Date.now() * Math.random());
    var lightningBoltLength = calculateDistance(startX, startY, endX, endY);
    var lightningBoltKinks = Math.max(2, Math.ceil(.01 * lightningBoltLength));
    for (var b = 0; b < lightningBoltBranches; b++) {
        effectCtx.beginPath();
        effectCtx.moveTo(startX, startY);
        for (var i = 1; i < lightningBoltKinks; i++) {
            var t = i / lightningBoltKinks;
            var noiseX = simplex.noise3D(t * 10 + b * 10 + randomSeed, t * 10 + b * 10 + randomSeed, randomSeed * 0.0005);
            var noiseY = simplex.noise3D(t * 10 + b * 20 + randomSeed, t * 10 + b * 20 + randomSeed, randomSeed * 0.0005);
            var kinkVariance = 30;
            var branchX = startX + (endX - startX) * t + noiseX * kinkVariance - (kinkVariance / 2);
            var branchY = startY + (endY - startY) * t + noiseY * kinkVariance - (kinkVariance / 2);

            // Calculate the attraction towards the closest enemy
            var closestEnemy = null;
            var closestDistance = 150;
            for (var e = 0; e < enemiesArray.length; e++) {
                var enemy = enemiesArray[e];
                var distance = calculateDistance(branchX, branchY, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                if (distance < closestDistance) {
                    closestEnemy = enemy;
                    closestDistance = distance;
                }
            }
            if (closestEnemy != null) {
                endX = closestEnemy.midPointX;
                endY = closestEnemy.midPointY;
                var attractionDirectionX = (closestEnemy.x + closestEnemy.width / 2 - branchX) / closestDistance;
                var attractionDirectionY = (closestEnemy.y + closestEnemy.height / 2 - branchY) / closestDistance;
                var attractionStrength = 1000 / closestDistance;
                branchX += attractionDirectionX * attractionStrength;
                branchY += attractionDirectionY * attractionStrength;
            }

            effectCtx.lineTo(branchX, branchY);
        }
        effectCtx.lineTo(endX, endY);
        effectCtx.stroke();
    }
}
