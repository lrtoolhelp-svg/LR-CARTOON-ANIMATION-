"use strict";

/* =========================================================
   LR CARTOON STUDIO PRO
   COMPLETE MAIN JAVASCRIPT
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
  quality: "High"
};


/* =========================================================
   HELPERS
========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function notify(message) {
  alert(message);
}


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(pageId) {

  $$(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
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


function setupNavigation() {

  $$(".nav-item").forEach(button => {

    button.addEventListener("click", function () {

      const section = this.dataset.section;

      if (section) {
        showPage(section);
      }

    });

  });


  $$("[data-section-link]").forEach(button => {

    button.addEventListener("click", function () {

      const section =
        this.dataset.sectionLink;

      if (section) {
        showPage(section);
      }

    });

  });

}


/* =========================================================
   PROJECT
========================================================= */

function updateProjectName() {

  const element =
    $("#currentProjectName");

  if (!element) return;

  element.textContent =
    state.projectName ||
    "Untitled Project";
}


function updateDashboard() {

  const projectCount =
    $("#projectCount");

  const characterCount =
    $("#characterCount");

  const sceneCount =
    $("#sceneCount");

  const duration =
    $("#projectDuration");

  const sceneTotal =
    $("#sceneTotal");


  if (projectCount) {

    projectCount.textContent =
      state.projectName !==
      "Untitled Project"
        ? "1"
        : "0";

  }


  if (characterCount) {

    characterCount.textContent =
      state.characters.length;

  }


  if (sceneCount) {

    sceneCount.textContent =
      state.scenes.length;

  }


  if (sceneTotal) {

    sceneTotal.textContent =
      state.scenes.length;

  }


  if (duration) {

    const totalSeconds =
      state.scenes.reduce(
        (total, scene) =>
          total +
          Number(scene.duration || 0),
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

    duration.textContent =
      `${minutes}:${seconds}`;

  }

}


/* =========================================================
   NEW PROJECT
========================================================= */

function createNewProject() {

  const name =
    prompt(
      "Enter your project name:",
      "My Cartoon Project"
    );

  if (!name || !name.trim()) {
    return;
  }

  state.projectName =
    name.trim();

  state.storyTitle = "";

  state.storyGenre =
    "Adventure";

  state.script = "";

  state.characters = [];

  state.scenes = [];

  state.selectedCharacter =
    null;

  state.selectedScene =
    null;


  updateProjectName();

  updateDashboard();

  renderCharacters();

  renderScenes();

  clearScriptFields();

  saveToBrowser();

  showPage("dashboard");

  notify(
    "New project created successfully!"
  );

}


/* =========================================================
   PROJECT BUTTONS
========================================================= */

function setupProjectButtons() {

  const newProjectBtn =
    $("#newProjectBtn");

  if (newProjectBtn) {

    newProjectBtn.addEventListener(
      "click",
      createNewProject
    );

  }


  const createProjectBtn =
    $("#createProjectBtn");

  if (createProjectBtn) {

    createProjectBtn.addEventListener(
      "click",
      createNewProject
    );

  }


  const saveProjectBtn =
    $("#saveProjectBtn");

  if (saveProjectBtn) {

    saveProjectBtn.addEventListener(
      "click",
      function () {

        saveToBrowser();

        notify(
          "Project saved successfully!"
        );

      }
    );

  }


  const loadProjectBtn =
    $("#loadProjectBtn");

  if (loadProjectBtn) {

    loadProjectBtn.addEventListener(
      "click",
      loadFromBrowser
    );

  }

}


/* =========================================================
   CHARACTER SYSTEM
========================================================= */

function addCharacter() {

  let input =
    $("#characterName");

  let name =
    input
      ? input.value.trim()
      : "";


  if (!name) {

    name =
      prompt(
        "Enter character name:",
        "Arif"
      );

  }


  if (!name || !name.trim()) {
    return;
  }


  const character = {

    id:
      Date.now(),

    name:
      name.trim(),

    age:
      state.ageStage,

    expression:
      state.expression,

    avatar:
      "👤"

  };


  state.characters.push(
    character
  );

  state.selectedCharacter =
    character.id;


  if (input) {
    input.value = "";
  }


  renderCharacters();

  updateDashboard();

  saveToBrowser();


  notify(
    `${character.name} added successfully!`
  );

}


/* =========================================================
   CHARACTER RENDER
========================================================= */

function renderCharacters() {

  const possibleContainers = [
    "#characterList",
    "#charactersList",
    "#characterContainer"
  ];

  let container = null;


  for (
    const selector
    of possibleContainers
  ) {

    const element =
      $(selector);

    if (element) {

      container =
        element;

      break;

    }

  }


  if (!container) {
    return;
  }


  container.innerHTML = "";


  if (
    state.characters.length === 0
  ) {

    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:40px;">👤</div>
        <p>No characters yet.</p>
        <p>Add your first character.</p>
      </div>
    `;

    return;

  }


  state.characters.forEach(
    character => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "character-card";


      card.innerHTML = `
        <div style="font-size:42px;">
          ${character.avatar}
        </div>

        <div>
          <strong>
            ${escapeHTML(
              character.name
            )}
          </strong>

          <div>
            Age:
            ${escapeHTML(
              character.age
            )}
          </div>

          <div>
            Expression:
            ${character.expression}
          </div>
        </div>

        <button
          type="button"
          class="delete-character"
          data-id="${character.id}">
          Delete
        </button>
      `;


      card.addEventListener(
        "click",
        function (event) {

          if (
            event.target.closest(
              ".delete-character"
            )
          ) {
            return;
          }

          selectCharacter(
            character.id
          );

        }
      );


      const deleteButton =
        card.querySelector(
          ".delete-character"
        );


      if (deleteButton) {

        deleteButton.addEventListener(
          "click",
          function (event) {

            event.stopPropagation();

            deleteCharacter(
              character.id
            );

          }
        );

      }


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   SELECT CHARACTER
========================================================= */

function selectCharacter(id) {

  const character =
    state.characters.find(
      item =>
        item.id === id
    );


  if (!character) {
    return;
  }


  state.selectedCharacter =
    id;

  state.expression =
    character.expression;

  state.ageStage =
    character.age;


  renderCharacters();

}


/* =========================================================
   DELETE CHARACTER
========================================================= */

function deleteCharacter(id) {

  const character =
    state.characters.find(
      item =>
        item.id === id
    );


  if (!character) {
    return;
  }


  const confirmed =
    confirm(
      `Delete ${character.name}?`
    );


  if (!confirmed) {
    return;
  }


  state.characters =
    state.characters.filter(
      item =>
        item.id !== id
    );


  if (
    state.selectedCharacter === id
  ) {

    state.selectedCharacter =
      null;

  }


  renderCharacters();

  updateDashboard();

  saveToBrowser();

}


/* =========================================================
   CHARACTER CONTROLS
========================================================= */

function setupCharacterControls() {

  const addButtons = [
    "#addCharacterBtn",
    "#createCharacterBtn",
    "#characterAddBtn"
  ];


  addButtons.forEach(
    selector => {

      const button =
        $(selector);

      if (button) {

        button.addEventListener(
          "click",
          addCharacter
        );

      }

    }
  );


  $$("[data-expression]").forEach(
    button => {

      button.addEventListener(
        "click",
        function () {

          state.expression =
            this.dataset.expression;


          if (
            state.selectedCharacter
          ) {

            const character =
              state.characters.find(
                item =>
                  item.id ===
                  state.selectedCharacter
              );


            if (character) {

              character.expression =
                state.expression;

              renderCharacters();

              saveToBrowser();

            }

          }

        }
      );

    }
  );


  $$("[data-age]").forEach(
    button => {

      button.addEventListener(
        "click",
        function () {

          state.ageStage =
            this.dataset.age;


          if (
            state.selectedCharacter
          ) {

            const character =
              state.characters.find(
                item =>
                  item.id ===
                  state.selectedCharacter
              );


            if (character) {

              character.age =
                state.ageStage;

              renderCharacters();

              saveToBrowser();

            }

          }

        }
      );

    }
  );

}


/* =========================================================
   SCENE SYSTEM
========================================================= */

function addScene() {

  const scene = {

    id:
      Date.now(),

    title:
      `Scene ${state.scenes.length + 1}`,

    description:
      "New cartoon scene",

    duration:
      5,

    background:
      "🌳",

    characterIds:
      []

  };


  state.scenes.push(
    scene
  );

  state.selectedScene =
    scene.id;


  renderScenes();

  updateDashboard();

  saveToBrowser();


  notify(
    `${scene.title} created!`
  );

}


/* =========================================================
   SCENE RENDER
========================================================= */

function renderScenes() {

  const possibleContainers = [
    "#sceneList",
    "#scenesList",
    "#sceneContainer"
  ];


  let container = null;


  for (
    const selector
    of possibleContainers
  ) {

    const element =
      $(selector);

    if (element) {

      container =
        element;

      break;

    }

  }


  if (!container) {
    return;
  }


  container.innerHTML = "";


  if (
    state.scenes.length === 0
  ) {

    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:40px;">🎬</div>
        <p>No scenes yet.</p>
        <p>Add your first scene.</p>
      </div>
    `;

    return;

  }


  state.scenes.forEach(
    scene => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "scene-card";


      card.innerHTML = `
        <div style="font-size:40px;">
          ${scene.background}
        </div>

        <div>
          <strong>
            ${escapeHTML(
              scene.title
            )}
          </strong>

          <p>
            ${escapeHTML(
              scene.description
            )}
          </p>

          <small>
            Duration:
            ${scene.duration}s
          </small>
        </div>

        <button
          type="button"
          class="delete-scene">
          Delete
        </button>
      `;


      card.addEventListener(
        "click",
        function (event) {

          if (
            event.target.closest(
              ".delete-scene"
            )
          ) {
            return;
          }

          selectScene(
            scene.id
          );

        }
      );


      const deleteButton =
        card.querySelector(
          ".delete-scene"
        );


      if (deleteButton) {

        deleteButton.addEventListener(
          "click",
          function (event) {

            event.stopPropagation();

            deleteScene(
              scene.id
            );

          }
        );

      }


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   SELECT SCENE
========================================================= */

function selectScene(id) {

  const scene =
    state.scenes.find(
      item =>
        item.id === id
    );


  if (!scene) {
    return;
  }


  state.selectedScene =
    id;


  renderScenes();

}


/* =========================================================
   DELETE SCENE
========================================================= */

function deleteScene(id) {

  const confirmed =
    confirm(
      "Delete this scene?"
    );


  if (!confirmed) {
    return;
  }


  state.scenes =
    state.scenes.filter(
      scene =>
        scene.id !== id
    );


  if (
    state.selectedScene === id
  ) {

    state.selectedScene =
      null;

  }


  renderScenes();

  updateDashboard();

  saveToBrowser();

}


/* =========================================================
   SCENE BUTTONS
========================================================= */

function setupSceneControls() {

  const buttons = [
    "#addSceneBtn",
    "#createSceneBtn",
    "#sceneAddBtn"
  ];


  buttons.forEach(
    selector => {

      const button =
        $(selector);

      if (button) {

        button.addEventListener(
          "click",
          addScene
        );

      }

    }
  );

}


/* =========================================================
   SCRIPT SYSTEM
========================================================= */

function setupScriptSystem() {

  const scriptInput =
    $("#scriptInput") ||
    $("#storyScript") ||
    $("#script");


  if (scriptInput) {

    scriptInput.addEventListener(
      "input",
      function () {

        state.script =
          this.value;

        saveToBrowser();

      }
    );

  }


  const titleInput =
    $("#storyTitle");


  if (titleInput) {

    titleInput.addEventListener(
      "input",
      function () {

        state.storyTitle =
          this.value;

        updateProjectName();

        saveToBrowser();

      }
    );

  }


  const genreInput =
    $("#storyGenre");


  if (genreInput) {

    genreInput.addEventListener(
      "change",
      function () {

        state.storyGenre =
          this.value;

        saveToBrowser();

      }
    );

  }

}


/* =========================================================
   CLEAR SCRIPT
========================================================= */

function clearScriptFields() {

  const fields = [
    "#scriptInput",
    "#storyScript",
    "#script",
    "#storyTitle"
  ];


  fields.forEach(
    selector => {

      const field =
        $(selector);

      if (field) {
        field.value = "";
      }

    }
  );

}


/* =========================================================
   SAVE
========================================================= */

function saveToBrowser() {

  try {

    localStorage.setItem(
      "lrCartoonStudioProject",
      JSON.stringify(state)
    );

    return true;

  } catch (error) {

    console.error(
      "Save error:",
      error
    );

    return false;

  }

}


/* =========================================================
   LOAD
========================================================= */

function loadFromBrowser() {

  try {

    const saved =
      localStorage.getItem(
        "lrCartoonStudioProject"
      );


    if (!saved) {

      notify(
        "No saved project found."
      );

      return;

    }


    const data =
      JSON.parse(saved);


    Object.assign(
      state,
      data
    );


    updateProjectName();

    updateDashboard();

    renderCharacters();

    renderScenes();

    restoreScriptFields();


    notify(
      "Project loaded successfully!"
    );

  } catch (error) {

    console.error(
      "Load error:",
      error
    );

    notify(
      "Could not load project."
    );

  }

}


/* =========================================================
   RESTORE FIELDS
========================================================= */

function restoreScriptFields() {

  const scriptInput =
    $("#scriptInput") ||
    $("#storyScript") ||
    $("#script");


  if (scriptInput) {

    scriptInput.value =
      state.script || "";

  }


  const titleInput =
    $("#storyTitle");


  if (titleInput) {

    titleInput.value =
      state.storyTitle || "";

  }


  const genreInput =
    $("#storyGenre");


  if (genreInput) {

    genreInput.value =
      state.storyGenre ||
      "Adventure";

  }

}


/* =========================================================
   EXPORT PROJECT
========================================================= */

function exportProject() {

  const data =
    JSON.stringify(
      state,
      null,
      2
    );


  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    "LR-Cartoon-Project.json";


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();

  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   EXPORT BUTTON
========================================================= */

function setupExportButton() {

  const buttons = [
    "#exportBtn",
    "#exportProjectBtn",
    "#downloadProjectBtn"
  ];


  buttons.forEach(
    selector => {

      const button =
        $(selector);

      if (button) {

        button.addEventListener(
          "click",
          exportProject
        );

      }

    }
  );

}


/* =========================================================
   RESET
========================================================= */

function resetProject() {

  const confirmed =
    confirm(
      "Are you sure you want to reset the project?"
    );


  if (!confirmed) {
    return;
  }


  localStorage.removeItem(
    "lrCartoonStudioProject"
  );


  state.projectName =
    "Untitled Project";

  state.storyTitle =
    "";

  state.storyGenre =
    "Adventure";

  state.script =
    "";

  state.characters =
    [];

  state.scenes =
    [];

  state.selectedCharacter =
    null;

  state.selectedScene =
    null;


  updateProjectName();

  updateDashboard();

  renderCharacters();

  renderScenes();

  clearScriptFields();


  notify(
    "Project reset successfully!"
  );

}


/* =========================================================
   RESET BUTTON
========================================================= */

function setupResetButton() {

  const buttons = [
    "#resetBtn",
    "#resetProjectBtn"
  ];


  buttons.forEach(
    selector => {

      const button =
        $(selector);

      if (button) {

        button.addEventListener(
          "click",
          resetProject
        );

      }

    }
  );

}


/* =========================================================
   PREVIEW
========================================================= */

function previewProject() {

  notify(
    "LR CARTOON STUDIO PRO\n\n" +
    "Preview system is working!\n\n" +
    "Characters: " +
    state.characters.length +
    "\nScenes: " +
    state.scenes.length
  );

}


/* =========================================================
   PREVIEW BUTTON
========================================================= */

function setupPreviewButton() {

  const buttons = [
    "#previewBtn",
    "#previewProjectBtn",
    "#playBtn"
  ];


  buttons.forEach(
    selector => {

      const button =
        $(selector);

      if (button) {

        button.addEventListener(
          "click",
          previewProject
        );

      }

    }
  );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   AUTO LOAD
========================================================= */

function autoLoadProject() {

  try {

    const saved =
      localStorage.getItem(
        "lrCartoonStudioProject"
      );


    if (!saved) {
      return;
    }


    const data =
      JSON.parse(saved);


    Object.assign(
      state,
      data
    );

  } catch (error) {

    console.error(
      "Auto-load error:",
      error
    );

  }

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeApp() {

  console.log(
    "LR CARTOON STUDIO PRO started successfully."
  );


  autoLoadProject();

  setupNavigation();

  setupProjectButtons();

  setupCharacterControls();

  setupSceneControls();

  setupScriptSystem();

  setupExportButton();

  setupResetButton();

  setupPreviewButton();


  updateProjectName();

  updateDashboard();

  renderCharacters();

  renderScenes();

  restoreScriptFields();

}


/* =========================================================
   START
========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );

} else {

  initializeApp();

}
