<header class="header">
	<div class="header__inner">
		<div class="header__top">
			<div class="header__media">
				<a href="#" class="header__play">
					<span class="header__play-icon">{% include "icons/play.svg" %}</span>
					Радио Парки
				</a>
				{% set podcast = '«Парк звучит»: истории природы и людей' %}
				<a href="#" class="header__play header__play_ticker" aria-label="Подкасты: {{ podcast }}">
					<span class="header__play-icon">{% include "icons/play.svg" %}</span>
					<span class="header__ticker">
						<span class="header__ticker-label">Подкасты</span>
						<span class="header__ticker-title" aria-hidden="true">
						<span class="header__ticker-track">
							<span>{{ podcast }}</span>
							<span>{{ podcast }}</span>
						</span>
					</span>
					</span>
				</a>
			</div>
			<a href="#" class="header__tool">
				{% include "icons/search.svg" %}
				Поиск по сайту
			</a>
			<a href="#" class="header__tool">
				{% include "icons/eye.svg" %}
				Версия для слабовидящих
			</a>
		</div>

		<div class="header__line"></div>

		<div class="header__bottom">
			<a href="./" class="header__logo"><img src="img/header/logo.svg" alt="Парки Москвы" width="147" height="36"></a>

			<nav class="header__nav" id="header-nav" aria-label="Основное меню">
				<a href="#" class="header__link">Об организации</a>
				<a href="#afisha" class="header__link scroll">Афиша</a>
				<a href="#" class="header__link">Медиа</a>
				<a href="#" class="header__link">Стать партнером</a>
				<a href="#" class="header__link">Открой бизнес</a>
				<a href="#parks" class="header__link scroll">К любимому парку {% include "icons/heart.svg" %}</a>
				<a href="#" class="header__link">Инфраструктура</a>

				<div class="header__nav-extra">
					<a href="#" class="header__nav-tool">{% include "icons/play.svg" %} Радио Парки</a>
					<a href="#" class="header__nav-tool">{% include "icons/play.svg" %} Подкасты</a>
					<a href="#" class="header__nav-tool">{% include "icons/search.svg" %} Поиск по сайту</a>
					<a href="#" class="header__nav-tool">{% include "icons/eye.svg" %} Версия для слабовидящих</a>
				</div>
			</nav>

			<button type="button" class="header__burger" aria-label="Меню" aria-expanded="false" aria-controls="header-nav"><span></span></button>
		</div>
	</div>
</header>
