/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize tocbot
$(function () {
  tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.toc-menu',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.content-main',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h2, h3',
    collapseDepth: 6,
    orderedList: false,
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset: 1,
    // Timeout between events firing to make sure it's
    // not too rapid (for performance reasons).
    throttleTimeout: 10,
    // Element to add the positionFixedClass to.
    positionFixedSelector: '.toc-main',
    // Fixed position class to add to make sidebar fixed after scrolling
    // down past the fixedSidebarOffset.
    positionFixedClass: 'is-position-fixed',
    // fixedSidebarOffset can be any number but by default is set
    // to auto which sets the fixedSidebarOffset to the sidebar
    // element's offsetTop from the top of the document on init.
    fixedSidebarOffset: 'auto',
  });
});