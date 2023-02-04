var powerUpId = 1;


class PowerUp {
    constructor(x, y, lootRoll) {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.width = 25;
        this.height = 25;
        this.id = powerUpId;
        this.powerUpType = this.getPowerUpType(lootRoll);
        this.powerUpId = powerUpId;
        this.image = new Image();
        this.image.src = this.getPowerUpImage(this.powerUpType);
        this.powerUpIsDead = false;
        setTimeout(this.removeMyself.bind(this), 20000);

        powerUpId += 1;
    }
    removeMyself() {
        removePowerUp(this.id);
    }

    getPowerUpType(number) {
        if (number < 25) {
            return PowerUps.Armor;
            }
        if (number < 50) {
            return PowerUps.HP;
        }
        if (number < 55) {
            return PowerUps.ShotGunAmmo;
        }
        if (number < 60) {
            return PowerUps.GrenadeLauncherAmmo;
        }
        if (number < 65) {
            return PowerUps.MachineGunAmmo;
        }
        if (number < 70) {
            return PowerUps.ChainGunAmmo;
        }
        if (number < 82) {
            return PowerUps.SniperAmmo;
        }
        if (number < 90) {
            return PowerUps.FiftyCalAmmo;
        }
        if (number < 95) {
            return PowerUps.MegaGatlingAmmo;
        }
        if (number < 100) {
            return PowerUps.Nuke;
        }
    }

    getPowerUpImage(powerUpType) {
        switch (powerUpType) {
            case PowerUps.Armor: {
                return "./Images/Armor.png";
            }
            case PowerUps.HP: {
                return "./Images/heart.png";
            }
            case PowerUps.Nuke: {
                return "./Images/nuke.png";
            }
            case PowerUps.ShotGunAmmo: {
                return "./Images/ShotgunAmmo.png";
            }
            case PowerUps.GrenadeLauncherAmmo: {
                return "./Images/GrenadeLauncherAmmo.png";
            }
            case PowerUps.MachineGunAmmo: {
                return "./Images/MachineGunAmmo.png";
            }
            case PowerUps.ChainGunAmmo: {
                return "./Images/ChainGunAmmo.png";
            }
            case PowerUps.MegaGatlingAmmo: {
                return "./Images/MegaGatlingAmmo.png";
            }
            case PowerUps.SniperAmmo: {
                return "./Images/SniperAmmo.png";
            }
            case PowerUps.FiftyCalAmmo: {
                return "./Images/FiftyCalAmmo.png";
            }
            default:
        }
    }







    collidesWith(character) {
        return (
            this.x < character.x + character.width &&
            this.x + this.width > character.x &&
            this.y < character.y + character.height &&
            this.y + this.height > character.y
        );
    }

    dropPickup() {
        if (this.collidesWith(character)) {
            character.applyPowerUp(this.powerUpType);
            this.powerUpIsDead = true;
            removePowerUp(this.id);
        }
    }

    update() {
        this.dropPickup();
        if (this.image.src && !this.powerUpIsDead) {
            itemCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            itemCtx.clearRect(this.x, this.y, this.width, this.height);
        }

    }
}

function removePowerUp(id) { 
    let obj = powerUpArray.find(x => x.id === id);
    let index = powerUpArray.indexOf(obj);
    if (obj == null) { return; }
    powerUpArray.splice(index, 1);
    if (obj?.x) {
        itemCtx.clearRect(obj.x, obj.y, obj.width, obj.height);
    }
    else {
        itemCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

}
