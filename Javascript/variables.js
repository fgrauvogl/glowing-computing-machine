/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const itemCanvas = document.getElementById('item-canvas');
const winscreen = document.getElementById('win-screen');
const pausemenu = document.getElementById('pause-menu');


const ctx = canvas.getContext('2d');
const itemCtx = itemCanvas.getContext('2d');

CANVAS_WIDTH = itemCanvas.width = canvas.width = window.innerWidth;
CANVAS_HEIGHT = itemCanvas.height = canvas.height = window.innerHeight;
const startingEnemies = 5;
const monstersPerLevel = 3;
var isMouseDown = false;
let isPaused = false;
let isMuted = false;
let mouseX = 0;
let mouseY = 0;
var level = 1;
var maxLevel = 30;
var enemiesArray = [];
var projectileArray = [];
const enemynames = ["omega", "alien", "grunt"];
var maxEnemies = 30;
var keyState = {};
const Guns = {
	ShotGun: "Shot Gun",
	Pistol: "Pistol",
	MachineGun: "Machine Gun",
	ChainGun: "Chain Gun",
	GrenadeLauncher: "Grenade Launcher",
	Sniper: "Sniper Rifle",
	FiftyCal: "50 Cal",
	MegaGatling: "Mega Gatling Gun"
}
var shotGunPellets = 6;
var shotGunSpread = [1, .5, -.5, -1];
const PowerUps = {
	Armor: "Armor",
	ShotGun: "Shot Gun",
	MachineGun: "Machine Gun",
	GrenadeLauncher: "Grenade Launcher",
	SpeedUp: "Speed Up",
	Nuke: "Nuke",
	HP: "HP",
	ExtraLife: "Extra Life",
}
var powerUpArray = [];

var slider = document.getElementById("volume-bar");

let volume = 100;

slider.oninput = function () {
	volume = this.value;
	console.log(this.value);
}