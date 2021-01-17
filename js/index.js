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

  function setEvents() {
    $bannerVideoCover.addEventListener("click", (e) => {
      $bannerVideoCover.style.display = "none";
      $bannerVideo.play();
    });

    $bannerVideo.onended = () => {
      $bannerVideoCover.style.display = "block";
    };

    getScrollPosition();
  }

  setEvents();
}

init();
