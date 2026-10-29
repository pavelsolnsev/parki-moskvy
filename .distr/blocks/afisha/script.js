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
