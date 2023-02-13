let effectId = 1;
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

var branchId = 1;


var specialEffects = [];

class LightningBranch {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class LightningEffectObect {
    constructor(startX, startY, endX, endY, branches) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.kinksPerFrame = 1;
        this.currentKink = 0;
        this.lightningBoltLength = calculateDistance(startX, startY, endX, endY);
        this.lightningBoltKinks = Math.max(2, Math.ceil(.01 * this.lightningBoltLength));
        this.branches = [];
        for (let i = 0; i < branches; i++) {
            this.branches.push(new LightningBranch(this.startX, this.startY));
        }
    }

    update() {
        for (const branch of this.branches) {
            this.DrawBranch(branch);
        }
    }

    DrawBranch(branch) {
        var randomSeed = Math.floor(Date.now() * Math.random());
        effectCtx.beginPath();
        effectCtx.moveTo(branch.x, branch.y);
        let startingKink = this.currentKink;
        let endingKink = this.currentKink + this.kinksPerFrame;
        for (var i = startingKink; i < endingKink; i++) {
            if (i >= this.lightningBoltKinks) {

                this.DrawToEndPoint();
                break;
            }
            var t = i / this.lightningBoltKinks;
            var noiseX = simplex.noise3D(t * 10 + randomSeed, t * 10 + 10 + randomSeed, randomSeed * 0.0005);
            var noiseY = simplex.noise3D(t * 10 + randomSeed, t * 10 + 20 + randomSeed, randomSeed * 0.0005);
            var kinkVariance = 30;
            branch.x = branch.x + (this.endX - branch.x) * t + noiseX * kinkVariance - (kinkVariance / 2);
            branch.y = branch.y + (this.endY - branch.y) * t + noiseY * kinkVariance - (kinkVariance / 2);

            this.currentKink += 1;
            effectCtx.lineTo(branch.x, branch.y);
            effectCtx.stroke();
        }

        effectCtx.stroke();
    }

    DrawToEndPoint() {
        effectCtx.lineTo(this.endX, this.endY);
        effectCtx.stroke();
    }
}


























































function LightningEffect(startX, startY, endX, endY, lightningBoltBranches) {
    for (var b = 0; b < lightningBoltBranches; b++) {
        drawLightningBoltBranch(startX, startY, endX, endY);
    }
}

function drawLightningBoltBranch(startX, startY, endX, endY) {
    var randomSeed = Math.floor(Date.now() * Math.random());
    var lightningBoltLength = calculateDistance(startX, startY, endX, endY);
    var lightningBoltKinks = Math.max(2, Math.ceil(.01 * lightningBoltLength));

    effectCtx.beginPath();
    effectCtx.moveTo(startX, startY);

    for (var i = 1; i < lightningBoltKinks; i++) {
        var t = i / lightningBoltKinks;
        var noiseX = simplex.noise3D(t * 10 + randomSeed, t * 10 + 10 + randomSeed, randomSeed * 0.0005);
        var noiseY = simplex.noise3D(t * 10 + randomSeed, t * 10 + 20 + randomSeed, randomSeed * 0.0005);
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
        effectCtx.stroke();
    }
    effectCtx.lineTo(endX, endY);
    effectCtx.stroke();
}
