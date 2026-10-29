{% set hobbies = [
	{ tag: 'Для детей', title: 'Не только детские площадки', bg: '#1eb9cb', decoW: 168.48, decoH: 162.66, decoX: 44.87, decoY: 55.16, decoRotate: 90 },
	{ tag: 'Для спорта', title: 'А вы знали,<br>что у нас есть корты?', bg: '#0d483b', decoW: 370.87, decoH: 244.49, decoX: 71.19, decoY: 35.51, decoRotate: 45 },
	{ tag: 'Для отдыха', title: 'Пикники для компаний или романтические прогулки', bg: '#ff871c', decoW: 168.48, decoH: 162.66, decoX: 34.92, decoY: 39.65, decoRotate: -90 },
	{ tag: 'Достопримечательности', title: 'Исторические дворцы, особняки, скульптуры и храмы', bg: '#b18ff8', decoW: 370.87, decoH: 244.49, decoX: 53.78, decoY: 56.20, decoRotate: -150 },
	{ tag: 'Подкасты', title: '«Парк звучит»: истории природы и людей', date: '8 октября 2026', bg: '#ee362a', decoW: 150.25, decoH: 95.17, decoX: 87.56, decoY: 35 },
	{ tag: 'Галерея', title: 'Цветущая Москва: парки в июне', date: '8 сентября 2026', bg: '#7ec730', img: 5, decoW: 150.25, decoH: 95.17, decoX: -14.93, decoY: 35 }
] %}

<section class="hobby">
	<div class="container">
		<div class="hobby__head">
			<h2 class="hobby__title">Ваши увлечения<br>в Парках Москвы</h2>
			<div class="hobby__nav">
				<button type="button" class="button-round hobby__arrow_prev" aria-label="Назад">{% include "icons/arrow-left.svg" %}</button>
				<button type="button" class="button-round hobby__arrow_next" aria-label="Вперёд">{% include "icons/arrow-right.svg" %}</button>
			</div>
		</div>

		<div class="hobby__slider swiper">
			<div class="hobby__track swiper-wrapper">
				{% for item in hobbies %}
				<a href="#" class="swiper-slide hobby__card {{ 'hobby__card_date' if item.date }}" style="--bg: {{ item.bg }};">
					<img src="img/hobby/deco-{{ loop.index }}.svg" alt="" class="hobby__deco" loading="lazy" style="--deco-w: {{ item.decoW }}%; --deco-h: {{ item.decoH }}%; --deco-x: {{ item.decoX }}%; --deco-y: {{ item.decoY }}%;{{ ' --deco-rotate: ' ~ item.decoRotate ~ 'deg;' if item.decoRotate }}">
					<img src="img/hobby/card-{{ item.img or loop.index }}.webp" alt="" class="hobby__img" loading="lazy">
					<span class="hobby__box">
						<span class="hobby__info">
							<span class="hobby__tag">{{ item.tag }}</span>
							<span class="hobby__name">{{ item.title | safe }}</span>
						</span>
						{% if item.date %}<span class="hobby__date">{{ item.date }}</span>{% endif %}
					</span>
				</a>
				{% endfor %}
			</div>
		</div>
	</div>
</section>
