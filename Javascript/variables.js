/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 1200;
CANVAS_HEIGHT = canvas.height = 800;
const startingEnemies = 3;
const enemiesArray = [];
const enemynames = ["omega", "alien", "grunt"];
var maxEnemies = 10;