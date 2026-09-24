document.addEventListener("DOMContentLoaded", function () {

    // PAGE NAVIGATION
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    navItems.forEach(function (item) {
        item.addEventListener("click", function () {

            const target = item.getAttribute("data-section");

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            pages.forEach(function (page) {
                page.classList.remove("active");
            });

            item.classList.add("active");

            const targetPage = document.getElementById(target);

            if (targetPage) {
                targetPage.classList.add("active");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });


    // START CREATING
    const startButton = document.querySelector("#startProjectBtn");

    if (startButton) {
        startButton.addEventListener("click", function () {

            const scriptNav =
                document.querySelector('[data-section="script"]');

            if (scriptNav) {
                scriptNav.click();
            }
        });
    }


    // NEW PROJECT
    const newProjectButton =
        document.querySelector("#newProjectBtn");

    if (newProjectButton) {
        newProjectButton.addEventListener("click", function () {

            const confirmNew =
                confirm("Start a new project?");

            if (!confirmNew) return;

            const title =
                document.querySelector("#storyTitle");

            const script =
                document.querySelector("#scriptBox");

            if (title) title.value = "";
            if (script) script.value = "";

            localStorage.removeItem("lrCartoonProject");

            alert("New project started!");
        });
    }


    // SAVE SCRIPT
    const saveScriptButton =
        document.querySelector("#saveScriptBtn");

    if (saveScriptButton) {
        saveScriptButton.addEventListener("click", function () {

            const title =
                document.querySelector("#storyTitle");

            const script =
                document.querySelector("#scriptBox");

            const project = {
                title: title ? title.value : "",
                script: script ? script.value : "",
                savedAt: new Date().toISOString()
            };

            localStorage.setItem(
                "lrCartoonProject",
                JSON.stringify(project)
            );

            alert("Script saved successfully!");
        });
    }


    // LOAD SAVED SCRIPT
    const savedProject =
        localStorage.getItem("lrCartoonProject");

    if (savedProject) {
        try {

            const project =
                JSON.parse(savedProject);

            const title =
                document.querySelector("#storyTitle");

            const script =
                document.querySelector("#scriptBox");

            if (title && project.title) {
                title.value = project.title;
            }

            if (script && project.script) {
                script.value = project.script;
            }

        } catch (error) {
            console.log("Saved project could not be loaded.");
        }
    }


    // CLEAR SCRIPT
    const clearScriptButton =
        document.querySelector("#clearScriptBtn");

    if (clearScriptButton) {
        clearScriptButton.addEventListener("click", function () {

            const title =
                document.querySelector("#storyTitle");

            const script =
                document.querySelector("#scriptBox");

            if (title) title.value = "";
            if (script) script.value = "";
        });
    }


    // LANGUAGE BUTTON
    const languageButton =
        document.querySelector("#languageBtn");

    if (languageButton) {
        languageButton.addEventListener("click", function () {

            alert(
                "Languages: Bengali | English | Hindi | Arabic"
            );
        });
    }


    console.log("LR Cartoon Studio Pro loaded successfully.");

});
