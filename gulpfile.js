'use strict';

/* Плагины */
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const combine = require('stream-combiner2').obj;
const path = require('path');
const { Transform } = require('stream');
const os = require('os');
const fs = require('fs');


/* Переменные окружения */
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV != 'production';


/* Конфиг */
var CONFIG = {
	output: 'public', /* Корневая папка сайта */
	input: '.distr/', /* Корневая папка дистрибутива */
	pages: '.distr/pages', /* Структура сайта в дистрибутиве */
	templates: '.distr/templates', /* Шаблоны сайта в дистрибутиве */
	blocks: '.distr/blocks', /* Блоки сайта в дистрибутиве */
	proxyPortPhp: 8001, /* Прокси-порт для PHP-сервера */
	proxyPortBs: 8910, /* Прокси-порт для browserSync */
	useAutoprefixer: true, /* Autoprefixer по умолчанию включен */
	reload: true, /* Перезагрузка браузера по умолчанию влючена */
	phpPath: '' /* Путь к локально установленному PHP (для сборки под Windows), задавать только в gulpconfig.json */
};

/* Если есть gulpconfig.json, берём параметры из него */
function loadConfig() {
	if (fs.existsSync(__dirname + '/./gulpconfig.json')) {
		CONFIG = Object.assign({}, CONFIG, require('./gulpconfig.json'));
	}
	return CONFIG;
}
loadConfig();


/* Задачи */

/* Задача для поднятия PHP-сервера */
function connect(callback) {
	console.log('* Запуск gulp-connect-php *');

	let serverConfig = {
		base: CONFIG.output,
		port: CONFIG.proxyPortPhp
	};

	if ( os.type() == 'Windows_NT' ) {
		/* Для запуска под Windows должен быть установлен локальный PHP и путь к нему указан в %PATH% или в phpPath */
		serverConfig.bin = CONFIG.phpPath + 'php.exe';
		if ( CONFIG.phpPath ) serverConfig.ini = CONFIG.phpPath + 'php.ini';
	}

	plugins.connectPhp.server(serverConfig, callback);
}


/* Задача для запуска browserSync, используя в качестве прокси PHP-сервер */
function serve(callback) {
	console.log('* Запуск browserSync *');

	browserSync.init({
		proxy: '127.0.0.1:' + CONFIG.proxyPortPhp,
		open: false,
		reloadOnRestart: true,
		injectChanges: true,
		port: CONFIG.proxyPortBs
	}, callback);
}


/* Задача для очистки конечной сборки (удаляется всё в CONFIG.output) */
function clean(callback) {
	console.log('* Удаление предыдущей сборки *');

	fs.rmSync(CONFIG.output, {recursive: true, force: true, maxRetries: 5, retryDelay: 200});
	fs.rmSync('manifest', {recursive: true, force: true});
	callback();
}


/* Задача для картинок */
function images() {
	console.log('* Копирование картинок *');

	return gulp.src(['**/img/**/*.*', '!{~**/**,**/~**}/img/**/*.*', '!**/img/**/{~*.*,*.ps}'], {cwd: CONFIG.blocks, dot: true, encoding: false, allowEmpty: true})
	.pipe( plugins.if( !isDevelopment, plugins.rev() ) )
	.pipe( plugins.rename(function (file) {
		/* Замена пути к картинкам для конечного пути: block/img/*.* -> img/block/*.* */
		file.dirname = file.dirname.replace(path.sep + 'img', '').replace(/^img$/, '');
	}) )
	.pipe( gulp.dest(CONFIG.output + '/img/') )
	.pipe( plugins.if( !isDevelopment, combine( plugins.rev.manifest('images.json'), gulp.dest('manifest'), plugins.debug({title: 'manifest -> images.json'}) ) ) )
	;
}


/* Задача для сторонних библиотек (копируются как есть, без include/terser/rev) */
function vendor() {
	console.log('* Копирование библиотек *');

	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/swiper/swiper-bundle.min.js',
		'node_modules/swiper/swiper-bundle.min.css',
		'node_modules/select2/dist/js/select2.min.js',
		'node_modules/select2/dist/css/select2.min.css',
	], {allowEmpty: true})
	.pipe( gulp.dest(CONFIG.output + '/libs') )
	;
}


/* Задача для JS */
function scripts() {
	console.log('* Копирование скриптов *');

	return gulp.src(['**/*.js', '!{~**/**,**/~**}/*.js', '!**/~*.js'], {cwd: CONFIG.pages, dot: true})
	.pipe( plugins.if( isDevelopment, plugins.plumber() ) )
	.pipe( plugins.include({
		includePaths: [path.resolve(CONFIG.blocks)]
	}) )
	.pipe( plugins.if( !isDevelopment, plugins.terser() ) )
	.pipe( plugins.if( !isDevelopment, plugins.rev() ) )
	.pipe( gulp.dest(CONFIG.output) )
	.pipe( plugins.if( !isDevelopment, combine( plugins.rev.manifest('js.json'), gulp.dest('manifest'), plugins.debug({title: 'manifest -> js.json'}) ) ) )
	;
}


