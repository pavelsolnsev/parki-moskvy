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

  (function () {
    const $header = $(".header");
    if (!$header.length) return;
  
    const $burger = $header.find(".header__burger");
    const $nav = $header.find(".header__nav");
  
    if ($burger.length && $nav.length) {
      const setMenu = (open) => {
        if ($nav.hasClass("active") === open) return;
        $burger.toggleClass("active", open).attr("aria-expanded", String(open));
        $nav.toggleClass("active", open);
        emit($header[0], "header:menutoggle", { open });
      };
  
      $burger.on("click", () => setMenu(!$nav.hasClass("active")));
      $nav.find("a").on("click", () => setMenu(false));
  
      $(document).on("keydown", (e) => {
        if (e.key !== "Escape" || !$nav.hasClass("active")) return;
        setMenu(false);
        $burger.trigger("focus");
      });
    }
  
    let scrolled = null;
    const toggleScrolled = () => {
      const state = window.scrollY > 0;
      if (state === scrolled) return;
      scrolled = state;
      $header.toggleClass("scrolled", state);
    };
  
    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
  })();
  
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
  
  $(function () {
    const $afisha = $(".afisha");
    if (!$afisha.length) return;
  
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const monthsGenitive = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const weekdaysFull = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    const $dates = $afisha.find(".afisha__dates");
    const start = new Date();
    start.setHours(0, 0, 0, 0);
  
    const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  
    function renderDates() {
      const html = [];
      const monthNames = [];
  
      for (let i = 0; i < 14; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        const month = months[day.getMonth()];
        if (!monthNames.includes(month)) monthNames.push(month);
        html.push(
          `<button type="button" class="afisha__date-item" data-date="${toISO(day)}" aria-pressed="false" aria-label="${day.getDate()} ${monthsGenitive[day.getMonth()]}, ${weekdaysFull[day.getDay()]}"><span class="afisha__day" aria-hidden="true">${day.getDate()}</span><span class="afisha__weekday" aria-hidden="true">${weekdays[day.getDay()]}</span></button>`
        );
      }
  
      $dates.html(html.join("")).scrollLeft(0);
      $afisha.find(".afisha__month").text(monthNames.join(" — "));
  
      const end = new Date(start);
      end.setDate(start.getDate() + 13);
      emit($afisha[0], "afisha:periodchange", { from: toISO(start), to: toISO(end) });
    }
  
    $dates.on("click", ".afisha__date-item", function () {
      const active = !$(this).hasClass("active");
      $(this).siblings(".afisha__date-item").removeClass("active").attr("aria-pressed", "false");
      $(this).toggleClass("active", active).attr("aria-pressed", String(active));
      emit($afisha[0], "afisha:datechange", { date: active ? this.dataset.date : null });
    });
  
    $afisha.find(".afisha__dates-next").on("click", () => {
      start.setDate(start.getDate() + 7);
      renderDates();
    });
  
    renderDates();
  
    const $cards = $afisha.find(".afisha__card");
    const $park = $afisha.find(".afisha__park");
    const $filters = $afisha.find("button.afisha__filter");
  
    App.initSelect2($afisha.find(".afisha__select"));
  
    function applyFilters() {
      const tags = $filters.filter(".active").map((i, el) => $(el).data("tag")).get();
      let visible = 0;
  
      $cards.each(function () {
        const $card = $(this);
        const cardTags = String($card.data("tags")).split("|");
        const show = (!$park.val() || $card.data("park") === $park.val()) && (!tags.length || tags.some((tag) => cardTags.includes(tag)));
        $card.toggleClass("hidden", !show);
        if (show) visible++;
      });
  
      $afisha.find(".afisha__empty").toggleClass("visible", !visible);
      emit($afisha[0], "afisha:filterchange", { park: $park.val() || null, tags, visible });
    }
  
    $park.on("change", applyFilters);
  
    $filters.on("click", function () {
      const active = !$(this).hasClass("active");
      $(this).toggleClass("active", active).attr("aria-pressed", String(active));
      applyFilters();
    });
  
    $afisha.find(".afisha__more").on("click", function (e) {
      const $grid = $afisha.find(".afisha__grid");
      const collapsed = $cards.is(function () {
        return !$(this).hasClass("hidden") && $(this).css("display") === "none";
      });
  
      if (!$grid.hasClass("expanded") && collapsed) {
        e.preventDefault();
        $grid.addClass("expanded");
      }
    });
  });
  
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
  
  (function () {
    const $parks = $(".parks");
    if (!$parks.length) return;
  
    const $select = $parks.find(".parks__select select");
    const $chips = $parks.find(".parks__chip");
  
    const activeIn = (group) => $parks.find(`[aria-labelledby="${group}"] .parks__chip.active`).map((i, el) => $(el).text().trim()).get();
  
    function emitFilters() {
      emit($parks[0], "parks:filterchange", {
        park: $select.val() || null,
        districts: activeIn("parks-districts"),
        interests: activeIn("parks-interests"),
      });
    }
  
    $chips.on("click", function () {
      const active = !$(this).hasClass("active");
      $(this).toggleClass("active", active).attr("aria-pressed", String(active));
      emitFilters();
    });
  
    $select.on("change", emitFilters);
  
    const $layer = $parks.find(".parks__layer");
    let zoom = 1;
  
    $parks.find(".parks__zoom-btn").on("click", function () {
      zoom = Math.min(2.5, Math.max(1, zoom + $(this).data("zoom") * 0.5));
      $layer.css("transform", `scale(${zoom})`);
      $layer.css("--pin-scale", 1 / zoom);
      emit($parks[0], "parks:zoom", { zoom });
    });
  
    $parks.find(".parks__pin").on("click", function () {
      emit(this, "parks:pinclick", { park: this.dataset.park });
    });
  
    App.initSelect2($parks.find(".parks__select"));
  })();
  
  (function () {
    const $form = $(".about__form");
    if (!$form.length) return;
  
    const showThanks = function () {
      const $box = $(this).closest(".about__subscribe");
      $box.addClass("sent");
      $box.find(".about__status").text($box.find(".about__thanks").text());
    };
  
    $form.on("subscribe:success", showThanks);
  
    $form.on("submit", function (e) {
      e.preventDefault();
      const email = $(this).find("[name=email]").val();
      if (emit(this, "subscribe:submit", { email }, true)) showThanks.call(this);
    });
  })();
  

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
