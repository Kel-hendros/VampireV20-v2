import { bloodPool } from "./defaultAttributes.js";
import { selectedLanguage } from "./configurations.js";
import { primaryInformation } from "./defaultAttributes.js";
import { saveToLocalStorage } from "./saveLoad.js";

//save in currentGeneration the value for the object with name "generation" in the array primaryInformation
let currentGeneration;
let usableBloodPoolSize;

function obtainCurrentGeneration() {
  currentGeneration = primaryInformation.find(
    (element) => element.id == 3
  ).value;
}

function obtainUsablePoolSize() {
  obtainCurrentGeneration();
  usableBloodPoolSize = 30;
  if (currentGeneration <= 6) {
    usableBloodPoolSize = 30;
  } else if (currentGeneration <= 7) {
    usableBloodPoolSize = 20;
  } else if (currentGeneration <= 8) {
    usableBloodPoolSize = 15;
  } else if (currentGeneration <= 9) {
    usableBloodPoolSize = 14;
  } else if (currentGeneration <= 10) {
    usableBloodPoolSize = 13;
  } else if (currentGeneration <= 11) {
    usableBloodPoolSize = 12;
  } else if (currentGeneration <= 12) {
    usableBloodPoolSize = 11;
  } else if (currentGeneration >= 13) {
    usableBloodPoolSize = 10;
  }
}

export function displayBloodPool() {
  updateMaxBloodPointsPerTurn();
  const bloodPoolContainer = document.querySelector(".sangre-elements");
  bloodPoolContainer.innerHTML = "";

  obtainUsablePoolSize();

  bloodPool.forEach((bloodPoint) => {
    if (bloodPoint.position > usableBloodPoolSize) {
      bloodPoint.state = "unusable";
    }
  });

  bloodPool.forEach((bloodPoint) => {
    if (bloodPoint.position > usableBloodPoolSize) {
      bloodPoint.state = "unusable";
    } else if (bloodPoint.state === "unusable") {
      bloodPoint.state = "empty";
    }
  });

  bloodPool.forEach((bloodPoint) => {
    const bloodPointSpan = document.createElement("span");
    bloodPointSpan.className = `square state-${bloodPoint.state} type-${bloodPoint.type}`;
    bloodPointSpan.dataset.position = bloodPoint.position;

    /*bloodPointSpan.textContent =
      bloodPoint.type === "normal"
        ? bloodPoint.state.charAt(0).toUpperCase()
        : bloodPoint.type; */

    bloodPoolContainer.appendChild(bloodPointSpan);
  });
}

export function spendBlood() {
  obtainUsablePoolSize();

  // Ensure that the index stays within the bounds of the blood pool array
  const upperLimit = Math.min(usableBloodPoolSize, bloodPool.length);

  let spentBlood = false;

  for (let i = 0; i < upperLimit; i++) {
    if (bloodPool[i].state === "filled" && bloodPool[i].type !== "unusable" && !spentBlood) {
      bloodPool[i].state = "empty";
      spentBlood = true;
    }

    if (spentBlood) {
      if (i < upperLimit - 1) {
        // Shift the filled blood points to the left
        bloodPool[i].state = bloodPool[i + 1].state;
        bloodPool[i].type = bloodPool[i + 1].type;
      } else {
        // Add the new empty blood point at the end of the usable blood pool
        bloodPool[i].state = "empty";
        bloodPool[i].type = "normal";
      }
    }
  }
  saveToLocalStorage();
  displayBloodPool(); // Update the display after spending blood
}


export function restoreBlood() {
  obtainUsablePoolSize();

  const upperLimit = Math.min(usableBloodPoolSize, bloodPool.length);

  for (let i = 0; i < upperLimit; i++) {
    if (bloodPool[i].state === "empty") {
      bloodPool[i].state = "filled";
      bloodPool[i].type = "normal";
      break;
    }
  }

  saveToLocalStorage();
  displayBloodPool(); // Update the display after restoring blood
}

export function restoreRareBlood1() {
  obtainUsablePoolSize();

  const upperLimit = Math.min(usableBloodPoolSize, bloodPool.length);

  for (let i = 0; i < upperLimit; i++) {
    if (bloodPool[i].state === "empty") {
      bloodPool[i].state = "filled";
      bloodPool[i].type = "rare1";
      break;
    }
  }

  saveToLocalStorage();
  displayBloodPool(); // Update the display after restoring blood
}

export function restoreRareBlood2() {
  obtainUsablePoolSize();

  const upperLimit = Math.min(usableBloodPoolSize, bloodPool.length);

  for (let i = 0; i < upperLimit; i++) {
    if (bloodPool[i].state === "empty") {
      bloodPool[i].state = "filled";
      bloodPool[i].type = "rare2";
      break;
    }
  }

  saveToLocalStorage();
  displayBloodPool(); // Update the display after restoring blood
}


function updateMaxBloodPointsPerTurn() {
  const bloodPerTurn = document.querySelector(".sangre-max-value");
  obtainCurrentGeneration();

  if (currentGeneration >= 10) {
    bloodPerTurn.innerHTML = "1";
  }
  if (currentGeneration == 9) {
    bloodPerTurn.innerHTML = "2";
  }
  if (currentGeneration == 8) {
    bloodPerTurn.innerHTML = "3";
  }
  if (currentGeneration == 7) {
    bloodPerTurn.innerHTML = "4";
  }
  if (currentGeneration == 6) {
    bloodPerTurn.innerHTML = "6";
  }
  if (currentGeneration == 5) {
    bloodPerTurn.innerHTML = "8";
  }
  if (currentGeneration == 4) {
    bloodPerTurn.innerHTML = "10";
  }
  if (currentGeneration <= 3) {
    bloodPerTurn.innerHTML = "???";
  }

}