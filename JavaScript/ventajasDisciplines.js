import { disciplines, sendas } from "./defaultAttributes.js";
import { selectedLanguage, currentLockStatus } from "./configurations.js";
import { saveToLocalStorage } from "./saveLoad.js";

let titleSelected = "disciplinas";

function sortDisciplines(disciplines) {
  disciplines.sort(function (a, b) {
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

export function displayDisciplines() {
  const disciplinesDiv = document.querySelector(".disciplinas-list");
  disciplinesDiv.innerHTML = "";
  const addDisciplineContainer = document.querySelector(
    ".agregar-disciplinas-container"
  );
  addDisciplineContainer.innerHTML = "";

  createDisciplineList(disciplinesDiv);

  addDisciplineContainer.appendChild(addDisciplineButton());
}

function createDisciplineList(discplinesListContainer) {
  discplinesListContainer.innerHTML = "";

  const activeDisciplines = disciplines.filter(
    (discipline) => discipline.active
  );

  for (let i = 0; i < activeDisciplines.length; i++) {
    const currentDiscipline = activeDisciplines[i];
    const disciplineDiv = document.createElement("div");
    disciplineDiv.classList.add("rating-element");
    disciplineDiv.dataset.type = "discipline";
    disciplineDiv.dataset.id = currentDiscipline.id;

    disciplineDiv.appendChild(createDisciplineLabel(currentDiscipline));
    disciplineDiv.appendChild(createDisciplineRating(currentDiscipline));

    discplinesListContainer.appendChild(disciplineDiv);

    //check if there are active paths for this discipline id
    const activePaths = sendas.filter(
      (senda) =>
        senda.active && senda.parentDisciplineId === currentDiscipline.id
    );

    if (activePaths.length > 0) {
      sortActivePaths(activePaths);
      for (let i = 0; i < activePaths.length; i++) {
        const currentSenda = activePaths[i];
        discplinesListContainer.appendChild(createSendaDiv(currentSenda));
      }
    }
  }
}

function sortActivePaths(activePaths) {
  //sort the active paths by:
  // first: primary: true.
  // second: based on the name of the path in the selected language
  activePaths.sort(function (a, b) {
    if (a.primary && !b.primary) {
      return -1;
    }
    if (!a.primary && b.primary) {
      return 1;
    }
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

function createSendaDiv(currentSenda) {
  const sendaDiv = document.createElement("div");
  sendaDiv.classList.add("rating-element");
  sendaDiv.dataset.type = "senda";
  sendaDiv.dataset.id = currentSenda.id;

  sendaDiv.appendChild(createSendaLabel(currentSenda));
  sendaDiv.appendChild(createSendaRating(currentSenda));

  return sendaDiv;
}

function createSendaLabel(currentSenda) {
  const sendaLabel = document.createElement("label");
  sendaLabel.classList.add("senda-label");
  sendaLabel.dataset.type = "senda";
  sendaLabel.dataset.id = currentSenda.id;
  sendaLabel.dataset.value = currentSenda.value;

  //Translations
  if (selectedLanguage === "es") {
    sendaLabel.setAttribute("for", currentSenda.name_es);
    sendaLabel.innerText = currentSenda.name_es;
  } else {
    sendaLabel.setAttribute("for", currentSenda.name_en);
    sendaLabel.innerText = currentSenda.name_en;
  }

  return sendaLabel;
}

function createSendaRating(currentSenda) {
  const sendaRating = document.createElement("div");
  sendaRating.classList.add("dots");

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.dataset.type = "senda";
    dot.dataset.id = currentSenda.id;
    dot.dataset.index = i;

    if (i < currentSenda.value) {
      dot.classList.add("filled");
    }
    sendaRating.appendChild(dot);
  }

  return sendaRating;
}

function createDisciplineRating(currentDiscipline) {
  const disciplineRating = document.createElement("div");
  disciplineRating.classList.add("dots");

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.dataset.type = "discipline";
    dot.dataset.id = currentDiscipline.id;
    dot.dataset.index = i;

    if (i < currentDiscipline.value) {
      dot.classList.add("filled");
    }
    disciplineRating.appendChild(dot);
  }

  return disciplineRating;
}

function createDisciplineLabel(currentDiscipline) {
  const disciplineLabel = document.createElement("label");
  disciplineLabel.dataset.type = "discipline";
  disciplineLabel.dataset.id = currentDiscipline.id;
  disciplineLabel.dataset.value = currentDiscipline.value;

  //Translations
  if (selectedLanguage === "es") {
    disciplineLabel.setAttribute("for", currentDiscipline.name_es);
    disciplineLabel.innerText = currentDiscipline.name_es;
  } else {
    disciplineLabel.setAttribute("for", currentDiscipline.name_en);
    disciplineLabel.innerText = currentDiscipline.name_en;
  }

  return disciplineLabel;
}

function addDisciplineButton() {
  const addDisciplineButton = document.createElement("i");
  addDisciplineButton.classList.add(
    "fa-solid",
    "fa-pen-to-square",
    "add-discipline",
    "toggle-read-only"
  );
  addDisciplineButton.dataset.type = "discipline";

  // add disabled class if the lockEdition is true
  if (currentLockStatus()) {
    addDisciplineButton.classList.add("disabled");
  }

  addDisciplineButton.addEventListener("click", () => {
    openDiscplinesModal();
  });

  return addDisciplineButton;
}

// MODAL

export function openDiscplinesModal() {
  const disciplinesModal = document.querySelector(".modal.disciplinas");
  disciplinesModal.classList.add("show");
  populateDisciplinesModal();
}

function populateDisciplinesModal() {
  const disciplinesModalDiv = document.querySelector(".modal.disciplinas");
  disciplinesModalDiv.innerHTML = "";

  const disciplinesModalContent = document.createElement("div");
  disciplinesModalContent.classList.add("modal-content");

  disciplinesModalDiv.appendChild(disciplinesModalContent);
  disciplinesModalContent.appendChild(modalTitle());

  if (titleSelected === "disciplinas") {
    disciplinesModalContent.appendChild(listDisciplines());
    // disciplinesModalContent.appendChild(buttonCreateCustomDiscipline());
  } else if (titleSelected === "sendas") {
    disciplinesModalContent.appendChild(listPaths());
  }
  disciplinesModalContent.appendChild(modalButtons());

  allowPathSelection();
}

function modalTitle() {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("modal-title-container");

  const disciplineSelector = document.createElement("h1");
  disciplineSelector.classList.add("sect-button", "disciplines");
  if (selectedLanguage === "es") {
    disciplineSelector.innerText = "Disciplinas";
  } else if (selectedLanguage === "en") {
    disciplineSelector.innerText = "Disciplines";
  }

  const pathsSelector = document.createElement("h1");
  pathsSelector.classList.add("sect-button", "paths");
  pathsSelector.setAttribute("id", "paths-selector");
  if (selectedLanguage === "es") {
    pathsSelector.innerText = "Sendas";
  } else if (selectedLanguage === "en") {
    pathsSelector.innerText = "Paths";
  }

  disciplineSelector.addEventListener("click", () => {
    disciplineSelector.classList.add("selected");
    pathsSelector.classList.remove("selected");
    titleSelected = "disciplinas";
    populateDisciplinesModal();
  });

  if (titleSelected === "disciplinas") {
    disciplineSelector.classList.add("selected");
    pathsSelector.classList.remove("selected");
  } else if (titleSelected === "sendas") {
    pathsSelector.classList.add("selected");
    disciplineSelector.classList.remove("selected");
  }

  titleDiv.appendChild(disciplineSelector);
  titleDiv.appendChild(pathsSelector);

  return titleDiv;
}

function listPaths() {
  const pathsGroup = document.createElement("div");
  pathsGroup.classList.add("paths-group");
  pathsGroup.innerHTML = "";

  // create as many containers as there are disciplines with paths
  const discplinesWithPaths = findActiveDisciplinesWithPaths();

  for (let i = 0; i < discplinesWithPaths.length; i++) {
    const currentDiscipline = discplinesWithPaths[i];
    const disciplineWithPathContainer = document.createElement("div");
    disciplineWithPathContainer.classList.add(
      "multiple-element-list-container"
    );

    const disciplineTitle = document.createElement("label");
    disciplineTitle.classList.add("discipline-title");

    if (selectedLanguage === "es") {
      disciplineTitle.innerText = currentDiscipline.name_es;
    } else if (selectedLanguage === "en") {
      disciplineTitle.innerText = currentDiscipline.name_en;
    }

    disciplineWithPathContainer.appendChild(disciplineTitle);
    disciplineWithPathContainer.appendChild(
      listPathsForDiscipline(currentDiscipline)
    );

    pathsGroup.appendChild(disciplineWithPathContainer);
  }
  return pathsGroup;
}

function listPathsForDiscipline(currentDiscipline) {
  const pathsListContainer = document.createElement("div");
  pathsListContainer.classList.add("element-list-container");
  const paths = pathsForDiscipline(currentDiscipline.id);
  pathsListContainer.innerHTML = "";

  for (let i = 0; i < paths.length; i++) {
    const currentPath = paths[i];
    const pathItem = document.createElement("div");
    pathItem.classList.add("element-item", "path");
    pathItem.dataset.type = "path";
    pathItem.dataset.id = currentPath.id;

    const pathLabel = document.createElement("label");
    pathLabel.classList.add("path-label");
    pathLabel.dataset.type = "path";
    pathLabel.dataset.id = currentPath.id;

    if (selectedLanguage === "es") {
      pathLabel.innerText = currentPath.name_es;
    }
    if (selectedLanguage === "en") {
      pathLabel.innerText = currentPath.name_en;
    }

    if (currentPath.active) {
      pathItem.classList.add("active");
    }

    pathItem.addEventListener("click", (e) => {
      e.stopPropagation();

      //swith currentPath.active between true and false
      currentPath.active = !currentPath.active;

      saveToLocalStorage();
      populateDisciplinesModal();
    });

    pathItem.appendChild(pathLabel);
    pathItem.appendChild(primaryOption(currentPath));
    pathsListContainer.appendChild(pathItem);
  }

  return pathsListContainer;
}

function listDisciplines() {
  const listDiv = document.createElement("div");
  listDiv.classList.add("element-list-container", "discipline");
  listDiv.innerHTML = "";

  sortDisciplines(disciplines);

  for (let i = 0; i < disciplines.length; i++) {
    const currentDiscipline = disciplines[i];
    const disciplineItem = document.createElement("div");
    disciplineItem.classList.add("element-item", "discipline");
    disciplineItem.dataset.type = "discipline";
    disciplineItem.dataset.id = currentDiscipline.id;

    const disciplineLabel = document.createElement("label");
    disciplineLabel.classList.add("discipline-label");
    disciplineLabel.dataset.type = "discipline";
    disciplineLabel.dataset.id = currentDiscipline.id;

    //Translations
    if (selectedLanguage === "es") {
      disciplineLabel.setAttribute("for", currentDiscipline.name_es);
      disciplineLabel.innerText = currentDiscipline.name_es;
    } else if (selectedLanguage === "en") {
      disciplineLabel.setAttribute("for", currentDiscipline.name_en);
      disciplineLabel.innerText = currentDiscipline.name_en;
    }

    if (currentDiscipline.active) {
      disciplineItem.classList.add("active");
    }

    if (currentDiscipline.custom === true) {
      disciplineItem.classList.add("custom");
    }

    disciplineItem.addEventListener("click", () => {
      disciplineItem.classList.toggle("active");
      currentDiscipline.active = !currentDiscipline.active;
      allowPathSelection();
      saveToLocalStorage();
    });

    disciplineItem.appendChild(disciplineLabel);
    disciplineItem.appendChild(disciplineIcon(currentDiscipline));
    listDiv.appendChild(disciplineItem);
  }
  listDiv.appendChild(buttonCreateCustomDiscipline());
  return listDiv;
}

function disciplineIcon(currentDiscipline) {
  let disciplineIcon;

  if (currentDiscipline.custom === true) {
    disciplineIcon = document.createElement("i");
    disciplineIcon.classList.add("fa-solid", "fa-trash");
    disciplineIcon.addEventListener("click", () => {
      deleteCustomDiscipline(currentDiscipline);
      populateDisciplinesModal();
    });
  } else {
    disciplineIcon = document.createElement("i");
    disciplineIcon.classList.add("fa-solid", "fa-circle-info");
    disciplineIcon.addEventListener("click", () => {
      window.open(currentDiscipline.link, "_blank");
    });
  }

  return disciplineIcon;
}

function deleteCustomDiscipline(currentDiscipline) {
  const index = disciplines.indexOf(currentDiscipline);
  disciplines.splice(index, 1);
  saveToLocalStorage();
  populateDisciplinesModal();
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
    closeDisciplinesModal();
  });

  buttonsContainer.appendChild(cancelButton);
  return buttonsContainer;
}

function buttonCreateCustomDiscipline() {
  const customDisciplineButton = document.createElement("button");
  customDisciplineButton.classList.add("add-custom-element", "discipline");

  //translations
  if (selectedLanguage === "es") {
    customDisciplineButton.innerText = "Crear Nueva Disciplina";
  }
  if (selectedLanguage === "en") {
    customDisciplineButton.innerText = "Create custom discipline";
  }
  customDisciplineButton.addEventListener("click", () => {
    createCustomDiscipline();
  });

  return customDisciplineButton;
}

function createCustomDiscipline() {
  let message;
  //promt the user to enter a name for the custom discipline
  if (selectedLanguage === "es") {
    message = "Ingresa el nombre de la disciplina";
  } else if (selectedLanguage === "en") {
    message = "Enter the name of the discipline";
  }
  const customDisciplineName = prompt(message);

  //if the user enters a name, create a new discipline with that name
  if (customDisciplineName) {
    const newDiscipline = {
      id: disciplines.length + 1,
      name_es: customDisciplineName,
      name_en: customDisciplineName,
      active: true,
      paths: [],
      custom: true,
    };

    //add the new discipline to the disciplines array
    disciplines.push(newDiscipline);

    //save the new disciplines array to local storage
    saveToLocalStorage();

    //redraw the disciplines modal
    populateDisciplinesModal();
  }
}

function closeDisciplinesModal() {
  const disciplinesModal = document.querySelector(".modal.disciplinas");
  disciplinesModal.classList.remove("show");

  displayDisciplines();
}

function allowPathSelection() {
  //select the path selector based on its id paths-selector
  const pathSelector = document.querySelector("#paths-selector");
  const disciplinesWithPaths = findActiveDisciplinesWithPaths();

  if (disciplinesWithPaths.length > 0) {
    pathSelector.classList.remove("unselectable");
    pathSelector.addEventListener("click", togglePathSelection);
  } else {
    pathSelector.classList.add("unselectable");
    pathSelector.removeEventListener("click", togglePathSelection);
  }
}

function togglePathSelection() {
  const pathSelector = document.querySelector("#paths-selector");
  const disciplineSelector = document.querySelector(
    ".sect-button.disciplines"
  );
  disciplineSelector.classList.remove("selected");
  pathSelector.classList.add("selected");
  titleSelected = "sendas";
  populateDisciplinesModal();
}

function findActiveDisciplinesWithPaths() {
  //return an array of objects of disciplines with paths that are active
  const discplinesIdWithPath = [24, 39];
  const activeDisciplinesWithPaths = [];
  for (let i = 0; i < disciplines.length; i++) {
    const currentDiscipline = disciplines[i];
    if (
      currentDiscipline.active &&
      discplinesIdWithPath.includes(currentDiscipline.id)
    ) {
      activeDisciplinesWithPaths.push(currentDiscipline);
    }
  }
  return activeDisciplinesWithPaths;
}

function pathsForDiscipline(disciplineId) {
  const paths = sendas.filter((path) => {
    return path.parentDisciplineId === disciplineId;
  });

  sortPaths(paths);

  return paths;
}

function sortPaths(paths) {
  // sort the paths by language
  if (selectedLanguage === "es") {
    paths.sort((a, b) => {
      return a.name_es.localeCompare(b.name_es);
    });
  }
  if (selectedLanguage === "en") {
    paths.sort((a, b) => {
      return a.name_en.localeCompare(b.name_en);
    });
  }

  return paths;
}

function primaryOption(currentPath) {
  const primaryOption = document.createElement("div");
  primaryOption.classList.add("primary-option");

  const primaryOptionLabel = document.createElement("i");
  primaryOptionLabel.classList.add(
    "primary-option-label", 
    "fa-solid",
    "fa-certificate"
  );

  // translations tooltip

  if (selectedLanguage === "es") {
    primaryOptionLabel.title = "Primaria";
  }
  if (selectedLanguage === "en") {
    primaryOptionLabel.title = "Primary";
  }


  primaryOption.addEventListener("click", (e) => {
    const paths = pathsForDiscipline(currentPath.parentDisciplineId);
    e.stopPropagation();
    for (let i = 0; i < paths.length; i++) {
      const currentPath = paths[i];
      currentPath.primary = false;
    }
    currentPath.primary = true;

    saveToLocalStorage();
    populateDisciplinesModal();
  });

  if (currentPath.primary === true) {
    primaryOptionLabel.classList.add("selected");
  } else if (currentPath.primary == false) {
    primaryOptionLabel.classList.remove("selected");
  }

  primaryOption.appendChild(primaryOptionLabel);
  return primaryOption;
}
