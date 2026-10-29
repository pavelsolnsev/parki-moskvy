# Плагины проекта

Шпаргалка со ссылками на документацию и заметками по использованию в этом проекте.
Перед правками стилей/интеграции плагина — сверяться с офф. доками и реальным CSS/JS в `node_modules`, а не писать по памяти.

## jQuery — https://jquery.com/
- Версия: 4.0.0
- Подключается первым в `<head>` ([.distr/templates/default.html](../.distr/templates/default.html)), все остальные плагины и `.distr/pages/js/script.js` зависят от него.
- Код блоков пишется как `(function () { ... })();` обёртки, см. `.distr/blocks/*/script.js`, собираются в один файл через `gulp-include`.

## Swiper — https://swiperjs.com/
- Версия: 14.3.0
- Подключается как `libs/swiper-bundle.min.js` / `.css` (копируется как есть в `vendor()` в [gulpfile.js](../gulpfile.js), без кастомной сборки модулей).
- Используется для карточных слайдеров (не для лент дат/тегов в афише и парках — там свой `drag-scroll`, см. [.distr/blocks/common/_style.scss](../.distr/blocks/common/_style.scss)).

## Select2 — https://select2.org/
- Версия: 4.1.0
- Подключается как `libs/select2.min.js` + `libs/select2.min.css` (копируется как есть в `vendor()`).
- Используется в блоках `parks` и `afisha`. Общая инициализация — `initSelect2Dropdown()` в [.distr/pages/js/script.js](../.distr/pages/js/script.js), общая тема — миксин `select2-theme` в [.distr/blocks/common/_mixin.scss](../.distr/blocks/common/_mixin.scss).
- Совместимость с jQuery 4 проверена: select2 4.1 не использует удалённые в jQuery 4 функции (`$.trim`, `$.isArray` и т.п.).
- Важные нюансы:
  - `dropdownParent` указывает на `.parks__select` (а не `document.body`), чтобы дропдаун позиционировался внутри уже `position: relative` обёртки и не требовал доп. логики позиционирования.
  - `minimumResultsForSearch: 0` — поле поиска показывается всегда.
  - Иконка лупы и кнопка очистки добавляются вручную через JS на событие `select2:open` (у select2 нет для них встроенной разметки); т.к. поле поиска не пересоздаётся при каждом открытии — добавление идёт только если элементов ещё нет в DOM, иначе дублируются.
  - Дефолтная тема select2 (`select2.min.css`) подключена и переопределяется в `_style.scss`. Стандартные селекторы темы часто имеют высокую specificity (например `.select2-container--default .select2-search--dropdown .select2-search__field` — 3 класса), поэтому наши оверрайды должны матчить или превышать её по specificity (повторяя цепочку классов), а не просто быть объявлены позже — иначе дефолтные стили (рамки, цвета) пробиваются. В паре мест используется `!important` там, где это объективно надёжнее, чем подгонять specificity.

## Nunjucks — https://mozilla.github.io/nunjucks/
- Версия: 3.2.4 (используется через `gulp-nunjucks-render`)
- Шаблонизатор вёрстки: `.distr/pages/*.html` рендерятся в обычные статичные `public/*.html` (без PHP, открываются прямо с диска), с путями поиска шаблонов `.distr/templates` и `.distr/blocks` (см. `nunjucks()` в [gulpfile.js](../gulpfile.js)).
- Блоки подключаются через `{% include "blocks/.../block.php" %}` или наследование `{% extends %}` + `{% block %}` в [.distr/templates/default.html](../.distr/templates/default.html).
- Заголовок и описание страницы задаются в самой странице через `{% set title = "..." %}` и `{% set description = "..." %}` до `{% extends %}`. Адрес сайта — переменная `siteUrl` в `default.html`: пока она пустая, `canonical`, `og:url`, `og:image` и ссылки в JSON-LD не выводятся.
- Общие SVG-иконки лежат в `.distr/blocks/icons/*.svg` и подключаются как `{% include "icons/<name>.svg" %}`.

## Структура страницы

Каркас общий для всех страниц и лежит в [.distr/templates/default.html](../.distr/templates/default.html):

```
<header class="header">   топбар (подкасты, поиск, версия для слабовидящих) + меню
<nav class="breadcrumbs">  хлебные крошки — только если страница их задала
<main id="main">           динамический контент страницы ({% block content %})
<footer class="footer">
```

