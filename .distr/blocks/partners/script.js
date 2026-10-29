$(function () {
  if (!$(".partners__list").length) return;

  new Swiper(".partners__list", {
    slidesPerView: "auto",
    spaceBetween: 12,
    grabCursor: true,
    navigation: {
      prevEl: ".partners__arrow_prev",
      nextEl: ".partners__arrow_next",
    },
    breakpoints: {
      1200: { slidesPerView: 6, spaceBetween: 24, allowTouchMove: false },
    },
  });
});
