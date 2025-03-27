---
title: User Guide
display_title: VirtualBox Emulator User Guide
date: 2025-02-24
weight: 10
toc: true
---

webOS Open Source Edition (OSE) provides an emulator that enables you to develop the webOS application and service on a virtual environment. With the emulator, you can test major features of webOS OSE on your PC without the need of a physical device such as Raspberry Pi.

The emulator runs as a virtual machine on VirtualBox and supports host platforms including Ubuntu Linux, macOS, and Windows.

{{< caution >}}
* The VirtualBox-based emulator (64-bit) is supported by webOS OSE 2.14.0 or higher.
* Make sure that Intel® Virtualization Technology (Intel® VT) is enabled in the host PC.
{{< /caution >}}

## Key Features

Key characteristics of the emulator are as follows:

* VirtualBox-based emulator
* Emulates major features of webOS OSE platform on PC without Raspberry Pi target device
* Provides graphics functionality with host PC’s GPU H/W acceleration
* Supports webOS OSE CLI tool for application and service development
* Supports [Emulator Launcher]({{< relref "emulator-launcher" >}}).

## System Requirements

The emulator requires the following environments.

* VirtualBox v7.0 or higher
    * For requirements to install and run VirtualBox, see its [end-user documentation](https://www.virtualbox.org/wiki/End-user_documentation) page.
* System memory
    * 8 GB or higher
* Operating system
    * Ubuntu Linux
        * 18.04 LTS (64-bit)
        * 20.04 LTS (64-bit)
        * 22.04 LTS (64-bit)
    * macOS
        * macOS Sierra (10.12) or higher (64-bit)
  
        {{< caution >}}
        The emulator does not support Apple Silicon Mac.
        {{< /caution >}}

    * Windows
        * Windows 7 (64-bit)
        * Windows 10 (64-bit)

## Installing VirtualBox

If you don't have **Oracle VM VirtualBox** already installed on your computer, you need to install it.

### Ubuntu Linux

You can either download a package (`.deb`) file and install the package, or use the `apt-get` command to install Oracle VM VirtualBox from an online package repository (recommended).

#### Installing a Package

Download the appropriate package from [VirtualBox for Linux](https://www.virtualbox.org/wiki/Linux_Downloads) page and install the package.

#### Installing from an Online Package Repository

Follow the instructions in [Debian-based Linux distributions](https://www.virtualbox.org/wiki/Linux_Downloads#Debian-basedLinuxdistributions) section.

### macOS

Download the binary package specified as "OS X hosts" from [VirtualBox Download](https://www.virtualbox.org/wiki/Downloads) page and install it on your computer.

### Windows

Download the binary package specified as "Windows hosts" from [VirtualBox Download](https://www.virtualbox.org/wiki/Downloads) page and install it on your computer.

#### Setting the path on Windows

On Windows, the path to the VirtualBox installation directory is not automatically added to the path during installation. We strongly recommend you set the path manually for later steps, using one of the commands below on a command shell.

{{< code "Setting the PATH variable in the system environment (run the shell as Administrator)" true >}}
```shell
setx /m PATH "C:\Program Files\Oracle\VirtualBox;%PATH%"
```
{{< /code >}}

{{< code "Setting the PATH variable in the user environment" true >}}
```shell
setx PATH "C:\Program Files\Oracle\VirtualBox;%PATH%"
```
{{< /code >}}

To make the changes take effect, you must restart the command shell.

## (Optional) Installing VirtualBox Extension Pack

Basically, VirtualBox supports USB 1.1 (OHCI) devices. To configure USB 2.0 or 3.0 devices, Oracle VM VirtualBox Extension Pack is required.

{{< caution >}}
Oracle VM VirtualBox Extension Pack is only free for "Personal Use". For more details, see [VirtualBox Extension Pack Personal Use and Evaluation License](https://www.virtualbox.org/wiki/VirtualBox_PUEL).
{{< /caution >}}

Download the same version of Extension Pack as your installed version of VirtualBox from the [download page](https://www.virtualbox.org/wiki/Downloads), and install the Extension Pack.

## Preparing a webOS OSE Emulator Virtual Machine Image

Build the webOS OSE image for the emulator in [Building webOS OSE]({{< relref "building-webos-ose" >}}).

* Make sure you set up the build for the emulator at the [configuration step]({{< relref "building-webos-ose#configuring-the-build" >}}).
* After the build is completed, check that the resulting image (`webos-image-qemux86-64-master-*.wic.vmdk.gz`) has been created properly.

## Setting Up the Virtual Machine in VirtualBox

You can create and set up a VirtualBox virtual machine from the GUI or from the command line.

### Using the GUI

{{< note >}}
The screenshots below have been captured from Oracle VM VirtualBox v6.0.14 on Windows 10. If you are using a different version of the program or on a different host operating system, you might notice minor differences in the position or name of GUI elements.
{{< /note >}}

1.  Start the Oracle VM VirtualBox application. You can launch the program from the application menu or by typing `virtualbox` in a command shell.
    {{< note "Ubuntu Linux only" >}}
    You can ignore the "Error opening file for reading: Permission denied" error that might appear when launching the VirtualBox GUI from the shell.
    {{< /note >}}

2.  First, you need to create a webos-image virtual machine. To create a webos-image virtual machine, click **New** on the icon toolbar.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img01.png" alt="Creating a virtual machine" class="align-left" >}}

3.  In the **Create Virtual Machine** wizard that appears, input the general information of the virtual machine.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img02.png" alt="Entering general information of the virtual machine" class="align-left" >}}

    1. In the **Name** box, type **webos-image**.
    2. From the **Type** list, select **Linux**.
    3. From the **Version** list, select **Other Linux (64-bit)**.
    4. Click **Next**.

4.  In the **Memory size** section, set the amount of memory you wish to allocate to the webos-image virtual machine.

    We recommend that you allocate at least 4 GB (4096 MB) of memory for stable performance. It is also recommended that the memory configured for the virtual machine should be less than 50% of the system memory.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img03.png" alt="Configuring the memory size" class="align-left" >}}

    Type the amount of memory in the box to the right of the slider, and click **Next**.

5.  In the **Hard disk** section, select **Use an existing virtual hard disk file** and click ![Add hard disk file icon](/images/docs/tools/emulator/vbox_emulator_icon01.jpg) icon.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img04.png" alt="Configuring the hard disk 1" class="align-left" >}}

    Click the **Add** button and locate the webOS image (`.vmdk`) on your computer that you wish to install on the virtual machine.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img05.png" alt="Configuring the hard disk 2" class="align-left" >}}

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img06.png" alt="Configuring the hard disk 3" class="align-left" >}}

    Click **Create**.

6.  Oracle VM VirtualBox Manager will return to the main screen and display the details of the created virtual machine.

    Next, you need to modify the system settings of webos-image virtual machine. On the icon toolbar, click **Settings**.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img07.png" alt="From the main screen to the settings" class="align-left" >}}

7.  In the **Settings** dialog box that appears, click **System** in the navigation bar.

    The **Motherboard** category will be displayed.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img08.png" alt="Configuring the motherboard" class="align-left" >}}

    1. In **Boot Order**, clear checkboxes on **Floppy** and **Optical**.
    2. In **Pointing Device**, select **USB Tablet**.
    3. In **Extended Features**, select **Enable I/O APIC**.
    4. Click the **Processor** tab.

8.  The **Processor** section will be displayed.

    You need to specify the number of processors you want for your virtual machine. You can specify 1, but we recommend you set it to a higher value (up to 4), depending on your system capabilities.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img09.png" alt="Configuring the processor" class="align-left" >}}

    1. Type the number of processors you wish to allocate, in the box to the right of the **Processor(s)** slider.
    2. Clear a checkbox on **Enable PAE/NX**.
    3. On the navigation bar, click **Display**.

9.  The **Display** section will be displayed.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img10.png" alt="Configuring the display" class="align-left" >}}

    1. In **Video Memory**, set the amount of video memory you wish to allocate to the webos-image virtual machine. You can allocate up to 128 MB of memory.
    2. In **Monitor Count**, set the count of monitor to **1** or **2**. webOS OSE supports up to two monitors.
    3. From the **Graphics Controller** list, select **VMSVGA**.
    4. In **Acceleration**, ensure that **Enable 3D Acceleration** option is selected.
    5. On the navigation bar, click **Audio**.

10. The **Audio** section will be displayed.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img_audio.png" alt="Configuring the audio" class="align-left" >}}

    1. Ensure that **Enable Audio** is selected.
    2. Configure **Host Audio Driver** as follows, depending on your operating system:
        - On Ubuntu Linux, select **PulseAudio**.
        - On macOS, select **CoreAudio**.
        - On Windows, select **Windows DirectSound**.
    3. From the **Audio Controller** list, select **ICH AC97**.
    4. In **Extended Features**, select **Enable Audio Output** and **Enable Audio Input**.
    5. On the navigation bar, click **Network**.

11. The **Network** section will be displayed. Ensure that the **Adapter 1** tab is selected.

    From the **Adapter 1** tab, click **Advanced**. You will see advanced network settings.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img11.png" alt="Configuring the network adapter" class="align-left" >}}

    From the **Adapter Type** list, select **Intel PRO/1000 MT Desktop (82540EM)**.

    Next, click **Port Forwarding**.

12. The **Port Forwarding Rules** dialog box will show up.

    You need to set up port forwarding rules to connect through SSH and Web Inspector. To add port forwarding rules, click ![Port forwarding icon](/images/docs/tools/emulator/vbox_emulator_icon02.jpg).

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img12.png" alt="Configuring the port forwarding rules 1" class="align-left" >}}

    You will see the rules table. Set the rules by typing the following values in the appropriate column:

    | Name                        | Protocol | Host Port | Guest Port |
    | --------------------------- | -------- | --------- | ---------- |
    | ssh                         | TCP      | 6622      | 22         |
    | web-inspector               | TCP      | 9998      | 9998       |
    | enact-browser-web-inspector | TCP      | 9223      | 9223       |

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img13.png" alt="Configuring the port forwarding rules 2" class="align-left" >}}

    Click **OK**. You will return to the **Adapter 1** section.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img14.png" alt="Finishing the virtual machine setup" class="align-left" >}}

    Click **OK**.

13. Oracle VM VirtualBox Manager will return to the main screen and display the details of the virtual machine with updated information.

    Your virtual machine is ready for use. To start the virtual machine, ensure that the virtual machine you wish to run is selected. On the icon toolbar, click **Start**.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img15.png" alt="Starting the virtual machine" class="align-left" >}}

14. Oracle VM VirtualBox Manager will display the webos-image virtual machine window.

    It will display the **VirtualBox - Information** dialog box. Click **OK**.

    Next you will see another **VirtualBox - Information** dialog box, informing you about how the mouse capture has been set up. Click **OK**.

    You can now begin using the webos-image virtual machine.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img16.png" alt="Virtual machine window" class="align-left" >}}

{{< note >}}
The display resolution of webos-image defaults to 1920x1080. If it is too big to be displayed on the monitor, you can adjust the scale with the following command.

```shell
vboxmanage setextradata <vm_name> GUI/ScaleFactor <scale_factor>
```

The example below scales the resolution of webos-image to 70% with the scale factor of 0.7.

```shell
vboxmanage setextradata webos-image GUI/ScaleFactor 0.7
```
{{< /note >}}

### Using the Commands

To create a virtual machine from the command line, [VBoxManage](https://www.virtualbox.org/manual/UserManual.html#vboxmanage) is used.

The following example shows commands used to create and set up a webos-image virtual machine for a Ubuntu Linux host with a similar setting of the GUI example above. Type the following commands sequentially in a command shell:

{{< code "A command-line example to create a virtual machine on Ubuntu Linux" true >}}
```shell
vboxmanage createvm --ostype Linux_64 --register --name webos-image
vboxmanage modifyvm webos-image --memory 4096 --vram 128 --ioapic on --cpus 2
vboxmanage modifyvm webos-image --graphicscontroller vmsvga
vboxmanage modifyvm webos-image --accelerate3d on
vboxmanage modifyvm webos-image --audio pulse --audioout on --audioin on
vboxmanage modifyvm webos-image --nic1 nat --nictype1 82540EM --natpf1 ssh,tcp,,6622,,22
vboxmanage modifyvm webos-image --natpf1 web-inspector,tcp,,9998,,9998
vboxmanage modifyvm webos-image --natpf1 enact-browser-web-inspector,tcp,,9223,,9999
vboxmanage modifyvm webos-image --mouse usbtablet
vboxmanage modifyvm webos-image --uart1 0x3f8 4 --uartmode1 file /dev/null
vboxmanage storagectl webos-image --add ide --name webos-image

# Only when you want to set 2 monitors, default is 1
vboxmanage modifyvm webos-image --monitorcount 2

# To adjust the scale of display resolution
vboxmanage setextradata webos-image GUI/ScaleFactor <scale_factor>
```
{{< /code >}}

{{< note >}}
* For audio setup on other host operating systems, use the following commands:
    - macOS: `vboxmanage modifyvm webos-image --audio coreaudio --audioout on --audioin on`
    - Windows: `vboxmanage modifyvm webos-image --audio dsound --audioout on --audioin on`
* For Windows, make sure you pass `null` instead of `/dev/null` to the serial port setup.
    * Windows: `vboxmanage modifyvm webos-image --uart1 0x3f8 4 --uartmode1 file null`
* For more details on `vboxmanage` command of VirtualBox, refer to the [VBoxManage reference](https://www.virtualbox.org/manual/ch08.html).
{{< /note >}}

To attach the webOS OSE emulator image (`.vmdk`) to the virtual machine, type:

```shell
vboxmanage storageattach webos-image --storagectl webos-image --type hdd --port 0 --device 0 --medium </path/to/image/webos-image-qemux86-64-master-**.wic.vmdk.gz>
```

To launch the virtual machine, type the following in a command shell:

```shell
vboxmanage startvm webos-image
```

## Configuring USB Devices

To use USB devices with the emulator, first add the required USB device on VirtualBox and then launch the virtual machine.

{{< note >}}
Currently, the emulator supports Bluetooth dongle, USB storage device, USB Webcam, and in-built Webcam and Bluetooth.
{{< /note >}}

{{< note "Prerequisite" >}}
To configure USB 2.0 or 3.0 devices, the VirtualBox Extension Pack must be installed. See [(Optional) Installing VirtualBox Extension Pack](#optional-installing-virtualbox-extension-pack) for more information.
{{< /note >}}

To add the device, before launching the virtual machine on VirtualBox, do the following:

{{< figure src="/images/docs/tools/emulator/vbox_emulator_img_usb.png" alt="Configuring USB on VirtualBox Emulator" >}}

1.	Select the virtual machine (from the left-hand side).
2.	Click the settings icon to display the settings dialog.
3.	Click **USB**.
4.	Select the **Enable USB Controller** checkbox.
5.	Select the **USB 1.1 (OHCI) Controller** option.
6.	Click the + icon (on the right-hand side) to get a list of USB devices.
7.	Select the required device (Bluetooth dongle, USB storage device, or USB webcam).
8.	The device is added to the **USB Device Filters** field.
9.	Click **OK**.

Now, launch the virtual machine and after it starts, from the **Devices** menu, select the required USB device(s).

## Updating the Image on the Virtual Machine

The following describes the steps to update the emulator image on the previously created virtual machine.

1.  Prepare a new emulator image by building webOS OSE for emulator.

2.  Start Oracle VM VirtualBox on your computer. From the virtual machine list, select the virtual machine whose image you wish to update. From the icon toolbar, click **Settings**.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img07.png" alt="From the main screen to the settings" class="align-left" >}}

3.  On the navigation bar of the **Settings** dialog box, click **Storage**. From the **Controller: IDE** list, select the build image that you wish to update.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_img17.png" alt="Configuring the storage" class="align-left" >}}

4.  On the **Attributes** section, click ![Hard disk icon](/images/docs/tools/emulator/vbox_emulator_icon03.png) icon. From the displayed menu, select **Choose Virtual Hard Disk File...**.

    You will see the **Please choose a virtual hard disk file** dialog box. Locate the new webOS image you wish to install from your computer. Select the appropriate emulator image file (`.vmdk`), and click **Open**.

5.  The **Storage** section will show up. Click **OK**.
    Now your virtual machine has been updated and you are ready to use the updated virtual machine.

## Connecting to the Emulator

On the host machine, you can connect to the emulator in various ways.

### Connect from the Shell

#### Ubuntu Linux/macOS

The best way to get a shell into the emulator is with SSH. On the command shell, type the following command with the host port number (6622) configured for ssh in the port forwarding rules during the setup process:

```shell
ssh -p 6622 root@localhost
```

To avoid error messages about the host changing every time you change emulator images, you can add the following flags to ssh (or create an alias in your `.bashrc` to do this for you):

```shell
ssh -p 6622 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@localhost
```

#### Windows

Use a SSH client (for example, Putty) to connect to the emulator using SSH protocol.

### Connect from the Web Browser

To connect to the emulator using Web Inspector, access `localhost:<PortNumber>` on a web browser (for example, Chrome). The port number must match the value configured for web-inspector (for example, 9998) in the port forwarding rules during the setup process.

### Connect from the Serial Ports

Go Setting in Virtualbox Emulator machine, select "Serial Ports" and then,

``` 
check "Enable Serial Port"
Serial Ports : Port 1
Port Number : COM1
Port Mode : Host Pipe
Connect to existing pipe/socket : UNCHECKED
Path/Address: /tmp/vbox (on Ubuntu/macOS) or \\.\pipe\com1 (on Windows)
```

Now, set terminal progrom in Host PC. For example, Minicom in Ubuntu host PC or macOS.

``` bash
$ sudo apt install minicom
$ sudo minicom -s -c on
Serial port setup
Serial Device : unix#/tmp/vbox
Hardware Control : No
Software Control : No
Save setup as dfl
Exit
Ctrl-a q
$ minicom
```

For Windows PC, please use terminal program (such as puTTY) and set

```
type -> serial
speed -> 115200
serial line -> \\.\pipe\com1
```

Finally start VirtualBox emulator and then you can see serial outputs.

## Trouble Shooting

### Kernel Module Re-compiling When VirtualBox Is Not Work Properly in Ubuntu

If you reinstall VirtualBox or upgrade Ubuntu packages, these might cause unexpected errors on VirtualBox. In this case, you should recompile host side kernel modules related to VirtualBox:

``` bash
sudo rmmod vboxnetadp vboxnetflt vboxdrv
sudo /sbin/vboxconfig
```

### Emulator Does not Boot Properly in Ubuntu Host PC with NVIDIA GPU

1. Execute the **Software & Updates** app.
2. In the **Additional Drivers** tab, select the "X.Org" related driver.

    {{< figure src="/images/docs/tools/emulator/vbox_emulator_select_xorg.png" alt="Selecting X.Org driver" class="align-left" >}}

3. Click **Apply Changes**.

### VirtualBox Cannot Detect USB

In this case, enter the followings:

``` bash
sudo adduser $USER vboxusers
sudo usermod -aG vboxusers $USER
```

#### References

- https://superuser.com/questions/956622/no-usb-devices-available-in-virtualbox
- https://help.ubuntu.com/community/VirtualBox/USB

## Limitations

The following features are not supported in the emulator:

- [Streaming playback](/blog/2022/05/11/webos-ose-2-16-0-release/#streaming-playback-support) (added in 2.16.0 release)
- [HDMI-CEC](/blog/2022/05/11/webos-ose-2-16-0-release/#hdmi-cec-support) (added in 2.16.0 release)
