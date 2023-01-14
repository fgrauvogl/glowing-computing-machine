for (let i = 0; i < startingEnemies; i++) {
    enemiesArray.push(new Enemy());
}

    var character = new Character();

    function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
    });
        character.update();
    window.requestAnimationFrame(animate);
}

animate();
