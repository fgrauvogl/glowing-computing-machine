/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const deathScreen = document.getElementById("death-screen");
const itemCanvas = document.getElementById('item-canvas');
const effectCanvas = document.getElementById('effect-canvas');
const winScreen = document.getElementById('win-screen');
const pausemenu = document.getElementById('pause-menu');
const levelCounter = document.getElementById('levelCounter');
const music = document.getElementById('music');
var accuracyText = document.getElementById('accuracy-%');
var muteImage = document.getElementById('mute-image');
var audioOnImage = document.getElementById('audioOn-image');
const characterExperienceBar = document.querySelector('.character-experience-bar');
const characterExperienceText = document.querySelector('#character-experience');
const experienceBar = document.querySelector('.experience-bar');
const experienceText = document.querySelector('#experience');
const armorBar = document.querySelector('.armor-bar');
const armorText = document.querySelector('#armor');
const hpBar = document.querySelector('.hp-bar');
const hpText = document.querySelector('#hp');
const chatInput = document.querySelector('.chat-input');
const chatMessages = document.querySelector('.chat-messages');
let defaultMobSpawnRate = 500;
let experience = 0;
var healthBarColor = "red";
var winner = false;
var doomBackground = document.getElementById('doom-background');
doomBackground.draggable = false;
deathScreen.draggable = false;
canvas.draggable = false;
winScreen.draggable = false;
itemCanvas.draggable = false;
effectCanvas.draggable = false;
var currentGunText = document.getElementById('currentGun');
var defaultPowerUps = {
	fireRate: '+Fire Rate',
	firePower: '+Fire Power',
	bulletSpeed: '+Projectile Speed',
	}

const ctx = canvas.getContext('2d');
const itemCtx = itemCanvas.getContext('2d');
const effectCtx = effectCanvas.getContext('2d');


CANVAS_WIDTH = effectCanvas.width = itemCanvas.width = canvas.width = window.innerWidth;
CANVAS_HEIGHT = effectCanvas.height = itemCanvas.height = canvas.height = window.innerHeight;

function resize() {
	CANVAS_WIDTH = itemCanvas.width = effectCanvas.width = canvas.width = window.innerWidth;
	CANVAS_HEIGHT = itemCanvas.height = effectCanvas.height = canvas.height = window.innerHeight;
}
var startingEnemies = 1;
var monstersPerLevel = 2;
var isMouseDown = false;
let isPaused = false;
let isMuted = false;
let isChatActive = false;
let mouseX = 0;
let mouseY = 0;
var level = 1;
var maxLevel = 3;
var enemiesArray = [];
var stagedEnemiesArray = [];
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
	Sniper: "Rifle",
	FiftyCal: "50 Cal",
	MegaGatling: "Mega Gatling Gun",
	Lightning: "Lightning",
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
	SniperAmmo: "Rifle Ammo",
	SpeedUp: "Speed Up",
	Nuke: "Nuke",
	HP: "HP",
	ExtraLife: "Extra Life",
}

const MobTypes = {
	Grunt: "grunt",
	Alien: "alien",
	Omega: "omega"
	}

let gameMode = null;

const GameModes = {
	Doom: "Doom",
	SandBox: "Sand Box"
}

let startingDoomCountDown = 1000;
let currentDoomCountDown = 1000;

var powerUpArray = [];

var slider = document.getElementById("volume-bar");

let volume = 25;

slider.oninput = function () {
	volume = this.value;
}