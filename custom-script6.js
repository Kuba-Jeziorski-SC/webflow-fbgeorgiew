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
