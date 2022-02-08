---
title: Use Case - Vehicle to Smart Home Solution
date: 2022-02-08
slug: vehicle-to-smart-home-solution
posttype: article
toc: true
thumbnail: th-vehicle-to-smart-home-solution.png
---

**Author: Heeam Shin**

## Introduction

Many developers had gathered for [The World Embedded Software Contest 2021](https://eswcontest.or.kr/main/main.php) (Korean only). The webOS division was among the most popular picks with contest participants. After a fierce competition, Team Three Americano's project (Title: SMILE - Smart Mobility Improving Life Experience) won the top prize.

Team Three Americano developed a solution that checks and controls home appliances using a car dashboard running on webOS OSE and a smartphone application. Using this solution, users can easily check the status of home appliances and control them, for example, turning on/off the air conditioner or lights.

See the demo video of the project (Korean only).

{{< youtube ZO1fI2EKnug >}}

{{< note >}}
If you are also curious about the previous winner of the contest, see [Use Case -  Smart window implemented with webOS OSE]({{< relref "2021-02-10-smart-window-implemented-with-webos-ose" >}}).
{{< /note >}}

## Features

The key features of the project are as follows:

- User authentication using face detection and email log-in
- Remote control for home appliances
- Scheduling and grouping for remote control
- Real-time sensing for the status of home
- Voice recognition & TTS (Text-to-speech) for control

## System Architecture
  
The following figure shows the overall system architecture.

<!-- {{< figure src="/images/blog/articles/IMG_6665.jpg" alt="The overall system architecture of the project" >}} -->
{{< figure src="/images/blog/articles/eswc-2021-system-architecture.png" alt="The overall system architecture of the project" >}}

<div style="text-align:center;">Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- Client

  - webOS OSE for car dashboard and real-time communication
  - Android for mobile app
  - ESP32 module for the smart home hub

- DB & MQ Server

  - Firebase
  - RabbitMQ Broker

- Processing Server

  - Raspbian for internal processing server (using OpenCV, TensorFlow, and OpenVPN)

## Implementation

In this section, we look at webOS-related features of the project.

### Car Dashboard

webOS OSE is used for the car dashboard, especially for the dashboard UI. With the help of webOS OSE and [Enact Framework](https://enactjs.com/), developers can create web-based dashboard UI easily.

{{< figure src="/images/blog/articles/eswc-2021-car-dashboard.png" caption="Car dashboard screens" >}}

### LS2 API

[LS2 API]({{< relref "ls2-api-index" >}}) is an interface to access system services via Luna Bus and use their functionalities. In this project, LS2 APIs are used to implement the following features:

- A user can log in even the device has a broken network connection using the [com.webos.service.db API]({{< relref "com-webos-service-db" >}}).
- webOS-style toast messages are implemented using the [com.webos.notification API]({{< relref "com-webos-notification" >}}).

{{< figure src="/images/blog/articles/eswc-2021-email-authentication-screen.png" caption="Email authentication screen" width="600px" >}}

### JavaScript Service

webOS OSE supports JavaScript service based on [Node.js](https://nodejs.org/en/). So without efforts to learn C or C++, which are popular languages for implementing background services, developers can implement native services using JavaScript. In this project, the listener for MQTT and Firebase is implemented in JavaScript.

{{< note >}}
For more information about how to develop with JavaScript on webOS OSE, see [JS Services Overview]({{< relref "js-service-overview" >}}).
{{< /note >}}

## Summary

So far, we have discovered the smart home project using webOS OSE. In this project, we can look at how to use webOS OSE with other widely used technologies.

Lastly, Team Three Americano sent their impression on using the webOS platform as below:

> Our team members first met the webOS OSE platform through The World Embedded Software Contest 2021. We were concerned about developing the project with an unfamiliar platform, but soon that concern was gone. We were able to successfully accomplish our development with the help of the following webOS OSE features: We used the Enact framework to develop a web app for the car dashboard. This allows us to develop more flexibly by using familiar standard HTML languages and and Node package manager (NPM) of Node.js that allows us to utilize many libraries. Also, we were able to utilize webOS OSE's various functionalities by using LS2 APIs, without having to deeply dig into the underlying webOS OSE system.
> 
> There are two things we'd like to point out. In the early stage of development, it was difficult to find information or sample codes for the Enact framework, which made us confused. Also, a high level of expertise was required to import and integrate 3rd party components into the underlying system, despite the fact that webOS OSE has a flexible architecture in which such components can be imported during build time.

The content of Team Three Americano's work is available at their GitHub page: [2021ESWContest_webOS_3025](https://github.com/ThreeAmericano).