function controlClassOnCondition(element, className, condition) {
  if (condition)
    $(element).addClass(className);
  else
    $(element).removeClass(className);
}

$(document).ready(function () {
  // navbar flip
  navbar = $('.navbar');

  function updateView() {
    controlClassOnCondition(navbar, 'is-flipped', window.pageYOffset > 0);
  }

  updateView();

  window.addEventListener('resize', updateView);
  window.addEventListener('scroll', updateView);

  document.onunload = function () {
    window.removeEventListener('resize', updateView);
    window.removeEventListener('scroll', updateView);
  };

  // btn-top
  $('.btn-top').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 400);
  })

  var iScrollPos = 0;
  var iScrollPosFlag = 0;
  $(window).scroll(function () {
    var windowScrollTop = $(window).scrollTop();

    if (windowScrollTop > 150) {
      $('.btn-top').addClass('show');
    } else {
      $('.btn-top').removeClass('show');
    }


    if (document.body.clientHeight < document.body.scrollHeight - windowScrollTop) {
      var isFixedTopHeight = $('.is-fixed-top').height();
      var isSmallHeight = $('.is-small').height();
      if (windowScrollTop > isSmallHeight + isFixedTopHeight) {
        if (windowScrollTop < iScrollPos) {
          iScrollPosFlag = 1;
          $('.top-menu').addClass('fixed').attr('style', 'visibility:visible');
        } else if (windowScrollTop === iScrollPos) {
          if (iScrollPosFlag === 0) {
            $('.top-menu').attr('style', 'visibility:hidden');
          } else {
            $('.top-menu').addClass('fixed').attr('style', 'visibility:visible');
          }
        } else {
          iScrollPosFlag = 0;
          $('.top-menu').attr('style', 'visibility:hidden');
        }
      } else {
        if (windowScrollTop < isSmallHeight + isFixedTopHeight - $('.top-menu').height()) {
          $('.top-menu').removeClass('fixed').attr('style', 'visibility:visible')
        }
      }
      iScrollPos = windowScrollTop;
    }

  });


  //Cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var cookieValue = getCookie('webosCookie');

  if (cookieValue !== '0') {
    // if cookie does not exist, display popup
    $('.cookies-popup').css('display', 'block');
  } else {
    $('.cookies-popup').css('display', 'none');
  }

  $(".cookies-popup a").on('click', function () {
    document.cookie = "webosCookie=0;path=/";
    $('.cookies-popup').css('display', 'none')
  });

});