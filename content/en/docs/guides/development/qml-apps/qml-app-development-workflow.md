---
title: QML App Development Workflow
date: 2018-05-12
weight: 20
toc: false
---

This page outlines the steps to develop QML apps for webOS Open Source Edition (OSE).

Developing a QML app requires the following steps:

1. Implement

    - Writing the QML app code (including `main.qml`)
    - Preparing `README.md` that describes the project

2. Configure

    - Configuring the app metadata file (`appinfo.json`)
    - Configuring the qmake project file (`<QML_app_name>.pro`)

3. Build

    - Writing a recipe to build the app on the Yocto build environment
    - Configuring the local source directory
    - Building the app

4. Run and verify

    - Installing and running the app on the target
    - Verifying the app functionality

5. Deploy

    - Adding the app to the webOS OSE build recipe
    - Building the webOS OSE image
    - Flashing the image to the target

For a step-by-step tutorial with detailed instructions, see [Developing QML Apps]({{< relref "developing-qml-apps" >}}).
