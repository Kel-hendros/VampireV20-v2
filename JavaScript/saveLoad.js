import { allAttributes } from "./createRatings.js";
import {
  allCharacterInfo,
  createAllCharacterInfo,
} from "./createCharacterInfo.js";
import { generateAll } from "./globalFunctions.js";
import { configurations, disciplines, sendas, backgrounds, roads, virtues, bloodPool, willPower, experience } from "./defaultAttributes.js";

//Save
export function save() {
  const filename = "character.json";
  const content = JSON.stringify(getExportData(), null, 2);
  const dataUrl =
    "data:text/plain;charset=utf-8," + encodeURIComponent(content);

  const element = document.createElement("a");
  element.setAttribute("href", dataUrl);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function load() {
  const hiddenFileInput = document.getElementById("hidden-file-input");
  hiddenFileInput.click();
}

//Load
document
  .getElementById("hidden-file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const content = e.target.result;
        try {
          const loadedData = JSON.parse(content);
          updateData(loadedData);
          console.log("File imported succesfully");

          generateAll();
        } catch (error) {}
      };
      reader.readAsText(file);
    }
  });

//Deep merge Function (Magia negra)
function deepMerge(target, source) {
  if (!target || !source) {
    return;
  }

  for (const key in source) {
    if (
      source.hasOwnProperty(key) &&
      source[key] instanceof Object &&
      target[key] instanceof Object
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}


export function saveToLocalStorage() {
  const exportData = getExportData();
  console.trace("Saving data:", exportData);
  localStorage.setItem("savedData", JSON.stringify(exportData));
  generateAll();
}

export function loadFromLocalStorage() {
  generateAll();
  console.log("Loading from local storage");

  const savedData = localStorage.getItem("savedData");
  // console.log("Loaded data from local storage:", savedData);
  if (savedData) {
    const loadedData = JSON.parse(savedData);
    updateData(loadedData);
 
  }
  generateAll();
}

// Functions que deben ser updeteadas cuando se agregan nuevos Arrays para guardar y cargar
function getExportData() {
  return {
    attributes: allAttributes,
    characterInfo: allCharacterInfo,
    configurations: configurations,
    disciplines: disciplines,
    sendas: sendas,
    backgrounds: backgrounds,
    roads: roads,
    virtues: virtues,
    bloodPool: bloodPool,
    willpower: willPower,
    experience: experience,
    // new data to export here..
  };
}

function updateData(loadedData) {
  console.log("Updating data with:", loadedData);

  deepMerge(allAttributes, loadedData.attributes);
  deepMerge(allCharacterInfo, loadedData.characterInfo);
  deepMerge(configurations, loadedData.configurations);
  deepMerge(disciplines, loadedData.disciplines);
  deepMerge(sendas, loadedData.sendas);
  deepMerge(backgrounds, loadedData.backgrounds);
  deepMerge(roads, loadedData.roads);
  deepMerge(virtues, loadedData.virtues);
  deepMerge(bloodPool, loadedData.bloodPool);
  deepMerge(willPower, loadedData.willpower);
  deepMerge(experience, loadedData.experience);
  // new data to update here..

  // console.log("Updated allAttributes:", allAttributes);
  // console.log("Updated allCharacterInfo:", allCharacterInfo);
}

  
  
