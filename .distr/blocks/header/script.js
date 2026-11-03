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

  const setHeaderHeight = () => document.documentElement.style.setProperty("--header-height", `${$header.outerHeight()}px`);
  setHeaderHeight();
  if (window.ResizeObserver) new ResizeObserver(setHeaderHeight).observe($header[0]);
  else $(window).on("resize", setHeaderHeight);

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
