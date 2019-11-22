---
title: Web Applications and Web App Manager in webOS OSE
date: 2019-11-22
slug: wam-in-webos-ose
posttype: article
toc: false
---

**Author: Jungyong Ko**

## The Web's Potential

Ever since PC browsers became popular in the 90s, web technologies have exploded. Many activities in our daily lives happen on the web, such as search, playing media, and bank transactions. The web has an extensive developer community where knowledge can be freely exchanged, and it became even more popular after the emergence of the cloud because it naturally provides a cloud-friendly environment. Moreover, there are contents and infrastructures throughout the globe that can work across various platforms. The potential of the web is enormous.

webOS OSE is a web-centric operating system. It recognizes the power of the web and provides an environment where developers can freely share knowledge and easily transition from one platform to another. webOS OSE does not abandon the advantages of native apps but rather positions itself as an operating system that allows developers to employ both options with minimal barriers.

Leaving the introduction of native apps for later, let us examine web apps in webOS OSE first.

## Web App Manager and Enact in webOS OSE

Conceptually, a web app in webOS OSE runs like a native app, although there is more to it than just the looks. The Web App Manager (WAM) of webOS OSE, the web runtime built on top of Chromium, is able to run web apps as if they were native apps in full screen with full capabilities in terms of features, performance, and memory usage. WAM provides integration with system services like lifecycle management (launching and closing of web apps), CPU optimization, recovery mechanism, access control for security, and an interface to respond to low memory.

{{< figure src="/images/blog/articles/running-youtube.jpg" alt="" caption="A web app running in fullscreen" >}}

If a developer wants to go further, there is a JavaScript framework optimized for webOS OSE, [Enact](https://enactjs.com/). Enact is a React-based framework that provides an efficient way to produce consistent applications using themes and skins. Enact also provides Moonstone, a library for TVs that helps developers design a UI that is intuitive and simple enough for users to navigate while leaning back on their sofas. For more information on how to use Enact, visit the [Enact documentation site](https://enactjs.com/docs/), or to download the source code, visit [GitHub](https://github.com/enactjs/enact).

A thorough guide on how to develop web apps is available on the [webOS OSE site](https://www.webosose.org/docs/guides/development/web-apps/web-app-overview/). It categorizes web apps into two types based on the packaging/delivery method. Developers can choose between external web apps and built-in web apps and follow the development workflow, which includes step-by-step tutorials. There is also guide on how to launch web apps for dual display, available since webOS OSE v2.0.0.