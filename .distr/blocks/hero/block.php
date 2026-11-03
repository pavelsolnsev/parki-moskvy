{% set slides = [
	{ video: 'img/hero/hero-1', title: 'Новая<br>городская привычка', text: 'Вместе создаем пространства для жизни,<br class="d-none d-md-block"> вдохновения и общения', button: 'Открыть осеннюю афишу', link: '#afisha' },
	{ video: 'img/hero/hero-2', title: 'Новая<br>городская привычка', text: 'Вместе создаем пространства для жизни,<br class="d-none d-md-block"> вдохновения и общения', button: 'Открыть осеннюю афишу', link: '#afisha' }
] %}

<section class="hero">
	<div class="container">
		<div class="hero__box swiper">
			<div class="swiper-wrapper">
				{% for slide in slides %}
				<div class="swiper-slide hero__slide">
					<video class="hero__img hero__video" poster="{{ slide.video }}-poster.webp" muted loop playsinline disablepictureinpicture preload="{{ 'auto' if loop.first else 'none' }}" aria-hidden="true" tabindex="-1">
						<source src="{{ slide.video }}-sm.webm" type='video/webm; codecs="av01.0.05M.08"' media="(max-width: 767px)">
						<source src="{{ slide.video }}-sm.mp4" type="video/mp4" media="(max-width: 767px)">
						<source src="{{ slide.video }}.webm" type='video/webm; codecs="av01.0.08M.08"'>
						<source src="{{ slide.video }}.mp4" type="video/mp4">
					</video>
					<div class="hero__content">
						{% if loop.first %}<h1 class="hero__title">{{ slide.title | safe }}</h1>{% else %}<p class="hero__title">{{ slide.title | safe }}</p>{% endif %}
						<p class="hero__text">{{ slide.text | safe }}</p>
						<a href="{{ slide.link }}" class="hero__button scroll">{{ slide.button }}</a>
					</div>
				</div>
				{% endfor %}
			</div>

			<div class="hero__timeline">
				<div class="hero__progress"><span></span></div>
				{% if slides.length > 1 %}
				<div class="hero__nav">
					<div class="hero__counter"><span class="hero__current">01</span> — <span class="hero__total">{{ '0' if slides.length < 10 }}{{ slides.length }}</span></div>
					<button type="button" class="hero__arrow hero__arrow_prev" aria-label="Назад">{% include "icons/arrow-left.svg" %}</button>
					<button type="button" class="hero__arrow hero__arrow_next" aria-label="Вперёд">{% include "icons/arrow-right.svg" %}</button>
					<button type="button" class="hero__arrow hero__pause" aria-label="Остановить видео и прокрутку слайдов" aria-pressed="false">
						<svg class="icon hero__pause-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h3.5v14H7zm6.5 0H17v14h-3.5z"/></svg>
						<svg class="icon hero__resume-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v13.72L19 12z"/></svg>
					</button>
				</div>
				{% endif %}
			</div>
		</div>
	</div>
</section>
