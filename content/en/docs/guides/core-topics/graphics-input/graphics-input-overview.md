---
title: Graphics and Input
date: 2019-04-18
weight: 10
toc: true
---

To handle graphics operations as well as input events and weld them into seamless user experience, a software platform requires a set of well-defined mechanisms to manage graphics and input. In webOS, **Luna Surface Manager (LSM)** is the component that manages graphics and input. LSM is fully compliant with the Wayland protocol, which is the state-of-the-art solution to support multiple UI processes. This page describes how graphics and input are handled inside webOS Open Source Edition (OSE), focusing on LSM and the Wayland protocol.

## Overview

LSM is a service module responsible for composition of Wayland surfaces, rendering of webOS System UI, and input event handling. In all modern graphics systems, surface management and input handling are deeply related. Likewise, when the webOS system receives input from the user, LSM arbitrates the input among multiple clients to make the relevant graphics element respond to the event accordingly. One of the notable characteristics of LSM is that it is just another Qt application that consists of a single user process.

### Terminology

Before diving into the details, familiarize yourself with key terms related to LSM.

<!-- Beginning of term definition -->

LSM
: Luna Surface Manager (LSM) is responsible for graphics management in webOS. LSM uses the Wayland protocol for the Wayland compositor, which is a display server. LSM is developed using QML.

Wayland
: Wayland is a protocol that specifies communication between a display server and its clients. LSM uses the Wayland protocol to perform compositor functionality.

Qt
: Qt is a cross-platform application framework for developers who use C++ or QML.

QPA
: Qt Platform Abstraction (QPA) is a graphics/input hardware abstraction layer for Qt applications.

QtWayland
: QtWayland is a Qt5 module that wraps the Wayland features.

QML
: QML stands for Qt Meta Language or Qt Modeling Language. QML is a JavaScript-based Qt modeling language used for creating GUI.

EGL
: EGL is an interface between hardware-accelerated rendering APIs (such as GL and GLES) and the underlying native platform window system. EGL is responsible for graphics context management, surface/buffer binding, and rendering synchronization.

EGLImage
: EGLImage is the EGL resource type defined in the EGL extension. It allows images to be shared between client APIs.

Scene graph
: Scene graph is a graphics representation of an item scene. It is an independent data structure that includes the information necessary to render items.

Ozone
: In Chromium, Ozone is a platform abstraction layer beneath the Aura window system that is used for low level input and graphics.

Ozone-Wayland
: Ozone-Wayland is the implementation of Chromium's Ozone for supporting Wayland graphics system.

<!-- End of term definition -->

### Roles of LSM

In webOS OSE, Bare App (application) and Launcher (System UI) are the UX that users encounter first. The following shows the result of Bare App's rendering displayed in the full-screen window area and the Launcher UI displayed on top of that.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image1.png" alt="" caption="webOS OSE graphics example" width="600px" >}}

Behind the scenes, LSM performs the role of a graphics compositor so that System UI and applications can be rendered seamlessly on the screen. LSM manages the windows created by applications and performs blending of application's graphics and System UI. In addition, LSM handles input so that graphics can be updated and displayed appropriately in response to user input.

### Architecture Diagram

The diagram below shows LSM along with external modules that interact with LSM. Highlighted blocks indicate modules directly related to LSM. Because LSM is one of webOS components, it uses Luna Bus to communicate with other webOS components.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image2.png" alt="" caption="LSM architecture diagram" width="900px" >}}

At the top, there are Wayland clients such as Web App Manager (WAM), Qt/QML Native, and Pure Native. Pure Native refers to applications that use Wayland EGL directly without using an additional adaptation layer.

**Wayland adaptation** layer includes adaptation layers for each client type: Ozone-Wayland for WAM, and Wayland QPA for Qt/QML applications. Wayland adaptation layer connects an application framework owned by an application with the Wayland protocol API. Through this connection, the application can perform rendering based on its framework API, and each API call is converted to its corresponding Wayland protocol and sent to LSM.

The **Wayland protocol** is a protocol for window management control. **Wayland EGL** is an extension of EGL, an interface portable layer for graphics resource management. Wayland EGL is largely divided into two parts: one is where a client allocates GPU memory to perform rendering, and the other is where the server fetches GPU memory (allocated by the client) to perform composition.

