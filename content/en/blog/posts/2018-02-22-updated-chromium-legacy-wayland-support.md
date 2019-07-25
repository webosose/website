---
title: Updated Chromium Legacy Wayland Support
date: 2018-02-22
slug: updated-chromium-legacy-wayland-support
posttype: article
toc: true
---

**Author: José Dapena Paz**

## Introduction

Future Ozone Wayland backend is still not ready for shipping. So we are announcing the release of an updated Ozone Wayland backend for Chromium, based on the implementation provided by Intel. It is rebased on top of latest stable Chromium release and you can find it in [my team Github](https://github.com/lgsvl/chromium-src). Hope you will appreciate it.

## Official Chromium on Linux desktop nowadays

Linux desktop is progressively migrating to use Wayland as the display server. It is the default option in Fedora, Ubuntu and, more importantly, the next Ubuntu Long Term Support release will ship Gnome Shell Wayland display server by default.

As is, now, Chromium browser for Linux desktop support is based on X11. This means it will natively interact with an X server and with its XDG extensions for displaying the contents and receiving user events. But, as said, next generation of Linux desktop will be using Wayland display servers instead of X11. How is it working? Using XWayland server, a full X11 server built on top of Wayland protocol. OK, but that has an impact on performance. Chromium needs to communicate and paint to X11 provided buffers, and then, those buffers need to be shared with Wayland display server. And the user events will need to be proxied from the Wayland display server through the XWayland server and X11 protocol. It requires more resources: more memory, CPU, and GPU. And it adds more latency to the communication.

## Ozone

Chromium supports officially several platforms (Windows, Android, Linux desktop, iOS). But it provides abstractions for porting it to other platforms.

The set of abstractions is named Ozone ([more info here](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/ozone_overview.md)). It allows to implement one or more platform components with the hooks for properly integrating with a platform that is in the set of officially supported targets. Among other things it provides abstractions for:

  - Obtaining accelerated surfaces.

  - Creating and obtaining windows to paint the contents.

  - Interacting with the desktop cursor.

  - Receiving user events.

  - Interacting with the window manager.

## Chromium and Wayland (2014-2016)

Even if Wayland was not used on Linux desktop, a bunch of embedded devices have been using Wayland for their display server for quite some time. LG has been shipping a full Wayland experience on the webOS TV products.

In the last 4 years, Intel has been providing [an implementation of Ozone abstractions for Wayland](https://github.com/intel/ozone-wayland). It was an amazing work that allowed running Chromium browser on top of a Wayland compositor. This backend has been the de facto standard for running Chromium browser on all these Wayland-enabled embedded devices.

But the development of this implementation has mostly stopped around Chromium 49 (though rebases on top of Chromium 51 and 53 have been provided).

## Chromium and Wayland (2018+)

Since the end of 2016, [Igalia](https://www.igalia.com/) has been involved on several initiatives to allow Chromium to run natively in Wayland. Even if this work is based on the original Ozone Wayland backend by Intel, it is mostly a rewrite and adaptation to the future graphics architecture in Chromium (Viz and Mus).

This is being developed in the Igalia GitHub, downstream, though it is expected to be landed upstream progressively. Hopefully, at some point in 2018, this new backend will be fully ready for shipping products with it. But we are still not there. Some major missing parts are Wayland TextInput protocol and content shell support.

More information on these posts from the authors:

  - [June 2016: Understanding Chromium’s runtime ozone platform selection (by Antonio Gomes)](https://blogs.igalia.com/tonikitoo/2016/06/14/understanding-chromiums-runtime-ozone-platform-selection/).

  - [October 2016: Analysis of Ozone Wayland (by Frédéric Wang)](http://frederic-wang.fr/analysis-of-ozone-wayland.html).

  - [November 2016: Chromium, ozone, wayland and beyond (by Antonio Gomes)](https://blogs.igalia.com/tonikitoo/2016/11/14/chromium-ozone-wayland-and-beyond/).

  - [December 2016: Chromium on R-Car M3 & AGL/Wayland (by Frédéric Wang)](http://frederic-wang.fr/chromium-on-r-car-m3.html).

  - [February 2017: Mus Window System (by Frédéric Wang)](http://frederic-wang.fr/mus-window-system.html).

  - [May 2017: Chromium Mus/Ozone update (H1/2017): wayland, x11 (by Antonio Gomes)](https://blogs.igalia.com/tonikitoo/2017/05/17/chromium-musozone-update-h12017-wayland-x11/).

  - [June 2017: Running Chromium m60 on R-Car M3 board & AGL/Wayland (by Maksim Sisov)](https://blogs.igalia.com/msisov/2017/06/09/running-chromium-m60-on-r-car-m3-board-aglwayland/).

## Releasing legacy Ozone Wayland backend (2017-2018)

OK, so new Wayland backend is still not ready in some cases, and the old one is unmaintained. For that reason, LG is announcing the release of an updated legacy Ozone Wayland backend. It is essentially the original Intel backend, but ported to current Chromium stable.

Why? Because we want to provide a migration path to the future Ozone Wayland backend. And because we want to share this effort with other developers, willing to run Chromium in Wayland immediately, or that are still using the old backend and cannot immediately migrate to the new one.

{{< caution >}}
If you are starting development for a product that is going to happen in 1-2 years... Very likely your best option is already migrating now to the new Ozone Wayland backend (and help with the missing bits). We will stop maintaining it ourselves once new Ozone Wayland backend lands upstream and covers all our needs.
{{< /caution >}}

What does this port include?

  - Rebased on top of Chromium m60, m61, m62 and m63.

  - Ported to GN.

  - It already includes some changes to adapt to the new Ozone Wayland refactors.

It is hosted at <https://github.com/lgsvl/chromium-src>.

Enjoy it\!
