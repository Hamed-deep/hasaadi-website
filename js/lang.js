const LangManager = {
  STORAGE_KEY: 'hasaadi_lang',

  get: function () {
    try {
      return localStorage.getItem(this.STORAGE_KEY) || 'ar';
    } catch (e) {
      return 'ar';
    }
  },

  set: function (lang) {
    try {
      localStorage.setItem(this.STORAGE_KEY, lang === 'en' ? 'en' : 'ar');
    } catch (e) {
      /* ignore */
    }
  },

  syncDataAttributes: function (lang) {
    var attr = lang === 'en' ? 'data-en' : 'data-ar';
    document.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      var v = el.getAttribute(attr);
      if (v == null) return;
      var tag = el.tagName && el.tagName.toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        el.placeholder = v.replace(/<[^>]*>/g, '');
      } else {
        el.innerHTML = v;
      }
    });
  },

  apply: function (lang) {
    lang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('.ar-content').forEach(function (el) {
      el.style.display = lang === 'ar' ? '' : 'none';
    });
    document.querySelectorAll('.en-content').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    document.querySelectorAll('.ar-label').forEach(function (el) {
      el.style.display = lang === 'ar' ? '' : 'none';
    });
    document.querySelectorAll('.en-label').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      btn.textContent = lang === 'ar' ? 'EN' : 'ع';
    });

    var arTitle = document.querySelector('meta[name="title-ar"]');
    var enTitle = document.querySelector('meta[name="title-en"]');
    if (lang === 'en' && enTitle && enTitle.content) {
      document.title = enTitle.content;
    } else if (arTitle && arTitle.content) {
      document.title = arTitle.content;
    }

    this.syncDataAttributes(lang);
  },

  toggle: function () {
    var next = this.get() === 'ar' ? 'en' : 'ar';
    this.set(next);
    this.apply(next);
  },

  init: function () {
    this.apply(this.get());
  }
};

document.addEventListener('DOMContentLoaded', function () {
  LangManager.init();
});
