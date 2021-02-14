---
title: Use Case -  Smart window implemented with webOS OSE
date: 2021-02-10
slug: smart-window-implemented-with-webos-ose
posttype: article
toc: true
thumbnail: th-smart-window-implemented-with-webos-ose.jpg
---

**Author: Jaeduck Oh**

## Introduction

Last year, LG Electronics opened the webOS section at the Embedded SW Contest to see how the webOS platform could be used for connected car services and received project proposals from contest participants.

The Embedded SW Contest is an event that has been held every year since 2003 to develop the embedded SW industry in Korea, acquire creative and innovative embedded SW ideas, and train competent professionals.

In the webOS section of the 18th Embedded SW Contest, five of the 10 finalists advanced to the finals, and three teams won the Best, Excellence, and Encouragement Awards. Among them, the HY-MEC team who developed the "webOS-based infotainment solution for vehicles" won the Best Award.

See the full video:
{{< youtube 4Wrugbkrf6Q >}}
- “[Sunshine (Free Download)](https://soundcloud.com/liqwyd/sunshine)” by LiQWYD is licensed under a [Creative Commons License](http://creativecommons.org/licenses/by/3.0).

The HY-MEC team developed a solution that uses AR technology to provide information about the surroundings of the vehicle to passengers through displays on the side windows.

{{< figure src="/images/blog/articles/the-side-of-a-self-made-vehicle-model.png" alt="" caption="the side of a self-made vehicle model" >}}

{{< figure src="/images/blog/articles/screen-that-provides-passengers-with-information-about-their-surroundings.png" alt="" caption="screen that provides passengers with information about their surroundings" >}}

## Features of The Connected Window

The key features of the "webOS-based vehicle infotainment solution" include:

- Recognizing passengers
- Checking the passenger's sleep status
- Checking trunk status
- Setting destination
- Checking traffic conditions
- Obtaining and interacting with external information
- Recommending travel theme

## Hardware and Communication

The HY-MEC team used Nvidia's Jetson TX2 board to recognize objects and process images by obtaining data from external cameras, and all other features employed the Raspberry Pi 4 board where a webOS OSE image is mounted. Most of the features shown on the screen are available to passengers through a web application.

WebSocket is used for communication between the Jetson board and the webOS device. Compared to traditional communication models, using WebSocket has the advantage that continuous communication between the server and clients can be maintained once their connection is established.

{{< figure src="/images/blog/articles/websocket-based-data-communication.png" alt="" caption="WebSocket-based data communication" >}}

## Web-based Application

webOS is a web-centric and usability-focused software platform for smart devices, so developers can develop not only applications but also services using web technology in the webOS platform.

- To learn more about web application development, visit: [web app overview](/docs/guides/development/web-apps/web-app-overview)

- To learn more about javascript service development, visit: [js service overview](/docs/guides/development/js-services/js-service-overview)

Inspired by the card-view UI theme of webOS, the main screen developed by the HY-MEC team helps you access each function intuitively. Web technology also makes it easy to provide an optimized UI for logged in users to the connected window.

{{< figure src="/images/blog/articles/main-screen-of-the-connected-window.png" alt="" caption="main screen of the connected window" >}}

If the connected window is connected to the Internet, it can easily get external information and present them to passengers. When you develop a web application in the webOS platform, you can easily import an external service page into your web application.

{{< figure src="/images/blog/articles/a-feature-that-find-travel-themes.png" alt="" caption="a feature that find travel themes" >}}

## Using Luna Service API

The webOS platform provides a notification service. Developers can simply send a message to display to the notification service via Luna Bus. The message is displayed at the upper right corner as shown below.

- To learn more about the notification service, visit: [notification serivce](/docs/reference/ls2-api/com-webos-notification)

{{< figure src="/images/blog/articles/messages-for-passengers-developed-using-the-notification-service.png" alt="" caption="messages for passengers developed using the notification service" >}}

## AR Features for Interacting

The HY-MEC team chose AR technology to provide Infotainment most effectively to passengers. They used webGL and three.js library to bring an AR character created by using the blender to the web application. The character was developed to help passengers with Text-to-Speech (TTS) assistance which reads aloud description text of passenger selected items.

{{< figure src="/images/blog/articles/interaction-using-the-AR-technology.png" alt="" caption="interaction using the AR technology" >}}

## Conclusion

The HY-MEC team sent their impression on using the webOS platform for developing the connected window to us as below.

> webOS is an embedded operating system with a lot of potentials. Our team used webOS for the purpose of developing infotainment solutions for vehicles for this contest. The advantages of the webOS platform that we experienced during development were that it did not have to be tied to the development language, that it could use various web-based services, and that it could use the system functions via LS API.  However, the regrettable part was that webOS provides an awful lot of functions and its potential cannot be manifested effectively if you make only partial use of them. We designed and developed a service called Connected Window and verified the possibility that webOS can be applied to many areas.

You can realize your bright ideas with webOS OSE, just like the HY-MEC team who demonstrated Connection Window.

If you have developed anything with webOS OSE, please share it. webOS OSE is always OPEN.
