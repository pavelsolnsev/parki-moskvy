{% set cards = [
	{ tag: 'Новости', title: 'В парках Москвы появились новые площадки для отдыха и активного досуга', img: 'img/focus/card-1.webp', bg: '#1eb9cb', pattern: [-1099, -932], rotate: -10 },
	{ tag: 'Афиша', title: 'Золотая осень: выходные в парках Москвы', img: 'img/focus/card-2.webp', bg: '#b78bff', pattern: [-191, -924], rotate: 8, rotateHover: 18 },
	{ tag: 'Онлайн журнал', title: 'Осень в парках: новый сезон для прогулок и вдохновения', img: 'img/focus/card-3.webp', bg: '#0d483b', pattern: [-411, -892], rotate: -10 },
	{ tag: 'Инфраструктура', title: 'Информационный павильон «Лесная точка»', img: 'img/focus/card-4.webp', bg: '#ff871c', pattern: [-436, -572], rotate: 8, rotateHover: 18 },
	{ tag: 'Подкасты', title: '«Парк звучит»: истории природы и людей', img: 'img/focus/card-5.webp', bg: '#ffc507', pattern: [-100, -622], dark: true, rotate: -10 },
	{ tag: 'Галерея', title: 'Цветущая Москва: парки в июне', img: 'img/focus/card-6.webp', bg: '#008e1c', pattern: [-410, -1022], light: true, rotate: 8, rotateHover: 18 }
] %}

<section class="focus">
	<div class="container">
		<div class="focus__head">
			<h2 class="focus__title">В центре внимания</h2>
			<p class="focus__text">Свежие новости, яркие события и идеи для прогулок. Узнавайте, чем живут парки Москвы, и&nbsp;планируйте свой отдых.</p>
		</div>
	</div>

	<div class="focus__slider swiper">
		<div class="focus__track swiper-wrapper">
			{% for card in cards %}
			<div class="swiper-slide focus__slide">
				<a href="#" class="focus__card {{ 'focus__card_dark' if card.dark }} {{ 'focus__card_light' if card.light }}" style="--bg: {{ card.bg }}; --px: {{ card.pattern[0] }}; --py: {{ card.pattern[1] }}; --rotate: {{ card.rotate }}deg;{{ ' --rotate-hover: ' ~ card.rotateHover ~ 'deg;' if card.rotateHover }}">
					<span class="focus__tag">{{ card.tag }}</span>
					<span class="focus__photo"><img src="{{ card.img }}" alt="" loading="lazy"></span>
					<span class="focus__name">{{ card.title }}</span>
				</a>
			</div>
			{% endfor %}

			<div class="swiper-slide focus__slide">
				<div class="focus__card focus__card_final" style="--bg: #0d483b; --px: -46; --py: -572; --rotate: -10deg;">
					<img src="img/focus/good-day.svg" alt="Хорошего дня!" class="focus__lettering" width="374" height="225" loading="lazy">
					<span class="focus__name">Ждём вас в парке ;)</span>
				</div>
			</div>
		</div>
	</div>
</section>
