/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
$(window).on('load', function () {

  if (window.innerWidth > 769) {
    // Fix with sticky sidebar only in Desktop
    var sidebar = new StickySidebar('.sidebar-main', {
      containerSelector: '.sidebar-container',
      innerWrapperSelector: '.sidebar-inner',
      topSpacing: 100,
      bottomSpacing: 20
    });
  }
});

$(document).ready(function () {
  // initialize navgoco sidebar
  if ($(".sidebar-menu").length > 0) {

    $('.sidebar-menu').children().addClass('open');
    $(".sidebar-menu").navgoco({
      caretHtml: '',
      accordion: false,
      openClass: 'open', // open
      save: false, // leave false or nav highlighting doesn't work right
      slide: {
        duration: 250,
        easing: 'swing'
      }
    });

  }

  // add "target=_blank" to external links
  var links = $(".content-main").find("a");

  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
    }
  }

  // handle mobile sidenav btn click
  $('.switch').on('click', function () {
    $(this).toggleClass('on');
    $('.custom-side').toggleClass('show');
  })

  // handle sidebar scroll positioning relative to the current item
  /* ========================================================================
   * component: scroll
   * scrollbar.js: https://gromo.github.io/jquery.scrollbar/demo/basic.html
   * ======================================================================== */
  $('.scrollbar-outer').scrollbar();

  var $li = $('.sidebar-menu ul li.active');
  var $div = $('.scroll-wrapper');
  if ($li.length !== 0) {
    if ($li.position().top > ($div.height() / 2)) {
      $('.scrollbar-outer').scrollTop($li.position().top - $div.offset().top);
    }
  }

});