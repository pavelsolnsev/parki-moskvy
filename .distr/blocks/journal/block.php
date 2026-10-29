{% set articles = [
	{ park: '5 парков', title: 'Осенний гербарий своими руками', date: '10 октября 2026', tags: ['Спорт'] },
	{ park: 'Коробковский сад', title: 'Золотая осень: 5 маршрутов по паркам Москвы', tags: ['Фестивали', 'Концерты', 'Детям'] }
] %}

<section class="journal">
	<div class="container">
		<div class="journal__head">
			<h2 class="section-title">Новый выпуск журнала</h2>
			<p class="journal__text">Истории парков, маршруты, интервью с горожанами<br class="d-none d-lg-block"> и новые городские привычки — в каждом выпуске</p>
		</div>

		<div class="journal__content">
			<a href="#" class="journal__cover">
				<span class="journal__cover-bg"></span>
				<span class="journal__photo">
					<img src="img/journal/cover-photo.webp" alt="" loading="lazy">
					<span class="journal__photo-label">Все выпуски {% include "icons/arrow-long-right.svg" %}</span>
				</span>
				<span class="tag journal__season">Осень 2026</span>
				<span class="journal__label">Журнал</span>
				<img src="img/journal/logo.svg" alt="Парки Москвы" class="journal__logo" width="173" height="48" loading="lazy">
			</a>

			<div class="journal__side">
				<div class="journal__list swiper">
					<div class="journal__track swiper-wrapper">
						{% for item in articles %}
						<a href="#" class="swiper-slide tile journal__card">
							<span class="tile__image"><img src="img/journal/article-{{ loop.index }}.webp" alt="" loading="lazy"></span>
							<span class="tile__cat">Статьи <span class="tile__dot"></span> {{ item.park }}</span>
							<span class="tile__title">{{ item.title }}</span>
							<span class="tile__text">Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.</span>
							{% if item.date %}<span class="tile__date">{{ item.date }}</span>{% endif %}
							<span class="tile__tags">{% for tag in item.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</span>
						</a>
						{% endfor %}
					</div>
				</div>

				<div class="journal__nav">
					<button type="button" class="button-round journal__arrow_prev" aria-label="Назад">{% include "icons/arrow-left.svg" %}</button>
					<button type="button" class="button-round journal__arrow_next" aria-label="Вперёд">{% include "icons/arrow-right.svg" %}</button>
					<a href="#" class="button journal__all">Все статьи {% include "icons/arrow-long-right.svg" %}</a>
				</div>
			</div>
		</div>
	</div>
</section>
