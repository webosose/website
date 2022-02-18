---
title: Photo & Video - Using Enact Framework
date: 2022-02-18
slug: photo-video-using-enact-framework
posttype: app
toc: true
thumbnail: th-photo-video.png
---

## Overview

This tutorial demonstrates how to use the Enact framework to create a typical photo and video app for webOS OSE. Enact is a React-based JavaScript framework optimized for developing web apps for webOS OSE.  

The Photo & Video app makes use of the Moonstone theme to compose the user interface (UI) of the app.  

The Photo & Video app offers the following features:

- Displays videos and images in a single grid layout.
- Provides support for internal/external storages.
- Launches the Photo/Video player based on the content type.
- The Photo Player provides the following features:
    - Displays the properties of the image such as size, resolution, and title.
    - Displays an option to support **Full** or **Fit** sizes.
    - Slide show with controls.
    - Slide show with speed controls: **Slow**, **Normal**, or **Fast**.
    - Zoom/Rotate/Settings.
    - Transition effects on slide shows such as **Fade In** or **Slide**.
    - Thumbnail view on the selected device.
- The Video Player provides the following features:
    - Play/Pause/Previous/Next video controls.
    - Fast forward and Backward operations.
    - Drag-and-drop support on the slider.

You can use this Photo & Video app in the following ways:

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

