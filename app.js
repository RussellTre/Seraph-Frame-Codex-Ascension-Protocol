"use strict";

const outcomeBands = [
  { max: 7, rank: 0, label: "Consequence" },
  { max: 14, rank: 1, label: "Mixed" },
  { max: 20, rank: 2, label: "Success" }
];

const MAX_DAMAGE = 10;
const MAJOR_DAMAGE = 4;
const CRITICAL_DAMAGE = 7;

const pilots = {
  roman: {
    name: "Roman Kade",
    team: "Team Echo",
    sync: "Full 100% Sync Phantasmal",
    frame: "Seraph Athena",
    weapon: "Trident / Aegis",
    abilityType: "Phantasm",
    phantasm: "Aetherion Protocol",
    manifestation: "Athena maps the battlefield in radiant lines and drives the trident through the opening."
  },
  kaela: {
    name: "Kaela Myrr",
    team: "Team Echo",
    sync: "Full 100% Sync Phantasmal",
    frame: "Seraph Mnemosyne",
    weapon: "Crimson Tide Greatsword",
    abilityType: "Phantasm",
    phantasm: "Echo Waltz",
    manifestation: "Mnemosyne unfolds in a storm of remembered motion, the greatsword tracing a crimson arc."
  },
  elias: {
    name: "Elias Vale",
    team: "Team Echo",
    sync: "Full 100% Sync Phantasmal",
    frame: "Seraph Gaia",
    weapon: "Twin War Forge Hammers",
    abilityType: "Phantasm",
    phantasm: "Memory Forge",
    manifestation: "Gaia answers the hammerfall, forging the weight of memory into a single crushing blow."
  },
  harken: {
    name: "Harken Relasdottir",
    team: "Team Echo",
    sync: "Full 100% Sync Phantasmal",
    frame: "Seraph Sigrun",
    weapon: "Gungnir",
    abilityType: "Phantasm",
    phantasm: "Judgment Spear",
    manifestation: "Sigrun plants herself against the world and Gungnir launches with absolute resolve."
  }
};

function createRoster(team, frame, combatPattern, technique, manifestation, members) {
  return Object.fromEntries(members.map(([id, name, sync, weaponSpecialty]) => [id, {
    name,
    team,
    sync,
    frame,
    weapon: weaponSpecialty || combatPattern,
    abilityType: "Signature Technique",
    phantasm: technique,
    manifestation
  }]));
}

const opponentTeams = {
  echo: {
    name: "Team Echo",
    members: Object.fromEntries(Object.entries(pilots).map(([id, pilot]) => [`echo_${id}`, { ...pilot }]))
  },
  aegis: {
    name: "Team Aegis",
    members: createRoster(
      "Team Aegis",
      "Aegis Combat Frame",
      "Adaptive defense pattern",
      "Aegis Counter",
      "Aegis tightens its formation logic and returns force through a disciplined counterline.",
      [
        ["thalia", "Thalia Rime", "Advanced 75% Sync", "Tower Shield & Execution Blade"],
        ["reya", "Reya Aurin", "Advanced 70% Sync", "Halo Rail Longbow"],
        ["tessa", "Tessa Irayanma", "Advanced 77% Sync", "Siegebreaker Chain Maces"],
        ["myra", "Myra Skarde", "Advanced 75% Sync", "Breach Axes"]
      ]
    )
  },
  brimstone: {
    name: "Team Brimstone",
    members: createRoster(
      "Team Brimstone",
      "Brimstone Combat Frame",
      "Siege pressure pattern",
      "Brimstone Breaker",
      "Brimstone anchors hard and pours siege-force through the opening.",
      [
        ["veda", "Veda Lioran", "Advanced 70% Sync", "Infernal Halberd"],
        ["breanne", "Breanne Serel", "Full 85% Sync", "Cataclysm Gauntlets"],
        ["quenn", "Quenn Sable", "Advanced 70% Sync", "Fang Cleavers"],
        ["thea", "Thea Cross", "Advanced 79% Sync", "War Pike Cannon"]
      ]
    )
  },
  claymore: {
    name: "Team Claymore",
    members: createRoster(
      "Team Claymore",
      "Claymore Combat Frame",
      "Precision blade pattern",
      "Claymore Execution",
      "Claymore waits for a fraction of error, then drives a surgical strike through it.",
      [
        ["galatea", "Galatea", "Full 85% Sync", "Sanctified Claymore"],
        ["rafaela", "Rafaela", "Full 85% Sync", "Funeral Scythe"],
        ["ophelia", "Ophelia", "Full 85% Sync", "Twin Seraph Sabers"],
        ["priscilla", "Priscilla", "Full 85% Sync", "Halo Estoc"]
      ]
    )
  },
  draco: {
    name: "Team Draco",
    members: createRoster(
      "Team Draco",
      "Draco Combat Frame",
      "Aggressive assault pattern",
      "Draco Dive",
      "Draco commits to a driving assault line, turning momentum into impact.",
      [
        ["paravania", "Paravania Iscalleron", "Advanced 70% Sync", "Royal Lance Rifle"],
        ["lian", "Lian Tsang", "Advanced 65% Sync", "Silkwire Blades"],
        ["gretchen", "Gretchen Wassenvell", "Full 80% Sync", "Morgue Scythe"],
        ["ysa", "Ysa Youngblood", "Advanced 79% Sync", "Meteor Knuckles"]
      ]
    )
  },
  hydra: {
    name: "Team Hydra",
    members: createRoster(
      "Team Hydra",
      "Hydra Combat Frame",
      "Disruption and misdirection pattern",
      "Hydra Feint",
      "Hydra fractures the read of the battlefield, then attacks from the false signal.",
      [
        ["kifumi", "Kifumi Miata", "Advanced 73% Sync", "Marionette Needles"],
        ["cantessa", "Cantessa Weaver", "Advanced 79% Sync", "Mirage Fans"],
        ["hilde", "Hilde Vahn", "Full 80% Sync", "Guillotine Hammer"],
        ["ibeza", "Ibeza Uman", "Advanced 75% Sync", "Serpent Whipblades"]
      ]
    )
  },
  oracle: {
    name: "Team Oracle",
    members: createRoster(
      "Team Oracle",
      "Oracle Combat Frame",
      "Predictive combat pattern",
      "Oracle Forecast",
      "Oracle predicts the next vector and turns anticipation into a punishing intercept.",
      [
        ["eira", "Eira Voss", "Full 83% Sync", "Halo Scepter Array"],
        ["juno", "Juno Cadrin", "Full 80% Sync", "Titan Breaker Fists"],
        ["selin", "Selin Marei", "Advanced 75% Sync", "Mist Chakrams"],
        ["lyra", "Lyra Vassari", "Advanced 78% Sync", "Eclipse Anti-Material Rifle"]
      ]
    )
  },
  pharos: {
    name: "Team Pharos",
    members: createRoster(
      "Team Pharos",
      "Pharos Combat Frame",
      "Measured combat pattern",
      "Pharos Lance",
      "Pharos draws the engagement into a clean line and strikes with measured force.",
      [
        ["cass", "Cass Avenel", "Advanced 74% Sync", "Solar Ribbon Fans"],
        ["lune", "Lune Arakari", "Advanced 68% Sync", "Crescent Veil Bow"],
        ["yana", "Yana Sol", "Advanced 72% Sync", "Crusher Tonfas"],
        ["noa", "Noa Verrel", "Full 83% Sync", "Blink Daggers"]
      ]
    )
  },
  stratus: {
    name: "Team Stratus",
    members: {
      zaya: {
        name: "Zaya Tenpenny",
        team: "Team Stratus",
        sync: "Full 80% Sync",
        frame: "Stratus Vanguard Frame",
        weapon: "Redshift Claw Gauntlets",
        abilityType: "Signature Technique",
        phantasm: "Skybreak Dash",
        manifestation: "Zaya becomes a streak of pressure and laughter, striking from a vanishing angle."
      },
      niko: {
        name: "Niko Thorne",
        team: "Team Stratus",
        sync: "Full 82% Sync",
        frame: "Stratus Cloak Frame",
        weapon: "Ghostblades",
        abilityType: "Signature Technique",
        phantasm: "Ghost Step",
        manifestation: "Niko disappears into shimmer and returns at the Frame's blind side."
      },
      drayce: {
        name: "Drayce Vionne",
        team: "Team Stratus",
        sync: "Full 87% Sync",
        frame: "Stratus Aerial Frame",
        weapon: "Astra Lance",
        abilityType: "Signature Technique",
        phantasm: "Falling Star",
        manifestation: "Drayce dives through the upper air, blades singing against the neural link."
      },
      olenna: {
        name: "Olenna Farrix",
        team: "Team Stratus",
        sync: "Full 85% Sync",
        frame: "Stratus Marksman Frame",
        weapon: "Widowmaker Carbine",
        abilityType: "Signature Technique",
        phantasm: "Horizon Lock",
        manifestation: "Olenna seals every escape route in a grid of railgun light."
      }
    }
  },
  vega: {
    name: "Team Vega",
    members: createRoster(
      "Team Vega",
      "Vega Combat Frame",
      "Duelist formation pattern",
      "Vega Crossing",
      "Vega cuts across the engagement in paired vectors, forcing a decisive duel.",
      [
        ["arden", "Arden Locke", "Full 82% Sync", "Command Saber"],
        ["kara", "Kara Tern", "Advanced 79% Sync", "Vanguard Twinblades"],
        ["ezri", "Ezri Malen", "Advanced 75% Sync", "Bastion Hammer"],
        ["sora", "Sora Mire", "Advanced 72% Sync", "Mirage Staff"]
      ]
    )
  },
  authority: {
    name: "Seraph Authority",
    members: {
      maria_vi: {
        name: "Maria Steinbeck VI",
        team: "Seraph Authority",
        sync: "Authority 110% Sync // High Clearance",
        frame: "Authority Evaluation Frame",
        weapon: "Sekhmet Warblade",
        abilityType: "Authority Override",
        phantasm: "Command Lock",
        manifestation: "Maria VI compresses the battlefield into a single permitted outcome."
      },
      akkani: {
        name: "Ak'kani Yonda",
        team: "Seraph Authority",
        sync: "Authority 110% Sync // High Clearance",
        frame: "Authority Evaluation Frame",
        weapon: "Grand Ikakalaka",
        abilityType: "Authority Override",
        phantasm: "Hunt Vector",
        manifestation: "Ak'kani drives forward with a predatory burst calculated to break formation."
      },
      thera: {
        name: "Thera Von Kratz",
        team: "Seraph Authority",
        sync: "Authority 110% Sync // High Clearance",
        frame: "Authority Evaluation Frame",
        weapon: "Tyrant Maul",
        abilityType: "Authority Override",
        phantasm: "Iron Sentence",
        manifestation: "Thera advances like an execution order given physical force."
      },
      valentique: {
        name: "Valentique Amorat",
        team: "Seraph Authority",
        sync: "Authority 110% Sync // High Clearance",
        frame: "Authority Evaluation Frame",
        weapon: "Carnival Rapiers",
        abilityType: "Authority Override",
        phantasm: "Glass-Eye Gambit",
        manifestation: "Valentique twists the encounter into theater, attacking through uncertainty."
      },
      freya: {
        name: "Freya Relasdottir",
        team: "Seraph Authority",
        sync: "Authority 110% Sync // High Clearance",
        frame: "Authority Evaluation Frame",
        weapon: "Black Hunt Spear",
        abilityType: "Authority Override",
        phantasm: "Correction Protocol",
        manifestation: "Freya applies a cold, exacting strike designed to force obedience."
      }
    }
  }
};

