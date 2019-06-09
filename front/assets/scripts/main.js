jQuery(function () {
  structure.init();
});

var structure = {
  init: function () { }
};

var home = {
  init: function () {
    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    function setProgress(num) {
      var $spinner = $(".progress-circle .spinner"),
        $filler = $(".progress-circle .filler"),
        $percentage = $(".progress-circle .percentage"),
        initialNum = $percentage.text();

      if (num < 0) num = 0;
      if (num > 100) num = 100;

      $({ numVal: initialNum }).animate(
        { numVal: num },
        {
          duration: 1000,
          easing: "swing",

          step: function (currVal) {
            var amt = Math.ceil(currVal * 1000);

            $percentage.text(formatNumber(amt));

            if (currVal > 0 && currVal <= 50) {
              var spinnerDegs = -180 + (currVal * 180) / 50;
              $filler.css("display", "none");
              rotate($spinner, spinnerDegs);
            } else if (currVal > 50) {
              rotate($spinner, 0);
              $filler.css("display", "");
              var fillerDegs = 0 + (currVal * 180) / 50;
              rotate($filler, fillerDegs);
            }
          }
        }
      );
    }

    function rotate($el, deg) {
      $el.css({
        "-webkit-transform": "rotate(" + deg + "deg)",
        "-moz-transform": "rotate(" + deg + "deg)",
        "-ms-transform": "rotate(" + deg + "deg)",
        "-o-transform": "rotate(" + deg + "deg)",
        transform: "rotate(" + deg + "deg)"
      });
    }

    setProgress(90);

    $(".livros__item").click(function () {
      $header = $(this);
      //getting the next element
      $content = $(".bookbox-home");
      //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
      $content.slideToggle(500, function () { });
    });
    $("#open-menu").click(function () {
      $header = $(this);
      //getting the next element
      $content = $("#user-info-menu");
      //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
      $content.slideToggle(500, function () { });
    });
    $("#open-menu-tracker").click(function () {
      $header = $(this);
      //getting the next element
      $content = $("#tracker-menu");
      //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
      $content.slideToggle(500, function () { });
    });
    // $(document).mouseup(function(e) {
    //   var container = $("#tracker-menu");
    //   var container2 = $("#user-info-menu");

    //   if (!container.is(e.target) && container.has(e.target).length === 0) {
    //     container.hide();
    //   }
    //   if (!container2.is(e.target) && container2.has(e.target).length === 0) {
    //     container2.hide();
    //   }
    // });
  }
};

