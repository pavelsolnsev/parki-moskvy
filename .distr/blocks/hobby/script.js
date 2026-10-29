$(function () {
  if (!$(".hobby__slider").length) return;

  new Swiper(".hobby__slider", {
    slidesPerView: "auto",
    spaceBetween: 12,
    grabCursor: true,
    navigation: {
      prevEl: ".hobby__arrow_prev",
      nextEl: ".hobby__arrow_next",
    },
    breakpoints: {
      1400: { spaceBetween: 24 },
    },
  });
});
