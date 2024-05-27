import { selectedLanguage } from "./configurations.js";
import { primaryInformation, clans, disciplines } from "./defaultAttributes.js";
import { generateAll } from "./globalFunctions.js";
import { saveToLocalStorage } from "./saveLoad.js";

let savedClanId;
let savedClanObject;
let selectedClanObject;
let selectedSect;

//function to define the savedClan variable based on the value clan in the primaryInformation array
function obtainSavedClan() {
  const clanInfo = primaryInformation.find(
    (info) => info.name_es === "Clan:" || info.name_en === "Clan:"
  );
  savedClanId = clanInfo.value;
  console.log("savedClan: ", savedClanId);

  savedClanObject = clans.find((clan) => clan.id === savedClanId);
  console.log("savedClanObject: ", savedClanObject);

  selectedClanObject = savedClanObject;
}

export function openClansModal() {
  obtainSavedClan();

  const clanModalDiv = document.querySelector(".modal.clanes");
  clanModalDiv.classList.add("show");
  populateClansModal();
}

function populateClansModal() {
  const clanModalDiv = document.querySelector(".modal.clanes");
  clanModalDiv.innerHTML = "";

  const clanModalContent = document.createElement("div");
  clanModalContent.classList.add("modal-content");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("clan-detail-container");
  infoDiv.innerHTML = "";

  clanModalDiv.appendChild(clanModalContent);
  clanModalContent.appendChild(modalTitle());
  clanModalContent.appendChild(infoDiv);
  selectedClanInfo(infoDiv);
  clanModalContent.appendChild(clanListsContainer());

  if (savedClanObject) {
    populateClanList(selectedClanObject.group);
  } else {
    populateClanList(1);
  }
  clanModalContent.appendChild(modalButtons());
}

function modalButtons() {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("modal-buttons-container");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");

  const acceptButton = document.createElement("button");
  acceptButton.classList.add("accept-button");

  if (selectedLanguage === "es") {
    acceptButton.innerText = "Aceptar";
    cancelButton.innerText = "Cancelar";
  } else if (selectedLanguage === "en") {
    acceptButton.innerText = "Accept";
    cancelButton.innerText = "Cancel";
  }

  cancelButton.addEventListener("click", () => {
    const clanModalDiv = document.querySelector(".modal.clanes");
    clanModalDiv.classList.remove("show");
  });

  acceptButton.addEventListener("click", () => {
    const clanModalDiv = document.querySelector(".modal.clanes");
    clanModalDiv.classList.remove("show");
    saveClan();
  });

  buttonsContainer.appendChild(acceptButton);
  buttonsContainer.appendChild(cancelButton);

  return buttonsContainer;
}

function saveClan() {
  //update the array primaryInformation with the new value for clan
  const clanInfo = primaryInformation.find(
    (info) => info.name_es === "Clan:" || info.name_en === "Clan:"
  );
  clanInfo.value = selectedClanObject.id;
  console.log("selectedClanObject: ", selectedClanObject);
  console.log("primaryInformation: ", primaryInformation);
  saveToLocalStorage();
  generateAll();
}

function modalTitle() {
  const title = document.createElement("h1");
  if (selectedLanguage === "es") {
    title.innerText = "Seleccionar Clan";
  } else if (selectedLanguage === "en") {
    title.innerText = "Select Clan";
  }
  return title;
}

