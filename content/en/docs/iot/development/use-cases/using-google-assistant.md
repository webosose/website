---
title: Using Google Assistant
date: 2020-03-18
weight: 20
toc: true
---

In webOS IoT, you can use Google Assistant via [com.webos.service.ai.voice]({{< relref "com-webos-service-ai-voice-iot" >}}) API. This API starts, monitors, and stops a service to control Google Assistant.

This page shows you how to control the service using com.webos.service.ai.voice API.

## Prerequisites

* Make sure you have completed the steps in [Google Assistant Setup]({{< relref "setting-up-google-assistant-iot" >}}) on your target device.
* Connect a microphone with USB interface.
* (Optional) Connect a speaker to hear the response.

## Usage Example

1. To start a new service, type the following command on your target device shell:

    ``` shell
    root@raspberrypi4:/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.ai.voice/start '{"mode": "continuous", "keywordDetect": true}'
    {
        "returnValue": true
    }
    ```

2. To show the responses of Google Assistant, call `getResponse` method. This method runs continuously unless you quit it. (Press **Ctrl + C**.)

    ``` shell
    root@raspberrypi4:/sysroot/home/root# luna-send -i -f luna://com.webos.service.ai.voice/getResponse '{"subscribe": true}'
    {
        "subscribed": true,
        "returnValue": true
    }
    ```

3. Now you are ready to use Google Assistant. First, say **Snowboy** to activate Google Assistant, then ask what you want.

    ``` shell
    # Say "Snowboy"
    {
        "provider": "googleassistant",
        "response": {
            "keywordDetected": 1
        }
    }

    # Say "What's the weather?"
    {
        "provider": "googleassistant",
        "response": {
            "partial": "what"
        }
    }
    {
        "provider": "googleassistant",
        "response": {
            "partial": "what's"
        }
    }
    {
        "provider": "googleassistant",
        "response": {
            "partial": "what's the"
        }
    }
    {
        "provider": "googleassistant",
        "response": {
            "partial": "what's the weather"
        }
    }

    # Then Google Assistant returns the response to your question.
    # If you have a speaker, you can hear the response.
    {
        "provider":"googleassistant",
        "response":{
            "displayText":"Looks kind of cloudy Right now in Seoul it's 51 and mostly cloudy. Today, it'll be partly cloudy, with a forecasted high of 51 and a low of 32.
            ---
            ( More on weather.com )"
        }
    }

    # Press Ctrl+C to quit the getResponse method
    ```

4. To stop the service, call `stop` method:

    ``` shell
    root@raspberrypi4:/sysroot/home/root# luna-send -n 1 -f luna://com.webos.service.ai.voice/stop '{}'
    {
        "returnValue": true
    }
    ```