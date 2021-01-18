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
];

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
  const $searchBar = document.querySelector(".search-bar");
  const $searching = document.querySelector(".search input");
  const $searchingButton = document.querySelector("#searching");

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

  function setScrollMove() {
    const $navItems = $nav.querySelectorAll(".nav-item");
    $navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".nav-item")
          .forEach((i) => i.classList.remove("target"));
        e.target.parentNode.classList.add("target");
        const target = e.target.getAttribute("data-link");
        const targetSection = document.querySelector(`#${target}`);
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  function setScrollAnimation() {
    let timerInstance = null;

    document.addEventListener("scroll", (e) => {
      if (!timerInstance) {
        timerInstance = setTimeout(function () {
          timerInstance = null;
          if (
            window.scrollY >=
            $introSection.offsetTop - $bannerSection.offsetHeight / 2
          ) {
            $introTextAnimationSlide.classList.add("animation-slide-leftright");
            $introTextAnimationFade.classList.add("fadeIn");
          } else {
            $introTextAnimationSlide.classList.remove(
              "animation-slide-leftright"
            );
            $introTextAnimationFade.classList.remove("fadeIn");
          }
        }, 200);
      }
    });
  }

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
  function setEvents() {
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
  setEvents();
}

init();
