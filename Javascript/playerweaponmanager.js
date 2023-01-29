var gunsList = [Guns.Pistol, Guns.ShotGun, Guns.GrenadeLauncher, Guns.MachineGun];

class PlayerWeaponManager {
    constructor() {
        this.gunIndex = 0;
        this.currentGun = gunsList[this.gunIndex];
        this.Ammo = {};
        this.Ammo[Guns.GrenadeLauncher] = 30;
        this.Ammo[Guns.ShotGun] = 30;
    }
    switchGunRight() {
        let startingIndex = this.gunIndex;

        let index = startingIndex += 1;

        if (index >= gunsList.length - 1) {
            this.currentGun = gunsList[0];
            this.gunIndex = 0;
            return;
        }

        else if (this.getAmmo(gunsList[index]) > 0) {
            this.currentGun = gunsList[index];
            this.gunIndex = index;
            return;
        }
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
        else if (index < 0) {
            this.gunIndex = gunsList.length - 1;
            this.switchGunLeft();
        }
    }
    switchGun(gunType) {
        this.currentGun = gunType;
    }
    useAmmo() {
        this.Ammo[this.currentGun] -= 1;
    }
    getAmmo(gunType) {
        return this.Ammo[gunType];
    }

    fireGun() {

        if (this.getAmmo(this.currentGun) == 0) { return; }

        this.useAmmo();

        let rect = canvas.getBoundingClientRect();

        let x = event.clientX - rect.left;

        let y = event.clientY - rect.top;

        switch (playerWeaponManager.currentGun) {

            case Guns.ShotGun: {
                const audio = new Audio("./Audio/bestshotgun.mp3");

                audio.play();

                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y);

                projectileArray.push(projectile);

                for (var i = 0; i < shotGunPellets; i++) {
                    let projectile2 = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y, projectile.angle + .3 * (.5 - Math.random()));
                    projectileArray.push(projectile2);
                }

                break;
            }
            case Guns.GrenadeLauncher: {
                const audio = new Audio("./Audio/GrenadeLauncher.mp3");
                audio.play();


                let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 8, x, y);
                projectile.radius = 12;
                projectile.damage = 40;
                projectile.isGrenade = true;
                projectile.isImpactOnHit = true;
                projectileArray.push(projectile);


                break;
            }

            default:
                {
                    const audio = new Audio("./Audio/pew.mp3");

                    audio.play();

                    let projectile = new Projectile(character.x + character.width / 2, character.y + character.height / 2, 4, x, y);

                    projectileArray.push(projectile);
                }
        }
    }
}