const arenas = {
  crucible: {
    name: "Zenith Crucible",
    description: "A floating marble platform over a glowing sea. No cover. Every movement is visible."
  },
  orbital: {
    name: "Orbital Breach Ring",
    description: "Zero gravity debris and broken docking pylons make every approach a dangerous rotation."
  },
  veilfall: {
    name: "Sector 17-C Preview",
    description: "A restricted reconstruction of the colony zone where Operation Veilfall will begin."
  }
};

const state = {
  playerId: "roman",
  rivalTeamId: "stratus",
  rivalId: "zaya",
  arenaId: "crucible",
  player: null,
  enemy: null,
  phase: "setup",
  turn: "player",
  round: 0,
  over: false
};

const teamState = {
  rivalTeamId: "claymore",
  arenaId: "crucible",
  allies: [],
  enemies: [],
  phase: "setup",
  turn: "player",
  round: 0,
  over: false
};

const duoState = {
  allyIds: ["roman", "kaela"],
  rivalTeamId: "aegis",
  enemyIds: ["thalia", "reya"],
  arenaId: "crucible",
  allies: [],
  enemies: [],
  phase: "setup",
  turn: "player",
  round: 0,
  over: false
};

let activeMode = "duel";

const elements = {
  modeButtons: [...document.querySelectorAll(".mode-button")],
  setupPanel: document.querySelector("#setupPanel"),
  battlePanel: document.querySelector("#battlePanel"),
  pilotChoices: document.querySelector("#pilotChoices"),
  rivalTeamChoice: document.querySelector("#rivalTeamChoice"),
  rivalLegend: document.querySelector("#rivalLegend"),
  rivalChoices: document.querySelector("#rivalChoices"),
  customOpponentPanel: document.querySelector("#customOpponentPanel"),
  customName: document.querySelector("#customName"),
  customTeam: document.querySelector("#customTeam"),
  customSync: document.querySelector("#customSync"),
  customFrame: document.querySelector("#customFrame"),
  customWeapon: document.querySelector("#customWeapon"),
  customTechnique: document.querySelector("#customTechnique"),
  arenaChoice: document.querySelector("#arenaChoice"),
  startButton: document.querySelector("#startButton"),
  initiativeButton: document.querySelector("#initiativeButton"),
  actionButtons: [...document.querySelectorAll("#actions .action")],
  resetButton: document.querySelector("#resetButton"),
  duoSetupPanel: document.querySelector("#duoSetupPanel"),
  duoBattlePanel: document.querySelector("#duoBattlePanel"),
  duoPilotOneChoice: document.querySelector("#duoPilotOneChoice"),
  duoPilotTwoChoice: document.querySelector("#duoPilotTwoChoice"),
  duoEchoPreview: document.querySelector("#duoEchoPreview"),
  duoRivalTeamChoice: document.querySelector("#duoRivalTeamChoice"),
  duoEnemyOneChoice: document.querySelector("#duoEnemyOneChoice"),
  duoEnemyTwoChoice: document.querySelector("#duoEnemyTwoChoice"),
  duoEnemyPreview: document.querySelector("#duoEnemyPreview"),
  duoArenaChoice: document.querySelector("#duoArenaChoice"),
  startDuoButton: document.querySelector("#startDuoButton"),
  duoArenaTitle: document.querySelector("#duoArenaTitle"),
  duoArenaDescription: document.querySelector("#duoArenaDescription"),
  duoPhaseLabel: document.querySelector("#duoPhaseLabel"),
  duoTurnLabel: document.querySelector("#duoTurnLabel"),
  duoPlayerRoster: document.querySelector("#duoPlayerRoster"),
  duoEnemyLabel: document.querySelector("#duoEnemyLabel"),
  duoEnemyRoster: document.querySelector("#duoEnemyRoster"),
  duoTargeting: document.querySelector("#duoTargeting"),
  duoActorChoice: document.querySelector("#duoActorChoice"),
  duoTargetChoice: document.querySelector("#duoTargetChoice"),
  duoInitiativeButton: document.querySelector("#duoInitiativeButton"),
  duoActionButtons: [...document.querySelectorAll("#duoActions .duo-action")],
  resetDuoButton: document.querySelector("#resetDuoButton"),
  duoLog: document.querySelector("#duoLog"),
  teamSetupPanel: document.querySelector("#teamSetupPanel"),
  teamBattlePanel: document.querySelector("#teamBattlePanel"),
  teamEchoPreview: document.querySelector("#teamEchoPreview"),
  teamRivalChoice: document.querySelector("#teamRivalChoice"),
  teamEnemyPreview: document.querySelector("#teamEnemyPreview"),
  teamArenaChoice: document.querySelector("#teamArenaChoice"),
  startTeamButton: document.querySelector("#startTeamButton"),
  teamArenaTitle: document.querySelector("#teamArenaTitle"),
  teamArenaDescription: document.querySelector("#teamArenaDescription"),
  teamPhaseLabel: document.querySelector("#teamPhaseLabel"),
  teamTurnLabel: document.querySelector("#teamTurnLabel"),
  teamPlayerRoster: document.querySelector("#teamPlayerRoster"),
  teamEnemyLabel: document.querySelector("#teamEnemyLabel"),
  teamEnemyRoster: document.querySelector("#teamEnemyRoster"),
  teamTargeting: document.querySelector("#teamTargeting"),
  teamActorChoice: document.querySelector("#teamActorChoice"),
  teamTargetChoice: document.querySelector("#teamTargetChoice"),
  teamInitiativeButton: document.querySelector("#teamInitiativeButton"),
  teamActionButtons: [...document.querySelectorAll("#teamActions .team-action")],
  resetTeamButton: document.querySelector("#resetTeamButton"),
  teamLog: document.querySelector("#teamLog"),
  codexPanel: document.querySelector("#codexPanel"),
  arenaTitle: document.querySelector("#arenaTitle"),
  arenaDescription: document.querySelector("#arenaDescription"),
  phaseLabel: document.querySelector("#phaseLabel"),
  turnLabel: document.querySelector("#turnLabel"),
  playerName: document.querySelector("#playerName"),
  playerSync: document.querySelector("#playerSync"),
  playerFrame: document.querySelector("#playerFrame"),
  playerAbility: document.querySelector("#playerAbility"),
  playerDamage: document.querySelector("#playerDamage"),
  playerStatus: document.querySelector("#playerStatus"),
  enemyName: document.querySelector("#enemyName"),
  enemySync: document.querySelector("#enemySync"),
  enemyTeamLabel: document.querySelector("#enemyTeamLabel"),
  enemyFrame: document.querySelector("#enemyFrame"),
  enemyAbility: document.querySelector("#enemyAbility"),
  enemyDamage: document.querySelector("#enemyDamage"),
  enemyStatus: document.querySelector("#enemyStatus"),
  log: document.querySelector("#log")
};

