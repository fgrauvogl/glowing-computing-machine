/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const winscreen = document.getElementById('win-screen');
const pewAudio = document.getElementById("pew");
const shotGunAudio = document.getElementById("shotgun");
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = window.innerWidth - 20;
CANVAS_HEIGHT = canvas.height = window.innerHeight - 3;
const startingEnemies = 3;
const monstersPerLevel = 3;
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
	GrenadeLauncher: "Grenade Launcher",
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