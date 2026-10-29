{% set filters = ['Кинопоказы', 'Ярмарка', 'Спорт', 'Мастер-классы', 'Лекции', 'Фестивали', 'Концерты', 'Шоу', 'Театр', 'Квизы', 'Детям', 'Анимация', 'Благотворительная акция', 'Выставки', 'Экскурсии', 'Диджей-сеты', 'Вечеринки'] %}

{% set events = [
	{ park: 'Зона отдыха «Покровский берег»', title: 'Золотая осень: выходные<br>в парках Москвы', date: '12-13 октября, 12:00', tags: ['Экскурсии', 'Выставки', 'Мастер-классы'], free: true },
	{ park: 'Парк Горького', title: 'Экскурсия по осенним аллеям', date: '17 октября, 12:00', tags: ['Экскурсии', 'Выставки', 'Мастер-классы'] },
	{ park: '5 парков', title: 'Йога под осенним небом', date: '18 октября, 10:00', tags: ['Спорт'] },
	{ park: 'Коробковский сад', title: 'Фестиваль «Осень в парках Москвы»', date: '19 октября, 12:00', tags: ['Фестивали', 'Концерты', 'Детям'] },
	{ park: 'Парк «Северное Тушино»', title: 'Джаз в осеннем парке', date: '23 октября, 17:00', tags: ['Концерты', 'Вечеринки'], free: true },
	{ park: '5 парков', title: 'Мастерская осеннего гербария', date: '23 октября, 12:00', tags: ['Мастер-классы'] },
	{ park: 'Лианозовский парк', title: 'Семейный квест «Тайны осени»', date: '24 октября, 11:00', tags: ['Квест', 'Детям'], free: true },
	{ park: 'Парк им. Юрия Лужкова', title: 'Осенний забег по парку', date: '24 октября, 12:00', tags: ['Спорт', 'Благотворительная акция'] }
] %}

{% set parks = [] %}
{% for event in events %}{% if not (event.park in parks) %}{{ '' if parks.push(event.park) }}{% endif %}{% endfor %}

<section class="afisha" id="afisha">
	<div class="container">
		<div class="afisha__head">
			<h2 class="afisha__title">Афиша</h2>
			<div class="afisha__actions">
				<div class="afisha__select">
					<select class="afisha__park" aria-label="Парк">
						<option value="">Все парки Москвы</option>
						{% for park in parks %}<option value="{{ park }}">{{ park }}</option>{% endfor %}
					</select>
					{% include "icons/chevron-down.svg" %}
				</div>
				<a href="#" class="afisha__all">Смотреть все {% include "icons/arrow-long-right.svg" %}</a>
			</div>
		</div>

		<div class="afisha__calendar">
			<div class="afisha__month"></div>
			<div class="afisha__dates-row">
				<div class="afisha__dates drag-scroll" role="group" aria-label="Выбор даты"></div>
				<button type="button" class="afisha__dates-next" aria-label="Следующие даты">{% include "icons/chevron-right.svg" %}</button>
			</div>
		</div>

		<div class="afisha__filters drag-scroll" role="group" aria-label="Категории событий">
			{% for filter in filters %}
			<button type="button" class="afisha__filter tag" data-tag="{{ filter }}" aria-pressed="false">{{ filter }}</button>
			{% endfor %}
			<a href="#" class="afisha__filter tag">Больше</a>
		</div>

		<div class="afisha__grid">
			{% for event in events %}
			<a href="#" class="tile afisha__card" data-park="{{ event.park }}" data-tags="{{ event.tags | join('|') }}">
				<span class="tile__image">
					<img src="img/afisha/event-{{ loop.index }}.webp" alt="" loading="lazy">
					{% if event.free %}<span class="tag tile__badge">Бесплатно</span>{% endif %}
				</span>
				<span class="tile__cat">{{ event.park }}</span>
				<span class="tile__title">{{ event.title | safe }}</span>
				<span class="tile__text">Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.</span>
				<span class="tile__date">{{ event.date }}</span>
				<span class="tile__tags">
					{% for tag in event.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
				</span>
			</a>
			{% endfor %}
		</div>

		<p class="afisha__empty" role="status">По выбранным фильтрам событий нет</p>

		<a href="#" class="afisha__more">Показать ещё {% include "icons/arrow-down.svg" %}</a>
	</div>
</section>
