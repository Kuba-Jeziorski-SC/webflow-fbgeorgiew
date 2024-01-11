// wf-fbg-scripts2.js

// adding custom arrows to post-loop-slider
(function () {
  if (
    !document.body.classList.contains("post-body") &&
    !document.body.classList.contains("home-page")
  )
    return;
  const postSliderParent = document.querySelector(".post-slider-parent");
  const postLoopSlider = document.querySelector(".post-loop-slider");
  const newSldrArr = document.createElement("div");
  newSldrArr.className = "slider-arrows sldr_arr3";
  postSliderParent.insertBefore(newSldrArr, postLoopSlider);
})();

// adding static slide to slider
(function () {
  if (!document.body.classList.contains("home-page")) return;

  const postLoopSlider = document.querySelector(".post-loop-slider");
  const staticSlide = document.querySelector(".static-slide");

  postLoopSlider.appendChild(staticSlide);
})();

// setting offset to 0 while entering post-body page
(function () {
  if (!document.body.classList.contains("post-body")) return;

  const pageLink = window.location.href;
  if (!pageLink.includes("#")) window.scrollTo(0, 0);
})();

// sliders
jQuery(document).ready(function () {
  jQuery(".slider").each(function () {
    const slider = jQuery(this);
    slider.slick({
      infinite: false,
      slidesToShow: 4,
      speed: 500,
      slidesToScroll: 1,
      draggable: true,
      autoplay: false,
      autoplaySpeed: 2000,
      cssEase: "linear",
      fade: false,
      pauseOnHover: true,
      appendArrows: $(this).parents(".slider-wrapper").find(".sldr_arr"),
      lazyLoad: "ondemand",
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3 } },
        { breakpoint: 481, settings: { slidesToShow: 2 } },
      ],
    });
  });

  jQuery(".slider-nav").slick({
    infinite: false,
    slidesToShow: 1,
    speed: 300,
    slidesToScroll: 1,
    draggable: false,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
    fade: true,
    arrows: false,
    asNavFor: ".slider-for",
  });

  jQuery(".slider-for").slick({
    infinite: false,
    slidesToShow: 4,
    arrows: true,
    speed: 300,
    slidesToScroll: 1,
    draggable: true,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
    fade: false,
    appendArrows: jQuery(".slider-for")
      .parents(".slider-for-wrapper")
      .find(".sldr_arr2"),
    focusOnSelect: true,
    asNavFor: ".slider-nav",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 651, settings: { slidesToShow: 2 } },
      { breakpoint: 551, settings: { slidesToShow: 1 } },
    ],
  });

  jQuery(".post-loop-slider").slick({
    infinite: false,
    slidesToShow: 3,
    speed: 300,
    slidesToScroll: 1,
    draggable: true,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
    fade: false,
    arrows: true,
    appendArrows: jQuery(".post-loop-slider")
      .parents(".post-slider-parent")
      .find(".sldr_arr3"),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 881, settings: { slidesToShow: 1 } },
    ],
  });
});

