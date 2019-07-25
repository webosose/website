---
title: WebSocket Communication on webOS
date: 2019-04-15
slug: websocket-communication-on-webos
posttype: article
toc: true
---

**Author: Jaeduck Oh**

There are many ways that web apps can use to communicate with the system or other apps. Among those, this article describes how to set up communication using WebSocket.

Before you begin, check the Wikipedia page for the WebSocket protocol at <https://en.wikipedia.org/wiki/WebSocket> if you're not familiar with WebSocket.

## Creating WebSocket Server

The first step is to create a WebSocket server.

You will need:

  - Host PC: Any PC with Python works fine, but this article is based on Linux.

  - Python 3.x (This article is tested on Python 3.5.3)

1. Download and install a server module using PIP.

    ``` bash
    yourLinux/websocket_server_python$ pip install SimpleWebSocketServer
    ```

    {{< note >}}
    You can find an example of a simple WebSocket server at <https://github.com/dpallot/simple-websocket-server>.
    {{< /note >}}

2. Create a file named `echo_server.py` and add lines of code as in the following.

    ``` bash
    yourLinux/websocket_server_python$ vi echo_server.py
    ```

    {{< code "echo_server.py" >}}
    {{< highlight python "linenos=table" >}}
    from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
    import json

    class SimpleEcho(WebSocket):
        def handleMessage(self):
            requestString = json.dumps(self.data)
            responseString = '{"msg_type":"result", "device_id" : "IFX001", "command":"ON", "result": "TRUE"}'
            self.sendMessage(responseString)

        def handleConnected(self):
            print(self.address, 'connected')


        def handleClose(self):
            print(self.address, 'closed')

    server = SimpleWebSocketServer('',9999, SimpleEcho)
    server.serveforever()
    {{< /highlight >}}
    {{< /code >}}

      - Line 5-6: When a message is received from a WebSocket client, the `self` object of the `handleMessage` function receives the data.

        Well then, what does `json.dumps` do?
        Our WebSocket client sends JSON-format strings to the server, and the server stores them in a python object. Therefore, it is necessary to convert that object back into the JSON-format data to use the data in a server program. That is what `json.dumps` does, converting a python object into a JSON string. By the way, `requestString` is not going to be used in this example.

      - Line 7-8: The WebSocket server creates a string in the JSON format and puts it into `responseString`. When a message is received from the WebSocket client, the server calls `sendMessage` and returns it.

3. Type the following command to run the server.

    ``` bash
    yourLinux/websocket_server_python$ python echo_server.py
    ```

That was how to create and run a WebSocket server in the host PC. There will be another article on how to create a WebSocket server with an ESP32 module and set up communication with sensors.

## Creating WebSocket Client

Now that there is a server running, let's create a WebSocket client.

{{< note >}}
You can download all the source code of the WebSocket client at <https://github.com/nickyzero/websocket_sample>.
{{< /note >}}

You will need:

  - Host PC: Any kind as long as you have an editor
  - CLI (included in webOS OSE SDK tools)

CLI, Command-Line Interface, is a tool that allows you to create projects, package apps, and more by entering commands. In this article, we will use a basic web app project provided by CLI instead of creating a blank project from scratch.

{{< note >}}
For information on how to download and install CLI in a host PC, see the [CLI user guide]({{< relref "cli-user-guide#installing-cli" >}}).
{{< /note >}}

1. Create a basic project using the `ares-generate` command.

  - app id: `com.sample.websocket`
  - title: `websocket sample`
  - version: `1.0.0`

    ``` bash
    yourLinux$ ares-generate -t basic com.sample.websocket
    ? app id (com.domian.app) com.sample.websocket
    ? title (new app) websocket sample
    ? version (0.0.1) 1.0.0 Generating basic in yourLinux/com.sample.websocket
    Success
    yourLinux$ cd com.sample.websocket
    ```

2. Delete the existing `index.html` file in the directory and create a new `index.html`.

    ``` bash
    yourLinux/com.sample.websocket$ rm index.html
    yourLinux/com.sample.websocket$ vi index.html
    ```

    {{< note >}}
    If you have any development tool that you are familiar with, you can use it instead of command `vi`. This article uses `vi`, but no further explanation will be provided on how to use it.
    {{< /note >}}

