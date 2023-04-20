import { configurations } from "./defaultAttributes.js";
import { setLanguage, selectedLanguage } from "./configurations.js";
import { generateAll } from "./globalFunctions.js";

// change language click event
export function changeLanguage() {
  const languageButton = document.querySelector("#languageButton");
  //when clicked, check if the language is spanish or english
  if (languageButton.classList.contains("es")) {
    //if it is spanish, change it to english
    languageButton.classList.remove("es");
    languageButton.classList.add("en");
    languageButton.textContent = "English";
    setLanguage("en");
    generateAll();
  } else if (languageButton.classList.contains("en")) {
    //if it is english, change it to spanish
    languageButton.classList.remove("en");
    languageButton.classList.add("es");
    languageButton.textContent = "Español";
    setLanguage("es");
    generateAll();
    
  }
}

// Localizacion (Español/Ingles)
var translations = {
  en: {
    //Titles
    atributos: "Attributes",
    fisicos: "Physical",
    sociales: "Social",
    mentales: "Mental",
    popupTitle: "Specialities",
    habilidades: "Abilities",
    talentos: "Talents",
    tecnicas: "Skills",
    conocimientos: "Knowledges",
    headertitle: "Vampire: The Masquerade v20 - character sheet",
    ventajas: "Advantages",
    disciplinas: "Disciplines",
    trasfondos: "Backgrounds",
    virtudes: "Virtues",
    meritos: "Merits and Flaws",
    sangre: "Bloodpool",
    voluntad: "Willpower",
    gastarSangre: "Spend Blood",
    restaurarSangre: "Restore Blood",
    sangreRara: "Rare Blood",
    sangreMax: "Max. Blood-points per turn:",
    experiencia: "Experience",
    salud: "Health",

    //Mensajes
    especialidad0: "No specialities",
  },
  es: {
    //Titles
    atributos: "Atributos",
    fisicos: "Físicos",
    sociales: "Sociales",
    mentales: "Mentales",
    popupTitle: "Especialidades",
    especialidad0: "Sin especialidades",
    habilidades: "Habilidades",
    talentos: "Talentos",
    tecnicas: "Técnicas",
    conocimientos: "Conocimientos",
    headertitle: "Vampiro: La Mascarada v20 -  Hoja de personaje",
    ventajas: "Ventajas",
    disciplinas: "Disciplinas",
    trasfondos: "Trasfondos",
    virtudes: "Virtudes",
    meritos: "Méritos y Defectos",
    sangre: "Reserva de Sangre",
    voluntad: "Fuerza de Voluntad",
    gastarSangre: "Gastar Sangre",
    restaurarSangre: "Tomar Sangre",
    sangreRara: "Sangre Rara",
    sangreMax: "Máx. puntos de Sangre por turno:",
    experiencia: "Experiencia",
    salud: "Salud",
  },
};

export function translateAll() {
  //Get the current selected language
  var currentLanguage = selectedLanguage;
  var currentTranslation = translations[currentLanguage];

  //get all elements with ID that starts with "translate-" and translate them
  var elements = document.querySelectorAll("[id^=translate-]");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var id = element.getAttribute("id");
    var idArray = id.split("-");
    var idKey = idArray[1];
    element.innerText = currentTranslation[idKey];
  }
}
