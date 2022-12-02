---
title: Speech Enhancement Guide
date: 2022-12-02
weight: 10
toc: true
---

## Overview

webOS Open Source Edition (OSE) provides speech enhancement feature (noise reduction and echo cancellation). This section describes how to enable or disable the speech enhancement feature during VoIP call (voice/video call).

The speech enhancement is built as a module of the PulseAudio. An audioEffectManager is included in AudioD to control audio effects.

## Terminology

AudioD
: Audio component, which controls the audio in webOS. It deals with audio routing, volume, etc.

PulseAudio
: The PulseAudio is an open-source sound server that does signal processing, resampling, and audio data playback using the Advanced Linux Sound Architecture (ALSA). For more details on the PulseAudio, visit the [PulseAudio official page](https://www.freedesktop.org/wiki/Software/PulseAudio/).

audioEffectManager
: Manager module that receives luna service API and manages audio effects.

## APIs and Methods

`com.webos.service.audio` provides 3 kinds of methods to use the speech enhancement as below.

- `getAudioEffectList`
- `setAudioEffectList`
- `checkAudioEffectStatus`

The `getAudioEffectList` method lists all the supported audio effects.
The `setAudioEffectList` method sets the status of an audio effect.
The `checkAudioEffectStatus` method shows the status of an audio effect, whether is enabled or not enabled.

## How to use

You can simply apply echo cancellation and noise reduction to audio input from a microphone by enabling speech enhancement audio effect using the `setAudioEffect` method.

1. Get audio effect list.

    webOS OSE returns a list of available audio effects. We plan to provide various audio effects in the future.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.audio/getAudioEffectList '{}'
	
	Response:
	
	{
	    "returnValue" : true
	    "audioEffectList": [
	        "speech enhancement"
	    ]
	}
    ```

2. Check audio effect Status.

    Before you enable audio effect, you would check the current audio effect status.

    ``` shell
    luna-send -f -n 1 luna://com.webos.service.audio/checkAudioEffectStatus '{"effectName":"speech enhancement"}'
	
	Response:
	{
	    "returnValue": true,
	    "enabled": true
	}
    ```

3. Set audio effect.

    You can start or stop the speech enhancement by setting the `enabled` property of `setAudioEffect` method to `true` or `false`.

    To enable the speech enhancement,
    ``` shell
    luna-send -f -n 1 luna://com.webos.service.audio/setAudioEffect '{"effectName":"speech enhancement", "enabled":true}'
		
    Response:
    {
        "returnValue": true
    }
    ```

    To disable the speech enhancement,
    ``` shell
    luna-send -f -n 1 luna://com.webos.service.audio/setAudioEffect '{"effectName":"speech enhancement", "enabled":false}'
		
    Response:
    {
        "returnValue": true
    }
    ```