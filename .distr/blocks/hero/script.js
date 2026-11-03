(function () {
  const $hero = $(".hero");
  if (!$hero.length) return;

  const $fill = $hero.find(".hero__progress span");
  const $pause = $hero.find(".hero__pause");
  const videos = $hero.find(".hero__video").get();
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  let paused = false;
  let swiper = null;

  const activeSlide = (instance) => instance && instance.slides[instance.activeIndex];

  function playActive(instance = swiper) {
    const slide = activeSlide(instance);
    if (!slide || paused || saveData) return;
    videos.forEach((video) => {
      if (!slide.contains(video)) return;
      const playing = video.play();
      if (playing) playing.catch(() => {});
    });
  }

  function pauseInactive(instance = swiper) {
    const slide = activeSlide(instance);
    if (!slide) return;
    videos.forEach((video) => {
      if (!slide.contains(video)) video.pause();
    });
  }

  swiper = new Swiper($hero.find(".swiper")[0], {
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 800,
    allowTouchMove: false,
    autoplay: { delay: 7000, disableOnInteraction: false },
    navigation: { nextEl: ".hero__arrow_next", prevEl: ".hero__arrow_prev" },
    on: {
      slideChange(instance) {
        $hero.find(".hero__current").text(String(instance.realIndex + 1).padStart(2, "0"));
        $(activeSlide(instance)).find(".hero__video").each(function () {
          this.currentTime = 0;
        });
        playActive(instance);
      },
      slideChangeTransitionEnd(instance) {
        pauseInactive(instance);
      },
      autoplayTimeLeft(swiper, time, progress) {
        $fill.css("width", (1 - progress) * 100 + "%");
      },
    },
  });

  function setPaused(state) {
    paused = state;
    $pause.attr({
      "aria-pressed": String(state),
      "aria-label": state ? "Возобновить видео и прокрутку слайдов" : "Остановить видео и прокрутку слайдов",
    });

    if (state) {
      swiper.autoplay.pause();
      videos.forEach((video) => video.pause());
    } else {
      swiper.autoplay.resume();
      playActive();
    }

    emit($hero[0], "hero:pause", { paused: state });
  }

  $pause.on("click", () => setPaused(!paused));

  $hero.on("focusin", () => swiper.autoplay.pause()).on("focusout", (e) => {
    if (!paused && !$hero[0].contains(e.relatedTarget)) swiper.autoplay.resume();
  });

  pauseInactive();
  playActive();
})();
