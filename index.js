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
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
const locations = [
  {
    name: "town Square",
    "button text": ["Go to store", "Go to Cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store"',
  },
  {
    name: "store",
    "button text": [
      "Buy health(10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the Store",
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Fanged Beast", "go to town Square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monster",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to Town Square",
      "Go to Town Square",
      "Go to Town Square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You DIE ☠️",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon you won the game 🎉 ",
  },
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
// functions
function update(location) {
  monsterStats.style.display = "none";
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
function buyHealth(params) {
  if (gold >= 10) {
    gold -= 10;
    health += 20;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "you do not have enough gold to buy health";
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = `You now have a new weapon ${newWeapon}. `;
      inventory.push(newWeapon);
      text.innerText += `In your inventory you have: ${newWeapon}.`;
      goldText.innerText = gold;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `you sold a  ${currentWeapon} in your inventory you have ${inventory}`;
  } else {
    text.innerText = "Don't sell your only weapon";
  }
}
function fightSlime() {
  fighting = 0;
  goFight(monsters[fighting]);
}
function fightBeast() {
  fighting = 1;
  goFight(monsters[fighting]);
}
function fightDragon() {
  fighting = 2;
  goFight(monsters[fighting]);
}
function goFight(monster) {
  update(locations[3]);
  monsterStats.style.display = "block";
  monsterNameText.innerText = monster.name;
  monsterHealthText.innerText = monster.health;
}
function attack() {
  text.innerText = `The ${monsters[fighting].name} attacks you attack it with your ${weapons[currentWeapon].name}.`;
  health -= monsters[fighting].level;
  monsterHealth = monsterHealthText.innerText;
  monsterHealth -=
    weapons[currentWeapon].power + (Math.floor(Math.random() * xp) + 1);
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster(monsters[fighting]);
  }
}
function dodge() {
  text.innerText = `You dodge the attack from ${monsters[fighting].name}.`;
}
function lose() {
  update(locations[5]);
}
function winGame() {
  update(locations[6]);
}
function defeatMonster(monster) {
  gold += Math.floor(monster.level * 6.7);
  xp += monster.level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
