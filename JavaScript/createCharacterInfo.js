import {
  clans,
  primaryInformation,
  secondaryInformation,
} from "./defaultAttributes.js";
import { findInfoDiv, findInfoElement } from "./globalFunctions.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./saveLoad.js";
import { selectedLanguage } from "./configurations.js";
import {withLockEditionCheck} from "./editCharacter.js";
import {openClansModal} from "./clansModal.js";

export let allCharacterInfo;

function setAllCharacterInfo() {
  allCharacterInfo = {
    primaryInformation: primaryInformation,
    secondaryInformation: secondaryInformation,
  };
}

export function createAllCharacterInfo() {
  setAllCharacterInfo();
  createInfoGroup(primaryInformation);
  createInfoGroup(secondaryInformation);
  populateClanLabel();
}

function createInfoGroup(infoGroup) {
  const parentDiv = document.getElementById(infoGroup[0].type);
  parentDiv.innerHTML = "";

  for (let i = 0; i < infoGroup.length; i++) {
    const currentInfoElement = infoGroup[i];
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-element");
    infoDiv.dataset.type = currentInfoElement.type;
    infoDiv.dataset.id = currentInfoElement.id;

    infoDiv.appendChild(createInfoLabel(currentInfoElement));

    if (currentInfoElement.name_es === "Generación:") {
      infoDiv.appendChild(createInfoGeneracion(currentInfoElement));
    } else if (currentInfoElement.name_es === "Clan:") {
      infoDiv.appendChild(createClanLabel(currentInfoElement));
    } else {
      infoDiv.appendChild(createInfoInput(currentInfoElement));
    }
    parentDiv.appendChild(infoDiv);
  }
}

function createInfoLabel(currentInfoElement) {
  const infoLabel = document.createElement("label");
  infoLabel.dataset.type = currentInfoElement.type;
  infoLabel.dataset.id = currentInfoElement.id;
  infoLabel.dataset.value = currentInfoElement.value;

  //Translations
  if (selectedLanguage === "es") {
    infoLabel.setAttribute("for", currentInfoElement.name_es);
    infoLabel.innerText = currentInfoElement.name_es;
  } else {
    infoLabel.setAttribute("for", currentInfoElement.name_en);
    infoLabel.innerText = currentInfoElement.name_en;
  }

  return infoLabel;
}

function createClanLabel(currentInfoElement) {
  const clanLabel = document.createElement("label");
  clanLabel.setAttribute("for", "Clan");
  clanLabel.setAttribute("id", "clanLabel");
  clanLabel.classList.add("clan-label");
  clanLabel.dataset.type = currentInfoElement.type;
  clanLabel.dataset.id = currentInfoElement.id;
  clanLabel.dataset.clanId = currentInfoElement.value;

  clanLabel.addEventListener(
    "click",
    withLockEditionCheck("clan-label", (e) => {
      
      openClansModal();

    })
  );

  return clanLabel;
}

function populateClanLabel() {
  const clanLabel = document.getElementById("clanLabel");
  const clanSelected = clanLabel.dataset.clanId;
  const clanName = findClan(clanSelected);

  if (selectedLanguage === "es") {
    //if clanName is undefiined, show a placeholder message in spanish
    if (clanName) {
      clanLabel.innerText = clanName.name_es;
    } else {
      clanLabel.innerText = "Selecciona un clan";
      clanLabel.classList.add("placeholder");
    }
  } else if (selectedLanguage === "en") {
    if (clanName) {
      clanLabel.innerText = clanName.name_en;
    } else {
      clanLabel.innerText = "Select a clan";
      clanLabel.classList.add("placeholder");
    }
  }
}

function createInfoInput(currentInfoElement) {
  const infoInput = document.createElement("input");
  infoInput.classList.add("info-input", "toggle-read-only");
  infoInput.dataset.type = currentInfoElement.type;
  infoInput.dataset.id = currentInfoElement.id;
  infoInput.type = "text";
  infoInput.value = currentInfoElement.value;

  infoInput.addEventListener("change", (e) => {
    const infoElement = findInfoElement(
      e.target.dataset.type,
      e.target.dataset.id
    );
    infoElement.value = e.target.value;
    saveToLocalStorage();
    createInfoGroup(allCharacterInfo[e.target.dataset.type]);
  });

  return infoInput;
}

function createInfoGeneracion(currentInfoElement) {
  const infoGeneracion = document.createElement("select");
  infoGeneracion.classList.add("generation-info-select", "toggle-read-only");
  infoGeneracion.dataset.type = currentInfoElement.type;
  infoGeneracion.dataset.id = currentInfoElement.id;

  for (let i = 3; i <= 14; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerText = i;
    if (i === currentInfoElement.value) {
      option.setAttribute("selected", "selected");
    }
    infoGeneracion.appendChild(option);
  }

  infoGeneracion.addEventListener("change", (e) => {
    const infoElement = findInfoElement(
      e.target.dataset.type,
      e.target.dataset.id
    );

    if (infoElement) {
      infoElement.value = parseInt(e.target.value);
      createInfoGroup(allCharacterInfo[e.target.dataset.type]);

      saveToLocalStorage();
      loadFromLocalStorage();
    } else {
      console.log("No se ha encontrado el elemento de información");
    }
  });

  return infoGeneracion;
}

export function findClan(id) {
  const array = clans;

  if (array) {
    const clanElement = array.find((clan) => clan.id == id);
    if (clanElement) {
      return clanElement;
    } else {
      console.error("Clan not found with id:", id);
      return null;
    }
  } else {
    console.error("Invalid dataset type:", datasetType);
    return null;
  }
}