3. Add the following lines of code in `index.html` and save.

    {{< code "index.html" >}}
    {{< highlight html "linenos=table" >}}
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <title>WebSocket Test</title>
    <link rel="stylesheet" type="text/css" href="websocket.css">
    <script src="webOSjs-0.1.0/webOS.js" charset="utf-8"></script>
    <script src="websocket.js" charset="utf-8"></script>

    <h2>WebSocket Test</h2>

    <div id="output"></div>
    {{< /highlight >}}
    {{< /code >}}

      - Line 4: Link the stylesheet for your app
      - Line 5: Point to webOS libraries to use Luna Service APIs
      - Line 6: Point to JavaScript code for WebSocket
      - Line 10: Print the output from WebSocket communication

4. Create a CSS file named `websocket.css` and add lines of code as in the following to configure the style of you app.

    ``` bash
    yourLinux/com.sample.websocket$ vi websocket.css
    ```

    {{< code "websocket.css" >}}
    {{< highlight css >}}
    body {
        width: 100%;
        height: 100%;
        background-color: #202020;
    }

    div {
        position:absolute;
        height:100%;
        width:100%;
        display: table;
    }

    h2 {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
        color: #FFFFFF;
    }

    p {
        color: #FFFFFF;
    }
    {{< /highlight >}}
    {{< /code >}}

    The background color will be very dark gray, mostly black, and the text color will be white.

