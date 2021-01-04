---
title: Bluetooth Guide
date: 2021-01-04
weight: 10
toc: true
---

This page provides a step-by-step guide for how to use the Bluetooth functions in webOS OSE.

## Overview

Bluetooth is a technology that enables nearby electronic devices to connect wirelessly to each other. Using Bluetooth, you can implement applications such as wirelessly sending and receiving data or connecting audio devices.

There are many profiles to standardize how Bluetooth devices communicate with each other. So you must use a proper profile for each application's purpose. webOS OSE supports some of the profiles through the [LS2 APIs](/docs/reference/ls2-api/ls2-api-index/). See [Supported Profiles](#supported-profiles) to check the profiles supported by webOS OSE.

- A2DP
- AVRCP
- GATT
- HFP
- MAP
- PBAP
- SPP
- OPP

{{< note >}}
For more details on each profile, please visit [Bluetooth official website](https://www.bluetooth.com/).
{{< /note >}}

webOS OSE also provides the common method categories that are commonly used in several profiles. See [Common Methods](#common-methods) for details.

- adapter: Set and get the status of a webOS OSE device.
- device: Search for nearby Bluetooth devices and support connection with webOS OSE devices.
- le: Support functions related to Bluetooth Low Energy.

## Terminology

Before diving into the details, we strongly recommend you to familiarize yourself with the following key terms related to Bluetooth.

Bluetooth Low Energy (BLE)
: A Bluetooth protocol for low power applications. BLE is supported since Bluetooth 4.0 or higher, so Bluetooth 4.0 is also collectively referred to as BLE. For more details, see [Official Study Guide](https://www.bluetooth.com/bluetooth-resources/bluetooth-le-developer-starter-kit/).

Advertising
: A process that a Bluetooth device broadcasts its presence in a certain interval of time. A device that is advertising is called “peripheral” and a device that detects the advertising device is called "central." For more details on advertising, visit the [Bluetooth official blog](https://www.bluetooth.com/blog/advertising-works-part-1/).

Universally Unique Identifiers (UUID)
: A unique ID for Bluetooth services and characteristics. For more details on UUIDs, see the [UUID specifications](https://www.bluetooth.com/specifications/assigned-numbers/service-discovery/).

## Before You Begin

To test the whole Bluetooth profiles on webOS, you need the followings:

- webOS OSE device (Raspberry Pi)
- Host machine for SSH connection with the webOS OSE device
- Android smartphone with the following apps (Download them from the Google Play store.)
    - Bluetooth SPP Server
    - Bluetooth SPP Manager
    - nRF Connect for Mobile

{{< note >}}
* Instead of the above apps, you can use different apps if they provide the same functionalities.
* All `luna-send` commands in this guide are executed on the shell of the host machine.
{{< /note >}}

## Common Methods

### adapter

This category is used to set or get the status of a webOS OSE device. Methods in this category can be used for multiple Bluetooth profiles.

#### Use Case. Turn Bluetooth on

``` shell
luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'

# Example return for a successful call
{
    "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
    "returnValue": true
}
    
# Example return for a failed call
{ 
    "errorCode":112,
    "returnValue":false,
    "errorText":"Failed to change bluetooth power status"
}
```

### device

This category is used to search for nearby Bluetooth devices and to support connection with webOS OSE devices. Methods in this category can be used for multiple Bluetooth profiles.

#### Use Case. Set a Bluetooth Device as Trusted Device

1. Turn Bluetooth on.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

2. Set a specific Bluetooth device as trusted device using the following command.

    ``` shell
    # For "address", use a Bluetooth MAC address of the target device.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/device/setState '{"address":"f4:42:8f:3d:e4:ec", "trusted":true}'
      
    # Example return for a successful call:
    { 
       "returnValue":true
    }
    ```

### le

This category is used for advertising or for scanning the BLE devices. Methods in this category are used in other BLE profiles, such as [GATT](#generic-attribute-profile-gatt).

#### Use Case 1. Scan

First, set up your smartphone as an advertising device.

1. Run the **nRF Connect for Mobile** app. 
    
    If the location option is disabled, a pop-up message will be displayed on the top of the screen. Enable the location option on your smartphone.
    
    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-01.png" alt="Enable the location setup" width="250px" class="align-left" >}}
    
2. Tab **ADVERTISER** and **plus(+)** button.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-02.png" alt="Add the advertising device" width="250px" class="align-left" >}}

3. Set the display name.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-03.png" alt="Set up the display name" width="250px" class="align-left" >}}

4. Tab **Advertising data > ADD RECORD** and **Service UUID**.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-04.png" alt="Set up the service UUID" width="250px" class="align-left" >}}

    Then Service UUID pop-up will be displayed.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-05.png" alt="Set up service UUID for heart rate" width="250px" class="align-left" >}}

    1. Type **Heart** and tab **Heart Rate**.
    2. The typed text will be transformed into a service UUID. This is the UUID for the peripheral device. **Note down this UUID**.
    3. Tab **OK**.

5. Scroll down and tab the **Options** dropdown menu.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-06.png" alt="Set up additional options" width="250px" class="align-left" >}}

    1. Advertising mode → **LOW POWER (1000ms)**
    2. TX power → **ULTRA LOW (-21 dBm)**
    3. Tab **OK**. Then the device will be displayed in **ADVERTISER** tab.

6. Activate the toggle button on the right side of the device list. Then start to advertise with **Until manually turned off** option.

    {{< figure src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scan-07.png" alt="Activate the advertising device" width="250px" class="align-left" >}}

Now it's time to scan the advertising device using webOS device.

1. Turn Bluetooth on.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

2. Start to scan the peripheral device.

    ``` shell
    # For "uuid", use the service UUID of the advertising device. (your smartphone)
    luna-send -i -f luna://com.webos.service.bluetooth2/le/startScan '{"serviceUuid":{"uuid":"0000180d-0000-1000-8000-00805f9b34fb"},"subscribe":true}'
     
    # Example return for a successful call
    {
        "subscribed": true,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    
    # Subscription return example (Smartphone is detected by webOS device.)
    {
        "returnValue": true,
        "device": {
            "classOfDevice": 0,
            "blocked": false,
            "scanRecord": [
            ],
            "serviceClasses": [
            ],
            "paired": false,
            "name": "Heart Rate",
            "pairing": false,
            "rssi": -60,
            "adapterAddress": "",
            "trusted": false,
            "typeOfDevice": "ble",
            "address": "44:18:aa:e9:3e:9f",
            "connectedProfiles": [
            ],
            
            ...

        }
    }
    ```

#### Use Case 2. Advertising

1. Turn Bluetooth on.
    
    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

2. Set a name of the webOS device.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"name":"advertisingTest"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

3. Start to advertise using the webOS device.

    ``` shell
    # Start to advertise. Most of the parameters are optional.
    luna-send -i -f luna://com.webos.service.bluetooth2/le/startAdvertising '{"subscribe":true,"advertiseData":{"manufacturerData":[11,22,33,44],"includeTxPower":true,"services":[{"uuid":"FEB8","data":[7,8,9,0]}],"includeName":false},"scanResponse":{"includeName":true}}'
     
    # Example return for a successful call
    {
        "adapterAddress":"b8:27:eb:a4:5c:4e",
        "advertiserId": 1,   # Shows how many times the startAdvertising method has been performed on the current device.
        "returnValue": true
    }
    ```

Then scan the webOS device using the smartphone.

1. Run the **nRF Connect for Mobile** app.

2. Tab **SCAN** in the **SCANNER** tab. After a while, a list of nearby BLE devices will be displayed. If you want to more details about each device, tab the device you want.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/le-scanned-device-info.png" alt="Device information of scanned Bluetooth device" caption="" width="700px" />

## Supported Profiles

### Advanced Audio Distribution Profile (A2DP)

This profile is to stream high-quality audio files through a Bluetooth connection. Using this profile, you can play music on your Bluetooth devices, such as a headset or speaker.

A2DP profile is often used together with the AVRCP profile for remote control. In webOS OSE, if an A2DP profile is set, an AVRCP connection is also set automatically.

#### Use Case. Play music in a Bluetooth speaker

1. Power on your Bluetooth speaker.

2. Turn Bluetooth on.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

3. Discover nearby Bluetooth devices

    ``` shell
    # Start to discover
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/startDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

4. Find your Bluetooth speaker and **note down the "address" value**. You can use the `grep` command to simplify the list.

    ``` shell
    # Check the list of nearby Bluetooth devices
     
    # Step 1. Display only "name" property
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/device/getStatus '{}' | grep "name"
                "name": "[LG] webOS TV UN7850GNA",
                "name": "[LG] webOS TV UJ6680",
                "name": "raspberrypi4",
                "name": "Sound Drum",             # Find the name of your Bluetooth speaker
                "name": "LG NP5550(12)",
     
    # Step 2. Get more detailed information using the name from the step 1.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/device/getStatus '{}' | grep "Galaxy A30" -C 2
                "pairing": false,
                "rssi": -34,
                "name": "Sound Drum",
                "address": "13:50:5a:a7:f5:da", # Bluetooth MAC address of the speaker. Note down this value.
                "paired": true,
    ```

5. Quit the discovery.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/cancelDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

6. Pair the webOS device with your Bluetooth speaker. After `"request": "endPairing"` shows, you can quit the process. (Press **Ctrl + C**.)

    ``` shell
    # For "address", use the value from the step 4.
    luna-send -i -f luna://com.webos.service.bluetooth2/adapter/pair '{"subscribe":true, "address": "13:50:5a:a7:f5:da"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "returnValue": true
    }
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": false,
        "returnValue": true,
        "request": "endPairing" # After this message is displayed, you can close this shell.
    }
    ```

7. Open a new shell and connect the webOS device with your Bluetooth speaker. **You must keep this shell open while using the A2DP profile.**

    ``` shell
    # For "address", use the value from the step 4.
    luna-send -i -f luna://com.webos.service.bluetooth2/a2dp/connect '{"address": "13:50:5a:a7:f5:da"}'
     
    # Example return for a successful call
    {
        "address": "13:50:5a:a7:f5:da",
        "subscribed": false,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

8. Open a new shell to check the A2DP connection. You can check the playing status using the `getStatus` method.

    ``` shell
    # For "address", use the value from the step 4.
    luna-send -i -f luna://com.webos.service.bluetooth2/a2dp/getStatus '{"address": "13:50:5a:a7:f5:da"}'
     
    # Example return for a successful call
    {
        "playing": false,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "address": "13:50:5a:a7:f5:da",
        "connected": true,    # Make sure this value is true.
        "subscribed": false,
        "returnValue": true,
        "connecting": false
    }
     
    # This return will be displayed when the webOS device plays an audio file.
    {
        "playing": true,        # This value changes according to the playing status of the webOS device.
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "address": "13:50:5a:a7:f5:da",
        "connected": true,
        "subscribed": false,
        "returnValue": true,
        "connecting": false
    }
    ```

### Audio/Video Remote Control Profile (AVRCP)

This profile is to control the remote Bluetooth devices. Using this profile, you can use the remote controlling functions such as play/pause and fast forward/rewind. In webOS OSE, if an A2DP connection is established, an AVRCP connection is also established automatically.

#### Use Case. Validate remote control using passthrough commands

1. Connect the speaker with the webOS device using A2DP profile. **You must keep the shell open** (which is running `a2dp/connect` method) while using the AVRCP profile.

    {{< note >}}
    For A2DP connection, please refer to [Use Case. Play music in a Bluetooth speaker](#use-case-play-music-in-a-bluetooth-speaker). 
    {{< /note >}}

2. Open a new shell and check the status of the AVRCP connection. You can check the AVRCP connection already has been established.

    ``` shell
    # For "address", use the "address" value of the A2DP connection.
    luna-send -i -f luna://com.webos.service.bluetooth2/avrcp/getStatus '{"subscribe":true, "address": "13:50:5a:a7:f5:da"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "address": "13:50:5a:a7:f5:da",
        "connected": true,
        "subscribed": true,
        "returnValue": true,
        "connecting": false
    }
    ```

3. Execute the method for testing passthrough commands. **You must keep this shell open (#1 shell)** while testing the passthrough commands.

    ``` shell
    # Check passthrough commands. For "address", use the "address" value of the A2DP connection.
    luna-send -i -f luna://com.webos.service.bluetooth2/avrcp/recievePassThroughCommand '{"subscribe":true, "address": "13:50:5a:a7:f5:da"}' 
     
    # Example return for a successful call
    {
         
        "address": "13:50:5a:a7:f5:da",
        "subscribed": true,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

4. Press any control button of your Bluetooth speaker. Your key inputs will be sended as return messages on the #1 shell.

    ``` shell
    # Check passthrough command in #1 Shell.
     
    # Press and release the "next" button.
    {
        "keyStatus": "pressed",
        "keyCode": "next",
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "address": "13:50:5a:a7:f5:da",
        "returnValue": true
    }
    {
        "keyStatus": "released",
        "keyCode": "next",
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "address": "13:50:5a:a7:f5:da",
        "returnValue": true
    }
     
    # Example return for a successful call
    {
        "keyStatus": "pressed",
        "keyCode": "play",
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "address": "13:50:5a:a7:f5:da",
        "returnValue": true
    }
    {
        "keyStatus": "released",
        "keyCode": "play",
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "address": "13:50:5a:a7:f5:da",
        "returnValue": true
    }
    ```

### Generic Attribute Profile (GATT)

This profile standardizes the way BLE devices exchange data.

#### Use Case. Exchange data using a GATT server

1. Turn Bluetooth on.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

2. Set the name for the GATT server.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"name":"gattServerTest"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

3. Create the GATT server. **Note down the `serverId` value**.

    ``` shell
    # Create a new server
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/gatt/openServer '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "serverId":"001"    # Shows how many times GATT server has been opened on the current device. Note down this value.
    }
    ```

4. Add a service to the GATT server. Use the service's UUID (`feb8`) and characteristic's UUID (`2ab7`) in this example.

    ``` shell
    # Add a service. For "serverId", use the value from the step 3.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/gatt/addService '{"serverId":"001", "service":"0000feb8-0000-1000-8000-00805f9b34fb","type":"primary","includes":[], "characteristics":[{"characteristic":"00002ab7-0000-1000-8000-00805f9b34fb","properties":{"broadcast":false,"read":true,"indicate":true,"write":true,"notify":false},"permissions":{"read":true,"write":true}, "value":{"bytes":[]},"descriptors":[{"descriptor":"00002ab7-0000-1000-8000-00805f9b34fb","value":{"bytes":[0]}}]}]}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "serverId":"001"
    }
    ```

5. Advertise the server. **Keep this shell open. (#1 shell)**

    ``` shell
    # Start to advertise. Most of the parameters are optional.
    luna-send -i -f luna://com.webos.service.bluetooth2/le/startAdvertising '{"subscribe":true,"advertiseData":{"manufacturerData":[11,22,33,44],"proprietaryData":[{"type":27,"data":[55,66,77,88]}],"includeTxPower":true,"services":[{"uuid":"FEB8","data":[7,8,9,0]}],"includeName":false},"scanResponse":{"includeName":true}}'
     
    # Example return for a successful call
    {
        "adapterAddress":"b8:27:eb:a4:5c:4e",
        "advertiserId": 2,   # Shows how many times advertising has been performed on the current device.
        "returnValue": true
    }
    ```

6. Go to your smartphone and run the **nRF Connect for Mobile** app.
7. Tab **SCAN** in **SCANNER** tab. After a while, the GATT server will be displayed in the list. Tab **CONNECT**.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/gatt-list.png" alt="Screenshot for a scanned device list" width="250px" class="align-left" />

    If the connection is established successfully, a list of services will be displayed in the GATT server tab.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/gatt-service-list.png" alt="Screenshot for a GATT service list" width="250px" class="align-left" />

8. Go back to the webOS device and open a new shell to check the service status. 

    ``` shell
    # Check the status of the service.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/gatt/getServices '{"adapterAddress": "b8:27:eb:a4:5c:4e"}'
        
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "services": [
            {
                "characteristics": [
                    {
                        # The rest is omitted.
                ]
            }
        ]
    }
    ```

9. Go back to your smartphone. Tab the service (UUID: FEB8). Find the characteristic (UUID: 2AB7) and then tab the write button (↑).
    
    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/gatt-service.png" alt="Screenshot for explaining how to use a service in GATT server" caption="" width="500px" class="align-left" />

10. Type any words and tab **SEND**.
    
    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/gatt-request.png" alt="Sending a message using GATT server" caption="" width="250px" class="align-left"/>

11. Go back to the webOS device and execute the `getServices` method again.

    You can see `"value" > "bytes"` is changed by the sent data from your smartphone. (**Left**: before sending the data, **Right**: after sending the data)
    
    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/gatt-write.png" alt="Parameter bytes is changed after the data is transferred" caption="" />

### Hands-Free Profile (HFP)

This profile defines the way how the gateway device calls using hand-free devices.

#### Use Case. Make a phone call using the webOS device 

1. Turn Bluetooth on. **Note down the "adapterAddress" value**.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device. Note down this value.
        "returnValue": true
    }
    ```

2. Make the webOS device discoverable.

    ``` shell
    # For "adapterAddress", use the value from the step 1.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"adapterAddress": "b8:27:eb:a4:5c:4e","discoverable":true}'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

3. Subscribe a status of the HFP connection. **Keep this shell open. (#1 shell)**

    ``` shell
    luna-send -i -f luna://com.webos.service.hfp/hf/getStatus '{"subscribe" : true}'

    # Example return for a successful call
    {
        "subscribed": true,
        "returnValue": true,
        "audioGateways": [
        ]
    }
    ```

4. Go to your smartphone. Pair and connect with the webOS device. Then the below response will be shown in the #1 shell. **Note down the "address" value**.

    ``` shell
    # Return for a successful connection
    {
        "subscribed": true,
        "returnValue": true,
        "audioGateways": [
            {
                "sco": false,
                "networkStatus": "unknown",
                "signal": -1,
                "operatorName": "",
                "battery": 2,
                "adapterAddress": "b8:27:eb:a4:5c:4e",
                "ring": false,
                "volume": 9,
                "address": "a8:34:6a:12:e5:ab" # Bluetooth MAC addres of your smartphone. Note down this value.
            }
        ]
    }
    ```

5. Go back to the webOS device. Open a new shell and make a phone call using the `hf/call` method. 

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.hfp/hf/call '{"adapterAddress": "b8:27:eb:a4:5c:4e","address":"a8:34:6a:12:e5:ab", "number":"01012345678"}'
    
    # Example return for a successful call
    {
        "address":"a8:34:6a:12:e5:ab",
        "returnValue": true
    }
    ```

    * `"adapterAddress"`: from the step 1
    * `"address"`: from the step 4
    * `"number"`: Any valid phone number
    
    Then a phone call will be made through your smartphone.
    
### Message Access Profile (MAP)

This profile is to exchange messages between Bluetooth devices.

1. Turn Bluetooth on. **Note down the "adapterAddress" value**.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC addres of the webOS device. Note down this value.
        "returnValue": true
    }
    ```

2. Set your smartphone discoverable. **Note down the name of your smartphone**.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/make-phone-discoverable.png" alt="Make your smartphone visible" caption="" width="350px" />

3. Go back to the webOS device and discover your smartphone.

    ``` shell
    # Start to discover.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/startDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

4. Using the name from the step 2, find the information of your smartphone. Then **note down the "address" value**. You can use the `grep` command to simplify the list.

    ``` shell
    # For "adapterAddress", use the value from the step 1. Use the name and grep command.
    luna-send -i -f luna://com.webos.service.bluetooth2/device/getStatus '{"adapterAddress": "b8:27:eb:a4:5c:4e","subscribe": true}' | grep "TestDevice" -C 70
    {
        "subscribed": true,
        "returnValue": true,
        "devices": [
            {
                "classOfDevice": 6160908,
                "manufacturerData": {
                },
                "blocked": false,
                "scanRecord": [
                ],
                "connectedRoles": [
                ],
                "paired": true,
                "name": "TestDevice\n",  # Name from the step 2
                
                ...

                "rssi": -57,
                "pairing": false,
                "trusted": false,
                "adapterAddress": "b8:27:eb:a4:5c:4e",
                "typeOfDevice": "bredr",
                "connectedProfiles": [
                ],
                "address": "50:55:27:73:72:1c"   # Bluetooth MAC address of your smartphone. Note down this value.
            },
    ```

5. Quit the discovery.

    ``` shell
    # Cancel the discovery.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/cancelDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

6. Pair the webOS device with your smartphone. After `"request": "endPairing"` shows, you can quit the process. (Press **Ctrl + C**.)
    
    ``` shell
    # For "adapterAddress", use the value from the step 1. For "address", use the value from the step 4.
    luna-send -i -f luna://com.webos.service.bluetooth2/adapter/pair '{ "adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c", "subscribe":true}'

    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "returnValue": true
    }
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": false,
        "returnValue": true,
        "request": "endPairing" # After this message is displayed, you can close this shell.
    }
    ```

7. Connect the webOS device with your smartphone. **Note down the "sessionId" value. Keep this shell open. (#1 shell)**

    ``` shell
    # For "adapterAddress", use the value from the step 1. For "address", use the value from the step 4.
    luna-send -i -f luna://com.webos.service.bluetooth2/map/connect '{"adapterAddress": "b8:27:eb:a4:5c:4e","address": "50:55:27:73:72:1c","instanceName":"SMS/MMS","subscribe":true}'
    {
        "subscribed": true,
        "returnValue": true,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "address": "50:55:27:73:72:1c",
        "sessionId": "session0",    # Note down this value.
        "instanceName": "SMS/MMS"
    }
    ```

8. Open a new shell and monitor the message status. **Keep this shell open. (#2 shell)**

    ``` shell
    # For "sessionId", use the value from the step 7.
    luna-send -i -f luna://com.webos.service.bluetooth2/map/getMessageNotification '{"adapterAddress": "b8:27:eb:a4:5c:4e","address": "50:55:27:73:72:1c","sessionId":"session0","subscribe":true}'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "sessionId": "session0",
        "address": "50:55:27:73:72:1c",
        "subscribed": true
    }
    ```

9. Open a new shell and set a folder for message.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/map/setFolder '{"adapterAddress": "b8:27:eb:a4:5c:4e","address": "50:55:27:73:72:1c","sessionId":"session0","folder":"telecom/msg/"}'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "address": "50:55:27:73:72:1c",
        "instanceName": "SMS/MMS"
    }
    ```

10. Create a sample message file in `/media/internal/` directory. For an actual test, please use a valid phone number for `TEL`.

    ``` shell
    # /media/internal/sample_message_file
    BEGIN:BMSG
    VERSION:1.0
    STATUS:READ
    TYPE:SMS_GSM
    FOLDER:telecom/msg/SENT
    BEGIN:BENV
    BEGIN:VCARD
    VERSION:3.0
    FN:Abc
    N:CDE
    TEL:+821234567890     # Use a valid number.
    END:VCARD
    BEGIN:BBODY
    CHARSET:UTF-8
    LENGTH:29
    BEGIN:MSG
    Good Morning
    END:MSG
    END:BBODY
    END:BENV
    END:BMSG
    ```

11. Send a message.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/map/pushMessage '{"adapterAddress": "b8:27:eb:a4:5c:4e","address": "50:55:27:73:72:1c","sessionId":"session0" , "sourceFile":"/media/internal/sample_message_file","folder":"outbox" }'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "handle": "message18014398509482000",
        "address": "50:55:27:73:72:1c"
    }
    ```

    Then new return values will be displayed in **#2 shell**.

    ``` shell
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "messages": {
            "properties": {
                "folder": "/telecom/msg/sent",
                "type": "sms-gsm"
            },
            "handle": "message18014398509482000"
        },
        "returnValue": true,
        "subscribed": true,
        "address": "50:55:27:73:72:1c",
        "notificationType": "SendingSuccess",
        "sessionId": "session0"
    }
    ```

### Phone Book Access Profile (PBAP)

This profile is to exchange phone book objects between Bluetooth devices.

#### Use Case. Get a phone book object from the smartphone

1. Turn Bluetooth on. **Note down the "adapterAddress" value**.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device. Note down this value.
        "returnValue": true
    }
    ```

2. Set your smartphone discoverable. **Note down the name of your smartphone**.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/make-phone-discoverable.png" alt="Make your smartphone visible" caption="" width="350px" />

3. Go back to the webOS device and discover your smartphone.

    ``` shell
    # Start to discover
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/startDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

4. Using the name from the step 2, find the information of your smartphone. Then **note down the "address" value**. You can use the `grep` command to simplify the list.

    ``` shell
    # For "adapterAddress", use the value from the step 1. Use the name from the step 2 and grep command.
    luna-send -i -f luna://com.webos.service.bluetooth2/device/getStatus '{"adapterAddress": "b8:27:eb:a4:5c:4e","subscribe": true}' | grep "TestDevice" -C 70
    {
        "subscribed": true,
        "returnValue": true,
        "devices": [
            {
                "classOfDevice": 6160908,
                "manufacturerData": {
                },
                "blocked": false,
                "scanRecord": [
                ],
                "connectedRoles": [
                ],
                "paired": true,
                "name": "TestDevice\n",  # Name from the step 2
                
                ...

                "rssi": -57,
                "pairing": false,
                "trusted": false,
                "adapterAddress": "b8:27:eb:a4:5c:4e",
                "typeOfDevice": "bredr",
                "connectedProfiles": [
                ],
                "address": "50:55:27:73:72:1c"   # Bluetooth MAC address of your smartphoen. Note down this value.
            },
    ```

5. Quit the discovery.

    ``` shell
    # Cancel the discovery
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/cancelDiscovery '{}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

6. Pair the webOS device with your smartphone. After `"request": "endPairing"` shows, you can quit the process. (Press **Ctrl + C**.)
    
    ``` shell
    luna-send -i -f luna://com.webos.service.bluetooth2/adapter/pair '{ "adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c", "subscribe":true}'

    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "returnValue": true
    }
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": false,
        "returnValue": true,
        "request": "endPairing" # After this message is displayed, you can close this shell.
    }
    ```

7. Connect the webOS device with your smartphone. **Keep this shell open. (#1 shell)**

    ``` shell
    luna-send -i -f luna://com.webos.service.bluetooth2/pbap/connect '{ "adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c", "subscribe":true}'
    {
        "subscribed": true,
        "returnValue": true,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "address": "50:55:27:73:72:1c"
    }
    ```

8. Open a new shell and get a list of phone book objects. **Keep this shell open. (#2 shell)**

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/pbap/setPhoneBook '{"adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c" , "repository":"internal", "object":"ich"}'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "address": "50:55:27:73:72:1c"
    }
    ```

9. List phone book objects and choose the object you want to copy. **Note down the "Handle" value**.

    ``` shell
    luna-send -i -f luna://com.webos.service.bluetooth2/pbap/vCardListing '{"adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c"}'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "address": "50:55:27:73:72:1c",
        "vcfHandles": [
            {
                "Handle": "0.vcf",
                "Name": "Lg Lg"
            },
            {
                "Handle": "1.vcf", # Choose any Handle value and note it down.
                "Name": "PBAP"
            },
            {
                "Handle": "2.vcf",
                "Name": "pbap2"
            }
        ]
    }
    ```

10. Copy the phone book object from the step 9. 

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/pbap/pullvCard  '{"adapterAddress": "b8:27:eb:a4:5c:4e" ,"address":"50:55:27:73:72:1c", "destinationFile":"1.vcf", "vCardHandle":"1.vcf", "vCardVersion":"3.0"}'
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true,
        "address": "50:55:27:73:72:1c",
        "destinationFile": "/media/internal/pbap/50_55_27_73_72_1c/internal/pb/1.vcf"
    }
    ```

11. Check the copied object.

    ``` shell
    cat /media/internal/pbap/50_55_27_73_72_1c/internal/pb/1.vcf

    # Example return for the cat command
    BEGIN:VCARD
    VERSION:3.0
    N:;PBAP;;;
    FN:PBAP
    TEL;TYPE=CELL:1234-56789
    END:VCARD
    ```

### Object Push Profile (OPP)

This profile is to send object data such as pictueres, virtual business cards, etc. Using this profile, you can send the data to unpaired Bluetooth devices.

#### Use Case. Send an image file using OPP

1. Turn Bluetooth on. **Note down the "adapterAddress" value**.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device. Note down this value.
        "returnValue": true
    }
    ```

2. Set the name of the webOS device.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"name":"oppTest"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

3. Make the webOS device discoverable.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"discoverable":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

4. Go to your smartphone and turn Bluetooth on. Find the name you set up in the step 2.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/opp-bluetooth-pair-and-connect.png" alt="Bluetooth connection using your smartphone" caption="" width="250px" />

    Tab the name to connect.

5. Call a method for file transfer. **Keep this shell open. (#1 shell)**

    ``` shell
    luna-send -i -f luna://com.webos.service.bluetooth2/opp/awaitTransferRequest '{"subscribe":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "subscribed": true,
        "returnValue": true
    }
    ```

6. Open a new shell to monitor the file transfer. **Keep this shell open. (#2 shell)**

    ``` shell
    luna-send -i -f luna://com.webos.service.bluetooth2/opp/monitorTransfer '{"subscribe":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "subscribed": true,
        "returnValue": true
    }
    ```

7. Go to your smartphone and send an image file to the webOS device using Bluetooth sharing.

8. If a request for file transfer succeeds, the following returns are displayed on #1 shell. **Note down the "requestId" value**.

    ``` shell
    # Subscription return for awaitTransferRequest method
    {
        "request": {
            "requestId": "001",   # Note down this value.
            "adapterAddress": "b8:27:eb:a4:5c:4e",
            "address": "50:55:27:73:72:1C", # Bluetooth MAC address of your smartphone 
            "fileName": "test-image-for-opp.png",
            "fileSize": 136878,     
            "name": "your-smart-phone"  # The name of your smartphone
        }
    }
    ```
    
9. Open a new shell and accept the request for the file transfer.

    ``` shell
    # For "requestId", use the value from the step 8.
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/opp/acceptTransferRequest '{"requestId":"001"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": false,
        "returnValue": true
    }
    ```

    If `opp/acceptTransferRequest` succeeds, the information of transferred file will be displayed on the #2 shell.

    ``` shell
    # Subscription returns of monitorTransfer method 
    {
        "subscribed": true,
        "returnValue": true,
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "transfers": [
            {
                "adapterAddress": "b8:27:eb:a4:5c:4e",
                "requestId": "001",
                "transferred": 0,
                "fileName": "test-image-for-opp.png",
                "address": "50:55:27:73:72:1C",
                "name": "your-smart-phone",
                "fileSize": 136878
            }
        ]
    }
    ```
    
    The transferred file will be located in `/media/internal/` directory of the webOS device.

### Serial Port Profile (SPP)

This profile is to replace the RS-232 serial communication. Using this profile, you can use the serial communication using Bluetooth.

#### Use Case. Send a message using SPP

1. Turn Bluetooth on.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"powered":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

2. Set the name of the webOS device.

    ``` shell
    # Set a name for the peripheral device
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"name":"sppTest"}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

