var gunsList = [Guns.Pistol, Guns.ShotGun, Guns.GrenadeLauncher, Guns.MachineGun, Guns.ChainGun, Guns.MegaGatling, Guns.Sniper, Guns.FiftyCal];
var mobGunsList = [Guns.Pistol, Guns.ShotGun, Guns.GrenadeLauncher, Guns.MachineGun, Guns.ChainGun, Guns.Sniper, Guns.FiftyCal];

var automaticGuns = {};
automaticGuns[Guns.MachineGun] = 450;
automaticGuns[Guns.ChainGun] = 20;
automaticGuns[Guns.MegaGatling] = 2;
automaticGuns[Guns.Pistol] = 800;
automaticGuns[Guns.GrenadeLauncher] = 1000;
automaticGuns[Guns.Sniper] = 500;
automaticGuns[Guns.FiftyCal] = 500;
automaticGuns[Guns.ShotGun] = 1500;



var shotsFired = {};
var shotsHit = {};

var ammoPerShot = {};
ammoPerShot[Guns.MegaGatling] = 100;

class PlayerWeaponManager {
    constructor() {
        this.gunIndex = 0;
        this.currentGun = gunsList[this.gunIndex];
        this.Ammo = {};
        this.setStartingAmmo();
        this.isWeaponCoolDown = false;
    }

    setStartingAmmo() {
        this.Ammo[Guns.GrenadeLauncher] = 10;
        this.Ammo[Guns.ShotGun] = 5;
        this.Ammo[Guns.MachineGun] = 50;
        this.Ammo[Guns.ChainGun] = 0;
        this.Ammo[Guns.Sniper] = 50;
        this.Ammo[Guns.FiftyCal] = 50;
        this.Ammo[Guns.MegaGatling] = 0;
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
        this.Ammo[this.currentGun] -= ammoPerShot[this.currentGun] ?? 1;
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


    recordShotsFired() {
        if (shotsFired[this.currentGun]) {
            shotsFired[this.currentGun] += 1;
        }
        else {
            shotsFired[this.currentGun] = 1;
        }
    }


    fireGun() {
        let weaponCooldown = this.isWeaponCoolDown;
        if (isPaused || character.isDead || winner || this.isWeaponCoolDown) {
            return;
        }

        if (automaticGuns[this.currentGun]) {
            this.setWeaponCoolDown(automaticGuns[this.currentGun]);
        }

        if (this.getAmmo(this.currentGun) == 0) { return; }

        this.recordShotsFired ();

        this.useAmmo();

        let x = event?.clientX ?? mouseX;

        let y = event?.clientY ?? mouseY;

        switch (playerWeaponManager.currentGun) {

            case Guns.ShotGun: {

                playAudio("./Audio/bestshotgun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, 0, this.currentGun);


                characterProjectileArray.push(projectile);

                for (var i = 0; i < shotGunPellets; i++) {
                    let projectile2 = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, projectile.angle + .3 * (.5 - Math.random()), this.currentGun);

                    characterProjectileArray.push(projectile2);
                }

                break;
            }
            case Guns.GrenadeLauncher: {

                playAudio("./Audio/GrenadeLauncher.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, 0, this.currentGun);
                projectile.radius = 12;
                projectile.damage = 40;
                projectile.isGrenade = true;
                projectile.isImpactOnHit = true;
                characterProjectileArray.push(projectile);


                break;
            }
            case Guns.MachineGun: {

                playAudio("./Audio/machinegun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, 0, this.currentGun);

                projectile.damage = 24;

                characterProjectileArray.push(projectile);

                break;
            }
            case Guns.ChainGun: {

                playAudio("./Audio/machinegun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 12, x, y, 0, this.currentGun);

                characterProjectileArray.push(projectile);

                break;
            }
            case Guns.MegaGatling: {

                playAudio("./Audio/machinegun.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 20, x, y, 0, this.currentGun);

                characterProjectileArray.push(projectile);
                shotsFired[this.currentGun] += 100;
                for (var i = 0; i < 100; i++) {
                    let projectile2 = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 20, x, y, projectile.angle + .5 * (.5 - Math.random()), this.currentGun);
                    characterProjectileArray.push(projectile2);
                }

                break;
            }
            case Guns.Sniper: {

                playAudio("./Audio/Sniper.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 30, x, y, 0, this.currentGun);

                projectile.damage = 20;

                projectile.radius = 3;

                characterProjectileArray.push(projectile);

                break;
            }
            case Guns.FiftyCal: {

                playAudio("./Audio/50.Cal.mp3");

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 30, x, y, 0, this.currentGun);

                projectile.damage = 50;

                projectile.radius = 10;

                projectile.isArmorPiercing = true;

                characterProjectileArray.push(projectile);

                break;
            }

            default:
                {
                    playAudio("./Audio/Pistol.mp3");

                    let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 4, x, y, 0, this.currentGun);

                    characterProjectileArray.push(projectile);
                }
        }
    }
}

function fireProjectileAtMouseLocation() {

    let x = event?.clientX ?? mouseX;

    let y = event?.clientY ?? mouseY;

}

var playerWeaponManager = new PlayerWeaponManager();

