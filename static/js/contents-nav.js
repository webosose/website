/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
$(window).on('load', function () {
  // Fix the sidebar menu with sticky sidebar only in desktop resolution
  if ($(".sidebar-main").length > 0 && window.innerWidth > 769) {
    var sidebar = new StickySidebar('.sidebar-main', {
      containerSelector: '.sidebar-container',
      innerWrapperSelector: '.sidebar-inner',
      topSpacing: 100,
      bottomSpacing: 20
    });
  }
});

$(document).ready(function () {
  // set the current page in the page tree
  var menu_items = $('.sidebar-menu ul li a');
  for (var i = 0, item_count = menu_items.length; i < item_count; i++) {
    if (menu_items[i].href == document.location.href.split('#')[0]) {
      $(menu_items[i]).parent('li').addClass('active');
      $(menu_items[i]).parent('li').parents('li').addClass('open');
      break;
    }
  }

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

  // handle sidebar scroll positioning relative to the current active item
  var sidebar_scroll = $('.sidebar .scrollbar-outer');

  if (sidebar_scroll.length > 0) {
    sidebar_scroll.scrollbar();

    var active_li = $('.sidebar-menu ul li.active');
    var scroll_wrapper = $('.sidebar .scroll-wrapper');
    if (active_li.length !== 0) {
      if (active_li.position().top > (scroll_wrapper.height() / 2)) {
        sidebar_scroll.scrollTop(active_li.position().top - scroll_wrapper.position().top);
      }
    }
  }

  // handle TOC scroll positioning relative to the current active item
  var toc_scroll = $('.toc-main .scrollbar-outer');

  if (toc_scroll.length > 0) {
    toc_scroll.scrollbar();

    $(window).scroll(function () {
      var toc_active_li = $('.toc-menu ul li.is-active-li');
      var toc_scroll_wrapper = $('.toc-main .scroll-wrapper');
      if (toc_active_li.length !== 0) {
        if (toc_active_li.position().top > (toc_scroll_wrapper.height() / 2)) {
          toc_scroll.scrollTop(toc_active_li.position().top - (toc_scroll_wrapper.height() / 2) - toc_scroll_wrapper.position().top);
        }
      }
    });
  }

  // add "target=_blank" to external links
  var links = $(".content-main").find("a");

  for (var i = 0, linkCount = links.length; i < linkCount; i++) {
    if ($.trim(links[i].href) != 'javascript:' && links[i].hostname != window.location.hostname) {
      links[i].target = '_blank'
      links[i].rel = 'noopener'; // added to improve security (prevent reverse tabnabbing attack)
    }
  }

  // handle mobile sidenav btn click
  $('.switch').on('click', function () {
    $(this).toggleClass('on');
    $('.custom-side').toggleClass('show');
  })
});
