---
title: webOS OSE 2.26.0 Release
date: 2024-06-05
slug: webos-ose-2-26-0-release
posttype: release
toc: true
thumbnail: th-release-2-26-0-pwa.png
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.26.0.

The highlights of this release are as follows:

- [Enhancing Media Features](#enhancing-media-features)
- [Enabling Proxy Connection](#enabling-proxy-connection)
- [Supporting PWA](#supporting-pwa)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-26-0-release-notes).

## Enhancing Media Features

webOS OSE now supports pause, resume, and audio-only recording features. 

- Recording
  - supports pause, resume, and audio-only recording features.
  - Supported resolution/frame rates are FHD/20 FPS and HD/30 FPS. For more details, see [com.webos.service.mediarecorder]({{< relref "com-webos-service-mediarecorder" >}}).
- Audio
  - Supports pause, stop, and volume control on short-period audio. For more details, see [com.webos.service.audio]({{< relref "com-webos-service-audio" >}}).

## Enabling Proxy Connection

The Enact browser has been updated to allow users to use a proxy while surfing websites. This feature enhances security, expands access to content, and provides greater flexibility for developers in managing their network connections.

The following example shows how to use a proxy server to allow/disallow access to `.facebook.com`.

### Setting Up the Proxy Server

1. Set up a valid proxy server. In this example, we use [Squid](https://www.squid-cache.org/). See the setup guide ([on Ubuntu](https://www.tecmint.com/install-squid-in-ubuntu/), [on Window](http://squid.diladele.com/)).
2. (On Ubuntu) Open the config file in the vi editor.

    ```bash
    sudo vi /etc/squid/squid.conf
    ```

3. Change the following line to allow all accesses.

    {{< code "Before" >}}
    ```sh
    http_access deny all
    ```
    {{< /code >}}

    {{< code "After" >}}
    ```sh
    http_access allow all
    ```
    {{< /code >}}

4. Add the following two lines above the line in step 03.

    ```sh
    acl bad_sites dstdomain .facebook.com
    http_access deny bad_sites
    ```

5. Save the changes and exit the editor.
6. Restart the proxy server.

    ```bash
    sudo systemctl restart squid
    ```

### Managing Access Using the Proxy Server

1. Turn on the proxy server. For `IP_ADDRESS` and `PORT_NUMBER`, use the proxy server you set up with [Setting Up the Proxy Server](#setting-up-the-proxy-server). By default, the port number is **3128**.

    ```bash
    luna-send -f -n 1 luna://com.webos.settingsservice/setSystemSettings '{"category":"commercial", "settings": {"proxyEnable":"on","proxyMode":"single","proxyScheme":"http","proxySingleAddress":"IP_ADDRESS","proxySinglePort":"PORT_NUMBER","proxySingleUsername":"","proxySinglePassword":"","proxyBypassList": ".facebook.com"}}'
    ```

2. (Proxy bypass test) Launch the Enact browser. Use the same `IP_ADDRESS` and `PORT_NUMBER`.

    ```bash
    una-send -n 1 -f luna://com.webos.applicationManager/launch '{"id": "com.webos.app.enactbrowser", "params":{"target":"https://www.facebook.com/"}}'
    ```

    Then the `target` URL will be launched in the browser.

3. (Proxy denial test) Remove proxy `byPassList`.

    ```bash
    luna-send -f -n 1 luna://com.webos.settingsservice/setSystemSettings '{"category":"commercial", "settings": {"proxyEnable":"on","proxyMode":"single","proxyScheme":"http","proxySingleAddress":"IP_ADDRESS","proxySinglePort":"PORT_NUMBER","proxySingleUsername":"","proxySinglePassword":"","proxyBypassList": ""}}'
    ```

    If you reload the browser, the URL will not be loaded.

## Supporting PWA

Since this release, Progressive Web Application (PWA) has been available on webOS OSE. If the user visits a website that supports PWA, an install button will be activated at the top right of the browser. To install a PWA, click the button.

{{< figure src="/images/blog/news/2-26-0-release/install-pwa.jpg" caption="" alt="Install button for PWA" class="align-left" >}}

Installed PWAs will be located in the Launchpad, just like other apps.

{{< figure src="/images/blog/news/2-26-0-release/installed-pwa-facebook.jpg" caption="" alt="Installed PWA" class="align-left" >}}
