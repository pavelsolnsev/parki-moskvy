$(function () {
  if (!$(".journal__list").length) return;

  new Swiper(".journal__list", {
    slidesPerView: 1.15,
    spaceBetween: 16,
    grabCursor: true,
    navigation: {
      prevEl: ".journal__arrow_prev",
      nextEl: ".journal__arrow_next",
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 24 },
    },
  });
});
