var gunsList = [Guns.Pistol, Guns.ShotGun, Guns.GrenadeLauncher, Guns.MachineGun, Guns.ChainGun, Guns.Sniper, Guns.FiftyCal];
var automaticGuns = {};
automaticGuns[Guns.MachineGun] = 200;
automaticGuns[Guns.ChainGun] = 20;

class PlayerWeaponManager {
    constructor() {
        this.gunIndex = 0;
        this.currentGun = gunsList[this.gunIndex];
        this.Ammo = {};
        this.Ammo[Guns.GrenadeLauncher] = 30;
        this.Ammo[Guns.ShotGun] = 30;
        this.Ammo[Guns.MachineGun] = 2000;
        this.Ammo[Guns.ChainGun] = 2000;
        this.Ammo[Guns.Sniper] = 100;
        this.Ammo[Guns.FiftyCal] = 100;
        this.isWeaponCoolDown = false;
    }

    setWeaponCoolDown(timeInMilliSeconds) {
        this.isWeaponCoolDown = true;

        setTimeout(this.removeWeaponCoolDown.bind(this), timeInMilliSeconds);
    }
    removeWeaponCoolDown() {

        this.isWeaponCoolDown = false;
    }

    switchGunRight() {
        let startingIndex = this.gunIndex;

        let index = startingIndex += 1;

        if (index >= gunsList.length) {
            this.currentGun = gunsList[0];
            this.gunIndex = 0;
            return;
        }

        else if (this.getAmmo(gunsList[index]) > 0) {
            this.currentGun = gunsList[index];
            this.gunIndex = index;
            return;
        }
        this.gunIndex = index;
        this.switchGunRight();
    }
    switchGunLeft() {
        let startingIndex = this.gunIndex;

        let index = startingIndex -= 1;

        if (index == 0) {
            this.currentGun = gunsList[0];
            this.gunIndex = 0;
            return;
        }
        else if (this.getAmmo(gunsList[index]) > 0) {
            this.currentGun = gunsList[index];
            this.gunIndex = index;
            return;
        }
        else if (startingIndex <= 0) {
            this.gunIndex = gunsList.length;
        }
        else {
            this.gunIndex = index;
        }
        this.switchGunLeft();
    }
    switchGun(gunType) {
        this.currentGun = gunType;
    }
    useAmmo() {
        this.Ammo[this.currentGun] -= 1;
    }
    getCurrentAmmoOfCurrentGun() {
        return this.Ammo[this.currentGun];
    }
    getAmmo(gunType) {
        return this.Ammo[gunType];
    }
    update() {
        if (isMouseDown && automaticGuns[this.currentGun] && !this.isWeaponCoolDown) {
            this.fireGun();
        }
    }
    fireGun() {
        if (isPaused) {
            return;
        }

        if (automaticGuns[this.currentGun]) {
            this.setWeaponCoolDown(automaticGuns[this.currentGun]);
        }

        if (this.getAmmo(this.currentGun) == 0) { return; }

        this.useAmmo();

        let rect = canvas.getBoundingClientRect();

        let x = event?.clientX ?? mouseX;

        let y = event?.clientY ?? mouseY;

        switch (playerWeaponManager.currentGun) {

            case Guns.ShotGun: {

                playAudio("./Audio/bestshotgun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y);

                projectileArray.push(projectile);

                for (var i = 0; i < shotGunPellets; i++) {
                    let projectile2 = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, projectile.angle + .3 * (.5 - Math.random()));
                    projectileArray.push(projectile2);
                }

                break;
            }
            case Guns.GrenadeLauncher: {

                playAudio("./Audio/GrenadeLauncher.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y);
                projectile.radius = 12;
                projectile.damage = 40;
                projectile.isGrenade = true;
                projectile.isImpactOnHit = true;
                projectileArray.push(projectile);


                break;
            }
            case Guns.MachineGun: {

                playAudio("./Audio/machinegun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 12, x, y);

                projectileArray.push(projectile);

                break;
            }
            case Guns.ChainGun: {

                playAudio("./Audio/machinegun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 15, x, y);

                projectileArray.push(projectile);

                break;
            }
            case Guns.Sniper: {

                playAudio("./Audio/Sniper.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 30, x, y);

                projectile.damage = 20;

                projectile.radius = 3;

                projectileArray.push(projectile);

                break;
            }
            case Guns.FiftyCal: {

                playAudio("./Audio/Sniper.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 30, x, y);

                projectile.damage = 50;

                projectile.radius = 10;

                projectile.isArmorPiercing = true;

                projectileArray.push(projectile);

                break;
            }

            default:
                {
                    playAudio("./Audio/Pistol.mp3");

                    let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 4, x, y);

                    projectileArray.push(projectile);
                }
        }
    }
}