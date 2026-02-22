package io.heapy.kotrol.css

internal val INLINE_JS = """
(function() {
  var KEY = 'kotrol-freq';
  var MAX = 8;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  document.addEventListener('click', function(e) {
    var anchor = e.target.closest('a[href]');
    if (!anchor) return;

    var url = anchor.getAttribute('href');
    if (!url || url.startsWith('#') || url.startsWith('javascript')) return;

    var card = anchor.closest('.card') || anchor;
    var titleEl = card.querySelector('.title');
    var logoEl = card.querySelector('.logo');
    if (!titleEl || !logoEl) return;

    var data = load();
    var entry = data[url] || { count: 0, title: titleEl.textContent, logo: logoEl.getAttribute('src') };
    entry.count++;
    entry.title = card.dataset.title || titleEl.textContent;
    entry.logo = logoEl.getAttribute('src');

    if (card.dataset.label) {
      entry.label = card.dataset.label;
    } else if (anchor.classList.contains('link-btn')) {
      entry.label = anchor.textContent;
    }

    data[url] = entry;
    save(data);
  });

  function renderFrequent() {
    var data = load();
    var entries = Object.keys(data).map(function(url) {
      return { url: url, count: data[url].count, title: data[url].title, logo: data[url].logo, label: data[url].label };
    });
    if (entries.length === 0) return;

    entries.sort(function(a, b) { return b.count - a.count; });
    entries = entries.slice(0, MAX);

    var section = document.createElement('section');
    section.id = 'frequent';
    section.className = 'group visible';

    var h2 = document.createElement('h2');
    h2.textContent = 'Frequently Used';
    section.appendChild(h2);

    var grid = document.createElement('div');
    grid.className = 'grid';

    entries.forEach(function(e) {
      var a = document.createElement('a');
      a.href = e.url;
      a.className = 'card';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.dataset.title = e.title;
      if (e.label) a.dataset.label = e.label;

      var img = document.createElement('img');
      img.className = 'logo';
      img.alt = e.title;
      img.src = e.logo;
      a.appendChild(img);

      var span = document.createElement('span');
      span.className = 'title';
      span.textContent = e.label ? e.title + ' — ' + e.label : e.title;
      a.appendChild(span);

      grid.appendChild(a);
    });

    section.appendChild(grid);

    var container = document.querySelector('.container');
    var h1 = container.querySelector('h1');
    h1.after(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFrequent);
  } else {
    renderFrequent();
  }
})();
""".trimIndent()
