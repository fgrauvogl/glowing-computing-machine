var powerUpId = 1;


class PowerUp {
    constructor(x, y,lootRoll) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.powerUpType = this.getPowerUpType(lootRoll);
        this.powerUpId = powerUpId;
        powerUpId += 1;
        this.image = new Image();
        this.image.src = this.getPowerUpImage(this.powerUpType);
    }


    getPowerUpType(number) {
        
        if (number < 20) {
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

                
            default:
        }
    }

    update() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}