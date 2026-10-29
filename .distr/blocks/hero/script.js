$(function () {
  const $hero = $(".hero");
  if (!$hero.length) return;

  const $fill = $hero.find(".hero__progress span");

  const swiper = new Swiper($hero.find(".swiper")[0], {
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 800,
    allowTouchMove: false,
    autoplay: { delay: 7000, disableOnInteraction: false },
    navigation: { nextEl: ".hero__arrow_next", prevEl: ".hero__arrow_prev" },
    on: {
      slideChange(swiper) {
        $hero.find(".hero__current").text(String(swiper.realIndex + 1).padStart(2, "0"));
      },
      autoplayTimeLeft(swiper, time, progress) {
        $fill.css("width", (1 - progress) * 100 + "%");
      },
    },
  });

  if (swiper.autoplay && swiper.params.autoplay) {
    $hero.on("focusin", () => swiper.autoplay.pause()).on("focusout", (e) => {
      if (!$hero[0].contains(e.relatedTarget)) swiper.autoplay.resume();
    });
  }
});
