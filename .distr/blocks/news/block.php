{% set news = [
	{ cat: '5 парков', title: 'В парках Москвы появились новые площадки для отдыха и активного досуга', date: '11 октября 2026', tags: ['Экскурсии', 'Выставки', 'Мастер-классы'] },
	{ cat: '5 парков', title: 'В парках Москвы открывается осенний сезон', date: '11 октября 2026', tags: ['Экскурсии', 'Выставки', 'Мастер-классы'] },
	{ cat: '5 парков', title: 'Осенние выходные: концерты и мастер-классы', date: '10 октября 2026', tags: ['Спорт'] },
	{ cat: 'Коробковский сад', title: 'Парки приглашают на семейные праздники осени', date: '10 октября 2026', tags: ['Фестивали', 'Концерты', 'Детям'] }
] %}

<section class="news">
	<div class="container">
		<div class="news__head">
			<h2 class="section-title">Кстати, у нас новости</h2>
			<a href="#" class="button news__all">Все новости {% include "icons/arrow-long-right.svg" %}</a>
		</div>

		<div class="news__list swiper">
			<div class="news__track swiper-wrapper">
				{% for item in news %}
				<a href="#" class="swiper-slide tile news__card">
					<span class="tile__image"><img src="img/news/news-{{ loop.index }}.webp" alt="" loading="lazy"></span>
					<span class="tile__cat">{{ item.cat }}</span>
					<span class="tile__title">{{ item.title }}</span>
					<span class="tile__text">Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.</span>
					<span class="tile__date">{{ item.date }}</span>
					<span class="tile__tags">{% for tag in item.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</span>
				</a>
				{% endfor %}
			</div>
		</div>
	</div>
</section>
