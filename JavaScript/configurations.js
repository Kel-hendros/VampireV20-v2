import { configurations } from "./defaultAttributes.js";
import { generateAll } from "./globalFunctions.js";
import { saveToLocalStorage } from "./saveLoad.js";
import { translateAll } from "./translations.js";
import { lockEditing } from "./editCharacter.js";

export let lockEdition = false;

export function initializeConfigurations() {
  initializeLockEdition();
  initializeLanguage();
}

export function setLockEdition(value) {
  lockEdition = value;
  //find the lockEdition object in the array
  const lockEditionConfig = configurations.find(
    (config) => config.name === "lockEdition"
  );
  //set the value of the object to the value passed to the function
  lockEditionConfig.value = value;
  //save the array to local storage
  saveToLocalStorage();
}

//initialize the edition button based on lockEdition value from array
function initializeLockEdition() {
  console.log("initializing lock edition");

  const toggleReadOnlyElements = document.querySelectorAll(".toggle-read-only");
  const lockButton = document.querySelector(".lock");
  var editionConfig = configurations.find(
    (config) => config.name === "lockEdition"
  );
  lockEdition = editionConfig.value;
  console.log("lockEdition: " + lockEdition);

  if (lockEdition === false) {
    console.log("afuera");

    //if the value in the array is false, unlock it
    lockButton.classList.remove("locked");
    toggleReadOnlyElements.forEach((element) => {
      if (element.tagName === "I") {
        element.classList.remove("disabled");
      }
    });
  } else {
    console.log("adentro");
    //if it is true, lock it
    lockButton.classList.add("locked");
    toggleReadOnlyElements.forEach((element) => {
      if (element.tagName === "I") {
        element.classList.add("disabled");
      }
    });
  }
  // QUE FORRO!!
  setTimeout(lockEditing, 10); // first call
  setTimeout(lockEditing, 20); // second call

  /*
  toggleReadOnlyElements.forEach((element) => {
    if (element.tagName === "INPUT") {
      element.readOnly = lockEdition;
    } else if (element.tagName === "SELECT" || element.tagName === "BUTTON") {
      element.disabled = lockEdition;
    }
  });
  */
}

//initialize the language button based on selectedLanguage value from array

export let selectedLanguage = "es";

export function setLanguage(language) {
  selectedLanguage = language;
  //find the lockEdition object in the array
  const languageConfig = configurations.find(
    (config) => config.name === "language"
  );
  //set the value of the object to the value passed to the function
  languageConfig.value = language;
  //save the array to local storage
  saveToLocalStorage();
}

function initializeLanguage() {
  const languageButton = document.querySelector("#languageButton");
  const languageConfig = configurations.find(
    (config) => config.name === "language"
  );
  selectedLanguage = languageConfig.value;
  if (selectedLanguage === "en") {
    languageButton.classList.add("en");
    languageButton.classList.remove("es");
    languageButton.textContent = "English";
  } else if (selectedLanguage === "es") {
    languageButton.classList.add("es");
    languageButton.classList.remove("en");
    languageButton.textContent = "Español";
  }
  generateAll();
}

//update the lockEdition value in the array
export function updateConfigurationLock(lockEdition) {
  var editionConfig = configurations.find(
    (config) => config.name === "lockEdition"
  );
  editionConfig.value = lockEdition;
}