// adding next button + append newsletter in loop
window.addEventListener("load", function () {
  if (!document.body.classList.contains("blog-page")) return;

  const paginationWrapper = document.querySelector(".w-pagination-wrapper");

  const nextButton = document.querySelector(".next-button");
  nextButton.classList.add("w-pagination-next");
  paginationWrapper.appendChild(nextButton);
  nextButton.setAttribute("href", "?293902f8_page=2");

  let allBlogSlides = document.querySelectorAll(".blog-slide");
  let allBlogSlidesArr = [...allBlogSlides];
  allBlogSlidesArr.map((singleSlideItem, singleSlideIndex) => {
    if (singleSlideIndex <= 3) singleSlideItem.style.order = "-2";
  });

  const blogSlideWrapper = document.querySelector(".blog-slide-wrapper");
  const appendNewsletter = document.querySelector(".append-newsletter");
  blogSlideWrapper.appendChild(appendNewsletter);

  window.addEventListener(
    "click",
    function (event) {
      const target = event.target;

      const allowedClasses = [
        "w-checkbox",
        "w-pagination-next",
        "w-pagination-previous",
        "w-form-label",
      ];
      //'w-checkbox-input'
      if (
        !allowedClasses.some((allowedClass) =>
          target.classList.contains(allowedClass)
        )
      )
        return;

      const allPages = document.querySelectorAll(".w-pagination-next");
      const allPagesArray = [...allPages];

      setTimeout(() => {
        if (
          (target.tagName === "SPAN" &&
            target.getAttribute("fs-cmsfilter-field") === "Category") ||
          target.tagName === "A"
        ) {
          appendNewsletter.classList.add("newsletter-append-order");
        } else {
          if (appendNewsletter.classList.contains("newsletter-append-order")) {
            appendNewsletter.classList.remove("newsletter-append-order");
          }
        }

        const maxPage = paginationWrapper.querySelector(".w-page-count");

        const maxPageRegex = /\/\s*(\d+)/;
        const maxPageMatch = maxPage.textContent.match(maxPageRegex);
        const updatedLastPage = maxPageMatch[1];

        const currentPage = allPagesArray.find((cur) =>
          cur.classList.contains("w--current")
        );

        const currentText = currentPage.textContent;
        const currentTextNum = +currentText;

        nextButton.setAttribute("href", `?293902f8_page=${currentTextNum + 1}`);

        if (currentPage.textContent === updatedLastPage) {
          nextButton.classList.add("next-hidden");
        } else {
          if (nextButton.classList.contains("next-hidden"))
            nextButton.classList.remove("next-hidden");
        }
      }, 200);
    },
    false
  );
});

// progress bar
window.addEventListener("load", function () {
  if (!document.body.classList.contains("post-body")) return;

  const postProgressFill = document.querySelector(".post-progress-fill");
  const pageHeight = document.documentElement.scrollHeight;

  function throttle(func, delay) {
    let timeoutId;
    return function () {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          func();
          timeoutId = null;
        }, delay);
      }
    };
  }

  const progressFunction = function () {
    let scrollPosition = window.scrollY || window.pageYOffset;
    let heightValue = "0%";

    if (scrollPosition <= 0.2 * pageHeight) {
      heightValue = "10%";
    } else if (scrollPosition <= 0.3 * pageHeight) {
      heightValue = "20%";
    } else if (scrollPosition <= 0.4 * pageHeight) {
      heightValue = "30%";
    } else if (scrollPosition <= 0.5 * pageHeight) {
      heightValue = "40%";
    } else if (scrollPosition <= 0.6 * pageHeight) {
      heightValue = "50%";
    } else if (scrollPosition <= 0.7 * pageHeight) {
      heightValue = "60%";
    } else if (scrollPosition <= 0.8 * pageHeight) {
      heightValue = "70%";
    } else if (scrollPosition <= 0.9 * pageHeight) {
      heightValue = "80%";
    } else if (scrollPosition > 0.9 * pageHeight) {
      heightValue = "90%";
    } else {
      heightValue = "0%";
    }

    postProgressFill.style.height = heightValue;
  };

  const throttledScroll = throttle(progressFunction, 1000);
  window.addEventListener("scroll", throttledScroll);
});

// hiding/showing extra text in contact-form textarea
window.addEventListener("load", function () {
  if (!document.body.classList.contains("contact-body")) return;

  const contactTextarea = document.querySelector("#contact-textarea");
  const textareaFill = document.querySelector("#textarea-fill");

  contactTextarea.addEventListener("change", function () {
    if (contactTextarea.value !== "") {
      //textareaFill.style.display = 'none';
      textareaFill.classList.add("display-none");
    } else {
      //textareaFill.style.display = 'block';
      textareaFill.classList.remove("display-none");
    }
  });
});

