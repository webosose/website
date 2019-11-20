---
title: webOS OSE 2.1.0 Release
date: 2019-11-20
slug: webos-ose-2-1-0-release
posttype: release
toc: false
---

We're delighted to announce the release of webOS Open Source Edition (OSE) 2.1.0.

The highlights of this release are as follows:

  - [Change of the default logging system to journald](#change-of-the-default-logging-system-to-journald)
  - [Japanese Virtual Keyboard support and iLib upgrade](#japanese-virtual-keyboard-support-and-ilib-upgrade)
  - [Bug fix and improvements](#bug-fix-and-improvements)

For more details on this release, see the [release notes]({{< relref "webos-ose-2-1-0-release-notes" >}}).

## Change of the default logging system to journald

The default logging system has been changed from pmlogd to **journald**. That is, on webOS OSE 2.1.0 or higher, journald is enabled and pmlogd is disabled by default.

journald lets you view data logged from various sources including syslog call, standard output and error (stdout/stderr), kernel message (kmsg), and other logging mechanisms, whereas pmlogd only provides messages logged via syslog call. Therefore, with journald, you can use more logging data to trace and debug your program.

To reflect the change and improve comprehensibility, we've refactored the documentation. The new [logging guide]({{< relref "logging-overview" >}}) mainly consists of the following sections:

  - [Formatting logs]({{< relref "pmloglib-overview" >}})
      - How you can format log messages using the PmLogLib library and its APIs
      - How you can set the logging context and level
  - [Viewing logs]({{< relref "introduction-to-viewing-logs" >}})
      - How to view logs when journald is enabled (default)
      - How to view logs when pmlogd is enabled (optional)

We recommend that you read the updated documentation so you can get familiar with the new logging system.

## Japanese Virtual Keyboard support and iLib upgrade

This release brings you a couple of enhancements in terms of the internationalization/localization (i18n/l10n) capability.

  - Japanese Virtual Keyboard (VKB) is now newly supported, in addition to 64 languages that have been supported so far. We believe that those of you who develop apps requiring Japanese input or test with Japanese websites can benefit from this feature.
  - iLib, the library used for localization in webOS OSE, has been upgraded from v14.2.0 to v14.4.0. For details, see the library's [release notes](https://github.com/iLib-js/iLib/releases/tag/v14.4.0).

## Bug fix and improvements

This release also includes the following improvements:

  - webOS OSE 2.0.0 had an issue where Home Launcher is hung up after an app is installed. This issue has been fixed.
  - From this version, VirtualBox Emulator supports dual display. You can test the dual-display environment on the emulator after setting the monitor count to 2.
