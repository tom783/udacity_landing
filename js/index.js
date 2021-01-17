function init() {
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

  function getScrollPosition() {
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

  function getInputSearching() {
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

  function setEvents() {
    $bannerVideoCover.addEventListener("click", (e) => {
      $bannerVideoCover.style.display = "none";
      $bannerVideo.play();
    });

    $bannerVideo.onended = () => {
      $bannerVideoCover.style.display = "block";
    };

    getScrollPosition();
    getInputSearching();
  }

  setEvents();
}

init();
