import { virtues, roads } from "./defaultAttributes.js";
import { currentLockStatus, selectedLanguage } from "./configurations.js";
import { saveToLocalStorage } from "./saveLoad.js";

function sortRoads(roads) {
  roads.sort(function (a, b) {
    if (selectedLanguage === "es") {
      if (a.name_es < b.name_es) {
        return -1;
      }
      if (a.name_es > b.name_es) {
        return 1;
      }
      return 0;
    } else if (selectedLanguage === "en") {
      if (a.name_en < b.name_en) {
        return -1;
      }
      if (a.name_en > b.name_en) {
        return 1;
      }
      return 0;
    }
  });
}

export function displayVirtues() {
  const elementsDiv = document.querySelector(".virtudes-elements");
  elementsDiv.innerHTML = "";

  const roadDiv = document.createElement("div");
  roadDiv.classList.add("road-container");

  const virtueListContainer = document.createElement("div");
  virtueListContainer.classList.add("virtue-list-container");

  const addElementsContainer = document.querySelector(
    ".agregar-virtudes-container"
  );
  addElementsContainer.innerHTML = "";

  elementsDiv.appendChild(roadDiv);
  createRoadElement(roadDiv);
  elementsDiv.appendChild(virtueListContainer);
  createElementList(virtueListContainer);

  addElementsContainer.appendChild(addElementButton());
}

function createRoadElement(roadDiv) {
  roadDiv.innerHTML = "";

  const roadElement = document.createElement("div");
  roadElement.classList.add("road-element");
  roadElement.dataset.type = "virtue";
  roadElement.dataset.id = "road";

  roadElement.appendChild(createRoadLabel());
  roadElement.appendChild(createRoadRating());

  roadDiv.appendChild(roadElement);
}

function createRoadLabel() {
  const activeRoad = Object.assign({}, ...roads.filter((road) => road.active));

  const roadLabel = document.createElement("label");
  roadLabel.dataset.type = "virtue";
  roadLabel.dataset.id = activeRoad.id;
  roadLabel.dataset.value = roads.value;
  roadLabel.classList.add("road-label");

  //Translations
  if (selectedLanguage === "es") {
    roadLabel.textContent = activeRoad.name_es;
  } else if (selectedLanguage === "en") {
    roadLabel.textContent = activeRoad.name_en;
  }

  return roadLabel;
}

function createRoadRating() {
  const activeRoad = Object.assign({}, ...roads.filter((road) => road.active));

  const elementRating = document.createElement("div");
  elementRating.classList.add("dots");

  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.type = "road";
    dot.dataset.id = activeRoad.id;
    dot.dataset.index = i;

    if (i < activeRoad.value) {
      dot.classList.add("filled");
    }
    elementRating.appendChild(dot);
  }

  return elementRating;
}

function createElementList(virtueListContainer) {
  virtueListContainer.innerHTML = "";

  const activeElements = virtues.filter((virtue) => virtue.active);

  for (let i = 0; i < activeElements.length; i++) {
    const currentElement = activeElements[i];
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("rating-element");
    elementDiv.dataset.type = "virue";
    elementDiv.dataset.id = currentElement.id;

    elementDiv.appendChild(createElementLabel(currentElement));
    elementDiv.appendChild(createElementRating(currentElement));

    virtueListContainer.appendChild(elementDiv);
  }
}

function createElementRating(currentElement) {
  const elementRating = document.createElement("div");
  elementRating.classList.add("dots");
  const activeRoad = Object.assign({}, ...roads.filter((road) => road.active));

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.dataset.type = "virtue";
    dot.dataset.id = currentElement.id;
    dot.dataset.index = i;

    if (i < currentElement.value) {
      dot.classList.add("filled");
    }
    elementRating.appendChild(dot);

    if (i >= activeRoad.value) {
      dot.classList.add("disabled");
    }
  }

  return elementRating;
}

function createElementLabel(currentElement) {
  const elementLabel = document.createElement("label");
  elementLabel.dataset.type = "virtue";
  elementLabel.dataset.id = currentElement.id;
  elementLabel.dataset.value = currentElement.value;

  //Translations
  if (selectedLanguage === "es") {
    elementLabel.setAttribute("for", currentElement.name_es);
    elementLabel.innerText = currentElement.name_es;
  } else {
    elementLabel.setAttribute("for", currentElement.name_en);
    elementLabel.innerText = currentElement.name_en;
  }
  return elementLabel;
}

