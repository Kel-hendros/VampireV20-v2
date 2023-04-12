import { displayDisciplines} from "./ventajasDisciplines.js";
import  { displayBackgrounds } from "./ventajasBackgrounds.js";
import { displayVirtues } from "./ventajasVirtues.js";
import { displayBloodPool } from "./ventajasBloodpool.js";
import { displayWillpower } from "./ventajasVoluntad.js";
import { displayExperience } from "./ventajasExperiencia.js";


export function initializeVentajas() {
  displayDisciplines();
  displayBackgrounds();
  displayVirtues();
  displayBloodPool();
  displayWillpower();
  displayExperience();
}
