/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const itemCanvas = document.getElementById('item-canvas');
const winscreen = document.getElementById('win-screen');
const pausemenu = document.getElementById('pause-menu');
const levelCounter = document.getElementById('levelCounter');
const music = document.getElementById('music');

const ctx = canvas.getContext('2d');
const itemCtx = itemCanvas.getContext('2d');

CANVAS_WIDTH = itemCanvas.width = canvas.width = window.innerWidth;
CANVAS_HEIGHT = itemCanvas.height = canvas.height = window.innerHeight;
const startingEnemies = 1;
const monstersPerLevel = 3;
var isMouseDown = false;
let isPaused = false;
let isMuted = false;
let mouseX = 0;
let mouseY = 0;
var level = 1;
var maxLevel = 30;
var enemiesArray = [];
var characterProjectileArray = [];
var enemyProjectileArray = [];

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
	ShotGunAmmo: "Shot Gun Ammo",
	MachineGunAmmo: "Machine Gun AMmo",
	GrenadeLauncherAmmo: "Grenade Launcher Ammo",
	ChainGunAmmo: "Chain Gun Ammo",
	FiftyCalAmmo: "Fifty Cal Ammo",
	MegaGatlingAmmo: "Mega Gatling Ammo",
	SniperAmmo: "Sniper Ammo",
	SpeedUp: "Speed Up",
	Nuke: "Nuke",
	HP: "HP",
	ExtraLife: "Extra Life",
}
let gameMode = null;

const GameModes = {
	Doom: "Doom"
}

let startingDoomCountDown = 1000;
let currentDoomCountDown = 1000;

var powerUpArray = [];

var slider = document.getElementById("volume-bar");

let volume = 30;

slider.oninput = function () {
	volume = this.value;
}