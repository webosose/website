---
title: How Chromium Helps webOS OSE Build an Ecosystem
date: 2019-11-15
slug: how-chromium-helps-webos-ose-build-an-ecosystem
posttype: article
toc: false
---

**Author: Jungyong Ko**

## Introduction to Chromium

Chromium is a free and open-source browser engine from Google. Similar to Google’s popular operating system, Android, Chromium is a massive open-source project. To give you an idea of how massive it is, here are some figures. Since the first commit in July 2008, it has had 810,704 commits made by 8,102 contributors and took an estimated 8,304 years of effort (measured by COCOMO model)[^1]. The number of patches are more than 10,000 per month, and the lines of code are more than 30 million. In 2019, after ten years from the first release, Google Chrome, the browser that runs on Chromium, accounts for about 70 percent of the browser market share. In addition to its massiveness and dominance in the Internet world, it is also the most popular (i.e., the most extensive ecosystem) open-source browser engine that provides a web environment for embedded devices. Because of all these advantages of Chromium, webOS incorporated it in 2015[^2].

## Use of Chromium in webOS OSE

As the name implies, webOS OSE is a web-centric operating system for embedded devices. Any developers who understand the web standards such as HTML5, CSS, and JavaScript can create applications running on top of devices like Raspberry Pi without in-depth understanding about the hardware. Also, those apps are easy to maintain. They can work across different platforms with minimal effort because their programming language and technologies are standardized. This web-centricity, however, does not mean that webOS OSE completely abandons the advantages of native apps written in C++. Instead, webOS OSE recognizes that the web environment is efficient in terms of efforts required for development and maintenance.

This efficiency also helps webOS OSE build an ecosystem. In a typical development environment for embedded devices, the initial configuration and setup take quite an amount of effort. This initial investment often has a negative effect when it comes to building an ecosystem for a new operating system. Once the developers get used to a particular environment, they are less likely to learn new ones due to many factors, including dependencies of their codes and personal preference. Therefore, to lower the barriers to entry and ultimately to attract more developers, webOS OSE provides an environment for web development, which requires almost no effort for the initial setup, and allows smooth transition from one platform to another because of the standard programming language.

At the core of the web development is the browser engine, and the dominator in the world of the browser engine is Chromium. Chromium helps webOS OSE focus on value addition and differentiation by removing duplicate effort on keeping up with the latest web standards, such as support for the latest codec. Moreover, it allows developers to create their apps for an embedded device right on their PC browsers rather than on the real device or emulator, which requires additional effort to set up and likely to result in dependency of their code. By aligning with Chromium, webOS OSE can provide the ultimate web experience for developers.
 
Aligning with Chromium, however, is not as easy as the importance of it. The new version always improves on performance (e.g., memory usage) and includes security patches and the latest web technologies. Whenever there is an upgrade in the Chromium version, webOS OSE must make sure that the new version is compatible with the underlying hardware and other components of webOS OSE. There is inevitably a time gap between the latest version from Google and the version that webOS OSE supports.
 
As of November 2019, the most up to date version that webOS OSE supports is Chromium 72, and you can find the details of what is included in Chromium 72 on [Google’s developer site] (https://developers.google.com/web/updates/2019/01/nic72). Currently, the plan is to minimize the version gap and continuously optimize the performance of Chromium for webOS OSE to spread the web-centric and cross-platform webOS experience far and wide.

[^1]: Data from https://www.openhub.net/p/chrome
[^2]: In 2015, webOS TV started the adaptation of Chromium and was followed by webOS OSE in 2018.
