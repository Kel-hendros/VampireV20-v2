import { findRatingElement, findRatingDiv } from "./globalFunctions.js";
import { createAllRatingGroups } from "./createRatings.js";
import { saveToLocalStorage } from "./saveLoad.js";

const especialidadPopUp = document.querySelector(".especialidad-popup");

//Funcion para mostrar el pop up de Especialidades
export function showPopUp(currentRatingElement) {
  //Obtener el elemento clickeado
  const ratingDiv = findRatingDiv(currentRatingElement);
  const specialitiesSpan = ratingDiv.querySelector(".specialities");

  //obtener la posicion del elemento clickeado
  const rect = specialitiesSpan.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;

  //poner el pop up en posicion
  especialidadPopUp.style.left = x + -180 + "px";
  especialidadPopUp.style.top = y + 15 + "px";

  populateSpecialitiesList(currentRatingElement);

  //Mostrar el pop up
  especialidadPopUp.classList.add("show");
}

//Funcion para llenar la lista de especialidades
function populateSpecialitiesList(currentRatingElement) {
  //Listar las especialidades del atributo dentro del div .lista-especialidades
  const elementoListaDeEspecialidadesContainer = document.querySelector(
    ".lista-especialidades"
  );

  //limpiar el div de especialidades
  elementoListaDeEspecialidadesContainer.innerHTML = "";

  //limpiar el input de nueva especialidad
  const especialidadInput = document.querySelector(".especialidad-input");
  especialidadInput.value = "";

  //Set attributes to the .agregar-especialidad button
  const elementoAgregarEspecialidad = document.querySelector(
    ".agregar-especialidad"
  );
  elementoAgregarEspecialidad.dataset.id = currentRatingElement.id;
  elementoAgregarEspecialidad.dataset.type = currentRatingElement.type;

  elementoAgregarEspecialidad.removeEventListener("click", addNewSpeciality);
  elementoAgregarEspecialidad.addEventListener("click", addNewSpeciality);

  const elementoLabelSinEspecialidad =
    document.querySelector(".sin-especialidad");

  if (currentRatingElement.specialities.length === 0) {
    elementoLabelSinEspecialidad.classList.add("show");
  } else {
    elementoLabelSinEspecialidad.classList.remove("show");
    for (let i = 0; i < currentRatingElement.specialities.length; i++) {
      const especialidad = currentRatingElement.specialities[i];

      const especialidadDiv = document.createElement("div");
      especialidadDiv.dataset.id = currentRatingElement.id;
      especialidadDiv.classList.add("especialidad");

      const especialidadLabel = document.createElement("label");
      especialidadLabel.setAttribute("for", especialidad.name);
      especialidadLabel.innerText = especialidad.name;
      especialidadLabel.dataset.type = currentRatingElement.type;
      especialidadLabel.dataset.id = currentRatingElement.id;
      especialidadLabel.dataset.speciality = true;

      const elementoBorrarEspecialidad = document.createElement("button");
      elementoBorrarEspecialidad.classList.add("borrar-especialidad");
      elementoBorrarEspecialidad.innerText = "X";

      especialidadDiv.appendChild(elementoBorrarEspecialidad);
      especialidadDiv.appendChild(especialidadLabel);
      elementoListaDeEspecialidadesContainer.appendChild(especialidadDiv);

      //Add EventListener para borrar
      elementoBorrarEspecialidad.removeEventListener(
        "click",
        borrarEspecialidad
      );
      elementoBorrarEspecialidad.addEventListener("click", (event) => {
        borrarEspecialidad(currentRatingElement, especialidad);
      });
    }
  }
  clickCounterEspecialidades = 0;
}

//Funcion para agregar una nueva especialidad
export function addNewSpeciality() {
  //obtener el elemento clickeado
  const botonAgregarEspecialidad = document.querySelector(
    ".agregar-especialidad"
  );
  const ratingId = botonAgregarEspecialidad.dataset.id;
  const ratingType = botonAgregarEspecialidad.dataset.type;

  //obtener el valor del input
  const nuevaEspecialidadText = document.querySelector(".especialidad-input").value;

  //if input is empty, color red the input for a few seconds
  if (nuevaEspecialidadText === "") {
    const especialidadInput = document.querySelector(".especialidad-input");
    especialidadInput.classList.add("error");
    setTimeout(() => {
      especialidadInput.classList.remove("error");
    }, 2000);
    return;
  }

  //find the rating in the attributes array
  const rating = findRatingElement(ratingType, ratingId);

  //add the new speciality to the rating
  rating.specialities.push({
    name: nuevaEspecialidadText,
  });
  //clear the input
    document.querySelector(".especialidad-input").value = "";

  //Redraw the specialities list
  populateSpecialitiesList(rating);

  //Redraw the ratings
  saveToLocalStorage();
  createAllRatingGroups();
}

//cerrar el pop up con el boton .close-popup
const closePopUp = document.querySelector(".close-popup");
closePopUp.addEventListener("click", () => {
  especialidadPopUp.classList.remove("show");
});

let clickCounterEspecialidades = 0;
const popUpEspecialidades = document.querySelector(".especialidad-popup");

//cerrar el pop up haciendo click afuera
document.addEventListener("click", (event) => {
  if (event.target !== popUpEspecialidades) {
    clickCounterEspecialidades++;
    if (clickCounterEspecialidades >= 2) {
      popUpEspecialidades.classList.remove("show");
      clickCounterEspecialidades = 0;
    }
  }
});

// Stop the click event from propagating from the popup to the document
popUpEspecialidades.addEventListener("click", (event) => {
  event.stopPropagation();
});

//Funcion para borrar una especialidad
function borrarEspecialidad(currentRatingElement, especialidad) {
  const specialityName = especialidad.name;

  const index = currentRatingElement.specialities.findIndex(
    (specialty) => specialty.name === specialityName
  );
  if (index !== -1) {
    currentRatingElement.specialities.splice(index, 1);
  }
  //Redraw the specialities list
  populateSpecialitiesList(currentRatingElement);

  //Redraw the ratings
  createAllRatingGroups();
  saveToLocalStorage();
}
