---
title: webOS OSE UI Guide
date: 2022-12-02
weight: 30
toc: true
---

This guide explains UI components and basic usage of webOS Open Source Edition (OSE).

{{< note >}}
This guide is for webOS OSE 2.19.0 or higher.
{{< /note >}}

## Interface Overview

webOS OSE's UI consists of two major UI components:

- App Bar
- Status Bar

Throughout the rest of the document, we'll learn how to use the two UI components and **Launchpad**, the core navigating tool of the webOS OSE.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/enhanced-home-ui.jpg" alt="A new home screen UI" >}}

## App Bar

The app bar is the core interface of webOS OSE. This bar provides an quick access to your favorite apps or currently running apps.

### How to Access

- Swipe up the bottom of the screen.
- Press the **Start** key in the keyboard.

### UI Components

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/app-bar-components.jpg" alt="Components of the app bar" >}}

| Components | Descriptions |
|------------|--------------|
| Launchpad Icon | This icon is the shortcut to [Launchpad](#launchpad). |
| App Bar Option | This option configrues the app bar. See [Configuring the App Bar](#configuring-the-app-bar). |
| Default Apps Area | This area shows default apps. You cannot modify this area. |
| User Added Apps Area | You can add more apps to this area. See [Adding Apps to the App Bar](#adding-apps-to-the-app-bar). |
| Running Apps Area | This area shows currently running apps. No limit to the number of apps displayed. (Support horizontal scrolling) |

### Configuring the App Bar

You can configure the app bar using this option.

{{< note >}}
- Currently, webOS OSE only supports the **Align Select** option.
- Launchpad also configure the app bar. See [Adding Apps to the App Bar](#adding-apps-to-the-app-bar).
{{< /note >}}

<img src="/images/docs/guides/getting-started/webos-ui-guide/app-bar-option.jpg" alt="App Bar Option" width="300px" class="float-start" >

The align select option changes the alignment of the icons in the app bar. 

If you choose **right**, all the icons in the app bar start from the right side of the screen. (See the below figure.) The default value is **left**.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/app-bar-with-right-option.jpg" caption="App Bar with the right option" alt="" >}}

## Status Bar

The status bar is the shortcut for system settings, such as volume and notifications.

### How to Access

Swipe down the top of the screen.

### UI Components

{{< note >}}
- Developments for the status bar are still in progress.
- Each component also provides the direct access button to Settings Application.
{{< /note >}}

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/status-bar.jpg" caption="" alt="UI components of the status bar" >}}

| Components | Descriptions |
|------------|--------------|
| Volume | You can change the volume level of the device. See [Changing the Volume Level](#changing-the-volume-level). |
| Notifications | This menu shows the list of notification messages.<strong>*</strong> |
| SW Version Infomation | You can check the webOS OSE version of the device. You can also update the platform using this menu.<strong>*</strong> |
| Bluetooth | You can turn on/off the Bluetooth of the device.<strong>*</strong> |
| Wi-Fi | This menu shows the list of nearby Wi-Fi signals. You can also turn on/off the Wi-Fi of the device. |

<strong>*</strong>: This feature will be supported in future release.



### Changing the Volume Level

To change the volume level of the device:

1. Tap the Volume icon in the status bar.
2. Adjust the volume bar.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/adjust-volume-level.jpg" caption="" alt="" width="500px" >}}

## Launchpad

The Launchpad is the core navigating tool of webOS OSE. This app shows the list of installed apps, provides the search functionality, and more.

### How to Access

Click the launchpad icon in the app bar.

### UI Components

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/launchpad-main-screen.jpg" caption="" alt="Descriptions for Launchpad" >}}

| Components | Descriptions |
|------------|--------------|
| Search Area | You can search an installed app by its name. See [Searching for an Installed App](#searching-for-an-installed-app). |
| Search History Button | This button shows the recent search history. See [Viewing the Search History](#viewing-the-search-history). |
| App Sorting Button | You can sort apps in alphabetical or reverse alphabetical order. See [Sorting Launchpad](#sorting-launchpad). |
| Installed Apps & Pagination | This area shows the list of installed apps in webOS OSE. |

### Searching for an Installed App

To search an app, enter the name of the app you want to find at the search bar.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/search-result.jpg" caption="Search result for 'camera app'" alt="" >}}

You can search for apps using incomplete phrases.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/search-incomplete-phrase.jpg" caption="Searching with incomplete phrase" alt="" >}}

### Viewing the Search History

You can view the search history by **①** clicking the search history button. Then **②** the search history shows the recent phrases you've searched. (Maximum: 10) 

You can delete each history by clicking the **X** button at the right side of the phrase or delete all the history by clicking the **Clear All** button.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/search-history.jpg" caption="" alt="Search history of webOS OSE" >}}

### Sorting Launchpad

You can sort apps in alphabetical or reverse alphabetical order. The default value is the alphabetical order.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/app-sorting.jpg" caption="A screenshot for app sorting button" alt="" >}}

### Adding Apps to the App Bar

You can add more apps to **Default Apps Area** of the app bar. (Maximum number of apps: 5)

{{< note >}}
This feature is only available on touch displays.
{{< /note >}}

1. Long-tap the screen in the launchpad app.
2. Tap the **+** button of the app you want to add to the app bar.
3. Toggle on the **Add to App Bar** button.
4. Then the app will be added to the app bar.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/adding-an-app-to-the-app-bar.jpg" caption="Adding an app to the app bar" alt="" >}}

If you want to delete apps from the app bar, long-tap the app bar and toggle on the **Delete from App Bar** button.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/deleting-an-app-from-the-app-bar.jpg" caption="Deleting an app from the app bar" alt="" >}}

### Deleting Apps from the Device

1. Long-tap the screen in the launchpad app.
2. Tap the **+** button of the app you want to add to the app bar.
3. Toggle on the **Delete App** button.

    {{< note >}}
    This button only appears in the 3rd party apps. Pre-installed apps cannot be deleted using this method.
    {{< /note >}}

4. Tap the **Yes** button of the pop-up window.

{{< figure src="/images/docs/guides/getting-started/webos-ui-guide/deleting-an-app-from-the-device.jpg" caption="Deleting an app from the device" alt="" >}}

## What's Next?

- Check the basic sample apps & services of webOS OSE in [Tutorials]({{< relref "tutorials" >}}).
- To find out how to use APIs of webOS OSE, see [Introduction to LS2 API]({{< relref "introduction-to-ls2-api" >}}).