// setting next/prev post automatically
window.addEventListener("load", function () {
  if (!document.body.classList.contains("post-body")) return;

  const previousButton = document.querySelector(".post-previous");
  const nextButton = document.querySelector(".post-next");

  const allBlogPosts = document.querySelectorAll(".all-posts .w-dyn-item a");
  const allBlogPostsArray = [...allBlogPosts];

  const isCurrent = (singlePost) => singlePost.classList.contains("w--current");

  const currentPostIndex = allBlogPostsArray.findIndex(isCurrent);

  let previousPostLink;
  let nextPostLink;

  if (currentPostIndex === allBlogPostsArray.length - 1) {
    previousPostLink = allBlogPostsArray[currentPostIndex - 1].href;
    nextButton.style.display = "none";
    previousButton.href = previousPostLink;
  } else if (currentPostIndex === 0) {
    nextPostLink = allBlogPostsArray[currentPostIndex + 1].href;
    previousButton.style.display = "none";
    nextButton.href = nextPostLink;
  } else {
    previousPostLink = allBlogPostsArray[currentPostIndex - 1].href;
    nextPostLink = allBlogPostsArray[currentPostIndex + 1].href;
    previousButton.href = previousPostLink;
    nextButton.href = nextPostLink;
  }
});
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
  if (document.body.classList.contains("hellen")) return;

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
window.addEventListener("load", function () {
  // timeline content
  const timelineWrapper = document.querySelector("#timeline-wrapper");
  const allTimelineBodies = document.querySelectorAll(".timeline-item-body");

  if (!document.body.classList.contains("about-page")) return;

  allTimelineBodies.forEach(
    (singleBody) => (singleBody.style.display = "none")
  );

  const allTimelineItems = document.querySelectorAll(".timeline-item");
  const allTimelineItemsArr = [...allTimelineItems];

  allTimelineItems[0].classList.add("dot-pressed");
  allTimelineItems[0].querySelector(".timeline-dot-text").textContent =
    allTimelineItems[0].getAttribute("data-timeline-item");

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

// wf-fbg-scripts3.js

// adding custom arrows to post-loop-slider (add if conditional to existing function!)
(function () {
  if (!document.body.classList.contains("page-hellen")) return;
  const postSliderParent = document.querySelector(".post-slider-parent");
  const postLoopSlider = document.querySelector(".post-loop-slider");
  const newSldrArr = document.createElement("div");
  newSldrArr.className = "slider-arrows sldr_arr3";
  postSliderParent.insertBefore(newSldrArr, postLoopSlider);
})();

jQuery(document).ready(function () {
  if (!document.body.classList.contains("hellen")) return;

  jQuery(document).ready(function () {
    const element = document.getElementById("slider-with-opinions2");

    const dataSlickValue =
      '{"speed": 500, "cssEase": "linear", "rows": 2, "autoplay": true, "slidesToShow": 4, "slidesToScroll": 1, "responsive": [{"breakpoint":1001,"settings":		{"slidesToShow": 3}}, {"breakpoint":601,"settings":{"rows": 1, "slidesToShow": 1}}]}';

    element.setAttribute("data-slick", dataSlickValue);
  });

  jQuery(document).ready(function () {
    jQuery(".sliders").each(function () {
      const sliders = jQuery(this);

      sliders.slick({
        infinite: true,
        slidesToShow: 5,
        speed: 500,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        fade: false,
        pauseOnHover: true,
        dots: true,
        arrows: true,
        appendArrows: $(this).parents(".coop-wrapper").find(".sldr_arr"),
        appendDots: jQuery(".sldr_dt"),
        lazyLoad: "ondemand",
      });
    });
  });

  // hiding Next/Previous text on buttons
  window.addEventListener("load", function () {
    const sliderBtn = document.querySelectorAll(".sldr_arr button");
    let sliderBtnArr = [...sliderBtn];
    sliderBtnArr = sliderBtnArr.map((button) => (button.textContent = ""));
  });

  // calling videojs function
  videojs(document.querySelector("#main-video-js"));

  jQuery(document).ready(function () {
    const allVideos = document.querySelectorAll(".video-js");
    let allVideosArr = [...allVideos];
    allVideosArr = allVideosArr.map((singleVideo) => videojs(singleVideo));
  });

  // video.js modal
  jQuery(document).ready(function () {
    const opinionSlider = document.querySelector(".opinion-slider");
    opinionSlider.addEventListener("click", function (event) {
      let target = event.target;
      if (
        target.tagName != "SPAN" &&
        target.tagName != "VIDEO" &&
        target.tagName != "BUTTON"
      )
        return;
      let closestVideo = target.closest("li").querySelector("video");
      let link = closestVideo.querySelector("source").src;
      closestVideo.pause();
      let closestDetails = target.closest("li").querySelector(".video-details");

      const modalWrapper = document.querySelector("#modal-wrapper");
      const modal = document.querySelector("#modal");
      modalWrapper.style.display = "block";
      modal.style.display = "block";
      const modalVideo = modal.querySelector("video");
      modalVideo.insertAdjacentHTML(
        "afterbegin",
        `<source src="${link}" type="video/mp4">`
      );
      modalVideo.play();
      const modalDesc = document.querySelector("#modal-desc");
      modalDesc.innerHTML = closestDetails.innerHTML;
      const modalClose = document.querySelector("#modal-close");
      modalClose.addEventListener("click", function () {
        closestVideo.currentTime = 0;
        modalVideo.currentTime = 0;
        modalWrapper.style.display = "none";
      });
    });
  });

  // preventing page from scrolling while toggle is open
  const toggleButton = document.querySelector("#menu-toggle-button");

  document.addEventListener("click", function (e) {
    if (
      e.target.id === "menu-toggle-button" ||
      e.target.closest("#menu-toggle-button")
    ) {
      const btn =
        e.target.id === "menu-toggle-button"
          ? e.target
          : e.target.closest("#menu-toggle-button");
      if (btn.getAttribute("aria-expanded") === "false")
        document.body.style.overflow = "hidden";
      if (btn.getAttribute("aria-expanded") === "true")
        document.body.style.overflow = "auto";
    }
  });
});

// opinions
window.addEventListener("load", function () {
  if (!document.body.classList.contains("page-hellen")) return;

  const allReferences = document.querySelectorAll(".single-reference");
  const allReferencesArr = [...allReferences];
  const referencesAmount = allReferencesArr.length;

  const moreReferencesButton = document.querySelector(".reference-button");

  allReferencesArr.forEach((single) => single.classList.add("display-none"));

  if (referencesAmount <= 6) {
    allReferencesArr.forEach((single) =>
      single.classList.remove("display-none")
    );
    return;
  } else {
    Array.from(allReferencesArr)
      .slice(0, 6)
      .map((single) => {
        single.classList.remove("display-none");
      });
  }

  moreReferencesButton.addEventListener(
    "click",
    function () {
      allReferencesArr.forEach((single) =>
        single.classList.remove("display-none")
      );
    },
    { once: true }
  );
});

// video modal
window.addEventListener("load", function () {
  if (!document.body.classList.contains("page-hellen")) return;

  const introButton = document.querySelector(".intro-button");
  const currentVideo = document.querySelector("#main-video-js");
  const movieModalWrapper = document.querySelector(".movie-modal-wrapper");
  const movieModalClose = document.querySelector(".movie-modal-close");

  introButton.addEventListener("click", function () {
    movieModalWrapper.classList.remove("display-none");
  });

  movieModalClose.addEventListener("click", function () {
    currentVideo.pause();
    movieModalWrapper.classList.add("display-none");
  });

  movieModalWrapper.addEventListener("click", function (event) {
    const target = event.target;
    if (target === movieModalWrapper) {
      currentVideo.pause();
      movieModalWrapper.classList.add("display-none");
    }
  });
});

// open all timeline items as default
window.addEventListener("load", function () {
  if (!document.body.classList.contains("about-page")) return;

  const allTimelines = document.querySelectorAll(".timeline-item");
  const allTimelinesArr = [...allTimelines];

  allTimelinesArr.map((item) => {
    item.classList.add("dot-pressed");
    const dotText = item.querySelector(".timeline-dot-text");
    const attribute = item.getAttribute("data-timeline-item");
    dotText.textContent = attribute;
  });
});
