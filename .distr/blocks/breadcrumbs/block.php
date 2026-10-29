<nav class="breadcrumbs" aria-label="Хлебные крошки">
	<div class="container">
		<ol class="breadcrumbs__list" itemscope itemtype="https://schema.org/BreadcrumbList">
			{% for item in breadcrumbs %}
			<li class="breadcrumbs__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
				{% if item.url and not loop.last %}
				<a href="{{ item.url }}" class="breadcrumbs__link" itemprop="item"><span itemprop="name">{{ item.title }}</span></a>
				{% elif loop.last %}
				<span class="breadcrumbs__current" itemprop="name" aria-current="page">{{ item.title }}</span>
				{% else %}
				<span class="breadcrumbs__text" itemprop="name">{{ item.title }}</span>
				{% endif %}
				<meta itemprop="position" content="{{ loop.index }}">
			</li>
			{% endfor %}
		</ol>
	</div>
</nav>
