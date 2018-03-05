const mix = require('laravel-mix');

mix.options({
    processCssUrls: false
});

mix
    .js('src/js/app.js', 'public/js')
    .sass('src/sass/app.scss', 'public/css')
    .sourceMaps();
