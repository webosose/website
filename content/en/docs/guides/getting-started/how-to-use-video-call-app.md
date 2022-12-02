---
title: Video Call Usage Guide
date: 2022-12-02
weight: 40
toc: true
---

Video Call is an app to support video call meetings in webOS OSE. Currently, the app supports [Cisco Webex](https://www.webex.com) or [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software).

## UI

To run the app, click the **Video Call** icon in the launchpad.

{{< figure src="/images/docs/guides/getting-started/video-call/video-call-app-icon.jpg" alt="a video call icon" caption="" >}}

Then the following screen will show up.

{{< figure src="/images/docs/guides/getting-started/video-call/video-call.jpg" >}}

## How to Use

Before accessing a video call, please make sure you connect a camera, microphone, and speaker properly.

{{< caution >}}
All devices should be connected using USB ports. Connecting through the 3.5 mm jack is not supported.
{{< /caution >}}

### Webex

1. Click the **Open with Webex** button. This action starts to connect to a Webex page through a web browser.

2. Enter the meeting number. Then click **Continue**.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-enter-meeting-number.jpg" alt="A screenshot of entering the meeting number" caption="" >}}

3. Enter the password. Then click **OK**.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-enter-meeting-password.jpg" alt="A screenshot of entering the password" caption="" >}}

4. Click the **Join Meeting** button.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-meeting-join.jpg" alt="A screenshot of meeting information" caption="" >}}
    
5. Enter your name and e-mail address. Then click **Next**.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-enter-personal-info.jpg" alt="A screenshot of entering personal information" caption="" >}}

6. Allow RPi4 access to your audio devices.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-allow-devices-access.jpg" alt="A screenshot of allowing device access" caption="" >}}

7. Check your camera, microphone, and speaker.

    {{< note >}}
    If one of those devices don't work, refer to [the official guide](https://help.webex.com/en-us/article/nti2f6w/Join-a-Test-Meeting) to test your audio devices.
    {{< /note >}}

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-meeting-preview.jpg" alt="A screenshot of meeting preview" caption="" >}}

8. Click the **Join meeting** button.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-join-meeting-button.jpg" alt="A screenshot of joinging the meeting" caption="" >}}

9. If successful, you can enter the meeting.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-meeting-screen.jpg" alt="A screenshot of the successful meeting" caption="" >}}

10. Click the **X** button to leave the meeting.

    {{< figure src="/images/docs/guides/getting-started/video-call/webex-leave-meeting.jpg" alt="A screenshot of the button to leave meeting" caption="" >}}
### Teams

1. Click the **Open with Teams** button. This action starts to connect to a Teams page through a web browser.

2. Enter your Microsoft account. Then click the **Next** button.

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-enter-id.jpg" alt="A screenshot of entering the MS ID" caption="" >}}

3. Enter the password. Then click the **Sign in** button.

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-enter-password.jpg" alt="A screenshot of entering the password" caption="" >}}

4. Verify your account using two-factor authentication. Choose the method you prefer.

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-2f-log-in.jpg" alt="A screenshot of two factor verification" caption="" >}}
    
5. Choose whether you stay log in or not. Then the Teams menu will show up.

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-stay-signed-in.jpg" alt="A screenshot of choosing to stay login" caption="" >}}
    
6. Go to the chat room you want, and click the icon button at the upper right corner. 

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-call-button.jpg" alt="A screenshot of Teams basic menu" caption="" >}}

7. After a while, a video call screen will show up. When the people in the chat room accept the call, the connection is established then the call begins. 

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-meeting-screen.jpg" alt="A screenshot of Teams basic menu" caption="" >}}

8. Click the **Leave** button to quit the call.

    {{< figure src="/images/docs/guides/getting-started/video-call/teams-leave-button.jpg" alt="A screenshot of the leave button" caption="" >}}

## What's Next

- See [Tutorials](/docs/tools/) to build your own sample apps and services.
- See [Tools](/docs/tools) to find various useful tools for webOS OSE.