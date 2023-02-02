var playerWeaponExp = {};
var playerGunLevel = {};

for (const value of Object.values(Guns)) {
    playerWeaponExp[value] = 0;
    playerGunLevel[value] = 1;
}

const weaponExpToLevel = {
    1:0,
    2: 83,
    3: 174,
    4: 276,
    5: 388,
    6: 512,
    7: 650,
    8: 801,
    9: 969,
    10: 1154,
    11: 1358,
    12: 1584,
    13: 1833,
    14: 2107,
    15: 2411,
    16: 2746,
    17: 3114,
    18: 3523,
    19: 3973,
    20: 4470
}