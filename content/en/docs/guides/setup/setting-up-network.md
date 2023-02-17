---
title: Network Setup
date: 2023-02-06
weight: 40
toc: true
---

This guide describes how to set up the network on the webOS OSE device.

## Setting Up Wired Network (Dynamic)

webOS OSE sets the network information automatically when you use Dynamic Host Configuration Protocol (DHCP). So you don't need to set up additionally.

Depending on your environment, however, you may need to check if the automatic configuration has been performed correctly. Otherwise, you will need to configure the network information manually. In this case, see [Setting Up Wired Connection (Static)](#setting-up-wired-connection-static).

## Setting Up Wired Network (Static)

Before you begin, prepare the followings information about your static network:

- IP address
- Subnet mask
- Gateway
- DNS server

Then, follow the steps below to configure the static network. Make sure that the Ethernet cable is connected beforehand.

1. Click the Settings Application or press the **F1** key.

    {{< figure src="/images/docs/guides/setup/network-setup-settings-app.jpg" alt="Setting app icon" class="align-left" width="60%">}}

2. Go to **Network** > **Wired Connection (Ethernet)**. The default network information will be displayed.

    {{< figure src="/images/docs/guides/setup/network-setup-network-menu.jpg" alt="Network Setting - The initial status of network including Wired/Wi-Fi connection" class="align-left">}}

3. Click the **Edit** button.

    {{< figure src="/images/docs/guides/setup/network-setup-edit-button.jpg" alt="Edit button in the ethernet setup menu" class="align-left">}}

4. Deactivate the **Set Automatically** button. Then input fields will be activated.

    {{< figure src="/images/docs/guides/setup/network-setup-deactivate-set-automatically-button.jpg" alt="Deactivate the set automatically button" class="align-left">}}

5. Enter the information of your network and click the **CONNECT** button.

    {{< figure src="/images/docs/guides/setup/network-setup-edit-network-information.jpg" alt="Edit the network information" class="align-left">}}

## Setting Up Wireless Network

1. Click the Wi-Fi icon in the status bar.
   
    {{< figure src="/images/docs/guides/setup/network-setup-wifi-select-wifi.jpg" alt="Edit the network information" class="align-left">}}

2. Click the Wi-Fi you want to connect, enter the password, and click the **Connect** button.

    {{< figure src="/images/docs/guides/setup/network-setup-wifi-click-connect.jpg" alt="Edit the network information" class="align-left">}}

    If the connection suceeds, a notification shows up.

    {{< figure src="/images/docs/guides/setup/network-setup-wifi-connected.jpg" alt="Edit the network information" class="align-left">}}

3. Go back to the Wi-Fi menu in the status bar. You can see the connected Wi-Fi in the list.

    {{< figure src="/images/docs/guides/setup/network-setup-wifi-connected-wifi.jpg" alt="Edit the network information" class="align-left">}}

4. Further network information of the connected Wi-Fi are at the Settings application > **Network** > **Wi-Fi Connection** > **Advanced Wi-Fi Settings**.

    {{< figure src="/images/docs/guides/setup/network-setup-wifi-advanced.jpg" alt="Edit the network information" class="align-left">}}

5. Go to the Settings application > **Network** > **Wi-Fi Connection** > **My Wi-Fi**. You can see the list of Wi-Fis you ever connected. 

    {{< figure src="/images/docs/guides/setup/network-setup-wifi-known-wifi-list.jpg" alt="Edit the network information" class="align-left">}}

## Communicating with the webOS OSE Device

After the network connection has been set up, you can connect or send files to the webOS OSE device.

{{< note >}}
The default account of webOS OSE devices is as follows. (ID: root, password: *none*)
{{< /note >}}

Choose one the following guidelines:

* Use the `ssh` command on Linux or macOS shell to connect to the device. On Windows, use an Secure Shell (SSH) client (for example, Putty).
* Use the `scp` (secure copy) command on Linux or macOS shell to send files to the target device. On Windows, use Secure Copy Protocol (SCP) programs (for example, WinSCP).
* Use [Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}}).