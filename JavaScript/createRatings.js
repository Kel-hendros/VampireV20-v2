import {
  physicalAttributes,
  socialAttributes,
  mentalAttributes,
  talentsAbilities,
  skillsAbilities,
  knowledgesAbilities,
} from "./defaultAttributes.js";
import { selectedLanguage, initializeConfigurations } from "./configurations.js";
import { showPopUp } from "./specialitiesPopUp.js";
import { findRatingElement, findRatingDiv } from "./globalFunctions.js";
import { saveToLocalStorage } from "./saveLoad.js";
import { initializeVentajas } from "./ventajasSection.js";

export let allAttributes;

export function setAllAttributes() {
  allAttributes = {
    physicalAttributes: physicalAttributes,
    socialAttributes: socialAttributes,
    mentalAttributes: mentalAttributes,
    talentsAbilities: talentsAbilities,
    skillsAbilities: skillsAbilities,
    knowledgesAbilities: knowledgesAbilities,
  };
}

export function createAllRatingGroups() {
  setAllAttributes();
  createRatingGroup(physicalAttributes);
  createRatingGroup(socialAttributes);
  createRatingGroup(mentalAttributes);
  createRatingGroup(talentsAbilities);
  createRatingGroup(skillsAbilities);
  createRatingGroup(knowledgesAbilities);
}

function moveIdToEnd(arr, idToMove) {
  const index = arr.findIndex((item) => item.id === idToMove);
  if (index >= 0) {
    const [element] = arr.splice(index, 1);
    arr.push(element);
  }
}

function sortRatings() {
  if (selectedLanguage === "es") {
    //sort by name_es talenAbilities, skillsAbilities, knowledgesAbilities
    talentsAbilities.sort((a, b) => (a.name_es > b.name_es ? 1 : -1));
    skillsAbilities.sort((a, b) => (a.name_es > b.name_es ? 1 : -1));
    knowledgesAbilities.sort((a, b) => (a.name_es > b.name_es ? 1 : -1));
  } else if (selectedLanguage === "en") {
    //sort by name_en talenAbilities, skillsAbilities, knowledgesAbilities
    talentsAbilities.sort((a, b) => (a.name_en > b.name_en ? 1 : -1));
    skillsAbilities.sort((a, b) => (a.name_en > b.name_en ? 1 : -1));
    knowledgesAbilities.sort((a, b) => (a.name_en > b.name_en ? 1 : -1));
  }

  moveIdToEnd(talentsAbilities, 11);
  moveIdToEnd(skillsAbilities, 11);
  moveIdToEnd(knowledgesAbilities, 11);
}

export function createRatingGroup(ratingGroup) {
  //Order the rating array by language selected
  sortRatings();

  const parentDiv = document.getElementById(ratingGroup[0].type);
  parentDiv.innerHTML = "";

  for (let i = 0; i < ratingGroup.length; i++) {
    const currentRatingElement = ratingGroup[i];
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-element");
    ratingDiv.dataset.type = currentRatingElement.type;
    ratingDiv.dataset.id = currentRatingElement.id;

    if (i === 10) {
      ratingDiv.appendChild(createRatingCustomInput(currentRatingElement));
    } else {
      ratingDiv.appendChild(createRatingLabel(currentRatingElement));
    }
    if (currentRatingElement.hasOwnProperty("temporaryValue")) {
      ratingDiv.appendChild(createTemporaryValue(currentRatingElement));
    }

    ratingDiv.appendChild(createRatingDots(currentRatingElement));
    

    parentDiv.appendChild(ratingDiv);
  }
}

function createRatingCustomInput(currentRatingElement) {
  const ratingCustomInput = document.createElement("input");
  ratingCustomInput.classList.add("custom-input", "toggle-read-only");
  ratingCustomInput.dataset.type = currentRatingElement.type;
  ratingCustomInput.dataset.id = currentRatingElement.id;
  ratingCustomInput.type = "text";
  ratingCustomInput.value = currentRatingElement.name_es;

  ratingCustomInput.addEventListener("change", (e) => {
    const ratingElement = findRatingElement(
      e.target.dataset.type,
      e.target.dataset.id
    );
    ratingElement.name_es = e.target.value;
    ratingElement.name_en = e.target.value;
    createRatingGroup(allAttributes[e.target.dataset.type]);
    saveToLocalStorage();
  });

  return ratingCustomInput;
}

