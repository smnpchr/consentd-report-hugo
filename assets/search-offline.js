// Offline (file://) search engine for the `offline` Hugo environment.
//
// The stock Hugo Book search loads Fuse as an ES module and fetch()es the
// index at runtime — both blocked by browsers under file://. This variant
// sidesteps all of that:
//   * Fuse is imported here and bundled in by Hugo's js.Build (esbuild),
//     producing a single classic <script> — no runtime module import.
//   * The search index is inlined below at build time — no fetch().
//   * Result hrefs are stored root-relative and prefixed at runtime with
//     window.__SEARCH_BASE__ (the per-page climb to the site root), so
//     they resolve from any depth on disk.
import Fuse from './fuse.min.mjs';

{{ $pages := where .Site.Pages "Kind" "in" (slice "page" "section") -}}
{{- $pages = where $pages "Params.bookSearchExclude" "!=" true -}}
{{- $pages = where $pages "Content" "!=" "" -}}
const pages = [
{{- range $i, $p := $pages -}}
{{ if gt $i 0 }},{{ end }}
  { "href": {{ (strings.TrimPrefix "/" $p.RelPermalink) | jsonify }}, "title": {{ (partial "docs/title" $p) | jsonify }}, "section": {{ (partial "docs/title" $p.Parent) | default $.Site.Title | jsonify }}, "content": {{ $p.Plain | jsonify }} }
{{- end }}
];

const indexConfig = Object.assign({{ i18n "bookSearchConfig" | default "{}" | safeJS }}, {
  includeScore: true,
  useExtendedSearch: true,
  fieldNormWeight: 1.5,
  threshold: 0.2,
  ignoreLocation: true,
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'content', weight: 0.3 },
  ],
});

(function () {
  const base = window.__SEARCH_BASE__ || '';
  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return;
  }

  const fuse = new Fuse(pages, indexConfig);
  input.required = false;

  input.addEventListener('keyup', search);
  document.addEventListener('keydown', focusOnKeyDown);

  function focusOnKeyDown(event) {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      input.focus();
      return;
    }
    if (input === document.activeElement) {
      return;
    }
    if (event.target.value !== undefined) {
      return;
    }
    if (event.key === '/') {
      event.preventDefault();
      input.focus();
    }
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
    if (!input.value) {
      return;
    }

    const searchHits = fuse.search(input.value).slice(0, 10);
    searchHits.forEach(function (page) {
      const li = element('<li><a href></a><small></small></li>');
      const a = li.querySelector('a'), small = li.querySelector('small');

      a.href = base + page.item.href;
      a.textContent = page.item.title;
      small.textContent = page.item.section;

      results.appendChild(li);
    });
  }

  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }
})();