function buildChoiceCards(collection, destination, groupName, selectedId) {
  destination.innerHTML = Object.entries(collection).map(([id, pilot]) => `
    <label class="choice ${id === selectedId ? "selected" : ""}" data-choice="${id}">
      <input type="radio" name="${groupName}" value="${id}" ${id === selectedId ? "checked" : ""}>
      <strong>${pilot.name}</strong>
      <small>${pilot.frame}</small>
      <p>${pilot.weapon}</p>
      ${pilot.sync ? `<em>${syncInitiativeProfile(pilot)}</em>` : ""}
    </label>
  `).join("");

  destination.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      destination.querySelectorAll(".choice").forEach((card) => card.classList.remove("selected"));
      input.closest(".choice").classList.add("selected");
      state[groupName === "playerId" ? "playerId" : "rivalId"] = input.value;
    });
  });
}

function buildOpponentDivisionChoices() {
  elements.rivalTeamChoice.innerHTML = Object.entries(opponentTeams).map(([id, team]) =>
    `<option value="${id}">${team.name}</option>`
  ).join("") + `<option value="custom">Custom Future Opponent</option>`;
  elements.rivalTeamChoice.value = state.rivalTeamId;
  elements.rivalTeamChoice.addEventListener("change", () => {
    state.rivalTeamId = elements.rivalTeamChoice.value;
    if (state.rivalTeamId !== "custom") {
      state.rivalId = Object.keys(opponentTeams[state.rivalTeamId].members)[0];
    }
    renderOpponentRoster();
  });
  renderOpponentRoster();
}

function renderOpponentRoster() {
  const customSelected = state.rivalTeamId === "custom";
  elements.customOpponentPanel.classList.toggle("hidden", !customSelected);
  elements.rivalLegend.parentElement.classList.toggle("hidden", customSelected);
  if (customSelected) {
    return;
  }
  const division = opponentTeams[state.rivalTeamId];
  elements.rivalLegend.textContent = `${division.name} Opponents`;
  buildChoiceCards(division.members, elements.rivalChoices, "rivalId", state.rivalId);
}

function cleanCustomEntry(value, fallback) {
  const clean = value.trim().replace(/[<>]/g, "");
  return clean || fallback;
}

function buildCustomOpponent() {
  if (!elements.customName.reportValidity() || !elements.customSync.reportValidity()) {
    return null;
  }
  const sync = Math.max(0, Math.min(100, Number(elements.customSync.value)));
  return {
    name: cleanCustomEntry(elements.customName.value, "Unknown Rival"),
    team: cleanCustomEntry(elements.customTeam.value, "Future Event Opponent"),
    sync: `${sync}% Sync // Custom Event`,
    frame: cleanCustomEntry(elements.customFrame.value, "Unknown Combat Frame"),
    weapon: cleanCustomEntry(elements.customWeapon.value, "Experimental martial weapon"),
    abilityType: "Signature Technique",
    phantasm: cleanCustomEntry(elements.customTechnique.value, "Resonance Surge"),
    manifestation: "The custom opponent forces an unrecorded combat technique through the simulation field."
  };
}

function buildArenaChoices() {
  elements.arenaChoice.innerHTML = Object.entries(arenas).map(([id, arena]) =>
    `<option value="${id}">${arena.name}</option>`
  ).join("");
  elements.arenaChoice.value = state.arenaId;
  elements.arenaChoice.addEventListener("change", () => {
    state.arenaId = elements.arenaChoice.value;
  });
}

function renderDeploymentPreview(collection, destination) {
  destination.innerHTML = Object.values(collection).map((pilot) => `
    <div class="deployment-card">
      <strong>${pilot.name}</strong>
      <span>${syncInitiativeProfile(pilot)}</span>
    </div>
  `).join("");
}

function buildTeamSetup() {
  renderDeploymentPreview(pilots, elements.teamEchoPreview);
  elements.teamRivalChoice.innerHTML = Object.entries(opponentTeams).map(([id, team]) =>
    `<option value="${id}">${team.name}</option>`
  ).join("");
  elements.teamRivalChoice.value = teamState.rivalTeamId;
  elements.teamRivalChoice.addEventListener("change", () => {
    teamState.rivalTeamId = elements.teamRivalChoice.value;
    renderDeploymentPreview(opponentTeams[teamState.rivalTeamId].members, elements.teamEnemyPreview);
  });
  renderDeploymentPreview(opponentTeams[teamState.rivalTeamId].members, elements.teamEnemyPreview);
  elements.teamArenaChoice.innerHTML = Object.entries(arenas).map(([id, arena]) =>
    `<option value="${id}">${arena.name}</option>`
  ).join("");
  elements.teamArenaChoice.value = teamState.arenaId;
  elements.teamArenaChoice.addEventListener("change", () => {
    teamState.arenaId = elements.teamArenaChoice.value;
  });
}

function choiceOptions(collection) {
  return Object.entries(collection).map(([id, pilot]) =>
    `<option value="${id}">${pilot.name} // ${initiativeBonus(pilot) >= 0 ? "+" : ""}${initiativeBonus(pilot)} Init</option>`
  ).join("");
}

function selectedPairTemplates(ids, collection) {
  return Object.fromEntries(ids.map((id) => [id, collection[id]]));
}

function keepPairDistinct(firstElement, secondElement, collection) {
  if (firstElement.value === secondElement.value) {
    secondElement.value = Object.keys(collection).find((id) => id !== firstElement.value);
  }
}

function renderDuoSetupPreview() {
  keepPairDistinct(elements.duoPilotOneChoice, elements.duoPilotTwoChoice, pilots);
  const opponents = opponentTeams[elements.duoRivalTeamChoice.value].members;
  keepPairDistinct(elements.duoEnemyOneChoice, elements.duoEnemyTwoChoice, opponents);
  duoState.allyIds = [elements.duoPilotOneChoice.value, elements.duoPilotTwoChoice.value];
  duoState.enemyIds = [elements.duoEnemyOneChoice.value, elements.duoEnemyTwoChoice.value];
  renderDeploymentPreview(selectedPairTemplates(duoState.allyIds, pilots), elements.duoEchoPreview);
  renderDeploymentPreview(selectedPairTemplates(duoState.enemyIds, opponents), elements.duoEnemyPreview);
}

function populateDuoOpponents() {
  const opponents = opponentTeams[elements.duoRivalTeamChoice.value].members;
  elements.duoEnemyOneChoice.innerHTML = choiceOptions(opponents);
  elements.duoEnemyTwoChoice.innerHTML = choiceOptions(opponents);
  elements.duoEnemyOneChoice.value = Object.keys(opponents)[0];
  elements.duoEnemyTwoChoice.value = Object.keys(opponents)[1];
  renderDuoSetupPreview();
}

function buildDuoSetup() {
  elements.duoPilotOneChoice.innerHTML = choiceOptions(pilots);
  elements.duoPilotTwoChoice.innerHTML = choiceOptions(pilots);
  elements.duoPilotOneChoice.value = duoState.allyIds[0];
  elements.duoPilotTwoChoice.value = duoState.allyIds[1];
  elements.duoRivalTeamChoice.innerHTML = Object.entries(opponentTeams).map(([id, team]) =>
    `<option value="${id}">${team.name}</option>`
  ).join("");
  elements.duoRivalTeamChoice.value = duoState.rivalTeamId;
  elements.duoArenaChoice.innerHTML = Object.entries(arenas).map(([id, arena]) =>
    `<option value="${id}">${arena.name}</option>`
  ).join("");
  elements.duoArenaChoice.value = duoState.arenaId;
  elements.duoPilotOneChoice.addEventListener("change", renderDuoSetupPreview);
  elements.duoPilotTwoChoice.addEventListener("change", renderDuoSetupPreview);
  elements.duoEnemyOneChoice.addEventListener("change", renderDuoSetupPreview);
  elements.duoEnemyTwoChoice.addEventListener("change", renderDuoSetupPreview);
  elements.duoRivalTeamChoice.addEventListener("change", () => {
    duoState.rivalTeamId = elements.duoRivalTeamChoice.value;
    populateDuoOpponents();
  });
  elements.duoArenaChoice.addEventListener("change", () => {
    duoState.arenaId = elements.duoArenaChoice.value;
  });
  populateDuoOpponents();
}

function switchMode(mode) {
  activeMode = mode;
  elements.modeButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  const duelActive = mode === "duel";
  const duoActive = mode === "duo";
  const teamActive = mode === "team";
  elements.setupPanel.classList.toggle("hidden", !duelActive || state.phase !== "setup");
  elements.battlePanel.classList.toggle("hidden", !duelActive || state.phase === "setup");
  elements.duoSetupPanel.classList.toggle("hidden", !duoActive || duoState.phase !== "setup");
  elements.duoBattlePanel.classList.toggle("hidden", !duoActive || duoState.phase === "setup");
  elements.teamSetupPanel.classList.toggle("hidden", !teamActive || teamState.phase !== "setup");
  elements.teamBattlePanel.classList.toggle("hidden", !teamActive || teamState.phase === "setup");
}

