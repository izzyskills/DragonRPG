let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locations = [
  {
    name: "town Square",
    "button text": ["Go to store", "Go to Cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'you are in the town square. you see a sign that says "Store"',
  },
  {
    name: "store",
    "button text": [
      "Buy health(10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "you enter the Store",
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Fanged Beast", "go to town Square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "you enter the cave. You see some monster",
  },
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
// functions
function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
function goTown() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}
function fightDragon() {
  console.log("Going to store");
}
function buyHealth(params) {}
function buyWeapon(params) {}
function fightSlime(params) {}
function fightBeast(params) {}
