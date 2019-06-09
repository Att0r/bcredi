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

var livros = {
  init: function () {
    this.tabs();
  },

  tabs: function () {
    $(".book__tab").on("click", function () {
      if ($(this).is(".book__tab--active")) {
        return false;
      }
      $(".book__tab").removeClass("book__tab--active");
      $(this).addClass("book__tab--active");
      var i = $(".book__tabs .book__tab").index($(this));
      $(".book__tab-content").hide();
      $(".book__tabs-content .book__tab-content:eq(" + i + ")").show();
      $("#drpTabs").val(i);
    });

    $("#drpTabs").on("change", function () {
      var i = $(this).val();
      $(".book__tab").removeClass("book__tab--active");
      $(".book__tab:eq(" + i + ")").addClass("book__tab--active");
      $(".book__tab-content").hide();
      $(".book__tabs-content .book__tab-content:eq(" + i + ")").show();
    });
  }
};

var acervo = {
  init: function () {
    this.filtros();
    this.aplicar();
    this.limpar();
  },

  filtros: function () {
    $(".acervo__filter-button").on("click", function (e) {
      e.preventDefault();
      var el = $(this);
      $(".filters__list-item").hide();
      var i = $(".acervo__filter-row .acervo__filter-button").index(el);
      if (el.is(".active")) {
        $(".acervo__filter-button.active").removeClass("active");
        $(".livros__lista").removeClass("opaco");
      } else {
        $(".acervo__filter-button.active").removeClass("active");
        el.addClass("active");
        $(".filters__list-item:eq(" + i + ")").fadeIn(400);
        $(".livros__lista").addClass("opaco");
      }
    });

    $("body").click(function (e) {
      if (!$(e.target).closest(".acervo__filter").length) {
        $(".filters__list-item").fadeOut(400);
        $(".acervo__filter-button").removeClass("active");
        $(".livros__lista").removeClass("opaco");
      }
    });
  },

  aplicar: function () {
    $(".filters__apply").on("click", function (e) {
      e.preventDefault();
      if (!$(this).data("label")) {
        return false;
      }
      var label = $(this).data("label");
      var p = $(e.target)
        .parent()
        .parent();
      var quantity = p.find(".filters__lista input:checked").length;
      if (quantity > 1) {
        label = label + "S";
      }
      var i = $(".filters__list .filters__list-item").index(p);
      $(".acervo__filter-button:eq(" + i + ") span").text(
        quantity + " " + label
      );
      $(".filters__list-item").fadeOut(400);
      $(".acervo__filter-button").removeClass("active");
      $(".livros__lista").removeClass("opaco");
    });
  },

  limpar: function () {
    $(".filters__clear").on("click", function (e) {
      e.preventDefault();
      console.log("io");
      var p = $(e.target)
        .parent()
        .parent();
      var i = $(".filters__list .filters__list-item").index(p);
      var label = $(this)
        .next(".filters__apply")
        .data("label");
      $(".acervo__filter-button:eq(" + i + ") span").text(label);
      p.find(".filters__lista input").attr("checked", false);
    });
  }
};

var notificacoes = {
  init: function () {
    this.headerToggle();
  },

  headerToggle: function () {
    $('.header-toggle').on('click', function () {
      $(this).next('.content-toggle').slideToggle(600);
    });
  }
};


var perfil = {
  init: function () {
    this.tabs();
  },

  tabs: function () {
    $(".book__tab").on("click", function () {
      if ($(this).is(".book__tab--active")) {
        return false;
      }
      $(".book__tab").removeClass("book__tab--active");
      $(this).addClass("book__tab--active");
      var i = $(".book__tabs .book__tab").index($(this));
      $(".book__tab-content").hide();
      $(".book__tabs-content .book__tab-content:eq(" + i + ")").show();
      $("#drpTabs").val(i);
    });
  },

  openBox: function () {
console.log('oi')
  }
};