var listONames = ["Clint", "Mark", "Crumb"];

class Character {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 30;
        this.height = 30;
        let nameIndex = Math.floor(Math.random() * (listONames.length - 1));
        this.name = listONames[nameIndex];
        // this.health = this.getCharacterHealth();
        this.health = 10000;
        this.maxHealth = this.health;
        this.isDead = false;
        this.currentGun = Guns.GrenadeLauncher;
        this.armor = 500;
        this.maxArmor = this.armor;
        this.speed = 3;
        this.font = "10px Tahoma";

    }
    GetXMidPoint() {
        return this.x + this.width / 2;
    }
    GetYMidPoint() {
        return this.y + this.height / 2;
    }

    Movement(x, y) {
        if (this.isDead) {
            return;
        }

        this.x += x;
        this.y += y;

        if (this.x < 0) {
            this.x = 0;
            keyState[65] = false;
        }
        else if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            keyState[68] = false;
        }
        if (this.y < 0) {
            this.y = 0;
            keyState[87] = false;
        }
        else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            keyState[83] = false;
        }
    }
    hitPlayer(amount) {
        this.armor -= amount;
        if (this.armor <= 0) {
            this.armor = 0;
            this.health -= amount;

            if (this.health < 0) {
                this.health = 0;
                this.isDead = true;
            }
        }
    }

    characterDeadDead() {
        if (this.isDead)
            showDeathScreen();
            return;
    }

    draw() {
        ctx.fillStyle = "rgb(10, 75, 77)";
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = this.font;
        ctx.fillText(this.name, this.GetXMidPoint(), this.y);
    }
    update() {
        this.move();
        this.draw();
    }
    move() {

        // checks for up and left
        if (keyState[87] && keyState[65]) {
            character.Movement(-this.speed, 0);
            character.Movement(0, -this.speed);
        }
        // checks for up and right
        else if (keyState[87] && keyState[68]) {
            character.Movement(this.speed, 0);
            character.Movement(0, -this.speed);
        }
        // checks for down and left
        else if (keyState[83] && keyState[65]) {
            character.Movement(-this.speed, 0);
            character.Movement(0, this.speed);
        }
        // checks for down and right
        else if (keyState[83] && keyState[68]) {
            character.Movement(this.speed, 0);
            character.Movement(0, this.speed);
        }
        // checks for up
        else if (keyState[87]) {
            character.Movement(0, -this.speed);
        }
        // checks for down
        else if (keyState[83]) {
            character.Movement(0, this.speed);
        }
        // checks for right
        else if (keyState[68]) {
            character.Movement(this.speed, 0);
        }
        // checks for left
        else if (keyState[65]) {
            character.Movement(-this.speed, 0);
        }
    }


    getCharacterHealth() {
        if (this.name == "Crumb") {
            return 100;
        }
        else if (this.name == "Mark") {
            return 1000;
        }
        else if (this.name == "Clint") {
            return 10000;
        }
    }

    applyPowerUp(powerUpType) {
        switch (powerUpType) {
            case PowerUps.Armor:
                this.armor = Math.min(this.armor + 50, this.maxArmor);
                break;
            case PowerUps.HP:
                this.health = Math.min(this.health + 75, this.maxHealth);
                break;
            case PowerUps.Nuke:
                enemiesArray.forEach(enemy => {
                    getDrop(enemy);
                });
                enemiesArray = [];
                break;
            case PowerUps.ShotGunAmmo:
                playerWeaponManager.Ammo[Guns.ShotGun] = playerWeaponManager.Ammo[Guns.ShotGun] + 10;
                break;
            case PowerUps.GrenadeLauncherAmmo:
                playerWeaponManager.Ammo[Guns.GrenadeLauncher] = playerWeaponManager.Ammo[Guns.GrenadeLauncher] + 5;
                break;
            case PowerUps.MachineGunAmmo:
                playerWeaponManager.Ammo[Guns.MachineGun] = playerWeaponManager.Ammo[Guns.MachineGun] + 25;
                break;
            case PowerUps.ChainGunAmmo:
                playerWeaponManager.Ammo[Guns.ChainGun] = playerWeaponManager.Ammo[Guns.ChainGun] + 20;
                break;
            case PowerUps.MegaGatlingAmmo:
                playerWeaponManager.Ammo[Guns.MegaGatling] = playerWeaponManager.Ammo[Guns.MegaGatling] + 50;
                break;
            case PowerUps.SniperAmmo:
                playerWeaponManager.Ammo[Guns.Sniper] = playerWeaponManager.Ammo[Guns.Sniper] + 5;
                break;
            case PowerUps.FiftyCalAmmo:
                playerWeaponManager.Ammo[Guns.FiftyCal] = playerWeaponManager.Ammo[Guns.FiftyCal] + 3;
                break;
            default:
                break;
        }
    }
}