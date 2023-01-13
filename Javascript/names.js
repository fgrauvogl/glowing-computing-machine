const omegaNames = [];

const firstNames = ['Zorg', 'Gax', 'Kla', 'Xandar', 'Arkus', 'Pluto', 'Nebula', 'Celeste', 'Mylar', 'Sol'];
const middleNames = [' the Great', ' the Wise', ' the Powerful', ' the Mysterious', ' the Fearless', ' the Magnificent', ' the Omniscient', ' the Supreme', ' the Omnipotent', ' the Eternal'];
const lastNames = ['Zorgon', 'Gaxian', 'Klaxon', 'Xandarian', 'Arkite', 'Pluton', 'Nebulon', 'Celestian', 'Mylarite', 'Solarian'];

for (let i = 0; i < 1000; i++) {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  omegaNames.push(`${randomFirstName}${randomMiddleName} ${randomLastName}`);
}

const alienNames = [];

const firstAlienNames = ["Cinta", "Chico", "Zuma", "Nenet", "Tecum", "Mecal", "Nomad", "Ozoma", "Pulit", "Quetz"];
const middleAlienNames = ["Xitli", "Atzin", "Nelli", "Tzint", "Quini", "Palli", "Tzatz", "Zalli", "Zepit", "Lalli"];
const lastAlienNames = ["Itzal", "Xalli", "Patal", "Cital", "Zatal", "Quetz", "Itzel", "Litli", "Tzelt", "Necte"];

for (let i = 0; i < 1000; i++) {
  const randomFirstName = firstAlienNames[Math.floor(Math.random() * firstAlienNames.length)];
  const randomMiddleName = middleAlienNames[Math.floor(Math.random() * middleAlienNames.length)];
  const randomLastName = lastAlienNames[Math.floor(Math.random() * lastAlienNames.length)];
  alienNames.push(`${randomFirstName} ${randomMiddleName} ${randomLastName}`);
}

const gruntNames = [];

const firstGruntNames = ["Weenie", "Wonk", "Swot", "Dink", "Double Dome", "Low Brow", "Gold Brick", "ChuckleHead", "Nimrod", "DummKopf"];
const lastGruntNames = [' the Dweeb', ' the Dunce', ' the Loser', ' the Geek', ' the Nerd', ' the Dork', ' the Goof', ' the Fool', ' the Buffoon', ' the Simpleton'];

for (let i = 0; i < 1000; i++) {
  const randomFirstName = firstGruntNames[Math.floor(Math.random() * firstGruntNames.length)];
  const randomLastName = lastGruntNames[Math.floor(Math.random() * lastGruntNames.length)];
  gruntNames.push(`${randomFirstName}${randomLastName}`);
}