function selectedClanInfo(clanDetailViewContainer) {
  clanDetailViewContainer.innerHTML = "";

  const clanModalImage = document.createElement("img");
  clanModalImage.classList.add("clan-image");

  const clanInfo = document.createElement("div");
  clanInfo.classList.add("clan-info");
  clanInfo.innerHTML = "";

  const clanNameTitle = document.createElement("h2");
  clanNameTitle.classList.add("clan-name");

  const clanInfoDescriptionContainer = document.createElement("div");
  clanInfoDescriptionContainer.classList.add("clan-description");

  const clanDisciplinesTitle = document.createElement("h4");
  clanDisciplinesTitle.classList.add("clan-disciplines-title");

  const clanDisciplinesList = document.createElement("ul");
  clanDisciplinesList.classList.add("clan-disciplines-list");

  const clanWeakness = document.createElement("p");
  clanWeakness.classList.add("clan-weakness");

  if (selectedClanObject) {

    const clanDiscplines = obtainClanDiscplinesObjects();

    if (selectedLanguage === "es") {
      clanNameTitle.innerText = selectedClanObject.name_es;
      clanWeakness.innerText = selectedClanObject.weakness_es;
      clanDisciplinesTitle.innerText = "Disciplinas del Clan";
      clanDiscplines.forEach((discipline) => {
        const disciplineName = document.createElement("li");
        const discplineLink = document.createElement("a");
        discplineLink.href = discipline.link;
        discplineLink.target = "_blank";
        discplineLink.innerText = discipline.name_es;
        disciplineName.appendChild(discplineLink);
        clanDisciplinesList.appendChild(disciplineName);
        clanWeakness.innerText =
          "Debilidad del Clan: " + selectedClanObject.weakness_es;
      });
    } else if (selectedLanguage === "en") {
      clanNameTitle.innerText = selectedClanObject.name_en;
      clanWeakness.innerText = selectedClanObject.weakness_en;
      clanDisciplinesTitle.innerText = "Clan Disciplines";
      clanDiscplines.forEach((discipline) => {
        const disciplineName = document.createElement("li");
        const discplineLink = document.createElement("a");
        discplineLink.href = discipline.link;
        discplineLink.target = "_blank";
        discplineLink.innerText = discipline.name_en;
        disciplineName.appendChild(discplineLink);
        clanDisciplinesList.appendChild(disciplineName);
        clanWeakness.innerText =
          "Clan Weakness: " + selectedClanObject.weakness_en;
      });
    }
    clanModalImage.src = `images/clanLogos/${selectedClanObject.id}.png`;
    clanInfo.appendChild(clanNameTitle);
    clanInfo.appendChild(clanInfoDescriptionContainer);
    clanInfoDescriptionContainer.appendChild(clanDisciplinesTitle);
    clanInfoDescriptionContainer.appendChild(clanDisciplinesList);
    clanInfoDescriptionContainer.appendChild(clanWeakness);
    clanDetailViewContainer.appendChild(clanInfo);
    clanDetailViewContainer.appendChild(clanModalImage);
  } else {
    console.log("no hay clan");

    clanModalImage.src = "images/clanLogos/default.png";
    clanDetailViewContainer.appendChild(clanModalImage);
  }
}

function clanListsContainer() {
  const clanListsContainer = document.createElement("div");
  clanListsContainer.classList.add("clan-lists-container");
  clanListsContainer.innerHTML = "";

  clanListsContainer.appendChild(clanListButtonsContainer());
  clanListsContainer.appendChild(clanSingleListContainer());
  return clanListsContainer;
}

