{% set slides = [
	{ img: 'img/hero/hero.webp', title: 'Новая<br>городская привычка', text: 'Вместе создаем пространства для жизни,<br class="d-none d-md-block"> вдохновения и общения', button: 'Открыть осеннюю афишу', link: '#afisha' },
	{ img: 'img/hero/hero.webp', title: 'Новая<br>городская привычка', text: 'Вместе создаем пространства для жизни,<br class="d-none d-md-block"> вдохновения и общения', button: 'Открыть осеннюю афишу', link: '#afisha' }
] %}

<section class="hero">
	<div class="container">
		<div class="hero__box swiper">
			<div class="swiper-wrapper">
				{% for slide in slides %}
				<div class="swiper-slide hero__slide">
					<img src="{{ slide.img }}" alt="" class="hero__img">
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
				</div>
				{% endif %}
			</div>
		</div>
	</div>
</section>
