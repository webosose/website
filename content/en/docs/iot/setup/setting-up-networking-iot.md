---
title: Network Setup
date: 2020-03-18
weight: 40
toc: true
---

This guide describes how to set up the network between the host machine and the target device for webOS IoT.

## Before You Begin

Make sure you have prepared the following:

* Target device with webOS IoT image
* USB to TTL serial cable

    {{< note >}}
    In this guide, we use the [4-pin TTL serial cable](https://www.adafruit.com/product/954). The commands and steps in the guide might be changed depending on your cable.
    {{< /note >}}

## Setting Up Serial Connection

To set up the network on the target device, first you need to set up a serial connection between the host machine and the target device.

### Connect with the Cable

Connect the host machine with the target device using the USB to TTL serial cable.

1. Connect pin sockets to RPi's GPIO pins as follows:

    | Type | TTL serial cable color | RPi pin number |
    | --- | --- | --- |
    | Ground | Black | 6 - Ground |
    | Data | White | 8 - GPIO 14 (TXD) |
    | Data | Green | 10 - GPIO 15 (RXD) |

    {{< figure src="/images/docs/iot/setup/rpi4-pin-map.png" alt="" caption="Pin Map of Raspberry Pi 4" >}}

2. Connect USB port of the cable to your host machine.

### (Optional) Set Up the USB Driver

Basically, a driver for the cable is already included in Linux kernel. But if your host machine cannot recognize the cable, follow the steps below to set up the driver manually:

1. Check the USB device information.

    ``` shell
    $ lsusb
    Bus 003 Device 051: ID <Vendor>:<Product> Prolific Technology, Inc. PL2303 Serial Port
    ```

2. Enable the device using `<Vendor>` and `<Product>` from step 1.

    ``` shell
    $ sudo modprobe usbserial vendor=0x<Vendor> product=0×<Product>
    ```

### Set Up a Serial Terminal

Follow the steps below to set up a serial terminal. Make sure that the target device is turned off beforehand.

1. Install PuTTY.

    ``` shell
    $ sudo apt update
    $ sudo apt install putty
    ```

2. Check the name of the USB device.

    ``` shell
    $ dmesg | grep tty
    [ 6198.188883] usb 3-1: pl2303 converter now attached to ttyUSB<X>
    ```

    In the above code, typically, `<X>` is the integer number.

3. Check that tty device is set successfully.

    ``` shell
    $ ls /dev/ttyUSB<X> # Use <X> from step 1
    /dev/ttyUSB<X>
    ```

4. Open PuTTY and enter the following information.

    ``` shell
    $ sudo putty
    ```

    - Connection Type: Serial
    - Serial line: /dev/ttyUSB`<X>`
    - Speed: 115200

    {{< figure src=/images/docs/iot/setup/configure-putty.png alt="" caption="PuTTY Configuration for Serial Connection" class="align-left" >}}

5. Click **Open**. An empty PuTTY terminal will be opened.

6. Turn on the target device, then a bunch of debug logs are generated on the PuTTY terminal. After some time, no more logs will be generated. Press **Enter**.

    ``` shell
    # After some logs...
    [   15.611414] Bluetooth: RFCOMM TTY layer initialized
    [   15.616662] Bluetooth: RFCOMM socket layer initialized
    [   15.622145] Bluetooth: RFCOMM ver 1.11                   # Loading complete! Press Enter
    ```

7. Enter the account information to log in. The default account information is as follows. (ID: `root`, password: none)

    ``` shell
    # After pressing the enter key in step 6
    webOS OSE 1.0.g raspberrypi4 ttyS0

    raspberrypi4 login: root
    ```

    Then the terminal of your target device will show up. Now you are ready to access the target device using the serial terminal.
    ``` shell
    root@raspberrypi4:/sysroot/home/root#
    ```

{{< note >}}
In case you want to use another program (such as Minicom) to make the serial connection, refer to the following table for UART communication:

| Properties | Value |
| --- | --- |
| Baudrate | 115200 |
| Data bits | 8 |
| Stop bits | 1 |
| Parity | None |
| Flow Control | <ul><li>Hardware flow control: OFF</li><li>Software flow control: OFF</li></ul>|
{{< /note >}}

## Configuring the Target Device

If you finished setting up the serial connection, it's time to configure the network information on the target device.

{{< note >}}
The default setting of the webOS OSE is to use Dynamic Host Configuration Protocol (DHCP) and set the network information automatically. Depending on your environment, however, you may need to check if the automatic configuration has been performed correctly. Otherwise, you will need to configure the network information manually.
{{< /note >}}

Follow the steps below to configure the network information on the target device. Make sure that the Ethernet cable is connected beforehand.

To set the manual network, type the following command on the serial terminal:

``` shell
# Set IPv4 connection
root@raspberrypi4:/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.connectionmanager/setipv4 '{
    "method":"manual",
    "address":"<Your IP address>",
    "netmask":"<Your netmask>",
    "gateway":"<Your gateway address>"
}'

{
  "returnValue": true
}

# Set DNS Server
root@raspberrypi4:/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.connectionmanager/setdns '{"dns":["<Your DNS server IP address>"]}'

{
    "returnValue": true
}
```

You can check the network information using the following command:

``` shell
root@raspberrypi4:/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.connectionmanager/getStatus {}

{
    "wired": {
        "netmask": "<Your netmask>",
        "ipAddress": "<Your IP address>",
        "proxyinfo": {
            "method": "direct"
        },
        "onInternet": "no",
        "method": "manual",
        "state": "connected",
        "gateway": "<Your gateway address>",
        "checkingInternet": false,
        "interfaceName": "ethO",
        "plugged": true
    },
    "isInternetConnectionAvailable": false,
    "subscribed": false,
    "offlineMode": "disabled",
    "wifi": {
        "tetheringEnabled": false,
        "state": "disconnected"
    },
    "returnValue": true,
    "wifiDirect": {
        "state": "disconnected"
    }
}
```

{{< note >}}
If you want to set up Proxy on the target device, refer to [com.webos.service.connectionmanager]({{< relref "com-webos-service-connectionmanager-iot" >}}) API.
{{< /note >}}

## Connecting Host Machine with the Target Device

After the network connection has been set up, you can connect or send files to the target device using Secure Shell (SSH) protocol.

{{< note >}}
The default account information is as follows. (ID: `root`, password: _none_)
{{< /note >}}

Here are several methods that you can use for host-target communication:

- To connect to the target device, use the `ssh` command on the host machine.
- To send files to the target device, use the `scp` (secure copy) command on the host machine.
