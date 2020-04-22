---
title: User Guide
display_title: QEMUx86 Emulator for Linux User Guide
date: 2019-03-05
weight: 20
toc: true
---

{{< caution "Deprecation Warning" >}}
QEMUx86 Emulator for Linux is no longer actively maintained, so it is strongly recommended that you use [VirtualBox Emulator]({{< relref "emulator-user-guide" >}}) instead.
{{< /caution >}}

webOS Open Source Edition (OSE) provides an emulator that enables you to test the webOS application and platform on a virtual environment. With the emulator, you can test major features of webOS on your PC without the need of a physical device such as Raspberry Pi.

{{< note >}}
* The emulator is based on the open source QEMU project.
* Currently, the emulator only supports the **x86 (x86_64)** machine architecture and **Linux Ubuntu** operating system as a host.
{{< /note >}}

## Key Features

Key characteristics of the emulator are as follows:

- QEMUx86 virtual machine based emulator
- Provides graphics performance with host PC's GPU H/W acceleration
- Emulates major features of webOS OSE platform on PC without Raspberry Pi 3 target device
- Provides emulator run script with JSON configuration file for easy use
- Supports webOS OSE CLI tool for application and platform development

## System Requirements

The emulator is optimized for the following host environment.

- Operating system
    - Linux Ubuntu
        - 16.04 (32-bit and 64-bit)
        - 14.04 (32-bit and 64-bit)
        - 18.04 (64-bit) (not fully tested)
- Processor: Intel<sup>®</sup> Pentium<sup>®</sup> 4 2.0 GHz or faster
- Memory: 3 GB or more RAM
- Display: 1920 x 1080 or higher screen resolution
- Graphics card: 256 MB or more video memory with OpenGL 3.0 support
- Required software
    - qemu 2.7.0 or higher version
    - virglrenderer 0.6.0 or higher version (0.6.0 tag version is recommended)
    - libsdl2-2.0-0 or higher version
    - OpenGL 3.0 or higher version

## Downloading the Emulator

