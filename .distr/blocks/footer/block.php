{% set logos = [
	{ img: 'leto.svg', name: 'Лето в Москве', w: 103 },
	{ img: 'mosbilet.svg', name: 'Мосбилет', w: 140 },
	{ img: 'kultura.svg', name: 'Культура Москвы', w: 140 },
	{ img: 'department.svg', name: 'Департамент культуры города Москвы', w: 140 },
	{ img: 'kc.png', name: 'Кадровый центр Департамента культуры города Москвы', w: 128 },
	{ img: 'proculture.svg', name: 'PRO.Культура.РФ', w: 200 }
] %}

{% set menu = [
	['Об организации', 'Афиша', 'Новости'],
	['Стать партнером', 'Открой бизнес', 'Медиа'],
	['К любимому парку', 'Инфраструктура']
] %}

{% set mails = [
	{ label: 'для посетителей', value: 'info-parki@culture.mos.ru' },
	{ label: 'для СМИ', value: 'info-pr-parki@culture.mos.ru' },
	{ label: 'по вопросам проведения мероприятий', value: 'info-event-parki@culture.mos.ru' }
] %}

<footer class="footer">
	<div class="container">
		<div class="footer__logos">
			{% for item in logos %}
			<a href="#" class="footer__logos-item" target="_blank" rel="noopener noreferrer"><img src="img/footer/{{ item.img }}" alt="{{ item.name }}" style="width: {{ item.w }}px;" loading="lazy"></a>
			{% endfor %}
		</div>

		<div class="footer__panel">
			<a href="./" class="footer__brand"><img src="img/footer/logo.svg" alt="Парки Москвы" width="130" height="32" loading="lazy"></a>

			<div class="footer__content">
				<nav class="footer__menu" aria-label="Меню в подвале">
					{% for col in menu %}
					<div class="footer__menu-col">
						{% for link in col %}<a href="#" class="footer__link">{{ link }}</a>{% endfor %}
					</div>
					{% endfor %}
				</nav>

				<div class="footer__contacts">
					{% for item in mails %}
					<div class="footer__contact">
						<span class="footer__label">{{ item.label }}</span>
						<a href="mailto:{{ item.value }}" class="footer__value">{{ item.value }}</a>
					</div>
					{% endfor %}
				</div>

				<div class="footer__contacts">
					<div class="footer__contact">
						<span class="footer__label">Телефон</span>
						<a href="tel:+74957271077" class="footer__value">+7 (495) 727-10-77</a>
					</div>
					<div class="footer__contact">
						<span class="footer__label">Адрес</span>
						<span class="footer__value">107031, Москва, ул. Неглинная, д.&nbsp;8/10, пом.&nbsp;2А/1, ком.&nbsp;49</span>
					</div>
				</div>
			</div>
		</div>

		<div class="footer__bottom">
			<span class="footer__copy">© Парки Москвы, 2026</span>
			<div class="footer__socials">
				{% for item in [{ icon: 'max', name: 'MAX' }, { icon: 'telegram', name: 'Telegram' }, { icon: 'dzen', name: 'Дзен' }, { icon: 'vk', name: 'ВКонтакте' }, { icon: 'hh', name: 'hh.ru' }] %}
				<a href="#" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="Парки Москвы в {{ item.name }} (откроется в новой вкладке)"><img src="img/footer/{{ item.icon }}.svg" alt="" width="48" height="48" loading="lazy"></a>
				{% endfor %}
			</div>
			<span class="footer__made">Сделано — Энсайн</span>
		</div>
	</div>
</footer>
