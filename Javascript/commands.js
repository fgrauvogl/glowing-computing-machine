function spawnEnemies(type, number, time) {
    let timeInMs = time * 1000;

    let timeToSpawnPerMob = timeInMs / number;

    for (var i = 0; i < number; i++) {
        var enemy = new Enemy(type);
        stagedEnemiesArray.push(enemy);   
    }

    spawnFromStagedEnemy(timeToSpawnPerMob);
}


function handleCommand(commandText) {
    commandText = commandText.toLowerCase();

    let commands = commandText.split(" ");

    let commandKeyWord = commands[0];
    
    switch (commandKeyWord) {
        case "spawn": {
            spawnEnemies(commands[1], commands[2], commands[3]);
            break;
        }
        case "fire": {
            if (character.powerUp != ElementalPowerUps.Fire) {
                character.powerUp = ElementalPowerUps.Fire;
            }
            else {
                character.powerUp = null;
            }
            break;
        }
        case "lightning": {
            LightningEffect(character.GetXMidPoint(), character.GetYMidPoint(), mouseX, mouseY, 10);
            break;
        }
        case "color": {
            changeCharacterColor(commands[1]);
            break;
        }
        case "stop": {
            stagedEnemiesArray = [];
            enemiesArray = [];
            break;
        }
        case "charger": {
            var enemy = new SpecialEnemy();
            stagedEnemiesArray.push(enemy);
            spawnFromStagedEnemy(1000);
            break;
        }
        case "avoider": {
            var enemy = new AvoidingEnemy();
            stagedEnemiesArray.push(enemy);
            spawnFromStagedEnemy(1000);
            break;
        }
        case "drone": {
            if (commands[1]) {
                for (var i = 0; i < commands[1]; i++) {
                    let droneSpawnX = getRandomXCoord() * 20;
                    character.drones.push(new Drone(droneSpawnX + ((Math.random() - .5) * 9001), (getRandomYCoord(droneSpawnX) * 20) + ((Math.random() - .5) * 9001)));
                }
            }
            break;
        }
        default:
    }
}