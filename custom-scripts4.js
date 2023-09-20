window.addEventListener("load", function () {
  // hiding Next/Previous text on buttons
  const sliderBtn = document.querySelectorAll(".sldr_arr button");
  let sliderBtnArr = [...sliderBtn];
  sliderBtnArr = sliderBtnArr.map((button) => (button.textContent = ""));

  // timeline content
  const timelineWrapper = document.querySelector("#timeline-wrapper");
  const allTimelineBodies = document.querySelectorAll(".timeline-item-body");

  if (!document.body.classList.contains("about-page")) return;

  allTimelineBodies.forEach(
    (singleBody) => (singleBody.style.display = "none")
  );

  timelineWrapper.addEventListener("click", function (event) {
    const target = event.target;

    const allowedClasses = ["timeline-dot", "dot-inner", "timeline-dot-text"];

    if (
      !allowedClasses.some((allowedClass) =>
        target.classList.contains(allowedClass)
      )
    )
      return;

    const closestDot = target.closest(".timeline-dot");
    const closestDotParent = closestDot.closest(".timeline-item");
    const closestDotText = closestDotParent.querySelector(".timeline-dot-text");

    closestDotParent.classList.toggle("dot-pressed");
    if (closestDotParent.classList.contains("dot-pressed")) {
      closestDotText.textContent =
        closestDotParent.getAttribute("data-timeline-item");
    } else {
      closestDotText.textContent = "";
    }
  });
});

// post publication date format
window.addEventListener("load", function () {
  const monthMap = {
    "/1/": "STY",
    "/2/": "LUT",
    "/3/": "MAR",
    "/4/": "KWI",
    "/5/": "MAJ",
    "/6/": "CZE",
    "/7/": "LIP",
    "/8/": "SIE",
    "/9/": "WRZ",
    "/10/": "PAŹ",
    "/11/": "LIS",
  };

  const allFormatedDates = document.querySelectorAll(".publication-format");

  allFormatedDates.forEach((singleDate) => {
    let singleDateContent = singleDate.textContent;
    const regexPattern = /\/([^\/]+)\//;
    const match = singleDateContent.match(regexPattern);
    const extractedPart = match[0];
    const monthAbbreviation = monthMap[extractedPart] || "GRU";

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

// progression bar
//   window.addEventListener("load", function () {
//     if (!document.body.classList.contains("post-body")) return;

//     const postProgressFill = document.querySelector(".post-progress-fill");

//     const pageHeight = document.documentElement.scrollHeight;

//     window.addEventListener("scroll", function () {
//       let scrollPosition = window.scrollY || window.pageYOffset;
//       let heightValue = "0%";

//       if (scrollPosition <= 0.2 * pageHeight) {
//         heightValue = "10%";
//       } else if (scrollPosition <= 0.3 * pageHeight) {
//         heightValue = "20%";
//       } else if (scrollPosition <= 0.4 * pageHeight) {
//         heightValue = "30%";
//       } else if (scrollPosition <= 0.5 * pageHeight) {
//         heightValue = "40%";
//       } else if (scrollPosition <= 0.6 * pageHeight) {
//         heightValue = "50%";
//       } else if (scrollPosition <= 0.7 * pageHeight) {
//         heightValue = "60%";
//       } else if (scrollPosition <= 0.8 * pageHeight) {
//         heightValue = "70%";
//       } else if (scrollPosition <= 0.9 * pageHeight) {
//         heightValue = "80%";
//       } else if (scrollPosition > 0.9 * pageHeight) {
//         heightValue = "90%";
//       } else {
//         heightValue = "0%";
//       }

//       postProgressFill.style.height = heightValue;
//     });
//   });

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

//static slide at the end of blog posts loop in homepage
window.addEventListener("load", function () {
  if (!document.body.classList.contains("home-page")) return;

  setTimeout(() => {
    //   const slickTrack = document.querySelector(".post-slider-main .slick-track");
    const staticLast = document.querySelector(".post-slider-main .static-last");

    const staticSlide = document.querySelector(".static-slide");
    staticLast.appendChild(staticSlide);
  }, 200);
});
