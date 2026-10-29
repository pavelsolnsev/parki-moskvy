{% set partners = [
	{ img: 'kod.svg', name: 'КОД Сокольники', w: 102, slug: 'kod' },
	{ img: 'ozon.svg', name: 'Ozon fresh', w: 85, slug: 'ozon' },
	{ img: 'mri.png', name: 'Музей русского импрессионизма', w: 122, slug: 'mri' },
	{ img: 'souz.png', name: 'Союзмультфильм', w: 146, slug: 'souz' },
	{ img: 'premier.png', name: 'Premier', w: 144, slug: 'premier' },
	{ img: 'vkusvill.svg', name: 'ВкусВилл', w: 84, slug: 'vkusvill' }
] %}

<section class="partners">
	<div class="container">
		<h2 class="section-title partners__title">Партнеры</h2>

		<div class="partners__list swiper">
			<div class="partners__track swiper-wrapper">
				{% for item in partners %}
				<a href="#" class="swiper-slide partners__item partners__item_{{ item.slug }}" title="{{ item.name }}"><img src="img/partners/{{ item.img }}" alt="{{ item.name }}" style="width: {{ item.w }}px;" loading="lazy"></a>
				{% endfor %}
			</div>
		</div>

		<div class="partners__nav">
			<div class="partners__arrows">
				<button type="button" class="button-round partners__arrow_prev" aria-label="Назад">{% include "icons/arrow-left.svg" %}</button>
				<button type="button" class="button-round partners__arrow_next" aria-label="Вперёд">{% include "icons/arrow-right.svg" %}</button>
			</div>
			<a href="#" class="button button_ghost partners__all">Все партнеры {% include "icons/arrow-long-right.svg" %}</a>
		</div>
	</div>
</section>