/* Задача для CSS */
function styles() {
	console.log('* Сборка и минимизация стилей *');

	return gulp.src(['**/*.scss', '!{~**/**,**/~**}/*.scss', '!**/~*.scss'], {cwd: CONFIG.pages, dot: true})
	.pipe( plugins.if( isDevelopment, plugins.plumber() ) )
	.pipe( sass({
		loadPaths: [path.resolve(CONFIG.blocks)],
		style: 'expanded',
		silenceDeprecations: ['import', 'global-builtin']
	}).on('error', sass.logError) )
	.pipe( plugins.if( CONFIG.useAutoprefixer, plugins.autoprefixer() ) )
	.pipe( plugins.cleanCss() )
	.pipe( plugins.if( !isDevelopment, plugins.rev() ) )
	.pipe( gulp.dest(CONFIG.output) )
	.pipe( plugins.if( !isDevelopment, combine( plugins.rev.manifest('css.json'), gulp.dest('manifest'), plugins.debug({title: 'manifest -> css.json'}) ) ) )
	;
}


/* Задача для рендеринга шаблонов Nunjucks */
function nunjucks() {
	console.log('* Рендеринг шаблонов (Nunjucks) *');

	return gulp.src(['**/*.{html,njk}', '!{~**/**,**/~**}/*.{html,njk}', '!**/~*.{html,njk}'], {cwd: CONFIG.pages, dot: true})
	.pipe( plugins.if( isDevelopment, plugins.plumber() ) )
	.pipe( plugins.nunjucksRender({
		path: [CONFIG.templates, CONFIG.blocks],
		inheritExtension: true,
		throwOnUndefined: true
	}) )
	.pipe( gulp.dest(CONFIG.output) )
	;
}


/* Задача для копирования остальных файлов */
function otherPages() {
	console.log('* Копирование остальных файлов *');

	return gulp.src(['**/*', '!**/*.{html,njk,php,scss,js}', '!{~**/**,**/~**}', '!**/~*.*'], {cwd: CONFIG.pages, dot: true, nodir: true, encoding: false})
	.pipe( gulp.dest(CONFIG.output) )
	;
}


/* Задача для замены имён файлов в HTML и CSS */
function revreplace(callback) {
	if ( isDevelopment ) return callback();

	console.log('* Замена имён файлов *');

	/* Пути картинок в манифесте: block/img/*.* -> img/block/*.* */
	const imagePath = (file) => 'img/' + file.replace('/img/', '/').replace(/^img\//, '');
	const images = Object.entries(readManifest('images.json')).map(([from, to]) => [imagePath(from), imagePath(to)]);
	const css = Object.entries(readManifest('css.json'));
	const js = Object.entries(readManifest('js.json'));

	return gulp.src(['**/*.html', '**/*.css'], {cwd: CONFIG.output})
	.pipe( new Transform({
		objectMode: true,
		transform(file, encoding, callback) {
			const pairs = path.extname(file.path) == '.html' ? [...css, ...images, ...js] : images;
			let contents = file.contents.toString();

			pairs.forEach(([from, to]) => contents = contents.split(from).join(to));
			file.contents = Buffer.from(contents);
			callback(null, file);
		}
	}) )
	.pipe( plugins.debug({title: 'revReplace + manifest'}) )
	.pipe( gulp.dest(CONFIG.output) )
	;
}

/* Чтение манифеста gulp-rev (если его нет — пустой) */
function readManifest(name) {
	const file = path.join('manifest', name);
	return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}


/* Перезагрузка браузера */
function reload(callback) {
	if ( CONFIG.reload ) browserSync.reload();
	callback();
}


/* Задача для слежения за измениями в исходных файлах */
function watch() {
	/* Копирование, когда изменились картинки  */
	gulp.watch('**/img/**/*.*', {cwd: CONFIG.blocks}, gulp.series(images, reload));

	/* Пересборка CSS, когда изменились стили  */
	gulp.watch('**/*.scss', {cwd: CONFIG.input}, gulp.series(styles, reload));

	/* Пересборка JS, когда изменились скрипты  */
	gulp.watch('**/*.js', {cwd: CONFIG.input}, gulp.series(scripts, reload));

	/* Пересборка HTML, когда изменились страницы, шаблоны или блоки */
	gulp.watch('**/*.{html,php,njk}', {cwd: CONFIG.input}, gulp.series(nunjucks, revreplace, reload));

	/* Обработка остальных файлов */
	gulp.watch(['**/*', '!**/*.{html,njk,php,scss,js}'], {cwd: CONFIG.pages}, gulp.series(otherPages, reload));
}


/* Задача для конечной сборки (для prod) */
const build = gulp.series(
	clean,
	images,
	gulp.parallel(styles, scripts, otherPages, vendor),
	nunjucks,
	...(isDevelopment ? [] : [revreplace])
);


/* Задача по умолчанию (для dev) */
const dev = gulp.series(build, connect, serve, watch);


/* Задача для сборки без перезагрузки */
function disableReload(callback) {
	CONFIG.reload = false;
	callback();
}


exports.clean = clean;
exports.images = images;
exports.vendor = vendor;
exports.scripts = scripts;
exports['styles:css'] = styles;
exports.nunjucks = nunjucks;
exports['other.pages'] = otherPages;
exports.revreplace = revreplace;
exports.watch = watch;
exports.build = build;
exports.nosync = gulp.series(build, watch);
exports.noreload = gulp.series(disableReload, dev);
exports.default = dev;
