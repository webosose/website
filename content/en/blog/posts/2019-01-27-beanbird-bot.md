---
title: 'Beanbird Bot: Building a web app enabled robot with ROS2 and webOS'
date: 2019-01-27
slug: beanbird-bot
posttype: article
toc: true
thumbnail: th-beanbird-bot.jpg
---

**Author: Brian Shin**

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image1.jpg" alt="" caption="Beanbird Bot" >}}

One of the main advantages of the webOS platform lies in its strength in graphical capabilities on low-cost embedded platforms. Combined with the Enact framework, webOS offers a high-performance graphics stack for rendering web applications seamlessly on resource-constrained hardware. In addition to television and signage where webOS has traditionally been used, robotics offers another great application area for such capabilities.

We built the Beanbird robot ("Beanbird Bot") to demonstrate the capabilities of robotics software running on webOS Open Source Edition (OSE). Beanbird Bot runs Robot Operating System 2 (ROS 2), a robotics middleware, on an inexpensive and accessible hardware platform, the Raspberry Pi 3. It has joystick control and sensors including camera, ultrasound, and range sensors. Furthermore, it displays a range of emotions and reacts to its environment, recognizes objects and displays them on its screen, and makes sounds based on the activity it is engaged in. This is made possible by an Enact-based web application running on the same Raspberry Pi hardware as the robotics platform.

Whether you are thinking of building a relatively inexpensive social robot or building educational robots, this post will show you how to build your own Beanbird robot and leverage the webOS platform for your robotics needs, and detail our development process of creating a robotics software prototype for a specific application by combining webOS OSE and ROS 2.