function createCombatant(template) {
  return {
    ...template,
    damage: 0,
    phantasmUsed: false,
    weaponSpecialtyUsed: false,
    advantage: 0,
    strikeDamageBonus: 0,
    guard: 0,
    evasionPenalty: 0,
    exposed: 0,
    disruption: 0,
    teamStrikeBonus: 0,
    teamDefenseBonus: 0
  };
}

function syncLevel(combatant) {
  const result = combatant.sync.match(/(\d+)%/);
  return result ? Number(result[1]) : 0;
}

function initiativeBonus(combatant) {
  return Math.ceil(syncLevel(combatant) / 20);
}

function syncInitiativeProfile(combatant) {
  return `${combatant.sync} // Initiative +${initiativeBonus(combatant)}`;
}

function initiativeRoll(combatant) {
  return rollD20(initiativeBonus(combatant));
}

function rollD20(modifier = 0) {
  const natural = Math.floor(Math.random() * 20) + 1;
  const total = Math.max(1, Math.min(20, natural + modifier));
  return { natural, modifier, total, band: bandFor(total) };
}

function bandFor(total) {
  return outcomeBands.find((band) => total <= band.max);
}

function penalties(combatant, isReaction = false) {
  let value = 0;
  if (combatant.damage > 0 && combatant.damage < MAJOR_DAMAGE && isReaction) {
    value -= 1;
  }
  if (combatant.damage >= MAJOR_DAMAGE && combatant.damage < CRITICAL_DAMAGE) {
    value -= 1;
  }
  if (combatant.damage >= CRITICAL_DAMAGE) {
    value -= 2;
  }
  if (combatant.disruption > 0) {
    value -= 1;
  }
  if (isReaction && combatant.guard > 0) {
    value += combatant.guard;
  }
  if (isReaction && combatant.exposed > 0) {
    value -= 2;
  }
  return value;
}

function formatRoll(roll) {
  if (!roll.modifier) {
    return `${roll.natural} (${roll.band.label})`;
  }
  const sign = roll.modifier > 0 ? "+" : "";
  return `${roll.natural} ${sign}${roll.modifier} = ${roll.total} (${roll.band.label})`;
}

function addLog(message) {
  const item = document.createElement("li");
  item.innerHTML = message;
  elements.log.append(item);
}

function damageState(combatant, disabledLabel = "Frame destroyed") {
  if (combatant.damage >= MAX_DAMAGE) return disabledLabel;
  if (combatant.damage >= CRITICAL_DAMAGE) return "Near-critical: all rolls -2; sync disrupted";
  if (combatant.damage >= MAJOR_DAMAGE) return "Major damage: all rolls -1";
  if (combatant.damage > 0) return "Minor strain: reaction -1";
  return "Systems stable";
}

function statusFor(combatant) {
  const status = damageState(combatant);
  const temporary = [];
  if (combatant.advantage) temporary.push(`next Strike +${combatant.advantage}`);
  if (combatant.strikeDamageBonus) temporary.push(`next Strike damage +${combatant.strikeDamageBonus}`);
  if (combatant.guard) temporary.push(`guard +${combatant.guard} defense`);
  if (combatant.evasionPenalty) temporary.push(`evasion: incoming Strike -${combatant.evasionPenalty}`);
  if (combatant.weaponSpecialtyUsed) temporary.push("weapon specialty spent");
  if (combatant.exposed) temporary.push("exposed");
  if (combatant.disruption) temporary.push("resonance unstable");
  return temporary.length ? `${status} // ${temporary.join(" // ")}` : status;
}

function renderDamage(target, amount) {
  target.innerHTML = Array.from({ length: MAX_DAMAGE }, (_, index) =>
    `<span class="damage-node ${index < amount ? "active" : ""}"></span>`
  ).join("");
}

function renderBattle() {
  const arena = arenas[state.arenaId];
  elements.arenaTitle.textContent = arena.name;
  elements.arenaDescription.textContent = arena.description;
  elements.playerName.textContent = state.player.name;
  elements.playerSync.textContent = syncInitiativeProfile(state.player);
  elements.playerFrame.textContent = `${state.player.frame} // ${state.player.weapon}`;
  elements.playerAbility.textContent = `${state.player.abilityType}: ${state.player.phantasm}`;
  elements.enemyName.textContent = state.enemy.name;
  elements.enemySync.textContent = syncInitiativeProfile(state.enemy);
  elements.enemyTeamLabel.textContent = state.enemy.team.toUpperCase();
  elements.enemyFrame.textContent = `${state.enemy.frame} // ${state.enemy.weapon}`;
  elements.enemyAbility.textContent = `${state.enemy.abilityType}: ${state.enemy.phantasm}`;
  renderDamage(elements.playerDamage, state.player.damage);
  renderDamage(elements.enemyDamage, state.enemy.damage);
  elements.playerStatus.textContent = statusFor(state.player);
  elements.enemyStatus.textContent = statusFor(state.enemy);
  elements.playerStatus.classList.toggle("damaged", state.player.damage > 0);
  elements.enemyStatus.classList.toggle("damaged", state.enemy.damage > 0);
  elements.phaseLabel.textContent = state.over ? "Simulation Complete" : state.phase === "initiative" ? "Initiative Required" : `Round ${state.round}`;
  elements.turnLabel.textContent = state.over ? "Record sealed" : state.phase === "initiative" ? "Awaiting launch" : state.turn === "player" ? "Your action" : "Rival action";
  const phantasmButton = elements.actionButtons.find((button) => button.dataset.action === "phantasm");
  const specialtyButton = elements.actionButtons.find((button) => button.dataset.action === "specialty");
  const playerCanAct = state.phase === "combat" && state.turn === "player" && !state.over;
  phantasmButton.disabled = !playerCanAct || state.player.phantasmUsed || state.player.damage >= CRITICAL_DAMAGE;
  phantasmButton.textContent = state.player.phantasmUsed ? "Phantasm Used" : "Phantasm";
  specialtyButton.disabled = !playerCanAct || state.player.weaponSpecialtyUsed;
  specialtyButton.textContent = state.player.weaponSpecialtyUsed ? "Specialty Spent" : "Weapon Specialty";
}

function startPilotEngagement() {
  state.arenaId = elements.arenaChoice.value;
  state.player = createCombatant(pilots[state.playerId]);
  const enemyTemplate = state.rivalTeamId === "custom"
    ? buildCustomOpponent()
    : opponentTeams[state.rivalTeamId].members[state.rivalId];
  if (!enemyTemplate) return;
  state.enemy = createCombatant(enemyTemplate);
  state.phase = "initiative";
  state.round = 0;
  state.over = false;
  state.turn = "player";
  elements.log.innerHTML = "";
  elements.setupPanel.classList.add("hidden");
  elements.battlePanel.classList.remove("hidden");
  elements.initiativeButton.classList.remove("hidden");
  elements.actionButtons.forEach((button) => button.classList.add("hidden"));
  addLog(`<strong>Mission start.</strong> ${state.player.name} enters ${arenas[state.arenaId].name} against ${state.enemy.name} (${state.enemy.sync}). Roll initiative to engage.`);
  renderBattle();
}

function rollInitiative() {
  const playerRoll = initiativeRoll(state.player);
  const enemyRoll = initiativeRoll(state.enemy);
  if (playerRoll.total === enemyRoll.total) {
    addLog(`<strong>Initiative clash.</strong> ${state.player.name} rolls ${formatRoll(playerRoll)} and ${state.enemy.name} rolls ${formatRoll(enemyRoll)}. The Frames circle; reroll required.`);
    return;
  }
  state.phase = "combat";
  state.round = 1;
  state.turn = playerRoll.total > enemyRoll.total ? "player" : "enemy";
  elements.initiativeButton.classList.add("hidden");
  elements.actionButtons.forEach((button) => {
    button.classList.remove("hidden");
    button.disabled = state.turn !== "player";
  });
  addLog(`<strong>Sync initiative.</strong> ${state.player.name}: ${formatRoll(playerRoll)}. ${state.enemy.name}: ${formatRoll(enemyRoll)}. ${state.turn === "player" ? "Team Echo seizes first movement." : `${state.enemy.team} attacks first.`}`);
  renderBattle();
  if (state.turn === "enemy") {
    window.setTimeout(enemyTurn, 650);
  }
}

function consumeTurnEffects(combatant) {
  if (combatant.disruption > 0) combatant.disruption -= 1;
}

function clearDefenseEffects(combatant) {
  combatant.guard = 0;
  combatant.evasionPenalty = 0;
  combatant.exposed = 0;
}

function applyDamage(target, attackerName, amount = 1) {
  target.damage = Math.min(MAX_DAMAGE, target.damage + amount);
  addLog(`<strong>Impact.</strong> ${attackerName} inflicts ${amount} damage (${target.damage}/${MAX_DAMAGE}) on ${target.name}: ${damageState(target, "Frame destruction")}.`);
  if (target.damage >= MAX_DAMAGE) {
    finishBattle(target === state.enemy);
  }
}

