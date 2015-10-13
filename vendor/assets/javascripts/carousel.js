$(function ($) {
  $.Carousel = function (el) {
    this.$el = $(el);
    this.$items = $(".items img");
    this.activeIdx = 0;

    $('div.items div.carousel-item:first-child').addClass('active');
    this.$el.on("click", ".slide-left", this.slide.bind(this, 1));
    this.$el.on("click", ".slide-right", this.slide.bind(this, -1));
  };

  $.Carousel.prototype.slide = function (dir) {
    if (this.transitioning) { return; }

    this.transitioning = true;
    var numItems = this.$items.length;
    var direction = (dir === 1) ? "left" : "right";
    var currentItem = this.$items.eq((this.activeIdx + numItems) % numItems);
    currentItem.addClass(direction);

    var nextItem = this.$items.eq((this.activeIdx + dir + numItems) % numItems);
    var otherDirection = (dir === 1) ? "right" : "left";
    nextItem.addClass("active").addClass(otherDirection);

    setTimeout(function () {
      nextItem.removeClass("right left");
    }, 0);

    currentItem.one("transitionend", function() {
      currentItem.removeClass("active left right");
      this.transitioning = false;
      this.activeIdx = (this.activeIdx + dir + numItems) % numItems;
      console.log(this.activeIdx);
    }.bind(this));

  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };

}(jQuery));