function clanListButtonsContainer() {
  const clanListButtonsContainer = document.createElement("div");
  clanListButtonsContainer.classList.add("clan-list-buttons-container");
  clanListButtonsContainer.innerHTML = "";
  const sectButtonCamarilla = document.createElement("label");
  sectButtonCamarilla.classList.add("sect-button", "camarilla");
  const sectButtonSabbat = document.createElement("label");
  sectButtonSabbat.classList.add("sect-button", "sabbat");
  const sectButtonIndependent = document.createElement("label");
  sectButtonIndependent.classList.add("sect-button", "independientes");

  console.log("selectedClanObject: ", selectedClanObject);

  if (selectedClanObject) {
    if (selectedClanObject.group < 2) {
      sectButtonCamarilla.classList.add("selected");
    } else if (selectedClanObject.group == 2) {
      sectButtonSabbat.classList.add("selected");
    } else if (selectedClanObject.group == 3) {
      sectButtonIndependent.classList.add("selected");
    }
  } else {
    sectButtonCamarilla.classList.add("selected");
  }

  //add eventListener click to sect all buttons
  sectButtonCamarilla.addEventListener("click", () => {
    sectButtonCamarilla.classList.add("selected");
    sectButtonSabbat.classList.remove("selected");
    sectButtonIndependent.classList.remove("selected");
    selectedSect = 1;
    console.log("camarilla");

    populateClanList(selectedSect);
  });
  sectButtonSabbat.addEventListener("click", () => {
    sectButtonCamarilla.classList.remove("selected");
    sectButtonSabbat.classList.add("selected");
    sectButtonIndependent.classList.remove("selected");
    selectedSect = 2;
    console.log("sabbat");

    populateClanList(selectedSect);
  });
  sectButtonIndependent.addEventListener("click", () => {
    sectButtonCamarilla.classList.remove("selected");
    sectButtonSabbat.classList.remove("selected");
    sectButtonIndependent.classList.add("selected");
    selectedSect = 3;
    console.log("independientes");

    populateClanList(selectedSect);
  });

  if (selectedLanguage === "es") {
    sectButtonCamarilla.innerText = "Camarilla";
    sectButtonSabbat.innerText = "Sabbat";
    sectButtonIndependent.innerText = "Independientes";
  } else if (selectedLanguage === "en") {
    sectButtonCamarilla.innerText = "Camarilla";
    sectButtonSabbat.innerText = "Sabbat";
    sectButtonIndependent.innerText = "Independents";
  }

  clanListButtonsContainer.appendChild(sectButtonCamarilla);
  clanListButtonsContainer.appendChild(sectButtonSabbat);
  clanListButtonsContainer.appendChild(sectButtonIndependent);

  return clanListButtonsContainer;
}

function clanSingleListContainer() {
  const clanSingleListContainer = document.createElement("div");
  clanSingleListContainer.classList.add("clan-single-list-container");
  clanSingleListContainer.innerHTML = "";
  return clanSingleListContainer;
}

function populateClanList(selectedSect) {
  console.log("populateClanList with sect: ", selectedSect);

  //filter the clans array by sect id based on selectedSect
  const filteredClans = clans.filter((clan) => {
    return clan.group === selectedSect;
  });
  console.log("filteredClans: ", filteredClans);

  const listContainer = document.querySelector(".clan-single-list-container");
  listContainer.innerHTML = "";

  const clanList = document.createElement("ul");
  clanList.classList.add("clan-list");
  clanList.innerHTML = "";

  filteredClans.forEach((clan) => {
    const clanListItem = document.createElement("li");
    clanListItem.classList.add("clan-list-item");
    clanListItem.innerHTML = "";
    clanListItem.dataset.clanid = clan.id;

    if (selectedClanObject) {
      if (clanListItem.dataset.clanid == selectedClanObject.id) {
        clanListItem.classList.add("selected");
      }
    }

    if (selectedLanguage === "es") {
      clanListItem.innerText = clan.name_es;
    } else if (selectedLanguage === "en") {
      clanListItem.innerText = clan.name_en;
    }

    clanListItem.addEventListener("click", () => {
      const clickedClan = findClanObject(clanListItem.dataset.clanid);
      const divInfo = document.querySelector(".clan-detail-container");
      selectedClanObject = clickedClan;
      selectedSect = selectedClanObject.group;
      const clanListItems = document.querySelectorAll(".clan-list-item");
      clanListItems.forEach((clanListItem) => {
        clanListItem.classList.remove("selected");
      });
      clanListItem.classList.add("selected");
      selectedClanInfo(divInfo);
      console.log("selectedClanObject: ", selectedClanObject);
    });

    clanList.appendChild(clanListItem);
  });

  listContainer.appendChild(clanList);
}

function findClanObject(selectedClanID) {
  const clanIdNumber = parseInt(selectedClanID, 10);
  const clan = clans.find((clan) => {
    return clan.id === clanIdNumber;
  });
  return clan;
}

function obtainClanDiscplinesObjects() {
  let clanDisciplinesID = selectedClanObject.clan_discplines;
  let clanDisciplines = [];
  clanDisciplinesID.forEach((disciplineID) => {
    let discipline = disciplines.find(
      (discipline) => discipline.id === disciplineID
    );
    clanDisciplines.push(discipline);
  });
  console.log("clanDisciplines: ", clanDisciplines);
  return clanDisciplines;
}
