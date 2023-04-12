import { willPower } from "./defaultAttributes.js";
let permanentWillpower;
let temporaryWillpower;


export function displayWillpower() {
  permanentWillpower = willPower.find(
    (element) => element.type === "permanent"
  ).value;

  temporaryWillpower = willPower.find(
    (element) => element.type === "temporary"
  ).value;

  const willPowerContainer = document.querySelector(".voluntad-elements");
  willPowerContainer.innerHTML = "";

  const permanentWillpowerContainer = document.createElement("div");
  permanentWillpowerContainer.classList.add("permanent-willpower-container");

  const temporaryWillpowerContainer = document.createElement("div");
  temporaryWillpowerContainer.classList.add("temporary-willpower-container");

  willPowerContainer.appendChild(permanentWillpowerContainer);
  willPowerContainer.appendChild(temporaryWillpowerContainer);

  createPermanentWillpowerElement(permanentWillpowerContainer);
  createTemporaryWillpowerElement(temporaryWillpowerContainer);
}

function createPermanentWillpowerElement(permanentWillpowerContainer) {
  permanentWillpowerContainer.innerHTML = "";

  const permanentWillpowerElement = document.createElement("div");
  permanentWillpowerElement.classList.add("permanent-willpower-element");
  permanentWillpowerElement.dataset.type = "willpower";
  permanentWillpowerElement.dataset.id = "permanent";

  permanentWillpowerElement.appendChild(createPermanentWillpowerRating());

  permanentWillpowerContainer.appendChild(permanentWillpowerElement);
}

function createPermanentWillpowerRating() {
  const permanentWillpowerRating = document.createElement("div");
  permanentWillpowerRating.classList.add("dots");

  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.type = "willpower";
    dot.dataset.id = 1;
    dot.dataset.index = i;

    if (i < permanentWillpower) {
      dot.classList.add("filled");
    }
    permanentWillpowerRating.appendChild(dot);
  }

  return permanentWillpowerRating;
}

function createTemporaryWillpowerElement(temporaryWillpowerContainer) {
  temporaryWillpowerContainer.innerHTML = "";

  const temporaryWillpowerElement = document.createElement("div");
  temporaryWillpowerElement.classList.add("temporary-willpower-element");
  temporaryWillpowerElement.dataset.type = "willpower";
  temporaryWillpowerElement.dataset.id = "temporary";

  temporaryWillpowerElement.appendChild(createTemporaryWillpowerRating());

  temporaryWillpowerContainer.appendChild(temporaryWillpowerElement);
}

function createTemporaryWillpowerRating() {
  const temporaryWillpowerRating = document.createElement("div");
  temporaryWillpowerRating.classList.add("squares");

    if (temporaryWillpower > permanentWillpower) {
        temporaryWillpower = permanentWillpower;
    }

    for (let i = 0; i < 10; i++) {
        const dot = document.createElement("span");
        dot.classList.add("square-will");
        dot.dataset.type = "willpower";
        dot.dataset.id = 2;
        dot.dataset.index = i;

        if (i < temporaryWillpower) {
            dot.classList.add("filled");
        }
        if (i >= permanentWillpower) {
            dot.classList.add("disabled");
        }

        temporaryWillpowerRating.appendChild(dot);
    }


  return temporaryWillpowerRating;
}
