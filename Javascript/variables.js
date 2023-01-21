/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 1889;
CANVAS_HEIGHT = canvas.height = 900;
const startingEnemies = 30;
var enemiesArray = [];
var projectileArray = [];
const enemynames = ["omega", "alien", "grunt"];
var maxEnemies = 30;
var keyState = {};