Шапка, крошки и футер физически вне `<main>` и подключаются шаблоном, а не страницей. Страница заполняет только `{% block content %}`.

Хлебные крошки задаются в странице до `{% extends %}`; последний пункт — текущая страница, пункт без `url` выводится текстом:

```
{% set breadcrumbs = [{ title: 'Главная', url: './' }, { title: 'Медиа', url: 'media.html' }, { title: 'Афиша' }] %}
{% extends 'default.html' %}
```

## События

Все события — обычные DOM `CustomEvent` (всплывают), данные в `event.detail`. Ловятся и нативно, и через jQuery:

```
document.addEventListener("afisha:datechange", (e) => console.log(e.detail.date));
$(document).on("afisha:datechange", (e) => console.log(e.originalEvent.detail.date));
```

### Плагины

- **Swiper**: экземпляр доступен через свойство элемента, события — штатные (`slideChange`, `reachEnd` и т.д., см. swiperjs.com/swiper-api#events):
  `document.querySelector(".hero .swiper").swiper.on("slideChange", (s) => {})`.
  Слайдеры: `.hero .swiper`, `.focus__slider`, `.hobby__slider`, `.news__list`, `.journal__list`, `.partners__list`.
- **Select2**: штатные события на исходном `<select>` (`select2:select`, `select2:open`, `select2:close`, `change` и др., см. select2.org/programmatic-control/events):
  `$(".afisha__park").on("select2:select", (e) => console.log(e.params.data))`.

### Компоненты вёрстки

| Событие | Где | `detail` |
|---|---|---|
| `afisha:periodchange` | `.afisha` | `{ from, to }` — показанный диапазон дат, `YYYY-MM-DD` |
| `afisha:datechange` | `.afisha` | `{ date }` — выбранная дата `YYYY-MM-DD` или `null` |
| `afisha:filterchange` | `.afisha` | `{ park, tags, visible }` — парк, активные теги, сколько карточек видно |
| `parks:filterchange` | `.parks` | `{ park, districts, interests }` |
| `parks:zoom` | `.parks` | `{ zoom }` |
| `parks:pinclick` | `.parks__pin` | `{ park }` — название парка |
| `header:menutoggle` | `.header` | `{ open }` — мобильное меню открыто/закрыто |
| `subscribe:submit` | `.about__form` | `{ email }` — отменяемое, см. ниже |

Форма подписки: по умолчанию после отправки сразу показывается «Спасибо». Чтобы сначала отправить данные на сервер, отмените событие и после ответа покажите благодарность событием `subscribe:success`:

```
document.addEventListener("subscribe:submit", (e) => {
  e.preventDefault();
  fetch("/api/subscribe", { method: "POST", body: JSON.stringify(e.detail) })
    .then(() => e.target.dispatchEvent(new Event("subscribe:success")));
});
```

## JS API для своих скриптов

Глобальный объект `App` создаётся сразу при загрузке `js/script.js` (до готовности DOM), поэтому доступен в любом скрипте, подключённом после него.

- `App.initSelect2(wrap)` — оформить select2 как на макете (тема, лупа и кнопка очистки в поиске). `wrap` — селектор, элемент или jQuery-обёртка, внутри которой лежит `<select>` и иконка-шеврон. Вид поля задаёт класс обёртки: `afisha__select` (кнопка-пилюля) или `parks__select` (подчёркнутое поле). Возвращает jQuery-объект `<select>`; повторный вызов на уже оформленном селекте ничего не делает.

  ```
  <div class="afisha__select">
    <select aria-label="Парк"><option value="">Все парки</option>...</select>
    <svg class="icon">...</svg>
  </div>

  App.initSelect2(".my-filter .afisha__select").on("select2:select", (e) => {});
  ```

- `App.initDragScroll(root)` — включить прокрутку перетаскиванием для `.drag-scroll` внутри `root` (по умолчанию весь документ). Для подгруженного через AJAX HTML вызывать с этим фрагментом; уже включённые ленты повторно не трогаются.
- `App.emit(el, name, detail, cancelable)` — отправить своё событие в том же формате, что и события вёрстки.

Якорные ссылки (`href="#id"`) обрабатываются через делегирование, так что работают и в подгруженном HTML.
