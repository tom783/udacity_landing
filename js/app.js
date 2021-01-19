const navItems = [
  {
    text: "Video",
    link: "banner-section",
  },
  {
    text: "Introduce",
    link: "intro-section",
  },
  {
    text: "Search",
    link: "searching-section",
  },
  {
    text: "contact",
    link: "contact-section",
  },
];

// js init
function init() {
  const $nav = document.querySelector("ul.nav");
  const $bannerSection = document.querySelector("#banner-section");
  const $bannerVideoCover = document.querySelector(
    "#banner-section .video-cover"
  );
  const $bannerVideo = document.querySelector("#banner-section .video video");
  const $introSection = document.querySelector("#intro-section");
  const $introTextAnimationSlide = document.querySelector(
    "#intro-section .main-text"
  );
  const $introTextAnimationFade = document.querySelector(
    "#intro-section .sub-text"
  );
  const $searchingSection = document.querySelector("#searching-section");
  const $searchBar = document.querySelector(".search-bar");
  const $searching = document.querySelector(".search input");

  const $testSection = document.querySelector("#contact-section");

  // create elements
  function _createElements() {
    navItems.forEach((item, idx) => {
      const navList = document.createElement("li");
      const navListItem = document.createElement("a");
      idx === 0
        ? navList.classList.add("nav-item", "target")
        : navList.classList.add("nav-item");
      navListItem.setAttribute("href", "#");
      navListItem.setAttribute("data-link", item.link);
      navListItem.textContent = item.text;
      navList.appendChild(navListItem);
      $nav.appendChild(navList);
    });
  }

  // set scroll move function
  function setScrollMove() {
    const $navItems = $nav.querySelectorAll(".nav-item");
    $navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        const target = e.target.getAttribute("data-link");
        const targetSection = document.querySelector(`#${target}`);
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  // set scroll effect function
  function setScrollAnimation() {
    let timerInstance = null;

    //scroll css animation effect
    function scrollAnimation() {
      if (
        window.scrollY >=
        $introSection.offsetTop - $introSection.offsetHeight / 2
      ) {
        $introTextAnimationSlide.classList.add("animation-slide-leftright");
        $introTextAnimationFade.classList.add("fadeIn");
      } else {
        $introTextAnimationSlide.classList.remove("animation-slide-leftright");
        $introTextAnimationFade.classList.remove("fadeIn");
      }
    }

    // scroll anchor
    function scrollAnchor() {
      const bannerSection = $bannerSection.getBoundingClientRect();
      const introSection = $introSection.getBoundingClientRect();
      const searchingSection = $searchingSection.getBoundingClientRect();
      const testSection = $testSection.getBoundingClientRect();
      document
        .querySelectorAll(".nav-item")
        .forEach((i) => i.classList.remove("target"));
      if (
        bannerSection.top <= 50 &&
        bannerSection.bottom > bannerSection.height / 2
      ) {
        $nav
          .querySelector('[data-link="banner-section"]')
          .parentNode.classList.add("target");
      } else if (
        introSection.top <= 50 &&
        introSection.bottom > introSection.height / 2
      ) {
        $nav
          .querySelector('[data-link="intro-section"]')
          .parentNode.classList.add("target");
      } else if (
        searchingSection.top <= 50 &&
        searchingSection.bottom > searchingSection.height / 2
      ) {
        $nav
          .querySelector('[data-link="searching-section"]')
          .parentNode.classList.add("target");
      } else if (
        testSection.top <= 50 &&
        testSection.bottom > testSection.height / 2
      ) {
        $nav
          .querySelector('[data-link="contact-section"]')
          .parentNode.classList.add("target");
      }
    }

    // binding scroll event
    document.addEventListener("scroll", (e) => {
      if (!timerInstance) {
        timerInstance = setTimeout(function () {
          timerInstance = null;

          scrollAnimation();
          scrollAnchor();
        }, 200);
      }
    });
  }

  // set search-input example list
  function setInputSearching() {
    let timerInstance = null;
    const listFrag = document.createDocumentFragment();
    const searchList = document.createElement("ul");
    const listItem = document.createElement("li");
    searchList.classList.add("search-list");

    if (!timerInstance) {
      timerInstance = setTimeout(function () {
        timerInstance = null;

        $searching.addEventListener("input", (e) => {
          const inputValue = e.target.value;
          const resultArray = ["elements"];

          if (resultArray) {
            for (const item of resultArray) {
              listItem.textContent = item;
              listFrag.appendChild(listItem);
            }
            searchList.appendChild(listFrag);
            $searchBar.appendChild(searchList);
          }
        });
      }, 200);
    }
  }

  // setting events
  function bindEvents() {
    $bannerVideoCover.addEventListener("click", (e) => {
      $bannerVideoCover.style.display = "none";
      $bannerVideo.play();
    });

    $bannerVideo.onended = () => {
      $bannerVideoCover.style.display = "block";
    };

    setScrollAnimation();
    setInputSearching();
    setScrollMove();
  }

  _createElements();
  bindEvents();
}

init();
