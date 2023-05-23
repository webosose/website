---
title: Emulator Launcher
date: 2023-05-15
weight: 20
toc: true
---

Emulator Launcher is a command-line based tool which helps users set up the webOS Open Source Edition (OSE) emulator more easier.

{{< note >}}
If you're not familiar with webOS OSE's emulator, please refer to [VirtualBox Emulator User Guide]({{< relref "emulator-user-guide" >}}).
{{< /note >}}

## Key Features

- Creating and deleting emulator images
- Configuring emulator settings
- Launching and closing emulator

## System Requirements

Currently, Emulator Launcher does not support macOS. 

If you use Windows or Ubuntu, see [Emulator System Requirements]({{< relref "emulator-user-guide#system-requirements" >}}).

## Installation

``` bash
$ python3 -m pip install --upgrade webos-emulator --force-reinstall
```

{{< note >}}
Use `python` on Windows.
{{< /note >}}

After installing Emulator Launcher, check the version of it.

``` bash
$ webos-emulator --version
webos-emulator 0.8.3
```

## How to Use

Emulator Launcher is a command-line based tool. Open the terminal and enter `webos-emulator` with options or commands.

``` bash
$ webose-emulator [options] [commands]
```

### Options

| Options | Descriptions |
|---------|--------------|
| `-h`, `--help` | Shows help messages. |
| `-vd <name>` | <p>Specifies an emulator image to use.</p><p>`<name>` is an image name you want.</p>|
| `--version` | Shows the version of Emulator Launcher |
| `-i <file>`, `--image <file>` | Specifies a [Virtual Machine Disk](https://en.wikipedia.org/wiki/VMDK) file (`.vmdk`) to use. For how to make the `.vmdk` file, refer to [Preparing a webOS OSE Emulator Virtual Machine Image]({{< relref "emulator-user-guide#preparing-a-webos-ose-emulator-virtual-machine-image" >}}). |
| `--debug` | Shows debugging information. |

### Commands

| Commands | Descriptions |
|----------|--------------|
| `-l`, `--list` | Shows the list of installed emulator images. |
| `-m`, `--modify` | Modifies system settings of an emulator image. |
| `-c`, `--create` | Creates a new emulator image |
| `-s`, `--start` | Starts an emulator image |
| `-k`, `--kill` | Kills a currently running emulator image. |
| `-d`, `--delete` | Deletes an emulator image. |
| `-ds`, `--default-settings` | Restores to the default setup. |
| `-cc <.ova>`, `--create-with-custom <.ova>` | <p>Creates a new emulator image with custom settings.</p><p>`<.ova>` is a [OVF 1.0 file](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AE61948B-C2EE-436E-BAFB-3C7209088552.html) which stores the custom settings.</p> |

### Examples

- Creates an emulator image

    ``` bash
    $ webos-emulator -vd ose-527 -c -i <.vmdk file>
    ```

- Starts the emulator image

    ``` bash
    $ webos-emulator -vd ose-527 -s
    ```

- Checks available system parameters of an image and modify it

    ``` bash
    # Step 01. Check available system parameters
    $ webos-emulator -vd ose-527 -m

    -m options:
      --memory <memory size in MB>
      --vram <video memory size in MB>
      --cpus <number>
      --monitorcount <number>
      --name <name>
      --ostype <Linux or Linux_64>
      --vmdk <vmdk file>

    following is the current settings of vd
    Name:                        ose-527
    Guest OS:                    Other Linux (64-bit)
    Memory size:                 4096MB
    VRAM size:                   128MB
    Number of CPUs:              2
    Monitor count:               2

    # Step 02. Modify the parameters
    $ webos-emulator -vd ose-527 -m --memory 2048 --cpus 2
    
    following is the current settings of vd
    Name:                        ose-527
    Guest OS:                    Other Linux (64-bit)
    Memory size:                 2048MB
    VRAM size:                   128MB
    Number of CPUs:              2
    Monitor count:               2
    ```

## Trouble Shooting

<dl>
<dt>Emulator won't start with the 'webos-emulator : start error' message</dt>
<dd>
  <p>Check the Virtualization Technology is enabled in your host PC.</p>
  <p>VirtualBox requires Intel® Virtualization Technology (Intel® VT). Go to the BIOS setup and enable the VT. You can also check the error messages from the VirtualBox emulator's pop-up.</p>
  {{< figure src="/images/docs/tools/emulator/launcher-cannot-start-emulator.png" caption="Error messages from VirtualBox" >}}
</dd>
</dl>
