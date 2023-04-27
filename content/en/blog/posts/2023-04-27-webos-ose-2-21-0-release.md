---
title: webOS OSE 2.21.0 Release
date: 2023-04-27
slug: webos-ose-2-21-0-release
posttype: release
toc: false
thumbnail: th-release-2-21-0-ptz-camera.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.21.0.

The highlights of this release are as follows:

- [Supporting Dynamic Zoom and Auto PTZ features](#supporting-dynamic-zoom-and-auto-ptz-features)
- [Supporting Automatic Gain control](#supporting-automatic-gain-control)
- [Upgrading Command-line Interface](#upgrading-command-line-interface)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-21-0-release-notes). 

## Supporting Dynamic Zoom and Auto PTZ features

Dynamic zoom is a feature that enables zooming in or out through software processing, while PTZ stands for Pan-Tilt-Zoom movements of cameras. ([Wikipedia: Pan-tilt-zoom camera](https://en.wikipedia.org/wiki/Pan%E2%80%93tilt%E2%80%93zoom_camera))

In this release, we have added a demo that shows face tracking using dynamic zoom, PTZ, and face detection.

{{< caution >}}
- You'll need **a webcam that supports the PTZ functionality**. (Tested devices: Logitech C930E, C920, and C270)
- The emulator doesn't support this feature.
{{< /caution >}}

1. Connect your camera to the webOS OSE device.
2. Check the status of the camera. Connect the webOS OSE device using the SSH protocol, and enter the following commands:

    {{< note >}}
    The following commands are methods of the com.webos.service.camera2 API. For more details about the API, see the [API reference]({{< relref "com-webos-service-camera2" >}}).
    {{< /note >}}

    1. Get the `handle` value for the camera.

        ``` bash
        root@raspberrypi4-64:~# luna-send -n 1 -f luna://com.webos.service.camera2/open '{"id":"camera1"}'

        # Response
        {
            "returnValue": true,
            "handle": 1506
        }
        ```

    2. Using the `handle` value, check the status of `FaceDetectionAIF`.

        ``` bash
        root@raspberrypi4-64:~# luna-send -n 1 -f luna://com.webos.service.camera2/getSolutions '{"handle":1506}'

        # Response
        {
            "returnValue": true,
            "solutions": [
                {
                    "name": "AutoContrast",
                    "params": {
                        "enable": false
                    }
                },
                {
                    "name": "Dummy",
                    "params": {
                        "enable": false
                    }
                },
                {
                    "name": "FaceDetectionAIF",
                    "params": {
                        "enable": true   # Check if this value is set to true
                    }
                }
            ]
        }
        ```

    3. If the `enable` value is `false`, set the value to `true` using the following command.

        ``` bash
        root@raspberrypi4-64:~# luna-send -n 1 -f luna://com.webos.service.camera2/setSolutions '{
            "handle":1744,
            "solutions":[
                {
                    "name":"FaceDetectionAIF",
                    "params":{
                        "enable":true
                    }
                }
            ]
        }'

        # Response
        {
            "returnValue": true
        }
        ```

3. Go back to your webOS OSE device, launch the Camera app.
4. Click the preview window.
5. Click the PTZ icon ![Disabled PTZ icon](/images/blog/news/2-21-0-release/disabled-ptz-icon.jpg) in the bottom right corner.
6. Click the preview window again and check that the PTZ icon ![Enabled PTZ icon](/images/blog/news/2-21-0-release/enabled-ptz-icon.jpg) has turned blue.
7. Place your face in front of the camera, and then move your face. Check if the preview window follows and focuses on your face.

{{< note >}}
Source codes are available on our GitHub:

- [g-camera-pipeline](https://github.com/webosose/g-camera-pipeline)
- [Camera app](https://github.com/webosose/com.webos.app.camera)
{{< /note >}}

## Supporting Automatic Gain control

Automatic Gain Control (AGC) is the feature that adjusts the volume level of audio input. This feature allows users to get audio inputs that are more robust to ambient noise.

## Upgrading Command-line Interface

Command-Line Interface (CLI) has been updated to v2.4.0. For details, see [CLI Release Notes]({{< relref "cli-release-notes" >}}).
