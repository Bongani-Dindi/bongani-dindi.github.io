/*
  Bongani Dindi – portfolio behaviour, shared by every page.

  Everything here is an enhancement: each page reads fully without JavaScript.

  - [data-year] is filled with the current year.
  - A [data-filterable] section gets category filters and search:
      [data-filter-tools]   wrapper for the controls, revealed once this script runs
      [data-filter="name"]  a filter button ("all" shows everything)
      [data-filter-search]  the search field
      [data-filter-list]    wrapper whose children carry data-category="a b"
      [data-filter-text]    optional part of an item that search reads (default: the whole item)
      [data-filter-count]   result count, worded with data-singular / data-plural
      [data-filter-empty]   message shown when nothing matches
      [data-filter-reset]   button that clears the filter and the search
  - Pressing "/" moves focus to the search field.
*/
(() => {
  const normalize = value => value.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const resetters = [];

  document.querySelectorAll('[data-filterable]').forEach(root => {
    const list = root.querySelector('[data-filter-list]');
    const search = root.querySelector('[data-filter-search]');
    if (!list || !search) return;

    const items = [...list.querySelectorAll(':scope > [data-category]')];
    const buttons = [...root.querySelectorAll('[data-filter]')];
    const count = root.querySelector('[data-filter-count]');
    const empty = root.querySelector('[data-filter-empty]');
    const reset = root.querySelector('[data-filter-reset]');
    const tools = root.querySelector('[data-filter-tools]');
    const categoriesOf = item => item.dataset.category.split(/\s+/).filter(Boolean);
    const searchable = new Map(items.map(item => [
      item,
      normalize((item.querySelector('[data-filter-text]') || item).textContent),
    ]));
    let activeFilter = 'all';

    // A filter with nothing behind it stays out of the way until content exists for it.
    const used = new Set(items.flatMap(categoriesOf));
    buttons.forEach(button => {
      button.hidden = button.dataset.filter !== 'all' && !used.has(button.dataset.filter);
    });

    function apply() {
      const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
      let visible = 0;
      items.forEach(item => {
        const categoryMatches = activeFilter === 'all' || categoriesOf(item).includes(activeFilter);
        const textMatches = words.every(word => searchable.get(item).includes(word));
        item.hidden = !(categoryMatches && textMatches);
        if (!item.hidden) visible += 1;
      });
      buttons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
      });
      if (count) {
        const { singular = 'item', plural = 'items' } = count.dataset;
        count.textContent = visible === items.length
          ? `${visible} ${visible === 1 ? singular : plural}`
          : `${visible} of ${items.length} ${plural}`;
      }
      if (empty) empty.hidden = visible !== 0;
    }

    function clear() {
      activeFilter = 'all';
      search.value = '';
      apply();
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      apply();
    }));
    search.addEventListener('input', apply);
    if (reset) {
      reset.addEventListener('click', () => {
        clear();
        search.focus();
      });
    }

    resetters.push({ items, clear });
    if (tools) tools.hidden = false;
    apply();
  });

  // A direct link to an item still works if that item has been filtered out.
  function revealLinkedItem() {
    if (!window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!target || !target.hidden) return;
    const owner = resetters.find(({ items }) => items.includes(target));
    if (owner) {
      owner.clear();
      target.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', revealLinkedItem);

  document.addEventListener('keydown', event => {
    const search = document.querySelector('[data-filter-tools]:not([hidden]) [data-filter-search]');
    if (!search || event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target instanceof Element && (target.matches('input, textarea, select') || target.isContentEditable)) return;
    event.preventDefault();
    search.focus();
    search.select();
    search.scrollIntoView({ block: 'center' });
  });
})();
