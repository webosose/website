---
title: Dual-Display Setup
display_title: Setting Up Dual Displays with Touchscreens on Raspberry Pi 4
date: 2020-03-30
weight: 50
toc: true
---

From version 2.0.0, webOS Open Source Edition (OSE) supports dual displays and provides UI/UX optimized for touch interface. If you want to use multiple touchscreen displays on webOS OSE, you must follow certain rules.

This guide describes how to set up dual displays with touchscreens on your Raspberry Pi (RPi) 4.

## Before You Begin

Prepare two touchscreens that meet the [Target Device Requirements]({{< relref "system-requirements#target-device-requirements" >}}).

## How to Set Up Dual Displays

### Port Number in Raspberry Pi 4

To set up multiple touchscreens properly, first you need to know about the port number.

{{< figure src="/images/docs/guides/setup/rpi4-port-information.png" alt="" caption="Interface ports with numbers in Raspberry Pi 4">}}

Every interface port on RPi 4 has a number as shown in the above figure. For the same type of the ports, the lower numbered port takes precedence over the higher one.

For example, suppose you connect two USB ports to the **n**-th port and **m**-th port for touch interface (where n < m). Then the **n**-th port will work as the **primary** touch interface while the other will work as the **secondary**. The same principle can be applied to the HDMI ports. If HDMI0 and HDMI1 are connected, HDMI0 and HDMI1 work as the primary and secondary display, respectively.

{{< note >}}
Hot plugging of display devices is not supported. Hence you must connect all display devices needed before powering on your target device.
{{< /note >}}

#### (Optional) Using USB Hub

{{< figure src="/images/docs/guides/setup/usb-hub-for-dual-display.png" alt="" caption="USB Hub with fixed port numbers">}}

If you use a USB hub, a touchscreen connected to a lower port number of your USB hub will take precedence. (See the picture above.) Some USB hub shows port numbers as shown in the above picture. In case there is no port number printed in your USB hub, then try to figure out the order by doing some tests.

### Setting Up Dual Displays

As described so far, each HDMI and USB port has the port number and the number determines the precedence. To use dual displays with touchscreens, you have to match the precedence of the HDMI and USB port.

For example, suppose you have **A** and **B** (both are touchscreen) and connect them to the RPi 4. If the HDMI of **A** is connected as the primary display (which means the port number of HDMI is lower than that of **B**), you have to connect the USB of A as the primary touch interface (which means the port number of USB is lower than that of **B**).
