import { backgrounds } from "./defaultAttributes.js";
import { currentLockStatus, selectedLanguage } from "./configurations.js";
import { saveToLocalStorage } from "./saveLoad.js";

function sortBackgrounds(backgrounds) {
  backgrounds.sort(function (a, b) {
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

export function displayBackgrounds() {
  const backgroundsDiv = document.querySelector(".trasfondos-list");
  backgroundsDiv.innerHTML = "";
  const addBackgroundsContainer = document.querySelector(
    ".agregar-trasfondos-container"
  );
  addBackgroundsContainer.innerHTML = "";

  createBackgroundList(backgroundsDiv);

  addBackgroundsContainer.appendChild(addBackgroundButton());
}

function createBackgroundList(backgroundsListContainer) {
  backgroundsListContainer.innerHTML = "";

  const activeBackgrounds = backgrounds.filter(
    (background) => background.active
  );

  for (let i = 0; i < activeBackgrounds.length; i++) {
    const currentBackground = activeBackgrounds[i];
    const backgroundDiv = document.createElement("div");
    backgroundDiv.classList.add("rating-element");
    backgroundDiv.dataset.type = "background";
    backgroundDiv.dataset.id = currentBackground.id;

    backgroundDiv.appendChild(createBackgroundLabel(currentBackground));
    backgroundDiv.appendChild(createBackgroundRating(currentBackground));

    backgroundsListContainer.appendChild(backgroundDiv);
  }
}

function createBackgroundRating(currentBackground) {
  const backgroundRating = document.createElement("div");
  backgroundRating.classList.add("dots");

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.dataset.type = "background";
    dot.dataset.id = currentBackground.id;
    dot.dataset.index = i;

    if (i < currentBackground.value) {
      dot.classList.add("filled");
    }
    backgroundRating.appendChild(dot);
  }

  return backgroundRating;
}

function createBackgroundLabel(currentBackground) {
  const backgroundLabel = document.createElement("label");
  backgroundLabel.dataset.type = "background";
  backgroundLabel.dataset.id = currentBackground.id;
  backgroundLabel.dataset.value = currentBackground.value;

  //Translations
  if (selectedLanguage === "es") {
    backgroundLabel.setAttribute("for", currentBackground.name_es);
    backgroundLabel.innerText = currentBackground.name_es;
  } else {
    backgroundLabel.setAttribute("for", currentBackground.name_en);
    backgroundLabel.innerText = currentBackground.name_en;
  }

  return backgroundLabel;
}

function addBackgroundButton() {
  const addBackgroundButton = document.createElement("i");
  addBackgroundButton.classList.add(
    "fa-solid",
    "fa-pen-to-square",
    "add-background",
    "toggle-read-only"
  );
  addBackgroundButton.dataset.type = "background";

  if (currentLockStatus()) {
    addBackgroundButton.classList.add("disabled");
  }

  addBackgroundButton.addEventListener("click", () => {
    openBackgroundsModal();
  });

  return addBackgroundButton;
}

// MODAL

export function openBackgroundsModal() {
  const backgroundsModal = document.querySelector(".modal.disciplinas");
  backgroundsModal.classList.add("show");
  populateBackgroundsModal();
}

function populateBackgroundsModal() {
  const backgroundsModalDiv = document.querySelector(".modal.disciplinas");
  backgroundsModalDiv.innerHTML = "";

  const backgroundsModalContent = document.createElement("div");
  backgroundsModalContent.classList.add("modal-content");

  backgroundsModalDiv.appendChild(backgroundsModalContent);
  backgroundsModalContent.appendChild(modalTitle());

  backgroundsModalContent.appendChild(listBackgrounds());
  backgroundsModalContent.appendChild(buttonCreateCustomBackground());

  backgroundsModalContent.appendChild(modalButtons());
}

function modalTitle() {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("modal-title-container");

  const backgroundSelector = document.createElement("label");
  backgroundSelector.classList.add("modal-title", "backgrounds");
  if (selectedLanguage === "es") {
    backgroundSelector.innerText = "Trasfondos";
  } else if (selectedLanguage === "en") {
    backgroundSelector.innerText = "Backgrounds";
  }

  titleDiv.appendChild(backgroundSelector);

  return titleDiv;
}

function listBackgrounds() {
  const listDiv = document.createElement("div");
  listDiv.classList.add("element-list-container", "background");
  listDiv.innerHTML = "";

  sortBackgrounds(backgrounds);

  for (let i = 0; i < backgrounds.length; i++) {
    const currentBackground = backgrounds[i];
    const backgroundItem = document.createElement("div");
    backgroundItem.classList.add("element-item");
    backgroundItem.dataset.type = "background";
    backgroundItem.dataset.id = currentBackground.id;

    const backgroundLabel = document.createElement("label");
    backgroundLabel.classList.add("background-label");
    backgroundLabel.dataset.type = "background";
    backgroundLabel.dataset.id = currentBackground.id;

    //Translations
    if (selectedLanguage === "es") {
      backgroundLabel.setAttribute("for", currentBackground.name_es);
      backgroundLabel.innerText = currentBackground.name_es;
    } else if (selectedLanguage === "en") {
      backgroundLabel.setAttribute("for", currentBackground.name_en);
      backgroundLabel.innerText = currentBackground.name_en;
    }

    if (currentBackground.active) {
      backgroundItem.classList.add("active");
    }

    if (currentBackground.custom === true) {
      backgroundItem.classList.add("custom");
    }

    backgroundItem.addEventListener("click", () => {
      backgroundItem.classList.toggle("active");
      currentBackground.active = !currentBackground.active;

      saveToLocalStorage();
    });

    backgroundItem.appendChild(backgroundLabel);
    backgroundItem.appendChild(backgroundIcon(currentBackground));
    listDiv.appendChild(backgroundItem);
  }

  return listDiv;
}

function backgroundIcon(currentBackground) {
  let backgroundIcon;

  if (currentBackground.custom === true) {
    backgroundIcon = document.createElement("i");
    backgroundIcon.classList.add("fa-solid", "fa-trash");
    backgroundIcon.addEventListener("click", () => {
      deleteCustomBackground(currentBackground);
      populateBackgroundsModal();
    });
  } else {
    backgroundIcon = document.createElement("span");
  }

  return backgroundIcon;
}

function deleteCustomBackground(currentBackground) {
  const index = backgrounds.indexOf(currentBackground);
  backgrounds.splice(index, 1);
  saveToLocalStorage();
  populateBackgroundsModal();
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

function buttonCreateCustomBackground() {
  const customBackgroundButton = document.createElement("button");
  customBackgroundButton.classList.add("add-custom-element", "background");

  //translations
  if (selectedLanguage === "es") {
    customBackgroundButton.innerText = "Crear Trasfondo personalizado";
  }
  if (selectedLanguage === "en") {
    customBackgroundButton.innerText = "Create custom Background";
  }
  customBackgroundButton.addEventListener("click", () => {
    createCustomBackground();
  });

  return customBackgroundButton;
}

function createCustomBackground() {
  let message;
  //promt the user to enter a name for the custom discipline
  if (selectedLanguage === "es") {
    message = "Ingresa el nombre del Trasfondo";
  } else if (selectedLanguage === "en") {
    message = "Enter the name of the Background";
  }
  const customBackgroundName = prompt(message);

  //if the user enters a name, create a new discipline with that name
  if (customBackgroundName) {
    const newBackground = {
      id: backgrounds.length + 1,
      name_es: customBackgroundName,
      name_en: customBackgroundName,
      active: true,
      custom: true,
    };

    backgrounds.push(newBackground);

    saveToLocalStorage();

    populateBackgroundsModal();
  }
}

function closeBackgroundsModal() {
  const backgroundsModal = document.querySelector(".modal.disciplinas");
  backgroundsModal.classList.remove("show");

  displayBackgrounds();
}
