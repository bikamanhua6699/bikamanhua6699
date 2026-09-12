/* ============================================================
 * 哔咔漫画 PicACG - 页面渲染脚本
 * ------------------------------------------------------------
 * 一般不需要改这个文件。
 * 更新版本号 → 改 config.js
 * 更新日志   → 改 changelog.js
 * ============================================================ */

(function () {
  'use strict';

  var SITE = window.SITE || {};
  var LOG = window.CHANGELOG || [];

  /* ---------- 小工具 ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /** 转义 HTML，防止更新日志里的特殊字符破坏页面 */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** 把 2026-09-13 变成 2026年9月13日 */
  function cnDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    if (!m) return esc(s);
    return m[1] + '年' + parseInt(m[2], 10) + '月' + parseInt(m[3], 10) + '日';
  }

  var TYPE_LABEL = { feature: '新增', improve: '优化', fix: '修复' };
  var TAG_LABEL = { latest: '最新', stable: '稳定', beta: '测试', hotfix: '紧急' };

  /* ============================================================
   * 1. 全站版本号 / 日期 / 构建号注入
   * ============================================================ */
  function renderMeta() {
    $$('[data-version]').forEach(function (el) { el.textContent = SITE.version || '—'; });
    $$('[data-build]').forEach(function (el) { el.textContent = SITE.build || '—'; });
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var d = cnDate(SITE.date);
    $$('[data-release-date]').forEach(function (el) { el.textContent = d; });

    /* 首页统计 */
    var stats = {
      version: SITE.version || '—',
      size: (SITE.downloads && SITE.downloads.android && SITE.downloads.android.size) || '—',
      platforms: (SITE.stats && SITE.stats.platforms) || 3,
      updated: d
    };
    $$('[data-stat]').forEach(function (el) {
      var k = el.getAttribute('data-stat');
      if (stats[k] != null) el.textContent = stats[k];
    });

    document.title = (SITE.name || '哔咔漫画') + ' ' + (SITE.nameEn || '') +
      ' - ' + (SITE.slogan || '');
  }

  /* ============================================================
   * 2. 下载链接注入
   * ============================================================ */
  function renderDownloads() {
    var dl = SITE.downloads || {};
    $$('[data-dl]').forEach(function (a) {
      var key = a.getAttribute('data-dl');
      var item = dl[key];
      if (!item) { a.style.display = 'none'; return; }
      a.href = item.href || '#';
      if (!item.href || item.href === '#') {
        a.setAttribute('data-empty', '1');
        a.title = '下载地址待配置（在 assets/js/config.js 中填写）';
      } else {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });

    /* 链接区 */
    var links = SITE.links || {};
    $$('[data-link]').forEach(function (a) {
      var v = links[a.getAttribute('data-link')];
      if (v) a.href = v;
    });
  }

  /* ============================================================
   * 3. 更新日志渲染
   * ============================================================ */
  var state = { filter: 'all', shown: 0 };

  function releaseHTML(rel, index) {
    var tag = rel.tag || 'stable';
    var changes = rel.changes || [];
    var counts = { feature: 0, improve: 0, fix: 0 };
    changes.forEach(function (c) { if (counts[c.type] != null) counts[c.type]++; });

    var countText = [];
    if (counts.feature) countText.push('新增 ' + counts.feature);
    if (counts.improve) countText.push('优化 ' + counts.improve);
    if (counts.fix) countText.push('修复 ' + counts.fix);

    var items = changes.map(function (c) {
      var t = TYPE_LABEL[c.type] ? c.type : 'improve';
      return '<li data-type="' + t + '">' +
        '<span class="type type--' + t + '">' + TYPE_LABEL[t] + '</span>' +
        '<span>' + esc(c.text) + '</span>' +
        '</li>';
    }).join('');

    return '' +
      '<article class="release' + (index === 0 ? ' is-latest' : '') + '" data-index="' + index + '">' +
        '<button class="release__head" type="button" aria-expanded="false">' +
          '<span class="release__ver">' + esc(rel.version) + '</span>' +
          '<span class="tag tag--' + esc(tag) + '">' + (TAG_LABEL[tag] || esc(tag)) + '</span>' +
          '<span class="release__date">' + cnDate(rel.date) + '</span>' +
          (countText.length ? '<span class="release__count">' + countText.join(' · ') + '</span>' : '') +
          '<svg class="release__arrow" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>' +
        '</button>' +
        '<div class="release__body">' +
          (rel.highlight ? '<p class="release__highlight">' + esc(rel.highlight) + '</p>' : '') +
          '<ul class="release__list">' + items + '</ul>' +
          '<div class="release__dl">' +
            '<a href="#" data-dl="android">Android</a>' +
            '<a href="#" data-dl="ios">iOS</a>' +
            '<a href="#" data-dl="windows">Windows</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderChangelog(reset) {
    var box = $('#timeline');
    if (!box) return;

    var list = LOG.filter(function (rel) {
      if (state.filter === 'all') return true;
      return (rel.changes || []).some(function (c) { return c.type === state.filter; });
    });

    if (!list.length) {
      box.innerHTML = '<p class="cl__empty">该分类下暂无更新记录。</p>';
      var btn0 = $('#clMore'); if (btn0) btn0.hidden = true;
      return;
    }

    var pageSize = SITE.changelogPageSize || 4;
    if (reset || !state.shown) state.shown = Math.min(pageSize, list.length);
    var slice = list.slice(0, state.shown);

    box.innerHTML = slice.map(function (rel) {
      return releaseHTML(rel, LOG.indexOf(rel));
    }).join('');

    /* 应用「新增/优化/修复」二级筛选 */
    if (state.filter !== 'all') {
      $$('.release', box).forEach(function (rel) {
        $$('.release__list li', rel).forEach(function (li) {
          if (li.getAttribute('data-type') !== state.filter) li.classList.add('hide');
        });
      });
    }

    /* 展开 / 收起 */
    $$('.release__head', box).forEach(function (head) {
      head.addEventListener('click', function () {
        var rel = head.parentNode;
        var open = rel.classList.toggle('is-open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    /* 默认展开第一条 */
    var first = $('.release', box);
    if (first && state.filter === 'all') {
      first.classList.add('is-open');
      var h = $('.release__head', first);
      if (h) h.setAttribute('aria-expanded', 'true');
    }

    /* 加载更多按钮 */
    var more = $('#clMore');
    if (more) {
      more.hidden = state.shown >= list.length;
      more.textContent = '加载更早的版本（还有 ' + (list.length - state.shown) + ' 个）';
    }

    renderDownloads();
  }

  function bindChangelog() {
    var more = $('#clMore');
    if (more) {
      more.addEventListener('click', function () {
        state.shown += (SITE.changelogPageSize || 4);
        renderChangelog(false);
      });
    }

    var filter = $('#clFilter');
    if (filter) {
      filter.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        $$('.chip', filter).forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        state.filter = chip.getAttribute('data-filter');
        state.shown = 0;
        renderChangelog(true);
      });
    }
  }

  /* ============================================================
   * 4. 导航 / 滚动 / 动效
   * ============================================================ */
  function bindUI() {
    var nav = $('#nav');
    var toTop = $('#toTop');

    function onScroll() {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('is-scrolled', y > 20);
      if (toTop) toTop.classList.toggle('is-show', y > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* 移动端菜单 */
    var toggle = $('#navToggle');
    var links = $('#navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('a', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* 滚动入场 */
    var targets = $$('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en, i) {
          if (!en.isIntersecting) return;
          var el = en.target;
          setTimeout(function () { el.classList.add('is-in'); }, i * 70);
          io.unobserve(el);
        });
      }, { threshold: .12, rootMargin: '0px 0px -60px' });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* 未配置下载地址时给个提示 */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-empty]');
      if (a) {
        e.preventDefault();
        alert('下载地址尚未配置。\n请打开 assets/js/config.js，把 downloads 里的 href 换成真实下载链接。');
      }
    });
  }

  /* ============================================================
   * 启动
   * ============================================================ */
  function init() {
    renderMeta();
    renderDownloads();
    bindChangelog();
    renderChangelog(true);
    bindUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
