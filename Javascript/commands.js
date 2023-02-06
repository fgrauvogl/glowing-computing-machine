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
        default:
    }
}