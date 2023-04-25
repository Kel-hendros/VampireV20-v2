import { selectedLanguage } from "./configurations.js";
import { healthLevels, healthStatus } from "./defaultAttributes.js";

export function initializeHealth() {
  displayHealth();
}

function displayHealth() {
  const healthContainer = document.querySelector(".salud-elements");
  healthContainer.innerHTML = "";
  const healthLevelsContainer = document.createElement("div");
  healthLevelsContainer.classList.add("health-levels-container");

  healthContainer.appendChild(healthLevelsContainer);

  const currentDamageTypes = getCurrentDamageTypes();

  healthLevels.forEach((level, index) => {
    const healthRow = createHealthLevel(level, currentDamageTypes[index]);
    healthLevelsContainer.appendChild(healthRow);
  });

  healthContainer.appendChild(createHealthButtons());
}

function getCurrentDamageTypes() {
  // Calculate the remaining damage values for each type
  let remainingBashDamage = healthStatus.find(
    (status) => status.type === "bashDamage"
  ).value;
  let remainingLethalDamage = healthStatus.find(
    (status) => status.type === "lethalDamage"
  ).value;
  let remainingAggravatedDamage = healthStatus.find(
    (status) => status.type === "aggravatedDamage"
  ).value;

  // Create the currentDamageTypes array
  const currentDamageTypes = [];

  for (let i = 0; i < remainingAggravatedDamage; i++) {
    currentDamageTypes.push("aggravated");
  }
  for (let i = 0; i < remainingLethalDamage; i++) {
    currentDamageTypes.push("lethal");
  }
  for (let i = 0; i < remainingBashDamage; i++) {
    currentDamageTypes.push("bashing");
  }

  return currentDamageTypes;
}

function createHealthLevel(level, damageType) {
  const healthRow = document.createElement("div");
  healthRow.classList.add("health-row");

  const healthNameLabel = document.createElement("label");
  healthNameLabel.classList.add("health-level-label");
  if (selectedLanguage === "es") {
    healthNameLabel.innerHTML = level.name_es;
  } else {
    healthNameLabel.innerHTML = level.name_en;
  }

  const healthPenalizerLabel = document.createElement("label");
  healthPenalizerLabel.classList.add("health-penalizer-label");
  healthPenalizerLabel.innerHTML = level.penalizer;

  const healthCheckSpan = document.createElement("span");
  healthCheckSpan.classList.add("health-status-indicator", "square");
  healthCheckSpan.dataset.id = level.id;

  if (damageType) {
    healthCheckSpan.classList.add(damageType);
  }

  healthRow.appendChild(healthNameLabel);
  healthRow.appendChild(healthPenalizerLabel);
  healthRow.appendChild(healthCheckSpan);

  return healthRow;
}

function createHealthButtons() {
  const healthButtonsContainer = document.createElement("div");
  healthButtonsContainer.classList.add("health-buttons-container");

  healthButtonsContainer.appendChild(createAggravatedButtons());
  healthButtonsContainer.appendChild(createLethalButtons());
  healthButtonsContainer.appendChild(createBashingButtons());

  return healthButtonsContainer;
}

function createBashingButtons() {
  const bashingButtonsContainer = document.createElement("div");
  bashingButtonsContainer.classList.add("health-buttons");

  const minusButton = document.createElement("i");
  minusButton.classList.add("fa-solid", "fa-square-minus");
  minusButton.dataset.type = "bashDamage";
  minusButton.dataset.action = "minus";

  minusButton.addEventListener("click", () => {
    updateHealth(minusButton.dataset.type, minusButton.dataset.action);
  });

  const bashingButtonIndicator = document.createElement("span");
  bashingButtonIndicator.classList.add(
    "health-status-indicator",
    "square",
    "bashing"
  );

  const plusButton = document.createElement("i");
  plusButton.classList.add("fa-solid", "fa-square-plus");
  plusButton.dataset.type = "bashDamage";
  plusButton.dataset.action = "plus";
  plusButton.addEventListener("click", () => {
    updateHealth(plusButton.dataset.type, plusButton.dataset.action);
  });

  bashingButtonsContainer.appendChild(minusButton);
  bashingButtonsContainer.appendChild(bashingButtonIndicator);
  bashingButtonsContainer.appendChild(plusButton);

  return bashingButtonsContainer;
}

function createLethalButtons() {
  const lethalButtonsContainer = document.createElement("div");

  lethalButtonsContainer.classList.add("health-buttons");

  const minusButton = document.createElement("i");

  minusButton.classList.add("fa-solid", "fa-square-minus");
  minusButton.dataset.type = "lethalDamage";
  minusButton.dataset.action = "minus";

  minusButton.addEventListener("click", () => {
    updateHealth(minusButton.dataset.type, minusButton.dataset.action);
  });
  const lethalButtonIndicator = document.createElement("span");
  lethalButtonIndicator.classList.add(
    "health-status-indicator",
    "square",
    "lethal"
  );

  const plusButton = document.createElement("i");
  plusButton.classList.add("fa-solid", "fa-square-plus");

  plusButton.dataset.type = "lethalDamage";
  plusButton.dataset.action = "plus";
  plusButton.addEventListener("click", () => {
    updateHealth(plusButton.dataset.type, plusButton.dataset.action);
  });
  lethalButtonsContainer.appendChild(minusButton);
  lethalButtonsContainer.appendChild(lethalButtonIndicator);
  lethalButtonsContainer.appendChild(plusButton);

  return lethalButtonsContainer;
}

function createAggravatedButtons() {
  const aggravatedButtonsContainer = document.createElement("div");

  aggravatedButtonsContainer.classList.add("health-buttons");

  const minusButton = document.createElement("i");

  minusButton.classList.add("fa-solid", "fa-square-minus");
  minusButton.dataset.type = "aggravatedDamage";
  minusButton.dataset.action = "minus";

  minusButton.addEventListener("click", () => {
    updateHealth(minusButton.dataset.type, minusButton.dataset.action);
  });
  const aggravatedButtonIndicator = document.createElement("span");
  aggravatedButtonIndicator.classList.add(
    "health-status-indicator",
    "square",
    "aggravated"
  );

  const plusButton = document.createElement("i");
  plusButton.classList.add("fa-solid", "fa-square-plus");

  plusButton.dataset.type = "aggravatedDamage";
  plusButton.dataset.action = "plus";
  plusButton.addEventListener("click", () => {
    updateHealth(plusButton.dataset.type, plusButton.dataset.action);
  });

  aggravatedButtonsContainer.appendChild(minusButton);
  aggravatedButtonsContainer.appendChild(aggravatedButtonIndicator);
  aggravatedButtonsContainer.appendChild(plusButton);

  return aggravatedButtonsContainer;
}

function updateHealth(type, action) {
  const healthStatusIndex = healthStatus.findIndex(
    (status) => status.type === type
  );

  if (healthStatusIndex === -1) {
    console.error(`Type "${type}" not found in healthStatus array.`);
    return;
  }

  let totalDamage = 0;
  healthStatus.forEach((status) => {
    totalDamage += parseInt(status.value);
  });

  if (action === "minus" && healthStatus[healthStatusIndex].value > 0) {
    healthStatus[healthStatusIndex].value -= 1;
  } else if (action === "plus" && totalDamage < 7) {
    healthStatus[healthStatusIndex].value += 1;
  }
  displayHealth();
}