5. Now let's get to the actual WebSocket client. Create a JS file named `websocket.js` and add lines of code as in the following.

    ``` bash
    yourLinux/com.sample.websocket$ vi websocket.js
    ```

    {{< code "websocket.js" >}}
    {{< highlight javascript "linenos=table" >}}
    // need to change to websocket server's address
    var wsUri = "ws://<websocket server's address>:9999";
    var output;

    function init()
    {
      output = document.getElementById("output");
      testWebSocket();
    }

    function testWebSocket()
    {
      websocket = new WebSocket(wsUri);
      websocket.onopen = function(evt) { onOpen(evt) };
      websocket.onclose = function(evt) { onClose(evt) };
      websocket.onmessage = function(evt) { onMessage(evt) };
      websocket.onerror = function(evt) { onError(evt) };
    }

    function onOpen(evt)
    {
      writeToScreen("CONNECTED");
      doSend();
    }

    function onClose(evt)
    {
      writeToScreen("DISCONNECTED");
    }

    function onMessage(evt)
    {
      var message = JSON.parse(evt.data);
      writeToScreen('<span style="color: blue;">RESPONSE: ' + message.device_id + ' : ' + message.result +'</span>');
      // Call Notification method here
      websocket.close();
    }

    function onError(evt)
    {
      writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend()
    {
      var message = {
          "msg_type" : "command",
          "device_id" : "IFX001",
          "command" : "ON"
      };

      writeToScreen("SENT: " + JSON.stringify(message));
      websocket.send(JSON.stringify(message));
    }

    function writeToScreen(message)
    {
      var pre = document.createElement("p");
      pre.style.wordWrap = "break-word";
      pre.innerHTML = message;
      output.appendChild(pre);
    }

    // Notification code will be put here

    window.addEventListener("load", init, false);
    {{< /highlight >}}
    {{< /code >}}

      - Line 2: Specify the IP address of the WebSocket server
      - Line 5: Get the element with the ID, 'output', and put it in variable `output`. Run `testWebSocket()` in the next line.
      - Line 13: Create a WebSocket object, `websocket`, with the IP Address of the server
      - Line 14-17: Add event functions
      - Line 20-24: When the `websocket` opens, output "CONNECTED" on the screen and run `doSend()`
      - Line 26-29: When the `websocket` closes, output "DISCONNECTED" on the screen
      - Line 31-37: When a message is received from the server, parse it into the JSON format and output `device_id` and `result` on the screen
      - Line 39-42: This part is to handle errors. It writes error messages on the screen.
      - Line 44-54: Send a message to the WebSocket server. The message is formed in the JSON format and then converted into strings before being sent.

        {{< note >}}
        As data exchange is done in strings in WebSocket communication, a JSON object needs to be converted into a JSON-formatted string before being sent.
        {{< /note >}}

      - Line 56-61: Output messages on the screen
      - Line 66: Add an event listener. Run the `init` function when the page is loaded

Now try opening `index.html` with Chrome. Before doing that, make sure that the server is running.

You will see something like this.

{{< figure src="/images/blog/articles/websocket-test-1.png" caption="WebSocket test screen" >}}

Here you can see the result outputted on the screen, which is sent from the WebSocket Server.

## Writing Result Using Luna Service Notification API

We checked the result on the web browser. Now, let's try displaying notification messages on the webOS screen. webOS provides Luna Service API for notification that writes messages on the top right corner.

1. Open `websocket.js` and write lines of code for notification.

    ``` bash
    yourLinux/com.sample.websocket$ vi websocket.js
    ```

    {{< code "websocket.js" >}}
    {{< highlight javascript "linenos=table" >}}
    ...
    function onMessage(evt)
    {
      var message = JSON.parse(evt.data);
      writeToScreen('<span style="color: blue;">RESPONSE: ' + message.device_id + ' : ' + message.result +'</span>');
      showNotification(message);
      websocket.close();
    }
    ...
    function showNotification(message)
    {
      if (message.device_id == 'IFX001')
      {
          var device = "Light";
      }

      if (message.result == 'TRUE')
      {
          var status = "ON";
      }
      var lunaReq= webOS.service.request("luna://com.webos.notification",
          {
              method:"createToast",
              parameters:{
                  "sourceId" : "com.sample.websocket",
                  "message" : device + ' is turned ' + status
              },
              onSuccess: function (args) {

              },
              onFailure: function (args) {
              }
          });
    }
    ...
    {{< /highlight >}}
    {{< /code >}}

      - Line 6: When a message is received, output the result to the screen and call the `showNotification` function for notification
      - Line 10-34: Block for the `showNotification` function
      - Line 12-15: If the received `device_id` is "IFX001", variable `device` gets the string "Light"
      - Line 17-19: If `result` is "TRUE", variable `status` gets the string "ON"
      - Line 21-33: Call the Luna service. It uses the `createToast` method and passes `sourceId` and `message` to display as parameters.

{{< note >}}
In webOS, Toast refers to the Notification on the upper right corner of the screen.
{{< /note >}}

That's it for coding, and you're ready to package and install the app on your device.

## Installing and Launching App on webOS

You have developed a webOS app that uses WebSocket communication. Now let's see how it works in webOS. You will use CLI to package, install, and launch your app.

{{< note >}}
You can include apps in your webOS image when building it, but this article explains how to install an app using CLI.
{{< /note >}}

You will need:

  - Raspberry Pi 3B: Make sure the image of webOS OSE is flashed to its SD Card.
  - CLI (included in webOS OSE SDK tools)

### Packaging App

Before installing a web app on webOS, you first need to package it as `.ipk` using the `ares-package` command.

``` bash
yourLinux/com.sample.websocket$ ares-package .
Progressing...
Creating package com.sample.websocket_1.0.0_all.ipk in yourLinux/com.sample.websocket
Success
```

If the packaging is successful, you can find `com.sample.websocket_1.0.0_all.ipk` in the same directory.

### Device Registration

To install an app on Raspberry Pi, the device must be registered to CLI. Use the `ares-setup-device` command to do that.

For details about device registration, see [ares-setup-device]({{< relref "cli-user-guide#ares-setup-device" >}}).

### Installing App

We will now install the packaged app using the `ares-install` command with your device name and package name as parameters.

``` bash
yourLinux/com.sample.websocket$ ares-install -d <your device name> com.sample.websocket_1.0.0_all.ipk
Installing package com.sample.websocket_1.0.0_all.ipk
Success
```

If the installation is successful, the screen will look like this.

{{< figure src="/images/blog/articles/websocket-test-2.png" caption="Launcher showing the installed WebSocket sample app" >}}

### Launching App

As the app is successfully installed, let's launch the app. The command is `ares-launch`.

``` bash
yourLinux/com.sample.websocket$ ares-launch -d rpi com.sample.websocket
Launched application com.sample.websocket
```

After the launch is successfully done, you will see the screen like this.

{{< figure src="/images/blog/articles/websocket-test-3.png" caption="WebSocket sample app launched" >}}

## What's Next

So far, you have seen how to set up and use WebSocket communication in a web app on webOS. Now it is up to you how to define messages between the server and the client for efficient communication.

The next article will be about how webOS controls external sensors through WebSocket communication by installing the WebSocket server on the ESP32 module.
