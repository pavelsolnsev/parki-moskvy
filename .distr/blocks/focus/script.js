$(function () {
  if (!$(".focus__slider").length) return;

  new Swiper(".focus__slider", {
    slidesPerView: "auto",
    freeMode: true,
    grabCursor: true,
    spaceBetween: 8,
    slidesOffsetBefore: 40,
    slidesOffsetAfter: 40,
    breakpoints: {
      576: { spaceBetween: 12, slidesOffsetBefore: 60, slidesOffsetAfter: 60 },
      992: { spaceBetween: 16, slidesOffsetBefore: 80, slidesOffsetAfter: 80 },
      1400: { slidesOffsetBefore: 120, slidesOffsetAfter: 120 },
    },
  });
});
