---
title: Overview
date: 2018-05-12
weight: 10
toc: false
---

webOS supports native applications which are deployed as platform native binaries. Native apps are developed using C/C++ and run in the system.

Developing a native app is typically a much bigger effort than developing web apps or QML apps. However, there are two primary reasons for choosing to develop native apps:

- Need for high performance.
- Much greater control over app performance in various scenarios.

{{< note "Important Points" >}}
- Native apps can call webOS service through luna-service2 library.
- A native app must register itself to System and Application Manager (SAM) by calling the **`registerApp`** method. It establishes a connection between the SAM and the native app. The SAM can then pass launch status (such as "registered" or "relaunch") and launch parameters to the native app through the connection.
- For UI of the native app, you can use Qt or QML.
{{< /note >}}
