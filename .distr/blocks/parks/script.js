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
