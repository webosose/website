---
title: webOS OSE 2.19.0 Release
date: 2022-12-02
slug: webos-ose-2-19-0-release
posttype: release
toc: false
thumbnail: th-new-status-bar.jpg
---

We're pleased to announce the release of webOS Open Source Edition (OSE) 2.19.0.

The highlights of this release are as follows:

- [Enhanced Home App](#enhanced-home-app)
- [Video Call](#video-call)
- [Blockchain Wallet](#blockchain-wallet)
- [Yocto upgrade to 4.0 Kirkstone](#yocto-upgrade-to-40-kirkstone)
- [Chromuium Upgrade to v94](#chromuium-upgrade-to-v94)
- [Qt 6.4 Update](#qt-64-update)

For more details on this release, see the [release notes](/about/release-notes/webos-ose-2-19-0-release-notes).

## Enhanced Home App

In the previous webOS OSE 2.18.0 release, we introduced the re-designed Home App. In this release, we introduce many enhanced features for webOS OSE users:

- Status Bar for frequently used functionalities
- Freely editable App Bar
- New touch gestures
- And more!

Check out the [webOS OSE UI Guide]({{< relref "webos-ose-ui-guide" >}}).

{{< figure src="/images/blog/news/enhanced-home-ui.jpg" caption="A new Home App" >}}

## Video Call

Video Call is an application that enables users to access virtual meetings easily. For now, this app only supports [Cisco Webex](https://www.webex.com/) and [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software).

See the [Video Call Usage Guide]({{< relref "how-to-use-video-call-app" >}})

{{< figure src="/images/blog/news/video-call.jpg" caption="The Video Call App" >}}

## Blockchain Wallet

From this release, webOS OSE introduces a command-line environment for build your own blockchain wallet application. This app helps webOS OSE devices create a command-line file system wallet, sign transactions, and log those transactions into blockchain data through blockchain networks. You can also create fungible and non-fungible tokens, and mint Solana NFTs.

{{< warning >}}
webOS OSE doesn't provide a secure environment for blockchain wallets. LG Electronics is not responsible for any accident using blockchain wallets on webOS OSE.
{{< /warning >}}

{{< note >}}
More updates and related documents will be released in the future.
{{< /note >}}

## Yocto upgrade to 4.0 Kirkstone

webOS OSE has upgraded its Yocto support from 3.1 to 4.0. The following [build-webos](https://github.com/webosose/build-webos) releases of OSE contain Yocto upgrade builds.

  - Build 509: Yocto 3.2 Gatesgarth upgrade build
  - Build 510: Yocto 3.3 HardKnott upgrade build
  - Build 511: Yocto 3.4 Honister upgrade build
  - Build 512: Yocto 4.0 Kirkstone upgrade build

See [Release 4.0 (kirkstone)](https://docs.yoctoproject.org/dev/migration-guides/migration-4.0.html) for more information.

## Chromuium Upgrade to v94

The web engine of webOS OSE has been upgraded from Chromium 91 to Chromium 94. This upgrade to a more up-to-date version includes major security and performance enhancements. See [New in Chrome 94](https://developer.chrome.com/blog/new-in-chrome-94/) for more information.

## Qt 6.4 Update

webOS OSE has updated its Qt version to 6.4. For more information about Qt 6.4 release, see [Qt 6.4 Released](https://www.qt.io/blog/qt-6.4-released) on the Qt website.