3. Make the webOS device discoverable.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/adapter/setState '{"discoverable":true}'
     
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e", # Bluetooth MAC address of the webOS device
        "returnValue": true
    }
    ```

4. Go to your smartphone and turn Bluetooth on. Find the device you set up in step 2.
    
    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/spp-bluetooth-pair.png" alt="Bluetooth connection using your smartphone" caption="" width="250px" />

    Tab the name to connect.

5. Go back to the webOS device and check the connection.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.bluetooth2/device/getStatus '{ "subscribe": true }' | grep "LG Mobile" -C 15
    
    # Example return for a successful call
    {
    	...
    
        "pairing": false,
        "rssi": 0,
        "name": "sppTest",
        "address": "50:55:27:73:72:1c",
        "paired": true,                   # Check this value set to true
        "typeOfDevice": "bredr",
        "manufacturerData": {
        },
        "adapterAddress": "b8:27:eb:a4:5c:4e",
    
    	...
    }
    ```

6. Create an SPP channel. **Keep this shell open. (#1 shell)**

    ``` shell
    luna-send -i -f -a "com.luna.test" luna://com.webos.service.bluetooth2/spp/createChannel '{ "name":"service1", "uuid":"00001101-0000-1000-8000-00805f9b34fb", "subscribe":true }'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "returnValue": true
    }
    ```

7. Go to your smartphone and run the **Bluetooth SPP Manager** app.

8. Tab **DEVICES > Search Devices**. Then a list of nearby Bluetooth devices will be displayed. Tab the name you set in the step 2 (`sppTest`). Then you can see the message `Connection established` is displayed.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/spp-connection-established.png" alt="SPP connection success" caption="" width="500px" />

9. Move to **BT MESSENGER** tab. You can see the message `sppTest connected` is displayed on the screen.
    
    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/spp-connected.png" alt="Success message for SPP connection" caption="" width="250px" />
    
10. Go back to the #1 shell and **note down the "channelId" value**. 

    ``` shell
    # Existing return values
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,              
        "returnValue": true
    }
    { # Newly added return values
        "channelId": "001",    # Note down this value
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "connected": true,
        "address": "50:55:27:73:72:1C",    # Bluetooth MAC address of your smartphone
        "returnValue": true
    }
    ```

11. Open a new shell and set the webOS device as read mode. **Keep this shell open. (#2 shell)**

    ``` shell
    # For "channelId", use the value from the step 10.
    luna-send -i -a "com.luna.test" -f luna://com.webos.service.bluetooth2/spp/readData '{ "channelId": "001","subscribe": true}'
    ```

12. Go to **Bluetooth SPP Manager app > BT MESSENGER > Add text** and enter the message. Tab **Send Message**.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/spp-send-a-message.png" alt="Sending a text message" caption="" width="250px" />

13. Go back to the #2 shell. You can check the sent message in base64 format.

    ``` shell
    {
        "channelId": "001",
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "subscribed": true,
        "returnValue": true,
        "data": "aGVsbG8K"          # A base64 encoded string for 'hello'
    }
    ```

14. Press **Ctrl + C** to quit the read mode. Send a message using write mode.

    ``` shell
    # For "data", write the message in base64 format.
    luna-send -f -n 1 -a "com.luna.test" luna://com.webos.service.bluetooth2/spp/writeData '{ "channelId": "001","data": "aGVsbG8NCg0K"}'
    
    # Example return for a successful call
    {
        "adapterAddress": "b8:27:eb:a4:5c:4e",
        "returnValue": true
    }
    ```

15. You can check the sent message on the **BT MESSENGER** tab.

    <img src="/images/docs/guides/development/connectivity/bluetooth-guide/spp-write-a-message.png" alt="Receiving a text message from the webOS device" caption="" width="250px" />