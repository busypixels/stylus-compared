var App = App || {};

App = {
  init: function () {
    this.currentPattern = '';
    this.getCurrentRoute();
    this.bindNav();
  },

  bindNav: function () {
    var self = this;
    $('a').click(function (e) {
      e.preventDefault();

      var file = e.target.hash.split('#')[1];

      self.updateRoute(file);
      self.getPatterns(file);
      self.updateSelectedNav(e.target.hash);
    });
  },

  getCurrentRoute: function () {
    this.getPatterns(window.location.hash.split('#')[1] || 'overview');
    this.updateSelectedNav(window.location.hash);
  },

  updateRoute: function (route) {
    console.log('updateRoute: ', route);
    window.location.hash = route;
  },

  getPatterns: function (file) {
    if (this.currentPattern === file) {return false;}
    this.currentPattern = file;
    var container = $('[data-content-block]'),
      tmpl = this.templatizer["_" + file];

    container.html(tmpl);

    Prism.highlightAll();
  },

  updateSelectedNav: function (hash) {
    var navListLink = $('.nav-list li a');

    navListLink.removeClass('selected');
    $('[href="' + hash + '"]').addClass('selected');
  }

};

$().ready(function () {
  App.init();
});
