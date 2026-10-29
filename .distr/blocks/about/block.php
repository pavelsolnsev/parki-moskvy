{% set socials = [
	[{ icon: 'max', name: 'Мы в МАКСЕ' }, { icon: 'telegram', name: 'Наш Телеграм' }, { icon: 'dzen', name: 'Читайте нас в Дзен' }],
	[{ icon: 'vk', name: 'Официальная группа в Вконтакте' }, { icon: 'hh', name: 'Наши вакансии' }]
] %}

<section class="about">
	<div class="container">
		<div class="about__row">
			<div class="about__info">
				<h2 class="section-title">Парки Москвы</h2>
				<p class="about__text">АНО «Развитие парков» занимается благоустройством и&nbsp;развитием парковых территорий, подведомственных Департаменту культуры города Москвы, созданием в&nbsp;них условий для комфортного пребывания, внедрением новых сервисов и&nbsp;услуг, организацией мероприятий и&nbsp;регулярных занятий для жителей и&nbsp;гостей столицы.</p>
				<div class="about__buttons">
					<a href="#" class="button button_green">Задать вопрос</a>
					<a href="#" class="button button_ghost">Больше о нас</a>
				</div>
			</div>

			<div class="about__social">
				<div class="about__social-bg"></div>
				<h2 class="about__social-title">Мы всегда<br>рядом</h2>
				<div class="about__links">
					{% for row in socials %}
					<div class="about__links-row">
						{% for item in row %}
						<a href="#" class="about__link" target="_blank" rel="noopener noreferrer"><img src="img/about/{{ item.icon }}.svg" alt="" width="48" height="48" loading="lazy">{{ item.name }}</a>
						{% endfor %}
					</div>
					{% endfor %}
				</div>
			</div>
		</div>

		<div class="about__subscribe">
			<h2 class="about__subscribe-title">Планы на выходные —<br>в вашей почте</h2>
			<p class="about__subscribe-text">Новости парков, интересные события и новые маршруты</p>
			<form class="about__form nolander">
				<label for="subscribe-email" class="visually-hidden">Ваш e-mail для подписки</label>
				<input type="email" name="email" id="subscribe-email" class="about__input" placeholder="Ваш e-mail" autocomplete="email" inputmode="email" required>
				<button type="submit" class="button button_green">Подписаться</button>
			</form>
			<p class="about__thanks">Спасибо! Подборки уже летят к вам.</p>
			<p class="visually-hidden about__status" role="status"></p>
			<img src="img/about/mail.svg" alt="" class="about__mail" width="148" height="78" loading="lazy">
		</div>
	</div>
</section>