QPA exists on both the client side and the LSM side. QPA on the LSM side (**"QPA"**) manages frame buffers, or sends the input event coming from the hardware to the LSM's window. QPA on the client side (**"Wayland QPA"**) is required for the Qt/QML Native client to perform rendering in graphics buffers. The client-side QPA sends the required information to the server side (compositor) using the Wayland protocol.

## Graphics

The following sections examine the internal architecture of webOS OSE in terms of graphics processing.

### Wayland

This section describes components related to Wayland (highlighted in red) in detail.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image3.png" alt="" caption="Wayland-related components" width="900px" >}}

Wayland is defined as a display server protocol in Wikipedia, and it indicates the **Wayland protocol** area in the above diagram.

**Wayland EGL** is a client-side hardware integration layer. When rendering is performed on the client side, Wayland EGL processes the task and integrates the result with the hardware (GPU owned by SoC). To achieve high-performance graphics compositing, it should be possible to perform rendering after compositing the results of client rendering with the minimum number of copy operations. To do so, Wayland EGL allows graphics buffers of different processes to be shared with the compositor so that blending can be performed without restriction. The EGL stack implemented by hardware chipset vendors must define a vendor-specific protocol extension that enables the compositor to create an EGLImage from the shared buffers.

As mentioned above, **Wayland adaptation** layer includes adaptation layers for each client type. QtWayland is divided into the client side and the server side, which correspond to Wayland adaptation layer (with Wayland QPA implemented) and the bottom part of LSM (not shown in the above diagram), respectively. By the QtWayland mechanism, events are transferred between the server side and the client side using the Wayland protocol.

{{< note "Porting LSM" >}}
To apply LSM to other chipsets, it is required to implement Wayland EGL, which is a porting interface. The graphics driver should provide Wayland EGL by re-implementing the Wayland native window system. If a chipset vendor cannot disclose the driver code, the chipset vendor should implement Wayland EGL. In this case, porting can be done without major modifications.
{{< /note >}}

The figure below shows the software stack of the QtWayland Compositor and the client. Note that some of them overlap with previously described blocks.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image4.png" alt="" caption="QtWayland Compositor and client stack" width="900px" >}}

The client-side stack includes the application code, so OpenGL ES-based rendering is performed on this side. The Wayland-related interfaces are glued together via Wayland adaptation layer. Below that, libwayland-client is located, which is the client side of the Wayland protocol. The result of OpenGL ES rendering is integrated using the Wayland client EGL interface. The client side communicates with the compositor using the Wayland wire protocol. The Wayland protocol is used for controlling the surface and input.

In the compositor-side stack, the rendering result remotely received from the client comes in through the Wayland wire protocol path. System UI locally rendered by the compositor is processed in OpenGL ES. The result of surface rendering by the client is also blended using the OpenGL ES interface. Finally, the compositor process uses display resources of the underlying hardware via QPA on the compositor side.

#### Wayland Protocol Basics

