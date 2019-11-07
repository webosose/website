---
title: Network Setup
date: 2019-11-07
weight: 40
toc: true
---

This guide describes how to set up the network between the host machine and the target device.

## Target Device Configuration

You need to configure the network information of the target device to enable communication between the host machine and the target device.

{{< note >}}
The default setting of the webOS OSE is to use Dynamic Host Configuration Protocol (DHCP) and set the network information automatically. Depending on your environment, however, you may need to check if the automatic configuration has been performed correctly. Otherwise, you will need to configure the network information manually.
{{< /note >}}

Follow the steps below to configure the network information on the target device. Make sure that the Ethernet cable is connected beforehand.

1. On the Home Launcher, click the icon of Settings app. <img src="/images/docs/guides/setup/webosose-2_0-homelauncher-settings-icon.png" alt="Settings icon">

    Settings app UI will show up on the left side of the screen.
2. Click the **Network** icon, and you will see the initial status of network setting.
    {{< figure src="/images/docs/guides/setup/webosose-network-setup-1.png" alt="Network Setting - The initial status of network including Wired/Wi-Fi connection"  class="align-left">}}
3. Click the **Wired Connection (Ethernet)** menu. The default network information will be displayed.
    {{< figure src="/images/docs/guides/setup/webosose-network-setup-2.png" alt="Network Setting - Detailed information" class="align-left">}}
4. Click the **Edit** button, and the **EDIT** menu will show up.
    * By default, **Set Automatically** button is checked. To turn on the manual editing mode, uncheck the button.
    {{< figure src="/images/docs/guides/setup/webosose-network-setup-3.png" alt="Network Setting - Manual edit mode"  class="align-left">}}
5. In each field, enter the IP address, subnet mask, gateway, and DNS server information in dot-decimal notation. After you finish entering the information, click the **CONNECT** button.
    * If the status shows up as "Connected to Internet", it means the connection has been set up successfully.
    * Otherwise, retry after checking the address information and the physical connection.

## Communicating between the Host and Target

After the network connection has been set up, you can connect or send files to the target device using Secure Shell (SSH) protocol.

{{< note >}}
The default account information is as follows. (ID: root, password: *none*)
{{< /note >}}

Here are several methods that you can use for host-target communication:

* To connect to the target device, use the `ssh` command on Linux or macOS shell. On Windows, use an SSH client (for example, Putty).
* To send files to the target device, use the `scp` (secure copy) command on Linux or macOS shell. On Windows, use an SSH client that supports secure file transfer (for example, WinSCP).
* In addition, you can use [ares-push]({{< relref "cli-user-guide#ares-push" >}}) or [ares-pull]({{< relref "cli-user-guide#ares-pull" >}}) command of [Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}}) to transfer files between the host machine and the target device.