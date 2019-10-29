---
title: Setting Up Dual Displays with Touchscreens on Raspberry Pi 4
date: 2019-10-29
weight: 50
toc: true
---

This guide describes how to set up dual displays on your Raspberry Pi (RPi) 4.

## Before You Begin

Prepare two touchscreens that meet the [Target Device Requirements]({{< relref "system-requirements#target-device-requirements" >}}).

## Port Order

If you use a touchscreen as a display device for RPi4, the touchscreen needs inputs for display and touch interface. In RPi 4, the display signal is delivered by HDMI and the touch interface signal is delivered by USB.

In case you use only one touchscreen, you can use all HDMI and USB ports. But if you want to use dual displays with RPi 4, you have to follow a certain port-order rule.

{{< figure src="/images/docs/guides/setup/rpi4-port-information.png" alt="" caption="Raspberry Pi 4 with port numbers">}}

### HDMI Port Order

The HDMI order of RPi 4 is fixed as below. (The above picture shows the mapping of HDMI display port numbers for RPi 4.)

* HDMI0
* HDMI1

If both are connected, HDMI0 and HDMI1 work as the primary and secondary display, respectively. If one of them is connected, the connected display device works as the primary display.

{{< note >}}
Hot plugging of display devices is not supported. Hence you must connect all display devices needed before powering on your target device.
{{< /note >}}

### USB Port Order

The USB order is determined by the USB bus topology. A USB port in a lower number takes precedence. (See the picture above for the mapping of USB port numbers for RPi 4.)

For example, suppose you connect two touchscreens and the USB ports of the touchscreens are connected to the **n**-th port and **m** (where n < m). Then the touchscreen connected to the **n**-th port will work with the **primary** touch interface while the other will work with the **secondary** touch interface.

#### Using USB Hub

{{< figure src="/images/docs/guides/setup/usb-hub-for-dual-display.png" alt="" caption="USB Hub with fixed port numbers">}}

This rule also applies in case you use USB touchscreens with a USB hub. A touchscreen connected to a lower port number of your USB hub will take precedence. (see the picture above.) Some USB hub shows port numbers as shown in the above picture. In case there is no port number printed in your USB hub, then try to figure out the order by doing some tests.

## Setting Up Dual Displays

As described above, each HDMI and USB port has the port number and the number determines the precedence. To use dual touchscreens, you have to match the precedence of the HDMI and USB port.

For example, suppose you have **A** and **B** (both are touchscreen) and connect them to the RPi 4. If the HDMI of **A** is connected as the primary display (which means the port number of HDMI is lower than that of **B**), you have to connect the USB of A as the primary touch interface (which means the port number of USB is lower than that of **B**).