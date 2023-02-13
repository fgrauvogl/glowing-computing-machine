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
    constructor(x, y, endX, endY, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.startX = x;
        this.startY = x;
        this.endY = endY;
        this.endX = endX;
    }

    update() {
        this.startX = this.x;
        this.startY = this.y;
    }
}

class LightningEffectObect {
    constructor(startX, startY, endX, endY, branches) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.kinkLife = 50;
        this.kinksPerFrame = 1;
        this.currentKink = 1;
        this.attractionRange = 150;
        this.lightningBoltLength = calculateDistance(startX, startY, endX, endY);
        this.lightningBoltKinks = Math.max(2, Math.ceil(.02 * this.lightningBoltLength));

        this.branches = [];
        let branchId = 1;
        for (let i = 0; i < branches; i++) {
            this.branches.push(new LightningBranch(this.startX, this.startY, this.endX + (.5 - Math.random()) * 100, this.endY + (.5 - Math.random()) *100, branchId));
            branchId += 1;
        }
    }

    update() {
        if (this.branches.length > 0) {
            for (const branch of this.branches) {
                branch.update();
                this.DrawBranch(branch);
            }
        }
        else {
            removeEnemySFX(this.id);
        }
      
    }

    DrawBranch(branch) {
        var randomSeed = Math.floor(Date.now() * Math.random());
        effectCtx.beginPath();
        effectCtx.moveTo(branch.x, branch.y);
        let startingKink = this.currentKink;
        let endingKink = this.currentKink + this.kinksPerFrame;
        for (var i = startingKink; i < endingKink; i++) {
            if (i > this.lightningBoltKinks) {
                this.DrawToEndPoint(branch);
                this.RemoveBranch(branch.id);
                break;
            }
            var t = i / this.lightningBoltKinks;
            var noiseX = simplex.noise3D(t * 10 + randomSeed, t * 10 + 10 + randomSeed, randomSeed * 0.0005);
            var noiseY = simplex.noise3D(t * 10 + randomSeed, t * 10 + 20 + randomSeed, randomSeed * 0.0005);
            var kinkVariance = 50;
            branch.x = branch.x + (branch.endX - branch.x) * t + noiseX * kinkVariance - (kinkVariance / 2);
            branch.y = branch.y + (branch.endY - branch.y) * t + noiseY * kinkVariance - (kinkVariance / 2);
            this.CalculateEnemyHit(branch);
            this.currentKink += 1;
            effectCtx.lineTo(branch.x, branch.y);
            effectCtx.stroke();
            if (branch) {

                let branchX = branch.x;
                let branchY = branch.y;
                let startY  = branch.startY;
                let startX = branch.startX;

                setTimeout(() => this.DeleteEffectOnCanvas(startX, startY, branchX, branchY), this.kinkLife);
            }
        }


        effectCtx.stroke();
    }

    CalculateEnemyHit(branch) {
        // Calculate the attraction towards the closest enemy
        var closestEnemy = null;
        var closestDistance = this.attractionRange;
        for (var e = 0; e < enemiesArray.length; e++) {
            var enemy = enemiesArray[e];
            var distance = calculateDistance(branch.x, branch.y, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
            if (distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }
        if (closestEnemy != null) {
            branch.endX = closestEnemy.midPointX;
            branch.endY = closestEnemy.midPointY;
            var attractionDirectionX = (closestEnemy.x + closestEnemy.width / 2 - branch.x) / closestDistance;
            var attractionDirectionY = (closestEnemy.y + closestEnemy.height / 2 - branch.y) / closestDistance;
            var attractionStrength = 1000 / closestDistance;
            branch.x += attractionDirectionX * attractionStrength;
            branch.y += attractionDirectionY * attractionStrength;
        }

    }

DeleteEffectOnCanvas(x1, y1, x2, y2) {
    const startX = Math.min(x1, x2);
    const startY = Math.min(y1, y2);
    const width = Math.abs(x2 - x1) + 2;
    const height = Math.abs(y2 - y1) + 2;
    effectCtx.clearRect(startX - 1, startY - 1, width, height);
}

    RemoveBranch(id) {
        let obj = this.branches.find(x => x.id === id);
        let index = this.branches.indexOf(obj);
        this.branches.splice(index, 1);
    }

    DrawToEndPoint(branch) {
        effectCtx.lineTo(branch.endX, branch.endY);
        effectCtx.stroke();
        setTimeout(() => this.DeleteEffectOnCanvas(branch.startX, branch.startY, branch.endX, branch.endY), this.kinkLife);
    }
}

function removeEnemySFX(id) {
    let obj = specialEffects.find(x => x.id === id);
    let index = specialEffects.indexOf(obj);
    specialEffects.splice(index, 1);
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


        effectCtx.lineTo(branchX, branchY);
        effectCtx.stroke();
    }
    effectCtx.lineTo(endX, endY);
    effectCtx.stroke();
}