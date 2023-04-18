import { findRatingElement, findRatingDiv } from "./globalFunctions.js";
import { updateRatingValue } from "./createRatings.js";
import { setLockEdition, lockEdition } from "./configurations.js";
import { saveToLocalStorage } from "./saveLoad.js";

//Lock edition click event
export function lockEditing() {
  const toggleReadOnlyElements = document.querySelectorAll(".toggle-read-only");
  const lockButton = document.querySelector(".lock");
  //when clicked, check if the edition is locked
  if (lockButton.classList.contains("locked")) {
    //if it is, unlock it
    lockButton.classList.remove("locked");

    toggleReadOnlyElements.forEach((element) => {
      if (element.tagName === "I") {
        element.classList.remove("disabled");
      }
    });

    //unlock the edition
    setLockEdition(false);
  } else {
    //if it is not, lock it
    lockButton.classList.add("locked");
    toggleReadOnlyElements.forEach((element) => {
      if (element.tagName === "I") {
        element.classList.add("disabled");
      }
    });

    //lock the edition
    setLockEdition(true);
  }

  toggleReadOnlyElements.forEach((element) => {
    if (element.tagName === "INPUT") {
      element.readOnly = lockEdition;
    } else if (element.tagName === "SELECT" || element.tagName === "BUTTON") {
      element.disabled = lockEdition;
    }
  });
}

//Edit Ratings Values
export function clickRatingValues() {
  document.addEventListener(
    "click",
    withLockEditionCheck("dot", (e) => {
      if (e.target.classList.contains("dot")) {
        const ratingType = e.target.dataset.type;
        const ratingID = e.target.dataset.id;
        const ratingIndex = parseInt(e.target.dataset.index);
        const clickedDotFilled = e.target.classList.contains("filled");

        console.log("ratingType: " + ratingType);
        console.log("ratingID: " + ratingID);
        console.log("ratingIndex: " + ratingIndex);

        const currentRatingValue = findRatingElement(
          ratingType,
          ratingID
        ).value;

        let newRatingValue;

        if (clickedDotFilled) {
          if (currentRatingValue === ratingIndex + 1) {
            newRatingValue = ratingIndex;
            console.log(
              "current Value = al indice +1, entonces: newRatingValue = ratingIndex"
            );
          } else {
            newRatingValue = ratingIndex + 1;
            console.log(
              "current Value != al indice +1, entonces: newRatingValue = ratingIndex + 1"
            );
          }
        } else {
          newRatingValue = ratingIndex + 1;
          console.log(
            "clickedDotFilled = false, entonces: newRatingValue = ratingIndex + 1"
          );
        }

        //update the value of the rating
        updateRatingValue(ratingType, ratingID, newRatingValue);
      }
    })
  );
}

//Edit Ratings Values
export function clickWillPowerTemporaryValues() {
  document.addEventListener("click", (e) => {
    const clickedElement = e.target;

    if (
      clickedElement.classList.contains("square-will") &&
      !clickedElement.classList.contains("disabled")
    ) {
      const ratingType = e.target.dataset.type;
      const ratingID = e.target.dataset.id;
      const ratingIndex = parseInt(e.target.dataset.index);
      const clickedDotFilled = e.target.classList.contains("filled");

      console.log("ratingType: " + ratingType);
      console.log("ratingID: " + ratingID);
      console.log("ratingIndex: " + ratingIndex);

      const currentRatingValue = findRatingElement(ratingType, ratingID).value;

      let newRatingValue;

      if (clickedDotFilled) {
        if (currentRatingValue === ratingIndex + 1) {
          newRatingValue = ratingIndex;
          console.log(
            "current Value = al indice +1, entonces: newRatingValue = ratingIndex"
          );
        } else {
          newRatingValue = ratingIndex + 1;
          console.log(
            "current Value != al indice +1, entonces: newRatingValue = ratingIndex + 1"
          );
        }
      } else {
        newRatingValue = ratingIndex + 1;
        console.log(
          "clickedDotFilled = false, entonces: newRatingValue = ratingIndex + 1"
        );
      }

      //update the value of the rating
      updateRatingValue(ratingType, ratingID, newRatingValue);
    }
  });
}

export function withLockEditionCheck(className, callback) {
  return function (event) {
    if (!event.target.classList.contains(className)) {
      return;
    }

    //Do not edit if lockEdition is true
    if (lockEdition) {
      const lockButton = document.querySelector(".lock");
      lockButton.classList.add("warning");
      setTimeout(() => {
        lockButton.classList.remove("warning");
      }, 100);

      return;
    }

    callback(event);
  };
}