The emulator is provided as a pre-built package in GitHub. Clone or download the pre-built emulator package from the [GitHub repository](https://github.com/webosose-emulator/prebuilt-emulator).

{{< note >}}
Depending on the version of your Ubuntu or required libraries, you may have trouble running the pre-built emulator package. In that case, you need to build a custom package as described in [Building a Custom Emulator Package](#building-a-custom-emulator-package).
{{< /note >}}

## Using the Emulator

### Prerequisites

* Make sure your PC meets the [system requirements](#system-requirements) for running the emulator.
* Build the webOS OSE image for QEMUx86 in [Building webOS OSE]({{< relref "building-webos-ose" >}}).

{{< caution >}}
The emulator does not support running on Xming. If you use Xming, you will encounter an X server error. Therefore, we strongly recommend that you run the emulator directly on a Linux PC.
{{< /caution >}}

### Running the Emulator

1.  **Create a JSON configuration file.**

    By default, the emulator package includes a template for configuration file, `webos-config-sample.json`. You can create your own configuration file `webos-config.json` from the template by modifying the option values according to your environment.

    Create a configuration file from the template, and edit the file.

    ``` bash
    $ cd <emulator directory path>
    $ mv webos-config-sample.json webos-config.json
    $ vi webos-config.json
    ```

    Change the option values to the ones suitable for your environment. Especially, `vmdk_file_path` must be set to the file path of the built `.vmdk` image. For example, if `build-webos` is under your home directory, the path must be set to `~/build-webos/BUILD/deploy/images/qemux86/webos-image-qemux86.vmdk`.

    For detailed description of all the options in the JSON file, refer to the [README](https://github.com/webosose-emulator/prebuilt-emulator/blob/master/README.md) file inside the package.

2.  **Run the emulator.**

    Use the run script (`emulator`) to launch the emulator.

    ``` bash
    $ ./emulator webos-config.json
    ```

    {{< note >}}
    In case of Ubuntu 18.04, you need to launch the script with `sudo` command, because of KVM permission.
    {{< /note >}}

### Connecting to the Emulator

On the host machine, you can connect to the emulator using one of the two options:

- **Connect from the Shell**

    To connect to the emulator on a Linux shell, use the command below. The port number must match the value set in the `portforwarding.SSH` option (**default: 6622**) of JSON configuration file.

    ``` bash
    $ ssh -p <PortNumber> -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@localhost
    ```

- **Connect from the Web Browser**

    To connect to the emulator using Web Inspector, connect to `localhost:<PortNumber>` on a web browser (for example, Chrome). The port number must match the value set in the `portforwarding.inspector` option (**default: 9998**) of JSON configuration file.

## Building a Custom Emulator Package

To build a custom emulator package, you need to build virglrenderer and QEMU, and copy the results to the pre-built emulator package.

### Building virglrenderer

virglrenderer is a library that allows graphics rendering by using the host GPU.

Before you begin, upgrade all the installed packages to the latest version and install the dependency packages.

``` bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get -f install git libtool libdrm-dev libepoxy-dev libgbm-dev libegl1-mesa-dev libgtk-3-dev autoconf
```

To build virglrenderer, run the following commands one by one.

``` bash
$ git clone git://anongit.freedesktop.org/virglrenderer
$ cd virglrenderer
$ git checkout virglrenderer-0.6.0
$ ./autogen.sh
$ ./configure --with-glx
$ make && sudo make install
```

### Building QEMU

Before you begin, make sure that the virglrenderer package has been built successfully.

After that, upgrade all the installed packages to the latest version and install the dependency packages.

``` bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get -f install libsdl2-dev libpixman-1-dev
```

To build QEMU, run the following commands one by one.

``` bash
$ git clone https://github.com/webosose-emulator/qemu.git
$ cd qemu
$ ./configure --target-list=i386-softmmu --enable-sdl --with-sdlabi=2.0 --audio-drv-list=alsa,pa
$ make
```

### Copying the Results to the Pre-built Emulator

As the last step, copy the build results to the pre-built emulator package. Note that you must specify a different target directory depending on whether the host operating system is 64-bit or 32-bit.

If you have not cloned or downloaded the package previously, clone the `prebuilt-emulator` repository first.

``` bash
$ git clone https://github.com/webosose-emulator/prebuilt-emulator.git
```

#### On 64-bit Ubuntu

Copy the virglrenderer library.

``` bash
$ cp /usr/local/lib/libvirglrenderer.so* prebuilt-emulator/lib/x86_64
```

Copy the qemu library.

``` bash
$ cp <qemu directory path>/i386-softmmu/qemu-system-i386 prebuilt-emulator/bin/x86_64
$ cp -rf pc-bios prebuilt-emulator/bin
```

#### On 32-bit Ubuntu

Copy the virglrenderer library.

``` bash
$ cp /usr/local/lib/libvirglrenderer.so* prebuilt-emulator/lib/x86
```

Copy the qemu library.

``` bash
$ cp <qemu directory path>/i386-softmmu/qemu-system-i386 prebuilt-emulator/bin/x86
$ cp -rf pc-bios prebuilt-emulator/bin
```

## Troubleshooting

If you encounter the error message "qemu_gl_create_compile_shader: compile vertex error: GLSL ES 3.00 is not supported. ..." when you run the emulator, that means the OpenGL/Mesa of your host PC doesn't support OpenGL 3.0.

To fix the issue, refer to the following steps.

**Step 1.** Check the installed Mesa package.

``` bash
$ sudo apt list --installed | grep mesa
```

**Step 2.** Check the OpenGL & Mesa library version.

``` bash
$ glxinfo | grep "OpenGL version"
```

**Step 3.** Delete old Mesa package.

- [In case of Ubuntu 14.04](https://www.howtoinstall.co/en/ubuntu/trusty/libegl1-mesa-dev?action=remove)

- [In case of Ubuntu 16.04](https://www.howtoinstall.co/en/ubuntu/xenial/libegl1-mesa?action=remove)

**Step 4.** Update the system.

``` bash
$ sudo apt-get update
$ sudo apt-get upgrade (or sudo apt-get dist-upgrade)
$ sudo apt-get -f install
```

**Step 5.** Install the latest Mesa package.

``` bash
$ sudo apt-get install -f libegl1-mesa-lts-xenial
```

**Step 6.** Install dependency packages.

``` bash
$ sudo apt-get install libegl1-mesa-drivers
$ sudo apt-get install epoxy0
$ sudo apt-get install libsdl2-2.0-0
```
