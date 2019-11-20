/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
$(document).ready(function () {
  // Determine the number of blog posts to display on a single page, depending on the resolution (device type)
  var pageOffset = 9;
  if (window.innerWidth > 1185) { //PC
    pageOffset = 9;
  } else if (window.innerWidth >= 769 && window.innerWidth <= 1185) { //tablet
    pageOffset = 6;
  } else if (window.innerWidth < 769) { // mobile
    pageOffset = 6;
  }

  // Handle filtering operation on blog posts
  var options = {
    valueNames: ["tag"],
    page: pageOffset,
    pagination: true
  };

  var searchList = new List("search-results", options);
  var activeFilters = [];

  // onClick handler for category filter buttons
  $('.blog-filter-box .btn-wrap button').on('click', function () {
    $(this).toggleClass('selected');
    var $dataFilter = $(this).attr('data-filter');
    if ($(event.target).hasClass('selected')) {
      activeFilters.push($dataFilter);
    } else {
      activeFilters.splice(activeFilters.indexOf($dataFilter), 1);
    }

    searchList.filter(function (item) {
      if (activeFilters.length > 0) {
        return activeFilters.indexOf(item.values().tag) > -1;
      }
      return true;
    });
  });

  // Handle pagination
  $(".pagination-next").click(function () {
    $(".pagination .active").next().trigger("click");
  });
  $(".pagination-prev").click(function () {
    $(".pagination .active").prev().trigger("click");
  });
  $('.pagination-first').on('click', function () {
    searchList.show(1, pageOffset)
  });
  $('.pagination-last').on('click', function () {
    var iData = searchList.matchingItems.length;
    var iOffsetData = searchList.matchingItems.length % pageOffset;
    var iStartData;
    if (iOffsetData === 0) {
      if (pageOffset === 1) {
        iStartData = iData;
      } else {
        iStartData = iData - pageOffset + 1;
      }
    } else {
      iStartData = iData - iOffsetData + 1;
    }

    searchList.show(iStartData, pageOffset);
  });

});