function addElementButton() {
  const addElementButton = document.createElement("i");
  addElementButton.classList.add(
    "fa-solid",
    "fa-pen-to-square",
    "add-virtue",
    "toggle-read-only"
  );
  addElementButton.dataset.type = "virtue";

  if (currentLockStatus()) {
    addElementButton.classList.add("disabled");
  }

  addElementButton.addEventListener("click", () => {
    openElementsModal();
  });

  return addElementButton;
}

// MODAL

export function openElementsModal() {
  const elementsModal = document.querySelector(".modal.disciplinas");
  elementsModal.classList.add("show");
  populateElementsModal();
}

function populateElementsModal() {
  const elementModalDiv = document.querySelector(".modal.disciplinas");
  elementModalDiv.innerHTML = "";

  const elementModalContent = document.createElement("div");
  elementModalContent.classList.add("modal-content");

  elementModalDiv.appendChild(elementModalContent);
  elementModalContent.appendChild(modalTitle());

  elementModalContent.appendChild(listElements());
  // elementModalContent.appendChild(buttonCreateCustomBackground());

  elementModalContent.appendChild(modalButtons());
}

function modalTitle() {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("modal-title-container");

  const roadsSelector = document.createElement("label");
  roadsSelector.classList.add("modal-title", "roads");
  if (selectedLanguage === "es") {
    roadsSelector.innerText = "Caminos";
  } else if (selectedLanguage === "en") {
    roadsSelector.innerText = "Roads";
  }

  titleDiv.appendChild(roadsSelector);

  return titleDiv;
}

function listElements() {
  const listDiv = document.createElement("div");
  listDiv.classList.add("element-list-container", "roads");
  listDiv.innerHTML = "";

  sortRoads(roads);

  for (let i = 0; i < roads.length; i++) {
    const currentRoad = roads[i];
    const roadItem = document.createElement("div");
    roadItem.classList.add("element-item", "road");
    roadItem.dataset.type = "road";
    roadItem.dataset.id = currentRoad.id;

    const roadLabel = document.createElement("label");
    roadLabel.classList.add("background-label");
    roadLabel.dataset.type = "background";
    roadLabel.dataset.id = currentRoad.id;

    const roadVirtues = document.createElement("label");
    roadVirtues.classList.add("road-virtues");
    roadVirtues.dataset.type = "road";

    const virtue1 = virtues.find(
      (virtue) => virtue.id === currentRoad.virtues[0]
    );
    const virtue2 = virtues.find(
      (virtue) => virtue.id === currentRoad.virtues[1]
    );
    console.log("virtue1", virtue1);

    //Translations
    if (selectedLanguage === "es") {
      roadLabel.setAttribute("for", currentRoad.name_es);
      roadLabel.innerText = currentRoad.name_es;
      roadVirtues.innerText = `${virtue1.name_es} / ${virtue2.name_es}`;
    } else if (selectedLanguage === "en") {
      roadLabel.setAttribute("for", currentRoad.name_en);
      roadLabel.innerText = currentRoad.name_en;
      roadVirtues.innerText = `${virtue1.name_en} / ${virtue2.name_en}`;
    }

    if (currentRoad.active) {
      roadItem.classList.add("active");
    }

    if (currentRoad.custom === true) {
      roadItem.classList.add("custom");
    }

    roadItem.addEventListener("click", () => {
      // allRoads is all elements with data-type="road"
      const allRoads = document.querySelectorAll("[data-type='road']");

      allRoads.forEach((road) => {
        road.classList.remove("active");
      });

      roads.forEach((road) => {
        road.active = false;
      });

      virtues.forEach((virtue) => {
        virtue.active = false;
      });

      roadItem.classList.add("active");
      currentRoad.active = true;
      virtue1.active = true;
      virtue2.active = true;

      //jajaja esto es una mierda
      virtues[4].active = true;

      console.log("currentRoad", currentRoad);

      saveToLocalStorage();
    });

    roadItem.appendChild(roadLabel);
    roadItem.appendChild(roadVirtues);
    listDiv.appendChild(roadItem);
  }

  return listDiv;
}

function modalButtons() {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("modal-buttons-container");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("close-button");

  //translations
  if (selectedLanguage === "es") {
    cancelButton.innerText = "Cerrar";
  } else if (selectedLanguage === "en") {
    cancelButton.innerText = "Close";
  }

  cancelButton.addEventListener("click", () => {
    closeBackgroundsModal();
  });

  buttonsContainer.appendChild(cancelButton);
  return buttonsContainer;
}

function closeBackgroundsModal() {
  const backgroundsModal = document.querySelector(".modal.disciplinas");
  backgroundsModal.classList.remove("show");

  displayVirtues();
}
