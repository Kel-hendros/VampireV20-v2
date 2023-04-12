import { experience } from "./defaultAttributes.js";

export function displayExperience() {
    const experienceContainer = document.querySelector(".experiencia-elements");
    experienceContainer.innerHTML = "";

    const currentExperience = experience.find((element) => element.id == 1).value;
    const experienceDiv = document.createElement("div");
    experienceDiv.classList.add("experience-elements-container");

    for (let i = 0; i < 40; i++) {
        const experiencePoint = document.createElement("span");
        experiencePoint.classList.add("dot", "experience-point", "square");
        experiencePoint.dataset.index = i;
        experiencePoint.dataset.id = 1;
        experiencePoint.dataset.type = "experience";

        if (i < currentExperience) {
            experiencePoint.classList.add("experience-point-filled");
        }


        experienceDiv.appendChild(experiencePoint);
    }
    experienceContainer.appendChild(experienceDiv);
    
}