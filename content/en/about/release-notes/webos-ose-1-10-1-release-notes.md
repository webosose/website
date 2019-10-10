---
title: webOS 1.10.1 Release Notes
date: 2018-08-30
weight: 13
toc: true
layout: release-notes
---

This version corresponds to the [GitHub release](https://github.com/webosose/build-webos/releases) of build #91.

## Changed Features

### Base Components

* ROS2
    * Updated meta-ros to use [`legacy`](https://github.com/ros/meta-ros/tree/legacy) branch from [ros/meta-ros](https://github.com/ros/meta-ros).
    * Un-blacklisted many ROS packages as their compilation is now fixed on [`legacy`](https://github.com/ros/meta-ros/tree/legacy) branch.

{{< note >}}
This release is a preparation to use webOS OSE with [ros/meta-ros](https://github.com/ros/meta-ros) using the official ROS build instructions.
{{< /note >}}