function createRatingLabel(currentRatingElement) {
  const ratingLabel = document.createElement("label");
  ratingLabel.dataset.type = currentRatingElement.type;
  ratingLabel.dataset.id = currentRatingElement.id;
  ratingLabel.dataset.value = currentRatingElement.value;

  //Translations
  if (selectedLanguage === "es") {
    ratingLabel.setAttribute("for", currentRatingElement.name_es);
    ratingLabel.innerText = currentRatingElement.name_es;
  } else {
    ratingLabel.setAttribute("for", currentRatingElement.name_en);
    ratingLabel.innerText = currentRatingElement.name_en;
  }

  return ratingLabel;
}

function createRatingDots(currentRatingElement) {
  const ratingDots = document.createElement("div");
  ratingDots.classList.add("dots");

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    //set the type of the dot based on the type of the currentRating
    dot.dataset.type = currentRatingElement.type;

    //set a dataset.id to the dot based on the attribute.id
    dot.dataset.id = currentRatingElement.id;

    //set a dataset.index to the dot based on the index of the loop
    dot.dataset.index = i;

    if (i < currentRatingElement.value) {
      dot.classList.add("filled");
    }
    ratingDots.appendChild(dot);
  }
  ratingDots.appendChild(createSpecialities(currentRatingElement));
  return ratingDots;
}

function createTemporaryValue(currentRatingElement) {
  const temporaryValueSelect = document.createElement("select");
  temporaryValueSelect.classList.add("temporaryValue");
  temporaryValueSelect.dataset.id = currentRatingElement.id;
  temporaryValueSelect.dataset.type = currentRatingElement.type;

  for (let i = 0; i < 9; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerText = "+" + i;
    if (i == currentRatingElement.temporaryValue) {
      option.setAttribute("selected", "selected");
    }
    temporaryValueSelect.appendChild(option);
    
  }
  if (currentRatingElement.temporaryValue == 0) {
    temporaryValueSelect.classList.add("zero");
  }
  return temporaryValueSelect;
}

function createSpecialities(currentRatingElement) {
  const specialitiesSpan = document.createElement("span");
  specialitiesSpan.classList.add("specialities");
  specialitiesSpan.dataset.type = currentRatingElement.type;
  specialitiesSpan.dataset.id = currentRatingElement.id;

  const specialitiesIcon = document.createElement("i");
  specialitiesIcon.classList.add("fa-solid", "fa-diamond", "speciality-icon");

  if (currentRatingElement.value > 3) {
    specialitiesSpan.appendChild(specialitiesIcon);

    //If the are no specialities in the array, show the specialitiesIcon with a class of .empty
    if (!hasSpecialities(currentRatingElement)) {
      specialitiesSpan.classList.add("empty");
    } else {
      specialitiesSpan.classList.remove("empty");
      specialitiesIcon.classList.remove("fa-regular");
      specialitiesIcon.classList.add("fa-solid");

    }

    specialitiesSpan.removeEventListener("click", showPopUp);
    specialitiesSpan.addEventListener("click", (event) => {
      showPopUp(currentRatingElement);
    });
  }

  return specialitiesSpan;
}

function hasSpecialities(currentRatingElement) {
  // Check if the currentRatingElement has specialities in the array
  return currentRatingElement.specialities.length > 0;
}

//Update the value of the attribute when the temporaryValue is changed in the Attributes Array
document.addEventListener("change", function (event) {
  const temporaryValueElement = event.target.closest(".temporaryValue");

  if (temporaryValueElement) {
    //obtain the attribute id
    const ratingId = temporaryValueElement.dataset.id;
    //obtain the type of rating
    const ratingType = temporaryValueElement.dataset.type;

    //find the rating in the attributes array
    const rating = findRatingElement(ratingType, ratingId);
    rating.temporaryValue = temporaryValueElement.value;
    saveToLocalStorage();
  }
});

export function updateRatingValue(ratingType, ratingId, newRatingValue) {
  const rating = findRatingElement(ratingType, ratingId);

  //update the value of the rating
  if (rating) {
    rating.value = newRatingValue;
    console.log('Rating actualizado' + rating.name_es + ' a ' + rating.value  );
    
  } else {
    console.log("No se encontro el rating");
  }
  saveToLocalStorage();
  createAllRatingGroups();
  initializeVentajas();
  initializeConfigurations();
}

export function updateCustomAbility(ratingType, ratingId, newAbilityName) {
  currentRatingElement = findRatingElement(ratingType, ratingId);
  currentRatingElement.name_es = newAbilityName;
  createAllRatingGroups();
}
