import {
  physicalAttributes,
  socialAttributes,
  mentalAttributes,
  talentsAbilities,
  skillsAbilities,
  knowledgesAbilities,
  disciplines,
  sendas,
  backgrounds,
  roads,
  virtues,
  willPower,
  experience,
} from "./defaultAttributes.js";

import { allAttributes, createAllRatingGroups } from "./createRatings.js";
import {
  allCharacterInfo,
  createAllCharacterInfo,
} from "./createCharacterInfo.js";
import { translateAll } from "./translations.js";
import { clickRatingValues } from "./editCharacter.js";
import { saveToLocalStorage } from "./saveLoad.js";
import { initializeVentajas } from "./ventajasSection.js";

const allRatings = {
  physicalAttributes: physicalAttributes,
  socialAttributes: socialAttributes,
  mentalAttributes: mentalAttributes,
  talentsAbilities: talentsAbilities,
  skillsAbilities: skillsAbilities,
  knowledgesAbilities: knowledgesAbilities,
  discipline: disciplines,
  senda: sendas,
  background: backgrounds,
  virtue: virtues,
  road: roads,
  willpower: willPower,
  experience: experience,
};

//funcion para encontrar el rating de un array
export function findRatingElement(datasetType, id) {
  const array = allRatings[datasetType];

  if (array) {
    const ratingElement = array.find((attribute) => attribute.id == id);
    if (ratingElement) {
      return ratingElement;
    } else {
      console.error("Attribute not found with id:", id);
      return null;
    }
  } else {
    console.error("Invalid dataset type:", datasetType);
    return null;
  }
}

//find in the DOM the ratingDiv corresponding to a rating based on the ratingID and ratingType
export function findRatingDiv(ratingElement) {
  const ratingDiv = document.querySelector(
    `[data-id="${ratingElement.id}"][data-type="${ratingElement.type}"]`
  );
  return ratingDiv;
}

//funcion para encontrar la Info  de un array
export function findInfoElement(datasetType, id) {
  const array = allCharacterInfo[datasetType];

  if (array) {
    const infoElement = array.find((info) => info.id == id);
    if (infoElement) {
      return infoElement;
    } else {
      console.error("Info not found with id:", id);
      return null;
    }
  } else {
    console.error("Invalid dataset type:", datasetType);
    return null;
  }
}

//find in the DOM the InfoDiv corresponding to an Info  based on the infoID and infoType
export function findInfoDiv(infoElement) {
  const infoDiv = document.querySelector(
    `[data-id="${infoElement.id}"][data-type="${infoElement.type}"]`
  );
  return infoDiv;
}

export function generateAll() {
  //NO GRABAR ACA NUNCA!
  //Translating the page
  translateAll();

  //generate the ratings
  createAllRatingGroups();

  //generate the character info
  createAllCharacterInfo();

  //Generate Ventajas display
  initializeVentajas();
}