{{< note >}}
You can also watch the [video](https://www.youtube.com/watch?v=lCGa7LkDNp0) of Beanbird Bot in action.
{{< /note >}}

## How to Build the Robot

Beanbird Bot is based off of the popular Duckietown platform first started at MIT and now maintained by the Duckietown Foundation. The basic Duckiebot hardware consists of the chassis, battery, camera, Raspberry Pi, Raspberry Pi motor hat, and motors/wheels. In addition, Beanbird Bot adds a 7 inch Raspberry Pi touchscreen, a touchscreen case, an ultrasonic sensor, a time-of-flight distance sensor, and an Intel Neural Compute Stick for running deep learning models for image classification.

### Parts List

  - Basic Duckiebot configuration parts, specifically DB17-wjd (2017 version) - [Link to the parts](https://docs.duckietown.org/DT17/opmanual_duckiebot/out/acquiring_parts_c0.html)
      - **Note**: a battery capable of combined output of at least 4.5A is needed - [Link to the part](https://www.amazon.com/gp/product/B075ZR4N99/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
  - Specific joystick we use (EasySMX 2.4G Wireless controller) - [Link to the part](https://www.amazon.com/EasySMX-Wireless-Controller-Gamepads-Vibration/dp/B01KV7B2CG/ref=sr_1_2?s=electronics&ie=UTF8&qid=1546976821&sr=1-2&keywords=easysmx+wireless)
  - Official Raspberry Pi 3 Touchscreen 7” - [Link to the part](https://www.amazon.com/Raspberry-Pi-7-Touchscreen-Display/dp/B0153R2A9I/ref=sr_1_3?ie=UTF8&qid=1546481915&sr=8-3&keywords=raspberry+pi+3+touchscreen)
  - SmartPi Raspberry Pi 3 Touchscreen Mount - [Link to the part](https://www.amazon.com/SmartiPi-Official-Raspberry-Touchscreen-Display/dp/B01HV97F64/ref=sr_1_fkmr0_3?ie=UTF8&qid=1546481392&sr=8-3-fkmr0&keywords=raspberry+pi+3+touchscreen+mount)
  - HC-SR04 Ultrasonic sensor w/ mount - [Link to the part](https://www.amazon.com/Smraza-Ultrasonic-Distance-Mounting-Duemilanove/dp/B01JG09DCK/ref=sr_1_5?ie=UTF8&qid=1546481197&sr=8-5&keywords=hc-sr04)
  - VL6180X Time of flight distance sensor - [Link to the part](https://www.amazon.com/Adafruit-VL6180X-Flight-Distance-Ranging/dp/B01N0ODI3Q/ref=sr_1_1?ie=UTF8&qid=1546481257&sr=8-1&keywords=vl6180x)
  - Intel Movidius Neural Compute Stick - [Link to the part](https://software.intel.com/en-us/movidius-ncs)
  - Mini portable speaker - [Link to the part](https://www.amazon.com/gp/product/B01NCQ5BAM/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
  - Additional M2.5 screws, standoffs, washers, nuts - [Link to the part](https://www.amazon.com/dp/B07JYSFMRY/ref=twister_B01HBV79JK?_encoding=UTF8&psc=1)
  - Additional M3 screws, standoffs, washers, nuts - [Link to the part](https://www.amazon.com/gp/product/B06Y5TJXY1/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1)
  - Additional female and male jumper wires - [Link to the female jumper wires](https://www.adafruit.com/product/793), [Link to the male jumper wires](https://www.adafruit.com/product/1957)

### Building the Robot

1.  You can find the instructions for assembling the basic Duckiebot configuration on the [main Duckietown documentation site](http://docs.duckietown.org/DT19/opmanual_duckiebot/out/assembling_duckiebot_db18.html).
    - The battery should power the Raspberry Pi and the motor board through the two dual outputs.
2.  After assembling the basic Duckiebot, add the touch screen to the touch screen mount and attach to the top of the chassis. The screen can be powered by connecting to the power headers on the motor board.
3.  Add the ultrasonic sensor to the front of the robot, preferably with a mount. You can connect it to the appropriate GPIO headers on the motor board/Raspberry Pi.
4.  Add the time-of-flight distance range sensor: you will need to connect to the motor board/Raspberry Pi I2C pins.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image2.jpg" alt="" caption="Joystick controller used to control the robot" >}}

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image3.jpg" alt="" caption="Ultrasound and range sensor" >}}

### Running the Robot

  - Burn the SD card with webOS + ROS 2 image after downloading from our [releases](https://github.com/lgsvl/build-ros2-lgsvl/releases) page. Currently with this image, on boot all necessary processes for running the robot will run, including the ROS 2 nodes, user touchscreen Face web application, and OS services.
  - Alternatively, you can build the OS image yourself by following the instructions on our README at our Github [repository](https://github.com/lgsvl/build-ros2-lgsvl). This will allow you to add to or make changes to the image before flashing the image to the SD card.
  - Here is what the robot should do:
      - Respond to joystick control
      - Make facial expressions, play sounds as it moves
      - Recognize objects and show them on the screen
      - Stop when path is obstructed by an obstacle or when it approaches a cliff
  - After placing the SD card into the Raspberry Pi and booting, the robot should start up, the Face application will be displayed, and you should be able to control the robot with the joystick.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image4.jpg" alt="" caption="A fully assembled Beanbird Bot" >}}

## ROS 2 on webOS

{{< figure src="/images/blog/articles/beanbird-bot-yocto-layer.png" alt="" caption="The Yocto layer of Beanbird Bot" >}}

### Beanbird Yocto Stack

Our work builds on open source contributions to the Yocto layer meta-ros. Continuing from an existing ROS 2 pull request, we updated ROS 2 Bitbake recipes (ament, ros2 core packages), added missing core packages, and fixed dependencies.

We first upgraded the meta-ros2 layer to the latest release of ROS 2 (Ardent). We added Bitbake recipes to build components necessary for running ROS 2 itself efficiently on a Raspberry Pi, including python3-opencv, boost, an ament tool for python. Then, by taking the existing Yocto meta-layer for webOS, we added several components needed for hardware support, including touchscreen, I2C and GPIO, and joystick. We also added specific ROS 2 core packages that were needed for our use case, including parts of the vision_opencv suite (cv_bridge and image_geometry) as well as support for the Intel Movidius SDK to communicate with the [Intel Neural Compute Stick](https://developer.movidius.com/). By including only components needed for the robot’s desired functionality, the system image itself avoids unnecessary overhead and maintains a small footprint.

The result is a fully buildable webOS distribution for the Raspberry Pi 3 capable of running ROS 2 nodes as well as visual applications. Anyone can now add a Yocto layer with recipes for their own ROS 2 packages.

### Robotics Capabilities

Our Beanbird robot is based on [the Duckietown](http://duckietown.org/) project originally started at MIT and is capable of joystick control, object recognition through the Raspberry-Pi camera, visual reaction (facial expressions and sounds) and obstacle avoidance via integration of ultrasonic and IR proximity sensors. We integrate ROS 2, which drives the perception, movement, and object recognition, with webOS, which drives the main web application UI that interacts with the surrounding environment.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image6.png" alt="" caption="Core system components driving Beanbird Bot" >}}

We use the [ros2-web-bridge](http://github.com/RobotWebTools/ros2-web-bridge) project to allow web applications to communicate with ROS 2 nodes. Ros2-web-bridge allows to access ROS 2 topics from applications or frameworks which don’t have or cannot have ROS 2 native bindings. Instead it implements custom [JSON-based protocol](http://github.com/RobotWebTools/rosbridge_suite/blob/develop/ROSBRIDGE_PROTOCOL.md) over websocket. When webapp pushes a new message to websocket, the ros2-web-bridge receives it, converts to ROS 2 native message and publishes it to other ROS 2 nodes. Bridge also maintains the list of subscribed topics and notifies websocket client about published messages from other ROS 2 nodes.

One disadvantage of ros2-web-bridge is that it is not suitable for large amounts of data, such as images, as it introduces significant delay. Thus we extended ROS 2 camera node to serve raw image data (jpeg) over plain HTTP server. Enact web applications can then easily access this HTTP endpoint.

### Enact Web Application

To create the UI for the robot, we used [Enact](http://enactjs.com/), a React-based application framework. The first step was to create the project. We used Enact’s CLI tool to create the skeleton and then we used npm to install the roslib library. We did not need to do any additional setup for the configuration of our development environment because Enact handled it all.

The second step was to begin coding the application. Because webOS allows us to use web technologies for native applications, we were able to quickly iterate on the app itself. Enact’s ‘serve’ feature updated the application with code changes in real time without having to stop, rebuild, and redeploy. Additionally, we could develop using the debugging features of desktop browsers and switch to the robot seamlessly.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image7.png" alt="" caption="The Face Application UI with touchscreen controls" >}}

The application itself consists of two parts. The first part is the expressive face. To produce the face, a set of combinable behaviors was defined. The behaviors control the rendering of facial elements and can combine to produce hundreds of unique expressions. The second part is the interface to ROS. We subscribed to the ROS topics we were interested in, which were mapped to facial expressions that we assigned in the configuration files. This, for example, allows us to match the object identification system to specific facial expressions and optional sounds.

The final step, once the application was complete, was to package it for deployment. We created an optimized production build of the application and packaged it using webOS tools. This was then installed onto the robot and configured to start when the robot powers on.

The source code is available on [Github](https://github.com/enactjs/face). As mentioned, the application can be served locally (follow the directions in the README.md file). If a connection to the robot cannot be established, mock data will be used automatically. Clicking on the robot face will bring up an ‘expression console’ for testing different combinations of expressions.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image8.png" alt="" caption="The web app enables dynamic facial expressions, animations, and features" >}}

## Next Steps

There are several directions to take as next steps for a robot like Beanbird Bot. One example is more autonomous behavior, such as lane following, localization, and navigation around a map. Furthermore, a developer could leverage the flexible web UI framework to build a robot that can interact with humans, allow video calls, or stream content for education or entertainment.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image9.jpg" alt="" caption="A lane-following Beanbird Bot" >}}

webOS OSE is a lightweight but powerful embedded Linux distribution that is worth thinking about for a robotics application. With the Enact framework, it is especially powerful for creating fully-featured and beautiful user-facing web applications that can communicate directly with the underlying robotics software. It is easy to get started, and all of the documentation is readily available for you to try directly.

{{< figure src="https://github.com/lgsvl/build-ros2-lgsvl/wiki/image10.jpg" alt="" caption="Build one yourself!" >}}
