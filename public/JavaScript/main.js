import { initializeHealth } from "./salud.js";
import { save, load, loadFromLocalStorage } from "./saveLoad.js";
import { lockEditing, clickRatingValues, clickWillPowerTemporaryValues } from "./editCharacter.js";
import { initializeConfigurations } from "./configurations.js";
import { changeLanguage } from "./translations.js";
import { initializeVentajas } from "./ventajasSection.js";
import { openDiscplinesModal } from "./ventajasDisciplines.js";
import { spendBlood, restoreBlood, restoreRareBlood1, restoreRareBlood2 } from "./ventajasBloodpool.js";


//Save and load event listeners
const saveButton = document.querySelector(".save");
saveButton.addEventListener("click", save);
const loadButton = document.querySelector(".load");
loadButton.addEventListener("click", load);

//Lock edition event listener
const lockButton = document.querySelector("#lockButton");
lockButton.addEventListener("click", lockEditing);
//Language event listener
const languageButton = document.querySelector("#languageButton");
languageButton.addEventListener("click", changeLanguage);

//Gastar y restaurar sangre
const gastarSangre = document.querySelector(".spend-blood");
gastarSangre.addEventListener("click", spendBlood);
const restaurarSangre = document.querySelector(".restore-blood");
restaurarSangre.addEventListener("click", restoreBlood);
const sangreRara1 = document.querySelector(".rare-blood1");
sangreRara1.addEventListener("click", restoreRareBlood1);
const sangreRara2 = document.querySelector(".rare-blood2");
sangreRara2.addEventListener("click", restoreRareBlood2);


loadFromLocalStorage();

initializeVentajas();
initializeHealth();

initializeConfigurations();


//Allow to click on the dots
 clickRatingValues();
 clickWillPowerTemporaryValues();
