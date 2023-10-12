// post publication date format
window.addEventListener("load", function () {
  const monthMap = {
    "/1/": "JAN",
    "/2/": "FEB",
    "/3/": "MAR",
    "/4/": "APR",
    "/5/": "MAY",
    "/6/": "JUN",
    "/7/": "JUL",
    "/8/": "AUG",
    "/9/": "SEP",
    "/10/": "OCT",
    "/11/": "NOV",
  };

  const allFormatedDates = document.querySelectorAll(".publication-format");

  allFormatedDates.forEach((singleDate) => {
    let singleDateContent = singleDate.textContent;
    const regexPattern = /\/([^\/]+)\//;
    const match = singleDateContent.match(regexPattern);
    const extractedPart = match[0];
    const monthAbbreviation = monthMap[extractedPart] || "DEC";

    singleDate.textContent = singleDateContent.replace(
      extractedPart,
      " " + monthAbbreviation + " "
    );
  });
});

// adding class while switch is on
window.addEventListener("load", function () {
  const allPostsExtra = document.querySelectorAll(".post-extra");

  allPostsExtra.forEach((singleExtra) => {
    if (!singleExtra.classList.contains("w-condition-invisible")) {
      const extraSibling = singleExtra
        .closest(".post-section")
        .querySelector(".post-section-content");
      extraSibling.classList.add("unique");
    }
  });
});

window.addEventListener("load", function () {
  if (!document.body.classList.contains("blog-page")) return;

  const checkboxWrapper = document.querySelector(".checkbox-wrapper");
  const allArticlesCheckbox = document.querySelector(".checkbox-field-all");

  let isAny;
  checkboxWrapper.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName != "LABEL" && target.tagName != "INPUT") return;
    setTimeout(() => {
      const allCheckboxFields = document.querySelectorAll(".checkbox-category");
      const allCheckboxFieldsArray = [...allCheckboxFields];

      const isChecked = (singleCheckbox) =>
        singleCheckbox.classList.contains("fs-cmsfilter_active");

      const wasAnyChecked = allCheckboxFieldsArray.some(isChecked);

      if (wasAnyChecked) {
        if (allArticlesCheckbox.classList.contains("checkbox-active")) {
          allArticlesCheckbox.classList.remove("checkbox-active");
        }
      } else {
        if (!allArticlesCheckbox.classList.contains("checkbox-active")) {
          allArticlesCheckbox.classList.add("checkbox-active");
        }
      }

      if (target.closest(".checkbox-field-all") === allArticlesCheckbox) {
        allCheckboxFieldsArray.forEach((singleCheck) => {
          if (singleCheck.classList.contains("fs-cmsfilter_active"))
            singleCheck.click();
        });

        if (!allArticlesCheckbox.classList.contains("checkbox-active")) {
          allArticlesCheckbox.classList.add("checkbox-active");
        }
      }

      const pageWrapper = document.querySelector(".w-pagination-wrapper");
      const allPages = pageWrapper.querySelectorAll(".w-pagination-next");
      const allPagesArray = [...allPages];
      const pageCount = document.querySelector(".w-page-count");
      const pageCountContent = pageCount.textContent;

      const regex = /\/ (.+)/;

      const regexResults = pageCountContent.match(regex);
      const regexResult = regexResults[1];

      for (let i = 0; i < regexResult; i++) {
        allPagesArray[i].style.display = "flex";
      }
    }, 250);
  });
});

// toggle menu
window.addEventListener("load", function () {
  const sandContainer = document.querySelector(".sand-container");
  const menuToggle = document.querySelector(".menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const toggleImg = document.querySelector(".toggle-img");
  const noToggleImg = document.querySelector(".no-toggle-img");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = navLinks.querySelectorAll(".sand-link");

  sandContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (!target.classList.contains("toggle-icon")) return;

    const wasToggleOpen = target
      .closest(".menu-toggle")
      .classList.contains("w--open");

    if (wasToggleOpen) {
      if (sandContainer.classList.contains("bg-dark")) {
        sandContainer.style.backgroundColor = "#1d1d1d";
        navWrapper.style.borderBottom = "1px solid #343434";
        toggleImg.style.display = "none";
        noToggleImg.style.display = "block";
        navLinksItems.forEach(
          (singleLink) => (singleLink.style.color = "#fff")
        );
      } else {
        sandContainer.style.backgroundColor = "#fce0b0";
        navWrapper.style.borderBottom = "1px solid #e5c896";
      }
    } else {
      sandContainer.style.backgroundColor = "#fce0b0";
      navWrapper.style.borderBottom = "1px solid #fce0b0";
      if (sandContainer.classList.contains("bg-dark")) {
        toggleImg.style.display = "block";
        noToggleImg.style.display = "none";
        navLinksItems.forEach(
          (singleLink) => (singleLink.style.color = "#000")
        );
      }
    }
  });
});
