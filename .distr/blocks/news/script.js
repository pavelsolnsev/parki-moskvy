$(function () {
  if (!$(".news__list").length) return;

  new Swiper(".news__list", {
    slidesPerView: 1.15,
    spaceBetween: 16,
    grabCursor: true,
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 24 },
      1200: { slidesPerView: 4, spaceBetween: 24, allowTouchMove: false },
    },
  });
});
