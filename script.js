/* Bureau Ingold — минимум скриптов: проявление блоков и состояние
   верхней строки. Ничего больше на сайте не происходит.          */

(function () {
  'use strict';

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Появление блоков при прокрутке */
  var items = document.querySelectorAll('.reveal');

  if (calm || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add('is-in'); }, i * 90);
        watcher.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    items.forEach(function (el) { watcher.observe(el); });
  }

  /* Верхняя строка: светлеет, когда первый экран уходит вверх */
  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');

  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-light', !entries[0].isIntersecting);
    }, { rootMargin: '-70px 0px 0px 0px' }).observe(hero);
  }
})();
