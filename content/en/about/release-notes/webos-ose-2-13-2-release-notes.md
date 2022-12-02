---
title: webOS OSE 2.13.2
display_title: webOS OSE 2.13.2 Release Notes
date: 2021-10-22
weight: 29
toc: true
layout: release-notes
---

This version corresponds to the [GitHub releases](https://github.com/webosose/build-webos/releases) from build #387 to build #396.

## New and Changed Features

### Managers & Services

#### Connectivity

- Bluetooth Manager
  - Updated BLE mesh API

### Base Components

#### Display

- Qt
  - Integrated Qt 6.2 LTS

#### i18n

  - Updated iLib to v14.9.2

## Fixed Issues

  - n/a

## Known Issues

  - Information about the operating system (osInfo) cannot be obtained.
  - The connectionmanager API's `getstatus` method returns `LunaService Error` if the wired ethernet cable is unplugged.
  - The `date` command through serial connection doesn't return correct values of date and time.
