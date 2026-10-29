{% set districts = ['Центральный', 'Северный', 'Северо-Восточный', 'Восточный', 'Юго-Восточный', 'Южный', 'Юго-Западный', 'Западный', 'Северо-Западный', 'Зеленоградский', 'Троицкий', 'Новомосковский'] %}
{% set interests = ['Культура', 'Семейный отдых', 'Спорт и активный отдых', 'Детский отдых', 'Природно-исторический парк'] %}

{% set pins = [
	{ x: 300, y: 366, name: 'Парк Горького' },
	{ x: 330, y: 296, name: 'Парк «Северное Тушино»' },
	{ x: 370, y: 276, name: 'Лианозовский парк' },
	{ x: 480, y: 246, name: 'Коробковский сад' },
	{ x: 760, y: 286, name: 'Парк им. Юрия Лужкова' },
	{ x: 562, y: 318, name: 'Парк «Сокольники»' },
	{ x: 602, y: 358, name: 'Национальный парк «Лосиный остров»' },
	{ x: 641, y: 475, name: 'Парк искусств «Музеон»' },
	{ x: 331, y: 415, name: 'Воробьёвы горы' },
	{ x: 281, y: 395, name: 'Нескучный сад' },
	{ x: 544, y: 395, name: 'Бирюлевский дендропарк' },
	{ x: 574, y: 425, name: 'Музей-усадьба «Люблино»' },
	{ x: 504, y: 405, name: 'Зона отдыха «Покровский берег»' },
	{ x: 504, y: 335, name: 'Измайловский парк' },
	{ x: 424, y: 295, name: 'Парк «Фили»' }
] %}
{% set clusters = [{ x: 562, y: 356, count: 4 }, { x: 692, y: 256, count: 2 }] %}

<section class="parks" id="parks">
	<div class="container">
		<div class="parks__inner">
			<div class="parks__panel">
				<img src="img/parks/deco.svg" alt="" class="parks__deco" width="540" height="495" loading="lazy">

				<h2 class="parks__title">Выберем<br>ваш Парк Москвы?</h2>

				<div class="parks__filters">
					<div class="parks__select">
						<select aria-label="Парк">
							<option value="">Все парки Москвы</option>
							<option>Парк Горького</option>
							<option>Парк «Северное Тушино»</option>
							<option>Лианозовский парк</option>
							<option>Коробковский сад</option>
							<option>Парк им. Юрия Лужкова</option>
						</select>
						{% include "icons/chevron-down.svg" %}
					</div>

					<div class="parks__group">
						<div class="parks__label" id="parks-districts">Округа</div>
						<div class="parks__chips" role="group" aria-labelledby="parks-districts">
							{% for item in districts %}<button type="button" class="parks__chip" aria-pressed="false">{{ item }}</button>{% endfor %}
						</div>
					</div>

					<div class="parks__group">
						<div class="parks__label" id="parks-interests">Интересы</div>
						<div class="parks__chips" role="group" aria-labelledby="parks-interests">
							{% for item in interests %}<button type="button" class="parks__chip" aria-pressed="false">{{ item }}</button>{% endfor %}
						</div>
					</div>
				</div>
			</div>

			<div class="parks__map">
				<div class="parks__layer">
					<img src="img/parks/map.webp" alt="Карта парков Москвы" class="parks__map-img" loading="lazy">
					{% for pin in pins %}
					<button type="button" class="parks__pin" style="left: {{ pin.x / 1088 * 100 }}%; top: {{ pin.y / 768 * 100 }}%;" aria-label="{{ pin.name }}" data-park="{{ pin.name }}">
						<img src="img/parks/pin.svg" alt="" width="48" height="48" loading="lazy">
						<span class="parks__tooltip">{{ pin.name }}</span>
					</button>
					{% endfor %}
					{% for cluster in clusters %}
					<button type="button" class="parks__cluster" style="left: {{ cluster.x / 1088 * 100 }}%; top: {{ cluster.y / 768 * 100 }}%;" aria-label="Парков в группе: {{ cluster.count }}">{{ cluster.count }}</button>
					{% endfor %}
				</div>

				<div class="parks__zoom">
					<button type="button" class="parks__zoom-btn" data-zoom="1" aria-label="Приблизить"><span></span><span></span></button>
					<button type="button" class="parks__zoom-btn" data-zoom="-1" aria-label="Отдалить"><span></span></button>
				</div>

				<img src="img/parks/yandex.svg" alt="Яндекс" class="parks__logo" width="80" height="40" loading="lazy">
			</div>
		</div>
	</div>
</section>