The source code is available at the [samples](https://github.com/webosose/samples) repository. Clone this repository to download the source code on your local development system, and find the [com.reference.app.photovideo](https://github.com/webosose/samples/tree/master/ref-apps/com.reference.app.photovideo) directory under the `ref-apps` repository.

Analyze the source code to get an understanding of the functionalities implemented in this app. Refer to the snippets provided in this section.

### Using Enact Components

The below code snippet uses the Moonstone theme on the Photo & Video app. The following UI components are used in the app:

- `Panels`: Provides a way to manage the different screens of an app.
- `TabLayout`: Provides the space for displaying connected devices on the **Tab** in webOS OSE device.
- `MediaList`: Lists the media files (video and image) that are available on the device.

``` js
import { TabLayout, Tab } from "@enact/sandstone/TabLayout";
import { Panel, Header } from "@enact/sandstone/Panels";
...
<Panel {...rest}>
    <Header
        onClose={handleClose}
    />
    <TabLayout>
        {devices.map((device) => {
            return device.deviceList.length > 0 && device.deviceList.map((deviceList, index) => {
                return (
                    <Tab
                        className={css.tab} key={deviceList.uri}
                        icon='usb'
                        onTabClick={() => onSelectDevice(deviceList.uri)}
                        title={deviceList.name}
                    >
                        <MediaList
                            key={index}
                            videoList={videoList}
                            imageList={imageList}
                            handleNavigate={handleVideoNavigate}
                        />
                    </Tab>
                )
            })
        })}
    </TabLayout>
</Panel>
...
```

- `VirutalGridList`
  - Populates the grid list display by using media files.
  - Media files are rendered by using the `ImageItem` component.

``` js
import ImageItem from "@enact/sandstone/ImageItem";
import { VirtualGridList } from "@enact/sandstone/VirtualList";
...
<ImageItem
    {...rest}
    src={encodedPath}
    placeholder={mediaList[index].mediaType && mediaList[index].mediaType === "video"? VideoImg : placeHolderImg}
    onClick={() => mediaList[index].mediaType && mediaList[index].mediaType === "video" ?
            handleNavigate('/videoplayer', mediaList[index], index-imageList.length):
            handleNavigate('/photoPlayer', mediaList[index], index)
    }
>
    {mediaList[index].title}
</ImageItem>
...
<VirtualGridList
    direction='vertical'
    dataSize={mediaList.length}
    itemRenderer={renderItem}
    itemSize={{
        minWidth: ri.scale(500),
        minHeight: ri.scale(500)
    }}
/>
...
```

### Using LS2 API

The application uses the `com.webos.service.mediaindexer` LS2 API in the following methods.

#### Video Player Services

- `getVideoList`
  - Gets the available video file list included in the attached devices.  
  - If the `uri` is specified, the video file list for the specified URI is provided. Else, the image file list for all attached devices is provided.
- `getVideoMetadata`
  - Gets the detailed metadata information of the specified URI for the given video file, such as **file_size**, **thumbnail**, **file_path**, **duration**, **album**, and **title**.  

``` js
...
getVideoList: ({uri, ...rest}) => {
    let params = {
        uri: uri
    };
    return luna('com.webos.service.mediaindexer', 'getVideoList', params)(rest);
},

getVideoMetaData: ({uri, ...rest}) => {
    let params = {
        uri: uri
    };
    return luna('com.webos.service.mediaindexer', 'getVideoMetadata', params)(rest);
}
...
```

#### Photo Player Services

- `getImageList`
  - Gets the available image file list included in attached devices.  
  - If the `uri` is specified, the image file list for the specified URI is provided. Else, the image file list for all attached devices is provided.

- `getImageMetaData`
  - Gets the detailed metadata information of the specified URI for the given image file, such as **file_size**, **thumbnail**, **file_path**, and **title**.  

``` js
...
getImageList: ({uri, ...rest}) => {
    let params = {
        uri: uri
    };
    return luna('com.webos.service.mediaindexer', 'getImageList', params)(rest);
},

getImageMetaData: ({uri, ...rest}) => {
    let params = {
        uri: uri
    };
    return luna('com.webos.service.mediaindexer', 'getImageMetadata', params)(rest);
}
...
```

#### Device Services

  - `getDeviceList`
    - Gets the list of all the attached storage devices.
    - The list can contain devices that are currently attached or the devices attached in the past.

``` js
...
    getDeviceList: ({subscribe, ...rest}) => {
        let params = {
            subscribe: subscribe
        };
        return luna('com.webos.service.mediaindexer', 'getDeviceList', params)(rest);
    }
...
```

#### Common Luna Service

- All the service request calls fall into this generic request.  
- Responsible for handling of success and failure responses.  

``` js
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

### Custom Components used in the App

#### Photo Player Component

The Photo Player component provides the following features:

- Handling slideshow for the listed images  
- Thumbnail view on the bottom screen  
- Zoom control option and Rotate option for the user selection  
- Handling Transition events  

``` js
...
 const PhotoPlayer = ({handleNavigate, slideDirection, slides, startSlideIndex}) => {
    return (
        <SettingsProvider>
            <PhotoPlayerBase
                handleNavigate={handleNavigate}
                slides={slides}
                startSlideIndex={startSlideIndex}
                slideDirection={slideDirection}
            />
        </SettingsProvider>
    );
};
...
const PhotoPlayerBase = ({handleNavigate, hideActionGuide, hideZoomUI, slides = [], slideDirection, startSlideIndex = 0}) => {
...
}
...
```

#### Video Player Component

The Video Player component provides the following features:

- Supports playing mp4 format.  
- The `handlePrevious` and `handleNext` APIs handle playing the previous and the next file, respectively.  
- The `handleBack` API moves from the video player to the media list screen.  
- Displays filename, duration, current time, and file size over the player screen.  

``` js
...
 const VideoPlayer = (
        {
            // actionGuideLabel,
            handleBack,
            handleNext,
            handlePrevious,
            playlist,
            ...rest
        }
) => {
...
    return (
        <VideoPlayerBase
            {...rest}
            onJumpForward={handleNext}
            onJumpBackward={handlePrevious}
            // onEnded={handleNext}
            onBack={handleBack}
            loop={state.repeat.loop}
            poster={playlist.thumbnail}
            thumbnailSrc={playlist.thumbnail}
            title={playlist.title}
            infoComponents={playlist.title}
        >
            <source src={playlist.file_path} type="video/mp4" />         
        </VideoPlayerBase>
    );
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

    An IPK named `com.app.photovideo_1.0.0_all.ipk` is created.  

3. Install the IPK on the target device.  

    ``` shell
    $ ares-install --device <TARGET_DEVICE> com.app.photovideo_1.0.0_all.ipk
    ```
