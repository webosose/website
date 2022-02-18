---
title: MusicPlayer - Using Enact Framework
date: 2022-02-18
slug: music-player-using-enact-framework
posttype: app
toc: true
thumbnail: th-music-player.png
---

## Overview

This tutorial demonstrates how to use the Enact framework to create a music player app for webOS OSE. Enact is a React-based JavaScript framework optimized for developing web apps for webOS OSE.  

The music player app makes use of the Moonstone theme to compose the user interface (UI) of the app. 

The music player app offers the following features:

- Displays the music files in a grid layout.
- Provides support for internal/external storages.
- Provides support for mp3 and Ogg file formats.
- Displays the time duration on screen.
- Album details with thumbnail information.
- Play/Pause/Previous/Next video controls.
- Fast forward and Backward operations
- Seek support on the slider.

You can use the music player app in the following ways:

- Install the app as-is on a webOS OSE target device.
- Update the source code as required and then deploy on a webOS OSE target device.
- Analyze the source code to understand the usage of the different Enact components.

## Prerequisites

You must install Node.js version 10 or later. Download and install Node.js from the [Node.js](https://nodejs.org/en/download/) website.  

Install the [Enact command-line interface (CLI)](https://enactjs.com/docs/tutorials/setup/#installing-enact-cli) globally by using the `npm install` command:

``` shell
$ npm install -g @enact/cli
```

Also install the [webOS OSE CLI](https://www.webosose.org/docs/tools/sdk/cli/cli-user-guide/#installing-cli) as follows:

``` shell
$ npm install -g @webosose/ares-cli
```

## Source Code

The source code is available at the [samples](https://github.com/webosose/samples) repository. Clone this repository to download the source code on your local development system, and find the [com.reference.app.musicplayer](https://github.com/webosose/samples/tree/master/ref-apps/com.reference.app.musicplayer) directory under the `ref-apps` repository.   

Analyze the source code to get an understanding of the functionalities implemented in the music player app. Refer to the snippets provided in this section.

### Using Enact Components

The below code snippet uses the Moonstone theme on the music player app. The following UI components are used in the app:

- `Panels`: Provides a way to manage the different screens of an app.
- `TabLayout`: Provides the space for displaying connected devices on the **Tab** in webOS OSE device.
- `AudioList`: Lists the music files that are available on the device.

``` js
import { TabLayout, Tab } from "@enact/sandstone/TabLayout";
import { Panel, Header } from "@enact/sandstone/Panels";
...
<Panel {...rest}>
    <Header onClose={handleClose} />
    <TabLayout>
    {devices.map((device) => {
        return (
        device.deviceList.length > 0 &&
        device.deviceList.map((deviceList, index) => {
            return (
            <Tab
                className={css.tab}
                key={deviceList.uri}
                icon="usb"
                onTabClick={() => getListAudio(deviceList.uri)}
                title={deviceList.name}
            >
                <AudioList
                key={index}
                audiolist={audioList}
                handleNavigate={handleAudioNavigate}
                />
            </Tab>
            );
        })
        );
    })}
    </TabLayout>
</Panel>
...
```

- `VirutalGridList`: Populates grid list display by using music files.
- `ImageItem`: Renders the music files with name and duration.

``` js
import ImageItem from "@enact/sandstone/ImageItem";
import { VirtualGridList } from "@enact/sandstone/VirtualList";
...
      <ImageItem
        {...rest}
        centered={true}
        src={encodedPath}
        placeholder={placeHolderImg}
        label={"Time : " + duration}
        onClick={() => handleNavigate("/audioplayer", audiolist[index], index)}
      >
        {audiolist[index].title}
      </ImageItem>
...
    <VirtualGridList
      direction="vertical"
      spacing={5}
      dataSize={audiolist.length}
      itemRenderer={renderItem}
      itemSize={{
        minWidth: ri.scale(500),
        minHeight: ri.scale(500),
      }}
    />
...
```

### Using LS2 API

The application uses the `com.webos.service.mediaindexer` LS2 API for listing devices, music files, and getting metadata information. 

The methods are as follows:

- `getDeviceList`
    - Gets the list of all the attached storage devices.
    - The list can contain devices that are currently attached or the devices attached in the past.
- `getAudioList`
    - Gets the available audio file list included in attached devices.
    - If the `uri` is specified, the audio file list for the specified URI is provided. Else, the audio file list for all attached devices is provided.
- `getAudioMetadata`
    - Gets the detailed metadata information of the specified URI for the given audio file, such as **file_size**, **thumbnail**, **file_path**, **duration**, **album**, and **title**.


``` js
...	
	getDeviceList: ({subscribe, ...rest}) => {
		let params = {
			subscribe: subscribe
		};
		return luna('com.webos.service.mediaindexer', 'getDeviceList', params)(rest);
	}
    getAudioList: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getAudioList', params)(rest);
	},

	getAudioMetaData: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getAudioMetadata', params)(rest);
	}
...
...
const luna =  (
		service,
		method,
		{subscribe = false, timeout = 0, ...params} = {},
		map
) => (
	({onSuccess, onFailure, onTimeout, onComplete, ...additionalParams} = {}) => {
		const req = new LS2Request();
		req.send({
			service: 'luna://' + service,
			method,
			parameters: Object.assign({}, params, additionalParams),
			onSuccess: handler(onSuccess, map),
			onFailure: handler(onFailure),
			onTimeout: handler(onTimeout),
			onComplete: handler(onComplete, map),
			subscribe,
			timeout
		});
		return req;
	}
);
...
```

### Custom Components used in App

- Audio Player  
    - This is the main component derived from the audio HTML base which helps to play/pause audio files on the device.
    - Displays the current playing information on the device.
    - Handles to play previous or next audio files on the list.
- Album Info 
    - Displays the album information such as **Title**, **Artist**, **Album name** and **Thumbnail** image for each music file.
- Media Slider 
    - Seeks the audio file at a particular position. So the audio starts playing from the current position. 
    - Hides the media knob when seeking disabled.

``` js
...
    <AudioPlayer
      autoCloseTimeout={7000}
      disabled={false}
      feedbackHideDelay={3000}
      handleBack={() => handleBack("home")}
      handleNext={handleNextAudio}
      handlePrevious={handlePreviousAudio}
...
      playlist={audioMetaData}
      seekDisabled={false}
      spotlightDisabled={false}
      thumbnailSrc={audioMetaData.thumbnail}
      title={"Music Player"}
      titleHideDelay={4000}
    />
...
...	
       <AlbumInfo
        title={title}
        artist={mediaProps.artist}
        album={mediaProps.album}
        thumbnail={thumbnailSrc}
        isPlaying= {prevCommand.current === "play"}
      />
...
		<MediaSlider
		 backgroundProgress={state.proportionLoaded}
		 disabled={disabled || state.sourceUnavailable}
		 forcePressed={state.slider5WayPressed}
		 onBlur={handleSliderBlur}
		 onChange={onSliderChange}
		 onFocus={handleSliderFocus}
		 onKeyDown={handleSliderKeyDown}
		 onKnobMove={handleKnobMove}
		 onSpotlightUp={handleSpotlightUpFromSlider}
		 selection={proportionSelection}
		 spotlightDisabled={
		 spotlightDisabled || !state.mediaControlsVisible
		 }
		 value={state.proportionPlayed}
		 visible={state.mediaSliderVisible}
		 />
...
```

### Utility Method

- `secondsToTime`
    - Takes the seconds value as input and represents the values in a user understandable format.
- `getEncodedPath`
    - Encodes the image URI path to avoid reading issues from the system.
    - Adds the `file:///` when the path directly starts with `/`.
    - Replaces the `/` with `%20` format to avoid file read issues.

``` js
...
const secondsToTime = (seconds, durfmt, config) => {
  const includeHour = config && config.includeHour;

  if (durfmt) {
    const parsedTime = parseTime(seconds);
    const timeString = durfmt.format(parsedTime).toString();

    if (includeHour && !parsedTime.hour) {
      return "00:" + timeString;
    } else {
      return timeString;
    }
  }

  return includeHour ? "00:00:00" : "00:00";
};
...
const getEncodedPath = (path) => {
  let encodedPath = "";
  if (path && path.length > 0) {
    encodedPath = encodeURIComponent(path);
    if (path && path.substring(0, 1) === "/") {
      encodedPath = "file:///" + encodedPath;
    }
    encodedPath = encodedPath.replace(/ /g, "%20");
  }
  return encodedPath;
};
...
```

## Installing the App on the Target Device

Go to the `app` directory of the downloaded source code and execute the following commands:  

1. Package the enact source code.  

    ``` shell
    $ enact pack  
    ```

    A directory named `dist` is created.  

2. Package the app to create an IPK.  

    ``` shell
    $ ares-package dist  
    ```

    An IPK named `com.webose.app.musicplayer_0.0.1_all.ipk` is created.  

3. Install the IPK on the target device.  

    ``` shell
    $ ares-install --device <TARGET_DEVICE> com.webose.app.musicplayer_0.0.1_all.ipk
    ```