function resolveStrike(attacker, defender, isPlayer) {
  const actionModifier = penalties(attacker) + attacker.advantage - defender.evasionPenalty;
  const reactionModifier = penalties(defender, true);
  const damageAmount = 1 + attacker.strikeDamageBonus;
  const attackRoll = rollD20(actionModifier);
  const reactionRoll = rollD20(reactionModifier);
  const lead = isPlayer ? "You strike" : `${attacker.name} strikes`;
  const charge = attacker.strikeDamageBonus ? ` Empowered Strike damage: ${damageAmount}.` : "";
  const evasion = defender.evasionPenalty ? ` ${defender.name}'s Evasive Vector imposes -${defender.evasionPenalty} on the attack.` : "";
  addLog(`<strong>${lead}.</strong> Attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}.${charge}${evasion}`);
  consumeTurnEffects(attacker);
  attacker.advantage = 0;
  attacker.strikeDamageBonus = 0;
  clearDefenseEffects(defender);

  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyDamage(defender, attacker.name, damageAmount);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addLog(`<strong>Clash.</strong> The Frames meet in a burst of force, but neither yields damage.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  } else {
    addLog(`<strong>Evaded.</strong> ${defender.name} reads the line of attack and escapes the impact.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function resolveWeaponSpecialty(attacker, defender, isPlayer) {
  attacker.weaponSpecialtyUsed = true;
  const attackRoll = rollD20(penalties(attacker) + attacker.advantage + 2 - defender.evasionPenalty);
  const reactionRoll = rollD20(penalties(defender, true));
  const damageAmount = 2 + attacker.strikeDamageBonus;
  const lead = isPlayer ? "You unleash" : `${attacker.name} unleashes`;
  addLog(`<strong>${lead} ${attacker.weapon}.</strong> Specialty attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}. Hit damage: ${damageAmount}.`);
  consumeTurnEffects(attacker);
  attacker.advantage = 0;
  attacker.strikeDamageBonus = 0;
  clearDefenseEffects(defender);
  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyDamage(defender, attacker.name, damageAmount);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addLog(`<strong>Specialty checked.</strong> ${defender.name} survives the weapon line without damage.`);
  } else {
    addLog(`<strong>Specialty evaded.</strong> ${defender.name} escapes ${attacker.weapon}.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function playerManeuver() {
  const roll = rollD20(penalties(state.player));
  consumeTurnEffects(state.player);
  if (roll.band.rank === 0) {
    state.player.exposed = 1;
    addLog(`<strong>Maneuver failed.</strong> Roll ${formatRoll(roll)}. ${state.player.name} overextends and is exposed.`);
  } else if (roll.band.rank === 1) {
    addLog(`<strong>Maneuver incomplete.</strong> Roll ${formatRoll(roll)}. ${state.player.name} repositions safely, but finds no decisive strike line.`);
  } else {
    state.player.advantage = 3;
    state.player.strikeDamageBonus = 1;
    addLog(`<strong>Maneuver success.</strong> Roll ${formatRoll(roll)}. An exposed vector is locked: your next Strike gains +3 to attack and inflicts +1 damage if it hits.`);
  }
}

function playerGuard() {
  const roll = rollD20(penalties(state.player));
  consumeTurnEffects(state.player);
  if (roll.band.rank === 0) {
    state.player.exposed = 1;
    addLog(`<strong>Guard broken.</strong> Roll ${formatRoll(roll)}. The defensive stance fails to settle.`);
  } else if (roll.band.rank === 1) {
    state.player.guard = 3;
    addLog(`<strong>Guard raised.</strong> Roll ${formatRoll(roll)}. You gain +3 to your next defensive reaction roll.`);
  } else {
    state.player.guard = 5;
    addLog(`<strong>Perfect guard.</strong> Roll ${formatRoll(roll)}. You gain +5 to your next defensive reaction roll.`);
  }
}

function attemptEvasiveVector(actor, writeLog) {
  const roll = rollD20(penalties(actor));
  consumeTurnEffects(actor);
  if (roll.total > 12) {
    actor.evasionPenalty = 3;
    writeLog(`<strong>Evasive Vector established.</strong> ${actor.name} rolls ${formatRoll(roll)} and imposes -3 on the next incoming Strike attack roll targeting them.`);
  } else {
    writeLog(`<strong>Evasive Vector missed.</strong> ${actor.name} rolls ${formatRoll(roll)}. The 13+ threshold is not met, so no evasion effect is established.`);
  }
}

function resolvePhantasm(attacker, defender, isPlayer) {
  attacker.phantasmUsed = true;
  const roll = rollD20(penalties(attacker));
  const side = isPlayer ? "You activate" : `${attacker.name} activates`;
  addLog(`<strong>${side} ${attacker.phantasm}.</strong> Manifestation roll ${formatRoll(roll)}.`);
  consumeTurnEffects(attacker);
  if (roll.band.rank === 0) {
    attacker.disruption = 2;
    addLog(`<strong>Backfire.</strong> Divine resonance floods ${attacker.frame}; its pilot is disrupted for the next exchange.`);
  } else if (roll.band.rank === 1) {
    addLog(`<strong>Controlled manifestation.</strong> ${attacker.manifestation} The power lands imperfectly, leaving its pilot exposed.`);
    applyDamage(defender, attacker.name);
    attacker.exposed = 1;
  } else {
    addLog(`<strong>True manifestation.</strong> ${attacker.manifestation}`);
    applyDamage(defender, attacker.name);
  }
}

function playerAction(action) {
  if (state.over || state.turn !== "player") return;
  if (action === "strike") resolveStrike(state.player, state.enemy, true);
  if (action === "maneuver") playerManeuver();
  if (action === "guard") playerGuard();
  if (action === "evade") attemptEvasiveVector(state.player, addLog);
  if (action === "specialty") resolveWeaponSpecialty(state.player, state.enemy, true);
  if (action === "phantasm") resolvePhantasm(state.player, state.enemy, true);
  if (state.over) return;
  state.turn = "enemy";
  renderBattle();
  elements.actionButtons.forEach((button) => button.disabled = true);
  window.setTimeout(enemyTurn, 680);
}

function enemyTurn() {
  if (state.over) return;
  const shouldManifest = !state.enemy.phantasmUsed
    && state.enemy.damage < CRITICAL_DAMAGE
    && (state.enemy.damage >= MAJOR_DAMAGE || Math.random() < 0.17);
  if (shouldManifest) {
    resolvePhantasm(state.enemy, state.player, false);
  } else if (!state.enemy.weaponSpecialtyUsed && Math.random() < 0.22) {
    resolveWeaponSpecialty(state.enemy, state.player, false);
  } else {
    resolveStrike(state.enemy, state.player, false);
  }
  if (state.over) return;
  state.turn = "player";
  state.round += 1;
  elements.actionButtons.forEach((button) => button.disabled = false);
  renderBattle();
}

function finishBattle(playerWon) {
  state.over = true;
  state.phase = "complete";
  elements.actionButtons.forEach((button) => button.disabled = true);
  addLog(playerWon
    ? `<strong>Victory.</strong> ${state.enemy.frame} is disabled. The Seraph Frame Pilot engagement is complete under Authority observation.`
    : `<strong>Defeat.</strong> ${state.player.frame} is disabled and the simulation orders emergency extraction.`);
  renderBattle();
}

function addTeamLog(message) {
  const item = document.createElement("li");
  item.innerHTML = message;
  elements.teamLog.append(item);
}

function livingUnits(units) {
  return units.filter((unit) => unit.damage < MAX_DAMAGE);
}

function damageMarkup(amount) {
  return Array.from({ length: MAX_DAMAGE }, (_, index) =>
    `<span class="damage-node ${index < amount ? "active" : ""}"></span>`
  ).join("");
}

function teamEffectsMarkup(unit) {
  const effects = [];
  if (unit.teamStrikeBonus) effects.push(`Formation Strike +${unit.teamStrikeBonus}`);
  if (unit.teamDefenseBonus) effects.push(`Defense +${unit.teamDefenseBonus}`);
  if (unit.evasionPenalty) effects.push(`Incoming Strike -${unit.evasionPenalty}`);
  if (unit.weaponSpecialtyUsed) effects.push("Specialty Spent");
  if (unit.exposed) effects.push("Exposed");
  if (unit.disruption) effects.push("Disrupted");
  return effects.length ? `<p class="unit-effects">${effects.join(" // ")}</p>` : "";
}

function renderSquad(units, destination) {
  destination.innerHTML = units.map((unit) => `
    <div class="unit-card ${unit.damage >= MAX_DAMAGE ? "disabled" : ""}">
      <div class="unit-title">
        <strong>${unit.name}</strong>
        <span>${unit.damage >= MAX_DAMAGE ? "Disabled" : syncInitiativeProfile(unit)}</span>
      </div>
      <p class="unit-frame">${unit.frame} // ${unit.weapon}</p>
      ${teamEffectsMarkup(unit)}
      <div class="damage-track">${damageMarkup(unit.damage)}</div>
    </div>
  `).join("");
}

function populateTeamTargets() {
  const actorValue = elements.teamActorChoice.value;
  const targetValue = elements.teamTargetChoice.value;
  elements.teamActorChoice.innerHTML = teamState.allies.map((unit, index) =>
    unit.damage < MAX_DAMAGE ? `<option value="${index}">${unit.name}${unit.phantasmUsed ? " // Resonance spent" : ""}</option>` : ""
  ).join("");
  elements.teamTargetChoice.innerHTML = teamState.enemies.map((unit, index) =>
    unit.damage < MAX_DAMAGE ? `<option value="${index}">${unit.name} // Damage ${unit.damage}/${MAX_DAMAGE}</option>` : ""
  ).join("");
  if ([...elements.teamActorChoice.options].some((option) => option.value === actorValue)) {
    elements.teamActorChoice.value = actorValue;
  }
  if ([...elements.teamTargetChoice.options].some((option) => option.value === targetValue)) {
    elements.teamTargetChoice.value = targetValue;
  }
}

function selectedTeamActor() {
  return teamState.allies[Number(elements.teamActorChoice.value)];
}

function selectedTeamTarget() {
  return teamState.enemies[Number(elements.teamTargetChoice.value)];
}

function renderTeamBattle() {
  const arena = arenas[teamState.arenaId];
  elements.teamArenaTitle.textContent = arena.name;
  elements.teamArenaDescription.textContent = arena.description;
  elements.teamEnemyLabel.textContent = opponentTeams[teamState.rivalTeamId].name.toUpperCase();
  renderSquad(teamState.allies, elements.teamPlayerRoster);
  renderSquad(teamState.enemies, elements.teamEnemyRoster);
  if (teamState.phase === "combat" && !teamState.over) {
    populateTeamTargets();
  }
  elements.teamPhaseLabel.textContent = teamState.over ? "Engagement Complete" : teamState.phase === "initiative" ? "Initiative Required" : `Round ${teamState.round}`;
  elements.teamTurnLabel.textContent = teamState.over ? "Squad record sealed" : teamState.phase === "initiative" ? "Awaiting deployment" : teamState.turn === "player" ? "Echo command action" : "Opposing action";
  const canAct = teamState.phase === "combat" && teamState.turn === "player" && !teamState.over;
  elements.teamActionButtons.forEach((button) => button.disabled = !canAct);
  const resonanceButton = elements.teamActionButtons.find((button) => button.dataset.teamAction === "phantasm");
  const specialtyButton = elements.teamActionButtons.find((button) => button.dataset.teamAction === "specialty");
  const actor = canAct ? selectedTeamActor() : null;
  resonanceButton.disabled = !actor || actor.phantasmUsed || actor.damage >= CRITICAL_DAMAGE;
  resonanceButton.textContent = actor && actor.phantasmUsed ? "Resonance Spent" : "Resonance";
  specialtyButton.disabled = !actor || actor.weaponSpecialtyUsed;
  specialtyButton.textContent = actor && actor.weaponSpecialtyUsed ? "Specialty Spent" : "Weapon Specialty";
}

function startTeamEngagement() {
  teamState.arenaId = elements.teamArenaChoice.value;
  teamState.rivalTeamId = elements.teamRivalChoice.value;
  teamState.allies = Object.values(pilots).map(createCombatant);
  teamState.enemies = Object.values(opponentTeams[teamState.rivalTeamId].members).map(createCombatant);
  teamState.phase = "initiative";
  teamState.round = 0;
  teamState.turn = "player";
  teamState.over = false;
  elements.teamLog.innerHTML = "";
  elements.teamSetupPanel.classList.add("hidden");
  elements.teamBattlePanel.classList.remove("hidden");
  elements.teamTargeting.classList.add("hidden");
  elements.teamInitiativeButton.classList.remove("hidden");
  elements.teamActionButtons.forEach((button) => button.classList.add("hidden"));
  addTeamLog(`<strong>Squad deployment.</strong> Team Echo launches against ${opponentTeams[teamState.rivalTeamId].name} in ${arenas[teamState.arenaId].name}.`);
  renderTeamBattle();
}

function strongestInitiative(units) {
  return units.map((unit) => ({ unit, roll: initiativeRoll(unit) }))
    .reduce((best, entry) => entry.roll.total > best.roll.total ? entry : best);
}

function rollTeamInitiative() {
  const echo = strongestInitiative(teamState.allies);
  const opposition = strongestInitiative(teamState.enemies);
  if (echo.roll.total === opposition.roll.total) {
    addTeamLog(`<strong>Initiative locked.</strong> ${echo.unit.name} rolls ${formatRoll(echo.roll)} and ${opposition.unit.name} rolls ${formatRoll(opposition.roll)}. Squads realign; reroll required.`);
    return;
  }
  teamState.phase = "combat";
  teamState.round = 1;
  teamState.turn = echo.roll.total > opposition.roll.total ? "player" : "enemy";
  elements.teamInitiativeButton.classList.add("hidden");
  elements.teamTargeting.classList.remove("hidden");
  elements.teamActionButtons.forEach((button) => button.classList.remove("hidden"));
  addTeamLog(`<strong>Sync initiative.</strong> ${echo.unit.name} leads Echo with ${formatRoll(echo.roll)}; ${opposition.unit.name} leads ${opponentTeams[teamState.rivalTeamId].name} with ${formatRoll(opposition.roll)}.`);
  renderTeamBattle();
  if (teamState.turn === "enemy") {
    window.setTimeout(enemyTeamTurn, 650);
  }
}

function applyTeamDamage(target, attackerName, targetIsEnemy, amount = 1) {
  target.damage = Math.min(MAX_DAMAGE, target.damage + amount);
  addTeamLog(`<strong>Impact.</strong> ${attackerName} inflicts ${amount} damage (${target.damage}/${MAX_DAMAGE}) on ${target.name}: ${damageState(target, "Frame disabled")}.`);
  if (target.damage >= MAX_DAMAGE) {
    addTeamLog(`<strong>Unit down.</strong> ${target.name} is removed from active formation.`);
  }
  if (targetIsEnemy && livingUnits(teamState.enemies).length === 0) {
    finishTeamBattle(true);
  } else if (!targetIsEnemy && livingUnits(teamState.allies).length === 0) {
    finishTeamBattle(false);
  }
}

function resolveTeamStrike(attacker, defender, playerAttacking) {
  const attackRoll = rollD20(penalties(attacker) + attacker.teamStrikeBonus - defender.evasionPenalty);
  const reactionRoll = rollD20(penalties(defender, true) + defender.teamDefenseBonus);
  const evasion = defender.evasionPenalty ? ` Evasive Vector imposes -${defender.evasionPenalty} on the attack.` : "";
  addTeamLog(`<strong>${playerAttacking ? "Formation strike" : "Enemy strike"}.</strong> ${attacker.name} targets ${defender.name}: attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}.${evasion}`);
  attacker.teamStrikeBonus = 0;
  defender.teamDefenseBonus = 0;
  consumeTurnEffects(attacker);
  clearDefenseEffects(defender);
  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyTeamDamage(defender, attacker.name, playerAttacking);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addTeamLog(`<strong>Formation clash.</strong> ${defender.name} absorbs the attack line without losing a damage grade.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  } else {
    addTeamLog(`<strong>Counter-vector.</strong> ${defender.name} breaks contact before impact.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function resolveTeamWeaponSpecialty(attacker, defender, playerAttacking) {
  attacker.weaponSpecialtyUsed = true;
  const attackRoll = rollD20(penalties(attacker) + attacker.teamStrikeBonus + 2 - defender.evasionPenalty);
  const reactionRoll = rollD20(penalties(defender, true) + defender.teamDefenseBonus);
  addTeamLog(`<strong>${playerAttacking ? "Echo specialty" : "Opposing specialty"}.</strong> ${attacker.name} unleashes ${attacker.weapon}: attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}. Hit damage: 2.`);
  attacker.teamStrikeBonus = 0;
  defender.teamDefenseBonus = 0;
  consumeTurnEffects(attacker);
  clearDefenseEffects(defender);
  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyTeamDamage(defender, attacker.name, playerAttacking, 2);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addTeamLog(`<strong>Specialty checked.</strong> ${defender.name} absorbs the weapon line without damage.`);
  } else {
    addTeamLog(`<strong>Specialty evaded.</strong> ${defender.name} escapes ${attacker.weapon}.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function teamTacticalShift(actor) {
  const roll = rollD20(penalties(actor));
  consumeTurnEffects(actor);
  actor.teamStrikeBonus = 3;
  addTeamLog(`<strong>Tactical Shift.</strong> ${actor.name} rolls ${formatRoll(roll)} and gains +3 on their next Formation Strike attack roll.`);
}

function teamAegisCover(actor) {
  const roll = rollD20(penalties(actor));
  consumeTurnEffects(actor);
  if (roll.total > 12) {
    actor.teamDefenseBonus = 5;
    addTeamLog(`<strong>Aegis Cover established.</strong> ${actor.name} rolls ${formatRoll(roll)} and gains +5 on the next defensive reaction against an incoming Formation Strike.`);
  } else {
    addTeamLog(`<strong>Aegis Cover incomplete.</strong> ${actor.name} rolls ${formatRoll(roll)}. The 13+ threshold is not met, so no defensive bonus is gained.`);
  }
}

function resolveTeamResonance(attacker, defender, playerAttacking) {
  attacker.phantasmUsed = true;
  const roll = rollD20(penalties(attacker));
  addTeamLog(`<strong>${playerAttacking ? "Echo resonance" : "Opposing signature"}.</strong> ${attacker.name} activates ${attacker.phantasm}: ${formatRoll(roll)}.`);
  consumeTurnEffects(attacker);
  if (roll.band.rank === 0) {
    attacker.disruption = 2;
    addTeamLog(`<strong>Resonance backlash.</strong> ${attacker.name} is destabilized by the attempt.`);
  } else {
    addTeamLog(`<strong>${roll.band.rank === 2 ? "True manifestation" : "Controlled effect"}.</strong> ${attacker.manifestation}`);
    applyTeamDamage(defender, attacker.name, playerAttacking);
    if (roll.band.rank === 1) attacker.exposed = 1;
  }
}

function teamPlayerAction(action) {
  if (teamState.over || teamState.turn !== "player") return;
  const actor = selectedTeamActor();
  const target = selectedTeamTarget();
  if (!actor || !target) return;
  if (action === "strike") resolveTeamStrike(actor, target, true);
  if (action === "maneuver") teamTacticalShift(actor);
  if (action === "guard") teamAegisCover(actor);
  if (action === "evade") attemptEvasiveVector(actor, addTeamLog);
  if (action === "specialty") resolveTeamWeaponSpecialty(actor, target, true);
  if (action === "phantasm") resolveTeamResonance(actor, target, true);
  if (teamState.over) return;
  teamState.turn = "enemy";
  renderTeamBattle();
  window.setTimeout(enemyTeamTurn, 700);
}

function enemyTeamTurn() {
  if (teamState.over) return;
  const enemyUnits = livingUnits(teamState.enemies);
  const echoUnits = livingUnits(teamState.allies);
  const attacker = enemyUnits[Math.floor(Math.random() * enemyUnits.length)];
  const target = echoUnits[Math.floor(Math.random() * echoUnits.length)];
  const useTechnique = !attacker.phantasmUsed && attacker.damage < CRITICAL_DAMAGE && (attacker.damage >= MAJOR_DAMAGE || Math.random() < 0.15);
  if (useTechnique) {
    resolveTeamResonance(attacker, target, false);
  } else if (!attacker.weaponSpecialtyUsed && Math.random() < 0.2) {
    resolveTeamWeaponSpecialty(attacker, target, false);
  } else {
    resolveTeamStrike(attacker, target, false);
  }
  if (teamState.over) return;
  teamState.turn = "player";
  teamState.round += 1;
  renderTeamBattle();
}

function finishTeamBattle(echoWon) {
  teamState.over = true;
  teamState.phase = "complete";
  elements.teamActionButtons.forEach((button) => button.disabled = true);
  addTeamLog(echoWon
    ? `<strong>Squad victory.</strong> ${opponentTeams[teamState.rivalTeamId].name} has been disabled. Team Echo retains formation.`
    : `<strong>Squad defeat.</strong> Team Echo is no longer combat capable. Emergency extraction initiated.`);
  renderTeamBattle();
}

function resetTeamEngagement() {
  teamState.phase = "setup";
  teamState.allies = [];
  teamState.enemies = [];
  elements.teamBattlePanel.classList.add("hidden");
  elements.teamSetupPanel.classList.remove("hidden");
}

function addDuoLog(message) {
  const item = document.createElement("li");
  item.innerHTML = message;
  elements.duoLog.append(item);
}

function populateDuoTargets() {
  const actorValue = elements.duoActorChoice.value;
  const targetValue = elements.duoTargetChoice.value;
  elements.duoActorChoice.innerHTML = duoState.allies.map((unit, index) =>
    unit.damage < MAX_DAMAGE ? `<option value="${index}">${unit.name}${unit.phantasmUsed ? " // Resonance spent" : ""}</option>` : ""
  ).join("");
  elements.duoTargetChoice.innerHTML = duoState.enemies.map((unit, index) =>
    unit.damage < MAX_DAMAGE ? `<option value="${index}">${unit.name} // Damage ${unit.damage}/${MAX_DAMAGE}</option>` : ""
  ).join("");
  if ([...elements.duoActorChoice.options].some((option) => option.value === actorValue)) {
    elements.duoActorChoice.value = actorValue;
  }
  if ([...elements.duoTargetChoice.options].some((option) => option.value === targetValue)) {
    elements.duoTargetChoice.value = targetValue;
  }
}

function selectedDuoActor() {
  return duoState.allies[Number(elements.duoActorChoice.value)];
}

function selectedDuoTarget() {
  return duoState.enemies[Number(elements.duoTargetChoice.value)];
}

function renderDuoBattle() {
  const arena = arenas[duoState.arenaId];
  elements.duoArenaTitle.textContent = arena.name;
  elements.duoArenaDescription.textContent = arena.description;
  elements.duoEnemyLabel.textContent = `${opponentTeams[duoState.rivalTeamId].name.toUpperCase()} // PAIRED UNIT`;
  renderSquad(duoState.allies, elements.duoPlayerRoster);
  renderSquad(duoState.enemies, elements.duoEnemyRoster);
  if (duoState.phase === "combat" && !duoState.over) {
    populateDuoTargets();
  }
  elements.duoPhaseLabel.textContent = duoState.over ? "Engagement Complete" : duoState.phase === "initiative" ? "Initiative Required" : `Round ${duoState.round}`;
  elements.duoTurnLabel.textContent = duoState.over ? "Pair record sealed" : duoState.phase === "initiative" ? "Awaiting deployment" : duoState.turn === "player" ? "Echo pair action" : "Opposing pair action";
  const canAct = duoState.phase === "combat" && duoState.turn === "player" && !duoState.over;
  elements.duoActionButtons.forEach((button) => button.disabled = !canAct);
  const resonanceButton = elements.duoActionButtons.find((button) => button.dataset.duoAction === "phantasm");
  const specialtyButton = elements.duoActionButtons.find((button) => button.dataset.duoAction === "specialty");
  const actor = canAct ? selectedDuoActor() : null;
  resonanceButton.disabled = !actor || actor.phantasmUsed || actor.damage >= CRITICAL_DAMAGE;
  resonanceButton.textContent = actor && actor.phantasmUsed ? "Resonance Spent" : "Resonance";
  specialtyButton.disabled = !actor || actor.weaponSpecialtyUsed;
  specialtyButton.textContent = actor && actor.weaponSpecialtyUsed ? "Specialty Spent" : "Weapon Specialty";
}

function startDuoEngagement() {
  renderDuoSetupPreview();
  duoState.rivalTeamId = elements.duoRivalTeamChoice.value;
  duoState.arenaId = elements.duoArenaChoice.value;
  duoState.allies = duoState.allyIds.map((id) => createCombatant(pilots[id]));
  duoState.enemies = duoState.enemyIds.map((id) => createCombatant(opponentTeams[duoState.rivalTeamId].members[id]));
  duoState.phase = "initiative";
  duoState.round = 0;
  duoState.turn = "player";
  duoState.over = false;
  elements.duoLog.innerHTML = "";
  elements.duoSetupPanel.classList.add("hidden");
  elements.duoBattlePanel.classList.remove("hidden");
  elements.duoTargeting.classList.add("hidden");
  elements.duoInitiativeButton.classList.remove("hidden");
  elements.duoActionButtons.forEach((button) => button.classList.add("hidden"));
  addDuoLog(`<strong>Paired deployment.</strong> ${duoState.allies.map((unit) => unit.name).join(" and ")} deploy against ${opponentTeams[duoState.rivalTeamId].name} in ${arenas[duoState.arenaId].name}.`);
  renderDuoBattle();
}

function rollDuoInitiative() {
  const echo = strongestInitiative(duoState.allies);
  const opposition = strongestInitiative(duoState.enemies);
  if (echo.roll.total === opposition.roll.total) {
    addDuoLog(`<strong>Initiative locked.</strong> ${echo.unit.name} rolls ${formatRoll(echo.roll)} and ${opposition.unit.name} rolls ${formatRoll(opposition.roll)}. Both pairs reset; reroll required.`);
    return;
  }
  duoState.phase = "combat";
  duoState.round = 1;
  duoState.turn = echo.roll.total > opposition.roll.total ? "player" : "enemy";
  elements.duoInitiativeButton.classList.add("hidden");
  elements.duoTargeting.classList.remove("hidden");
  elements.duoActionButtons.forEach((button) => button.classList.remove("hidden"));
  addDuoLog(`<strong>Sync initiative.</strong> ${echo.unit.name} leads Echo with ${formatRoll(echo.roll)}; ${opposition.unit.name} leads ${opponentTeams[duoState.rivalTeamId].name} with ${formatRoll(opposition.roll)}.`);
  renderDuoBattle();
  if (duoState.turn === "enemy") {
    window.setTimeout(enemyDuoTurn, 650);
  }
}

function applyDuoDamage(target, attackerName, targetIsEnemy, amount = 1) {
  target.damage = Math.min(MAX_DAMAGE, target.damage + amount);
  addDuoLog(`<strong>Impact.</strong> ${attackerName} inflicts ${amount} damage (${target.damage}/${MAX_DAMAGE}) on ${target.name}: ${damageState(target, "Frame disabled")}.`);
  if (target.damage >= MAX_DAMAGE) {
    addDuoLog(`<strong>Unit down.</strong> ${target.name} is removed from the pair.`);
  }
  if (targetIsEnemy && livingUnits(duoState.enemies).length === 0) {
    finishDuoBattle(true);
  } else if (!targetIsEnemy && livingUnits(duoState.allies).length === 0) {
    finishDuoBattle(false);
  }
}

function resolveDuoStrike(attacker, defender, playerAttacking) {
  const attackRoll = rollD20(penalties(attacker) + attacker.teamStrikeBonus - defender.evasionPenalty);
  const reactionRoll = rollD20(penalties(defender, true) + defender.teamDefenseBonus);
  const evasion = defender.evasionPenalty ? ` Evasive Vector imposes -${defender.evasionPenalty} on the attack.` : "";
  addDuoLog(`<strong>${playerAttacking ? "Formation strike" : "Enemy strike"}.</strong> ${attacker.name} targets ${defender.name}: attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}.${evasion}`);
  attacker.teamStrikeBonus = 0;
  defender.teamDefenseBonus = 0;
  consumeTurnEffects(attacker);
  clearDefenseEffects(defender);
  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyDuoDamage(defender, attacker.name, playerAttacking);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addDuoLog(`<strong>Formation clash.</strong> ${defender.name} absorbs the attack line without losing a damage grade.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  } else {
    addDuoLog(`<strong>Counter-vector.</strong> ${defender.name} breaks contact before impact.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function resolveDuoWeaponSpecialty(attacker, defender, playerAttacking) {
  attacker.weaponSpecialtyUsed = true;
  const attackRoll = rollD20(penalties(attacker) + attacker.teamStrikeBonus + 2 - defender.evasionPenalty);
  const reactionRoll = rollD20(penalties(defender, true) + defender.teamDefenseBonus);
  addDuoLog(`<strong>${playerAttacking ? "Echo specialty" : "Opposing specialty"}.</strong> ${attacker.name} unleashes ${attacker.weapon}: attack ${formatRoll(attackRoll)} vs reaction ${formatRoll(reactionRoll)}. Hit damage: 2.`);
  attacker.teamStrikeBonus = 0;
  defender.teamDefenseBonus = 0;
  consumeTurnEffects(attacker);
  clearDefenseEffects(defender);
  if (attackRoll.band.rank > reactionRoll.band.rank) {
    applyDuoDamage(defender, attacker.name, playerAttacking, 2);
  } else if (attackRoll.band.rank === reactionRoll.band.rank) {
    addDuoLog(`<strong>Specialty checked.</strong> ${defender.name} absorbs the weapon line without damage.`);
  } else {
    addDuoLog(`<strong>Specialty evaded.</strong> ${defender.name} escapes ${attacker.weapon}.`);
    if (attackRoll.band.rank === 0) attacker.exposed = 1;
  }
}

function duoTacticalShift(actor) {
  const roll = rollD20(penalties(actor));
  consumeTurnEffects(actor);
  actor.teamStrikeBonus = 3;
  addDuoLog(`<strong>Tactical Shift.</strong> ${actor.name} rolls ${formatRoll(roll)} and gains +3 on their next Formation Strike attack roll.`);
}

function duoAegisCover(actor) {
  const roll = rollD20(penalties(actor));
  consumeTurnEffects(actor);
  if (roll.total > 12) {
    actor.teamDefenseBonus = 5;
    addDuoLog(`<strong>Aegis Cover established.</strong> ${actor.name} rolls ${formatRoll(roll)} and gains +5 on the next defensive reaction against an incoming Formation Strike.`);
  } else {
    addDuoLog(`<strong>Aegis Cover incomplete.</strong> ${actor.name} rolls ${formatRoll(roll)}. The 13+ threshold is not met, so no defensive bonus is gained.`);
  }
}

function resolveDuoResonance(attacker, defender, playerAttacking) {
  attacker.phantasmUsed = true;
  const roll = rollD20(penalties(attacker));
  addDuoLog(`<strong>${playerAttacking ? "Echo resonance" : "Opposing signature"}.</strong> ${attacker.name} activates ${attacker.phantasm}: ${formatRoll(roll)}.`);
  consumeTurnEffects(attacker);
  if (roll.band.rank === 0) {
    attacker.disruption = 2;
    addDuoLog(`<strong>Resonance backlash.</strong> ${attacker.name} is destabilized by the attempt.`);
  } else {
    addDuoLog(`<strong>${roll.band.rank === 2 ? "True manifestation" : "Controlled effect"}.</strong> ${attacker.manifestation}`);
    applyDuoDamage(defender, attacker.name, playerAttacking);
    if (roll.band.rank === 1) attacker.exposed = 1;
  }
}

function duoPlayerAction(action) {
  if (duoState.over || duoState.turn !== "player") return;
  const actor = selectedDuoActor();
  const target = selectedDuoTarget();
  if (!actor || !target) return;
  if (action === "strike") resolveDuoStrike(actor, target, true);
  if (action === "maneuver") duoTacticalShift(actor);
  if (action === "guard") duoAegisCover(actor);
  if (action === "evade") attemptEvasiveVector(actor, addDuoLog);
  if (action === "specialty") resolveDuoWeaponSpecialty(actor, target, true);
  if (action === "phantasm") resolveDuoResonance(actor, target, true);
  if (duoState.over) return;
  duoState.turn = "enemy";
  renderDuoBattle();
  window.setTimeout(enemyDuoTurn, 700);
}

function enemyDuoTurn() {
  if (duoState.over) return;
  const enemyUnits = livingUnits(duoState.enemies);
  const echoUnits = livingUnits(duoState.allies);
  const attacker = enemyUnits[Math.floor(Math.random() * enemyUnits.length)];
  const target = echoUnits[Math.floor(Math.random() * echoUnits.length)];
  const useTechnique = !attacker.phantasmUsed && attacker.damage < CRITICAL_DAMAGE && (attacker.damage >= MAJOR_DAMAGE || Math.random() < 0.15);
  if (useTechnique) {
    resolveDuoResonance(attacker, target, false);
  } else if (!attacker.weaponSpecialtyUsed && Math.random() < 0.2) {
    resolveDuoWeaponSpecialty(attacker, target, false);
  } else {
    resolveDuoStrike(attacker, target, false);
  }
  if (duoState.over) return;
  duoState.turn = "player";
  duoState.round += 1;
  renderDuoBattle();
}

function finishDuoBattle(echoWon) {
  duoState.over = true;
  duoState.phase = "complete";
  elements.duoActionButtons.forEach((button) => button.disabled = true);
  addDuoLog(echoWon
    ? `<strong>Pair victory.</strong> The opposing pair from ${opponentTeams[duoState.rivalTeamId].name} has been disabled.`
    : `<strong>Pair defeat.</strong> The Echo pair is no longer combat capable. Emergency extraction initiated.`);
  renderDuoBattle();
}

function resetDuoEngagement() {
  duoState.phase = "setup";
  duoState.allies = [];
  duoState.enemies = [];
  elements.duoBattlePanel.classList.add("hidden");
  elements.duoSetupPanel.classList.remove("hidden");
}

function resetPilotEngagement() {
  state.phase = "setup";
  state.player = null;
  state.enemy = null;
  elements.battlePanel.classList.add("hidden");
  elements.setupPanel.classList.remove("hidden");
}

function initialize() {
  if (window.matchMedia("(max-width: 960px)").matches) {
    elements.codexPanel.open = false;
  }
  elements.modeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(button.dataset.mode));
  });
  buildChoiceCards(pilots, elements.pilotChoices, "playerId", state.playerId);
  buildOpponentDivisionChoices();
  buildArenaChoices();
  buildDuoSetup();
  buildTeamSetup();
  elements.startButton.addEventListener("click", startPilotEngagement);
  elements.initiativeButton.addEventListener("click", rollInitiative);
  elements.resetButton.addEventListener("click", resetPilotEngagement);
  elements.actionButtons.forEach((button) => {
    button.addEventListener("click", () => playerAction(button.dataset.action));
  });
  elements.startDuoButton.addEventListener("click", startDuoEngagement);
  elements.duoInitiativeButton.addEventListener("click", rollDuoInitiative);
  elements.resetDuoButton.addEventListener("click", resetDuoEngagement);
  elements.duoActorChoice.addEventListener("change", renderDuoBattle);
  elements.duoActionButtons.forEach((button) => {
    button.addEventListener("click", () => duoPlayerAction(button.dataset.duoAction));
  });
  elements.startTeamButton.addEventListener("click", startTeamEngagement);
  elements.teamInitiativeButton.addEventListener("click", rollTeamInitiative);
  elements.resetTeamButton.addEventListener("click", resetTeamEngagement);
  elements.teamActorChoice.addEventListener("change", renderTeamBattle);
  elements.teamActionButtons.forEach((button) => {
    button.addEventListener("click", () => teamPlayerAction(button.dataset.teamAction));
  });
  switchMode(activeMode);
}

initialize();
