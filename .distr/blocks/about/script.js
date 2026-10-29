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
