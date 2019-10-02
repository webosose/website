/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
// page loading spinner
window.onload = function () {
  $('#spinner').fadeOut();
  $('#page-loader').delay(350).fadeOut('slow');
  $('body').delay(350).css({
    'overflow': 'visible'
  });
}

$(document).ready(function () {
  // landing section-04 animate
  var _windowOffset = window.innerHeight * 0.8;

  var animateActive = function () {
    for (var i = 0; i < document.querySelectorAll('.info-txt-wrap').length; i++) {
      var el = document.querySelectorAll('.info-txt-wrap')[i];

      if (el.getBoundingClientRect().top < _windowOffset) {
        if (!$(el).hasClass('animate')) {
          $(el).addClass("animate")
        }
      } else {
        $(el).removeClass('animate');
      }
    }
  };

  if (document.querySelectorAll('.info-txt-wrap').length > 0) {

    window.addEventListener('load', function () {
      animateActive();
    });

    window.addEventListener('scroll', function () {
      animateActive();
    });
  }
});