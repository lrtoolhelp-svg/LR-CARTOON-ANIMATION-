/* =========================================================
   LR CARTOON STUDIO PRO
   MAIN APPLICATION JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
  projectName: "Untitled Project",
  storyTitle: "",
  storyGenre: "Adventure",
  script: "",

  characters: [],
  scenes: [],

  selectedCharacter: null,
  selectedScene: null,

  expression: "😐",
  ageStage: "adult",

  resolution: "1080p",
  format: "16:9",
  quality: "High",

  history: [],
  historyIndex: -1
};


/* =========================================================
   BASIC HELPERS
========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function showPage(pageId) {

  $$(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);

  if (target) {
    target.classList.add("active");
  }

  $$(".nav-item").forEach(item => {
    item.classList.remove("active");

    if (item.dataset.section === pageId) {
      item.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function notify(message) {
  alert(message);
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  $$(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

      const section = button.dataset.section;

      if (section) {
        showPage(section);
      }

    });

  });


  $$("[data-section-link]").forEach(button => {

    button.addEventListener("click", () => {

      const section = button.dataset.sectionLink;

      if (section) {
        showPage(section);
      }

    });

  });

}


/* =========================================================
   PROJECT SYSTEM
========================================================= */

function updateProjectName() {

  const title =
    state.projectName ||
    state.storyTitle ||
    "Untitled Project";

  const element = $("#currentProjectName");

  if (element) {
    element.textContent = title;
  }
}


function updateDashboard() {

  const projectCount = $("#projectCount");
  const characterCount = $("#characterCount");
  const sceneCount = $("#sceneCount");
  const duration = $("#projectDuration");

  if (projectCount) {
    projectCount.textContent =
      state.projectName !== "Untitled Project" ? "1" : "0";
  }

  if (characterCount) {
    characterCount.textContent = state.characters.length;
  }

  if (sceneCount) {
    sceneCount.textContent = state.scenes.length;
  }

  if (duration) {

    const totalSeconds = state.scenes.reduce(
      (sum, scene) => sum + Number(scene.duration || 0),
      0
    );

    const minutes =
      Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0");

    const seconds =
      Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");

    duration.textContent = `${minutes}:${seconds}`;
  }

  const sceneTotal = $("#sceneTotal");

  if (sceneTotal) {
    sceneTotal.textContent = state.scenes.length;
  }
}


function createNewProject() {

  const name = prompt(
    "Enter your project name:",
    "My Cartoon Project"
  );

  if (!name) return;

  state.projectName = name.trim();

  state.storyTitle = "";
  state.script = "";

  state.characters = [];
  state.scenes = [];

  state.selectedCharacter = null;
  state.selectedScene = null;

  updateProjectName();
  updateDashboard();

  renderCharacters();
  renderScenes();

  clearScriptFields();

  saveToBrowser();

  showPage("dashboard");

  notify("New project created successfully.");
}


function setupProjectButtons() {

  const newProjectBtn = $("#newProjectBtn");

  if (newProjectBtn) {
    newProjectBtn.addEventListener(
      "click",
      createNewProject
    );
  }


  const createProjectBtn = $("#createProjectBtn");

 
