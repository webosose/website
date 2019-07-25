/*
 * Copyright (c) 2019 LG Electronics Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
// add anchors to headings from H2 to H6 on the content area, using AnchorJS (https://github.com/bryanbraun/anchorjs)
function addAnchorTags() {
  anchors.options = {
    visible: 'touch'
  }

  anchors.add('.content-main h2, .content-main h3, .content-main h4, .content-main h5, .content-main h6');
}

$(function () {
  addAnchorTags();
});