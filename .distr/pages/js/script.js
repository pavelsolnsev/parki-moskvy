window.App = (function () {
  const SEARCH_ICON = '<svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M11 2a8.79 8.79 0 0 1 6.52 14.68l4.58 4.57-1.06 1.06-4.62-4.6A8.79 8.79 0 1 1 11 2m0 1.5a7.29 7.29 0 1 0 0 14.58A7.29 7.29 0 0 0 11 3.5"/></svg>';
  const CLOSE_ICON = '<svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.94 5.78-5.78 1.06 1.06L13.06 12l5.78 5.78-1.06 1.06L12 13.06l-5.78 5.78-1.06-1.06L10.94 12 5.16 6.22l1.06-1.06z"/></svg>';

  function emit(el, name, detail, cancelable = false) {
    return el.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable, detail }));
  }

  function initSelect2(wrap) {
    const $wrap = $(wrap).first();
    const $select = $wrap.find("select").first();
    if (!$select.length || !$.fn.select2 || $select.hasClass("select2-hidden-accessible")) return $select;

    return $select
      .select2({
        width: "100%",
        minimumResultsForSearch: 0,
        dropdownParent: $wrap,
        language: { noResults: () => "Ничего не найдено" },
      })
      .on("select2:open", function () {
        $wrap.addClass("select2-is-open");

        const $search = $wrap.find(".select2-search__field").last();
        const $field = $search.closest(".select2-search--dropdown");

        if (!$field.find(".select2-search-icon").length) {
          $field.prepend('<span class="select2-search-icon">' + SEARCH_ICON + "</span>");
        }

        let $clear = $field.find(".select2-search-clear");
        if (!$clear.length) {
          $clear = $('<button type="button" class="select2-search-clear" aria-label="Очистить">' + CLOSE_ICON + "</button>").appendTo($field);
        }

        const toggleClear = () => $clear.toggleClass("visible", !!$search.val());
        toggleClear();

        $search.off("input.select2Search").on("input.select2Search", toggleClear);
        $clear.off("click.select2Search").on("click.select2Search", function () {
          $search.val("").trigger("input").focus();
        });
      })
      .on("select2:close", function () {
        $wrap.removeClass("select2-is-open");
      });
  }

  function initDragScroll(root = document) {
    $(root).find(".drag-scroll").addBack(".drag-scroll").each(function () {
      if (this.dataset.dragScroll) return;
      this.dataset.dragScroll = "1";

      const $slider = $(this);
      let startX = 0,
        startScroll = 0,
        pressed = false;

      $slider.on("mousedown", (e) => {
        pressed = true;
        startX = e.pageX;
        startScroll = $slider.scrollLeft();
      });

      $(window).on("mousemove", (e) => {
        if (!pressed) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 5) $slider.addClass("dragging");
        $slider.scrollLeft(startScroll - dx);
      });

      $(window).on("mouseup", () => {
        if (!pressed) return;
        pressed = false;
        setTimeout(() => $slider.removeClass("dragging"));
      });

      $slider.on("dragstart", (e) => e.preventDefault());
    });
  }

  return { emit, initSelect2, initDragScroll };
})();

$(function () {
  const { emit } = App;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.Swiper) {
    Swiper.extendDefaults({
      a11y: {
        prevSlideMessage: "Предыдущий слайд",
        nextSlideMessage: "Следующий слайд",
        firstSlideMessage: "Это первый слайд",
        lastSlideMessage: "Это последний слайд",
        paginationBulletMessage: "Перейти к слайду {{index}}",
        slideLabelMessage: "{{index}} из {{slidesLength}}",
        containerRoleDescriptionMessage: "карусель",
        itemRoleDescriptionMessage: "слайд",
      },
    });
  }

  //=require header/script.js
  //=require hero/script.js
  //=require focus/script.js
  //=require hobby/script.js
  //=require afisha/script.js
  //=require journal/script.js
  //=require partners/script.js
  //=require news/script.js
  //=require parks/script.js
  //=require about/script.js

  App.initDragScroll();

  $(document).on("click", 'a[href^="#"]', function (e) {
    const id = $(this).attr("href").slice(1);
    const $target = id && $(document.getElementById(id));
    if (!$target || !$target.length) return;
    e.preventDefault();
    $target[0].scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    if (!$target.is("a, button, input, select, textarea, [tabindex]")) $target.attr("tabindex", "-1");
    $target[0].focus({ preventScroll: true });
  });
});
