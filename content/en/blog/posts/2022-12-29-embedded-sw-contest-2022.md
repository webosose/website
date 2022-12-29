---
title: Embedded SW Contest 2022
display_title: The World Embedded Software Contest 2022
date: 2022-12-29
slug: embedded-sw-contest-2022
posttype: article
toc: true
thumbnail: th-eswc-2022.jpg
---

## Introduction

[The World Embedded Software Contest](https://www.eswcontest.or.kr/) (Korean website), celebrating its 20th anniversary, is the only and biggest embedded SW contest in Korea. webOS has been joining as one of the contest categories since 2019.

The winner of this year's The World Embedded Software Contest is the "Home++" project. (Team: Bang-Pa-Je) This project focuses on wall pads which are commonly found in many Korean houses. Using the wall pads and webOS OSE, the team shows a demo of several useful features which can be adopted for many homes.

Let's see a demo video of the project (Korean only).

{{< youtube NKqtxh3rhbs >}}

{{< note >}}
If you are also curious about the previous winner of the contest, see [Use Case - Vehicle to Smart Home Solution]({{< relref "2022-02-08-vehicle-to-smart-home-solution" >}}).
{{< /note >}}

## System Architecture
  
The following figure shows the overall system architecture.

{{< figure src="/images/blog/articles/eswc-2022-system-architecture.jpg" alt="The overall system architecture of the project" >}}

| Component | Description |
|-----------|-------------|
| Wall Pad | This component is the primary device of this project. Through the wall pad, users can control various features of this project. |
| Security Office | This component takes pictures of Vehicle Identification Numbers (VINs), and determines whether the vehicles is authorized or not. |
| Server | This server stores workout videos, notice board data, VINs, etc. |
| Entrance | This component detects vehicles and sends a signal to the security office. |

{{< note >}}
To check the device and SW prerequisites for each feature, refer to README files under `main-*` directories. ([GitHub repository](https://github.com/ymw0407/2022ESWContest_webOS_3013))
{{< /note >}}

## Features

The key features of the project are as follows:

- Anti-theft delivery system
- Home security camera
- Personal workout assistant
- Home appliance control
- Authorized vehicle management
- Appstore support

### Anti-theft Delivery System

This feature monitors the status of delivered packages at the front door.

When a package is delivered, webOS detects it through the camera. If the item is recognized as a delivered package, webOS starts to record a video. Then, if the package is not detected for a certain amount of time, webOS asks users whether they got the package or not.

{{< figure src="/images/blog/articles/eswc-2022-anti-theft-flowchart.png" caption="" alt="Flowchart of the anti-theft delivery system" >}}

### Home Security Camera

In a webOS app, users can check videos from security cameras (ESP32-CAM). This feature supports live streaming, so that users can check the videos in real-time.

{{< figure src="/images/blog/articles/eswc-2022-security-camera-overview.png" caption="" alt="Overview of the home security camera" width="60%" >}}

### Personal Workout Asssitant

This feature analyzes the information about users' workouts (posture, speed, reps, etc.) based on recorded videos.

Once users record a video of their workouts using the app, the app extracts workout statistics and uploads the video to the streaming server. After that, the app shows the graph and video of the workout.

{{< figure src="/images/blog/articles/eswc-2022-workout-assistant-flowchart.png" caption="" alt="Flowchart of the personal workout assistant" >}}

### Home Appliance Control

This feature schedules the operation of home appliances.

Users can create a schedule on the notice board of the web server (implemented using [Express](https://expressjs.com/)). This schedule will be transferred to the webOS device through the [MQTT](https://mqtt.org/) protocol and generates a request. If the user accepts the request, the control device creates an operation schedule.

Users also can control home appliances using the webOS app or switches in the control panel.

{{< figure src="/images/blog/articles/eswc-2022-home-appliance-control-flowchart.png" caption="" alt="Flowchart of the home appliance control" >}}

### Authorized Vehicle Management

This feature manages the list of authorized vehicles permitted to enter the parking lot.

Users enter the vehicle's VIN and parking period. This information will be saved in the database ([MongoDB](https://www.mongodb.com/)). When a vehicle arrives at the parking lot, the security office compares the VIN with the list in the database.

{{< figure src="/images/blog/articles/eswc-2022-vehicle-management-flowchart.png" caption="" alt="Flowchart of the authorized vehicle management" >}}

### App Store Support

One of the biggest problems with the existing wall pads is that it is hard to add new features to the wall pad. Team Bang-Pa-Je suggested an app store as a solution for this problem. Developers can upload various apps to the app store so that users can download & install the apps they need.

{{< figure src="/images/blog/articles/eswc-2022-app-store.jpg" caption="" alt="Demo appstore of the project" >}}

## Winner's Review

Members of the team Bang-Pa-Je summarize their experience developing with webOS OSE as follows:

> In webOS, users can run web apps and services directly on the platform. we think it is one of the biggest strengths of webOS that should be taken care of. Also, many functionalities of LS2 APIs help us to implement many features using webOS.
>
> But there are still some stability issues to be resolved, and the need for developer materials causes a steep learning curve of webOS.

## Resources

- Source code: [GitHub](https://github.com/ymw0407/2022ESWContest_webOS_3013) (Korean only)
- Video demo: [YouTube](https://www.youtube.com/watch?v=NKqtxh3rhbs) (Korean only)