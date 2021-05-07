(function ($) {
  $.fn.scrollClass = function (c) {
    var defaults = {};
    var config = $.extend(defaults, c);
    var target = this;

    function addAction() {
      var length = target.length;
      for (var i = 0; i < length; i++) {
        if (target.eq(i).hasClass('action')) continue;

        var in_position = target.eq(i).offset().top + ($(window).height()/4);
        var window_bottom_position = $(window).scrollTop() + $(window).height();
        if (in_position < window_bottom_position) {
          target.eq(i).addClass('action');
        }
      }
    }
    addAction();

    $(window).on('scroll', function () {
      addAction();
    });
    return target;
  };
})(jQuery);

$(function($){
  setTimeout(() => {
    $('.about_target').scrollClass();
    $('#reports').scrollClass();
    $('.vitamin_english').scrollClass();
    $('.yasumimi').scrollClass();
    $('.asobo').scrollClass();
    $('.stickers').scrollClass();
    $('.voice100').scrollClass();
    $('.target').scrollClass();
    $('.sns').scrollClass();
  }, 1000);
});