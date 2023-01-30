var powerUpId = 1;


class PowerUp {
    constructor(x, y, lootRoll) {
        this.x = x;
        this.y = y;
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

        if (number < 99) {
            return PowerUps.HP;
        }
        if (number < 100) {
            return PowerUps.Armor;
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
        if (this.image.src) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {

        }

    }
}

function removePowerUp(id) { 
    let obj = powerUpArray.find(x => x.id === id);
    let index = powerUpArray.indexOf(obj);

    if (this.powerUpIsDead = true) {
        powerUpArray.splice(index, 1);
    }

}