Basically, Wayland is an asynchronous object oriented protocol. The Wayland protocol defines objects such as surface, buffer, keyboard, pointer, and data. Each object defines various interfaces that can be used by the object, and requests and events are defined in the interface. A request is the method invocation on an object, which is sent from the client to the server. An event is the response to requests or the notification on server state changes, which is sent from the server to the client. For the Wayland protocol specification, see the [Wayland documentation](http://wayland.freedesktop.org/docs/html/).

{{< note "wayland-scanner" >}}
wayland-scanner, which is a tool implemented in the Wayland library, scans the Wayland protocol written in XML and generates C source code.
{{< /note >}}

The code below is an example of the Wayland standard protocol defined in the upstream codebase. The actual XML file describes the roles of this protocol.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<protocol name="wayland">
    <interface name="wl_surface" version="2">
        <request name="destroy" type="destructor">
        </request>
        <request name="attach">
            <arg name="buffer" type="object" interface="wl_buffer" allow-null="true"/>
            <arg name="x" type="int"/>
            <arg name="y" type="int"/>
        </request>
        <request name="damage">
            <arg name="x" type="int"/>
            <arg name="y" type="int"/>
            <arg name="width" type="int"/>
            <arg name="height" type="int"/>
        </request>
        <request name="frame">
            <arg name="callback" type="new_id" interface="wl_callback"/>
        </request>
        <request name="commit">
        </request>
```

The following shows an example of the protocol extended for webOS OSE.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<protocol name="webos-shell">
    <interface name="wl_webos_shell" version="1">
        <request name="get_system_pip">
            <arg name="id" type="new_id" interface="wl_webos_system_pip"/>
            <arg name="surface" type="object" interface="wl_surface"/>
        </request>
        <request name="get_shell_surface">
            <arg name="id" type="new_id" interface="wl_webos_shell_surface"/>
            <arg name="surface" type="object" interface="wl_surface"/>
        </request>
    </interface>
    <interface name="wl_webos_shell_surface" version="1">
        <request name="set_state">
            <arg name="state" type="uint"/>
        </request>
        <event name="state_changed">
            <arg name="state" type="uint"/>
        </event>
        <event name="close">
        </event>
```

### Client Rendering Process

This section describes the rendering process on the client side.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image5.png" alt="" caption="Wayland client rendering process" width="900px" >}}

(1) To perform rendering, the window to be used for rendering must be defined. A window is the same concept as the surface in Wayland. When the request for creating `wl_surface` is received through Wayland adaptation layer, the request is sent to the compositor through libwayland-client, and then the compositor allocates the structure for the surface that the client requested.

(2) To make space for rendering, the client calls the `eglCreateWindowSurface()` using the Wayland EGL interface. The allocation of graphics buffers for rendering does not occur at this step.

(3) The client gets the buffers allocated for rendering of the first frame. The client requests creation of buffers to the compositor using the Wayland protocol through libwayland-client (the process is not shown on the diagram). The compositor gets the buffers allocated using the extended protocol on the GPU side connected through Wayland EGL.

(4) The client connects the allocated buffers with the EGL surface created by `eglCreateWindowSurface()`, and performs rendering on buffers using the GLES interface.

(5)-(6) When the rendering is completed, the client finishes the frame processing and requests a swap buffer operation to Wayland EGL using `eglSwapBuffers()`.

(7)-(8) The result of rendering by Wayland EGL (buffer) is shared with LSM. Using the result, LSM performs composition and rendering to display the final output on the screen.

Note that not the whole sequence is performed on all rendered frames. Step (1) is performed only once initially, and Step (2) and (3) are performed twice because two buffers are allocated at the beginning. After that, Step (4) through (8) are repeated because the rendering is performed using swap buffer operations on the two buffers.

{{< note "attach, damage, commit" >}}
The "attach" and "commit" in Step (8) are part of the Wayland protocol concepts, as follows.

  - **attach**: A request to bind a specific buffer to a specific surface
  - **damage**: A request to describe the changed ("damaged") regions so that only the changed part in the surface can be repainted
  - **commit**: A request to make composition of the surface performed because the rendering has been completed
{{< /note >}}

### QtWayland Compositor

LSM uses QtWayland Compositor as a Qt application running on top of QPA.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image6.png" alt="" caption="QtWayland Compositor and QPA" width="900px" >}}

LSM renders Wayland surfaces and local UI elements (System UI such as Toast) together. QML defines each rendered item as a `QQuickItem`. `WebOSSurfaceItem`, the class for Wayland surfaces, inherits from `QWaylandSurfaceItem`, which in turn inherits from `QQuickItem`. Thus, `WebOSSurfaceItem` is a type of `QQuickItem` that contains the results of application's rendering. The compositor performs rendering and composition of various `QQuickItem` objects (including `WebOSSurfaceItem` objects) using the Qt scene graph mechanism.

QtWayland Compositor runs on top of QPA, which is a platform abstraction layer for graphics and input system. On the other hand, Qt/QML Native clients are connected to LSM via Wayland, rather than directly connected with graphics/input hardware, so the clients use Wayland QPA.

QPA is standardized, so it is possible to run Qt/QML Native clients on the QPA of webOS OSE. Instead, in this case, the application would run by occupying the graphics/input hardware exclusively without the composition process using Wayland.

#### Rendering Architecture

QtWayland Compositor relies on the Qt scene graph structure and rendering architecture. The screenshot below shows Bare App (Wayland surface of Fullscreen type) in full screen, Settings app (Wayland surface of Overlay type) on top, and Toast (System UI) on top of them.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image7a.png" alt="" caption="Screenshot of rendered applications" width="600px" >}}

This can be illustrated as a window layout view shown below. Inside the Root window owned by LSM, `FullscreenView` and `OverlayView` are defined. The result of Wayland surface rendering is placed in the `FullscreenView` or `OverlayView`. Toast is not a Wayland surface, but a local UI element owned by LSM. The screenshot above is the result of compositing the Wayland surfaces (the result of swap buffer operations by each client) and Toast (System UI rendered in QtDeclarative module by the QML logic of LSM) along with their coordinates and Z-order information.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image7b.png" alt="" caption="Window layout view diagram" width="600px" >}}

{{< note "Window types" >}}
For detailed description of window types in webOS OSE, see the [**Window Types**](#window-types) section below.
{{< /note >}}

The following set of code is the snippets of LSM implementation. LSM is basically written in QML. As shown in the code below, LSM defines window models first, checks the type of surfaces, and appends each surface into a relevant window model.

Let's look at the example of Fullscreen window model. This model has a filter function which checks the `fullscreen` property of a surface item. If `surfaceItem.fullscreen` is true, the surface is appended to this model. The data appended to this model is displayed as `FullscreenView`. When a surface is appended to this model, `onSurfaceAdded` handler is called and related operations are performed.

{{< code "[FullscreenWindowModel.qml](https://github.com/webosose/luna-surfacemanager/blob/master/base/qml/WebOSCompositorBase/models/FullscreenWindowModel.qml)" >}}
{{< highlight cpp >}}
import QtQuick 2.4
import WebOSCoreCompositor 1.0

WindowModel {
    surfaceSource: compositor.surfaceModel
    acceptFunction: "filter"

    function filter(surfaceItem) {
        return surfaceItem.fullscreen;
    }
}
{{< /highlight >}}
{{< /code >}}

The following shows a part of the code for `FullscreenView`.

{{< code "[FullscreenView.qml](https://github.com/webosose/luna-surfacemanager/blob/master/base/qml/WebOSCompositorBase/views/FullscreenView.qml)" >}}
{{< highlight cpp >}}
SurfaceView {
    id: root
    layerNumber: 1
    fill: true
    positioning: true
    consumeMouseEvents: true

    onSurfaceAdded: {
        if (root.access) {
            var oldItem = currentItem || null;
            currentItem = item;
            currentItem.parent = root;
            currentItem.useTextureAlpha = true;
            root.requestFocus();
            root.openView();
            if (oldItem)
                oldItem.fullscreen = false;
        } else {
            item.close();
            console.warn("AccessControl: " + root + " is restricted by the access control policy.");
        }
    }

    onSurfaceRemoved: {
        if (currentItem == item)
            currentItem = null;
        if (!currentItem) {
            root.releaseFocus();
            root.closeView();
        }
        item.parent = null;
    }

    ...
}
{{< /highlight >}}
{{< /code >}}

### Window Types

The table below shows each window type with its window property value. All of them are Wayland surfaces, but they have different layers and types. Fullscreen is a window type that occupies the full-screen space. LSM applied the window property, which is a concept used in Qt, to Wayland. An application can set its own window type as a property and the compositor receives this information using the protocol. No matter what the application is, LSM checks its window property value and determines which window model to append the surface into. When the model is determined, the surface is displayed in the view relevant to the model.

<div class="table-container">
<table class="table is-bordered is-fullwidth">
<thead>
<tr>
<th>Type</th>
<th>Window property</th>
<th>Description</th>
</tr>
</thead>

<tbody>
<tr>
<td>Popup</td>
<td>_WEBOS_WINDOW_TYPE_POPUP</td>
<td>Overlays Fullscreen/Overlay type applications.</td>
</tr>

<tr>
<td>Overlay</td>
<td>_WEBOS_WINDOW_TYPE_OVERLAY</td>
<td>Overlays Fullscreen type applications.</td>
</tr>

<tr>
<td>Fullscreen</td>
<td>_WEBOS_WINDOW_TYPE_CARD</td>
<td>The default type for applications running in full screen.</td>
</tr>
</tbody>
</table>
</div>

Window types are not fixed, which means that it is also possible to add a new window type or remove an existing window type. You can also redefine the characteristics of an existing window type.

### Surface Life Cycle

The following is a simplified view of the surface life cycle, where a client creates a window, and the rendered result of the window appears and disappears from the screen.

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image8.png" alt="" caption="Surface life cycle diagram" width="450px" >}}

  - **Create a surface**: When a surface is created by a client, it is in "Unmapped/Removed from model" state, which means the surface is separate from the window model. At this point, only a conceptual window has been created without any buffer allocation. From the Wayland's point of view, only `wl_surface` object has been created at this state. From the compositor's point of view, `WebOSSurfaceItem` that is mapped to the Wayland surface has been instantiated.
  - **Map the surface**: The client renders the first frame. A buffer is required in order to perform rendering, so the client requests buffer allocation. The client performs rendering on the buffer and requests a swap buffer operation, and then the result rendered in the buffer is passed to LSM. The event of passing the rendered result is called "map", during which the surface transitions from "unmapped" to "mapped" state. When a surface is "mapped", that means the surface should be displayed somewhere on the screen. Therefore, the surface is appended to a window model so that it can be displayed using the view, and eventually the surface shows up on the screen. After that, rendering proceeds with continuous EGL swap buffer operations.
  - **Unmap the surface**: When the client requests LSM to hide its window, LSM performs "unmap". The surface transitions from "mapped" to "unmapped" state. When LSM receives the transition event, that means the surface does not need to be rendered, so LSM removes the surface from the window model. In "unmapped" state, the buffer is not yet deallocated, but LSM does not perform composition of the surface.
  - **Destroy the surface**: When the client destroys its window, the buffer is deallocated. This can occur in both of "mapped" and "unmapped" states.

The following describes the surface life cycle at the protocol level.

``` xml
<interface name="wl_surface" version="2">
    <request name="destroy" type="destructor">
    </request> <request name="attach">
        <arg name="buffer" type="object" interface="wl_buffer" allow-null="true"/>
        <arg name="x" type="int"/>
        <arg name="y" type="int"/>
    </request>
    <request name="damage">
        <arg name="x" type="int"/>
        <arg name="y" type="int"/>
        <arg name="width" type="int"/>
        <arg name="height" type="int"/>
    </request>
    <request name="commit">
    </request>
</interface>
<interface name="wl_buffer" version="1">
  <event name="release">
  </event>
</interface>
```

  - **`wl_surface`**
      - An interface for an onscreen surface
      - Requests
          - `wl_surface::attach`
              - Requests to set a buffer (`wl_buffer`) as the content of the surface
              - If this is sent with NULL `wl_buffer`, the following commit request removes the surface content
          - `wl_surface::damage`
              - Requests to mark the regions where the pending buffer is different from the current surface content
          - `wl_surface::commit`
              - Requests to apply the pending buffer (`wl_buffer`)
  - **`wl_buffer`**
      - An interface for the buffer that contains rendered content
      - Events
          - `wl_buffer::release`
              - An event that indicates that the buffer is no longer used by the compositor

## Input

The following sections cover the internal architecture of webOS OSE related to input processing.

### Input Event Routing

This section describes the input event handling mechanism for keyboard and pointer device. When an input event occurs, the event is delivered to the surface that has the relevant focus state: keyboard events to the surface that has the keyboard focus, and pointer events to the surface that has the pointer focus. Note that keyboard and pointer focus are not necessarily on the same surface.

The following illustrates the concept of input event routing. Suppose graphics elements are displayed as below. If a user clicks on the blue circle with the remote control — that is, the clicked event is dropped from the top — which element will receive the event first?

{{< figure src="/images/docs/guides/core-topics/graphics-input/LSM_image9.png" alt="" caption="Input event routing diagram" width="600px" >}}

Considering the hierarchy, the pointer events layer receives the event first. According to the event propagation mechanism of QML, if this layer does not accept the event, the event will be passed down to the layer below; if this layer accepts the event, the layer below will not receive the event. The same applies to keyboard event handling. A keyboard event is delivered to an item that has the keyboard focus, which means that the item's `activeFocus` is true at the QML level. A pointer event is delivered to a relevant item depending on the state of `MouseArea`.

Wayland offers one additional focus mechanism. The Wayland protocol includes a protocol that defines whether or not a certain surface has the keyboard/pointer focus. For example, suppose pointer input is dropped on the keyboard events layer. QML layer would determine that the event should be passed to the `SurfaceItem` in `OverlayView` eventually, so the event will be passed on to the Wayland client. To pass the event to the Wayland client, the target surface must have the keyboard focus. If a Wayland surface receives `wl_keyboard::enter` event from the compositor, the surface gains the keyboard focus. At the same time, all the other surfaces receive `wl_keyboard::leave` event from the compositor and lose the focus. In this way, Wayland focus is managed and keyboard/pointer events are sent to the surfaces that received corresponding `enter` event. For related protocols, see the next section.

### Wayland Input Protocol

The following shows the protocol related to keyboard input.

``` xml
<interface name="wl_keyboard" version="1">
    <event name="keymap">
        <arg name="format" type="uint"/>
        <arg name="fd" type="fd"/>
        <arg name="size" type="uint"/>
    </event>
    <event name="enter">
        <arg name="serial" type="uint"/>
        <arg name="surface" type="object" interface="wl_surface"/>
        <arg name="keys" type="array" summary="the currently pressed keys"/>
    </event>
    <event name="leave">
        <arg name="serial" type="uint"/>
        <arg name="surface" type="object" interface="wl_surface"/>
    </event>
    <event name="key">
        <arg name="serial" type="uint"/>
        <arg name="time" type="uint" summary="timestamp with millisecond granularity"/>
        <arg name="key" type="uint"/>
        <arg name="state" type="uint"/>
    </event>
</interface>
```

{{< note >}}
In the Wayland world, a *seat* represents a group of input devices including mice, keyboards, and touchscreens. It has a keyboard and pointer focus. Seats are global objects.
{{< /note >}}

  - **`wl_keyboard`**
      - An interface for a keyboard device
      - Events
          - `wl_keyboard::enter`
              - An event that notifies that this seat's keyboard focus is on a specific surface
          - `wl_keyboard::leave`
              - An event that notifies that this seat's keyboard focus is no longer on a specific surface
          - `wl_keyboard::key`
              - An event to send a key pressed/released event

The following shows the protocol related to pointer input.

``` xml
<interface name="wl_pointer" version="1">
    <request name="set_cursor">
        <arg name="serial" type="uint" summary="serial of the enter event"/>
        <arg name="surface" type="object" interface="wl_surface" allow-null="true"/>
        <arg name="hotspot_x" type="fixed" summary="x coordinate in surface-relative coordinates"/>
        <arg name="hotspot_y" type="fixed" summary="y coordinate in surface-relative coordinates"/>
    </request>
    <event name="enter">
        <arg name="serial" type="uint"/>
        <arg name="surface" type="object" interface="wl_surface"/>
        <arg name="surface_x" type="fixed" summary="x coordinate in surface-relative coordinates"/>
        <arg name="surface_y" type="fixed" summary="y coordinate in surface-relative coordinates"/>
    </event>
    <event name="leave">
        <arg name="serial" type="uint"/>
        <arg name="surface" type="object" interface="wl_surface"/>
    </event>
    <event name="motion">
        <arg name="time" type="uint" summary="timestamp with millisecond granularity"/>
        <arg name="surface_x" type="fixed" summary="x coordinate in surface-relative coordinates"/>
        <arg name="surface_y" type="fixed" summary="y coordinate in surface-relative coordinates"/>
    </event>
    <event name="button">
        <arg name="serial" type="uint"/>
        <arg name="time" type="uint" summary="timestamp with millisecond granularity"/>
        <arg name="button" type="uint"/>
        <arg name="state" type="uint"/>
    </event>
</interface>
```

  - **`wl_pointer`**
      - An interface for a pointer device
      - Events
          - `wl_pointer::enter`
              - An event that notifies that this seat's pointer focus is on a specific surface
          - `wl_pointer::leave`
              - An event that notifies that this seat's pointer focus is no longer on a specific surface
          - `wl_pointer::motion, button`
              - An event to send a motion/button event
      - Requests
          - `wl_pointer::set_cursor`
              - Requests to set a surface as a cursor surface

## Appendix

### webOS OSE Extended Protocols

Wayland protocol extensions for webOS OSE are available in the following link.

- https://github.com/webosose/webos-wayland-extensions/tree/master/protocol

### LSM Source Code

The source code of LSM is available on the following GitHub repository.

- https://github.com/webosose/luna-surfacemanager

### References

  - Wayland
      - <http://wayland.freedesktop.org/>
      - <http://en.wikipedia.org/wiki/Wayland_(display_server_protocol)>
  - Qt
      - <http://qt-project.org/doc/qt-5/qtquick-visualcanvas-scenegraph.html>
