---
title: Emulator Release Notes
date: 2018-08-20
weight: 20
toc: true
---

webOS Open Source Edition (OSE) emulator is an x86 (x86_64) virtualization system based on QEMU virtualizer. Currently, the emulator only supports Linux Ubuntu as a host operating system.

Refer to the following for detailed information of each release.

## Initial release (June 2018)

### System Requirements

Note that this version of emulator is optimized for the following host environment.

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

### New Features

- QEMUx86 virtual machine based emulator
- Provides graphics performance with host PC's GPU H/W acceleration
- Emulates major features of webOS OSE platform on PC without RPi3 target device
- Provides emulator run script with JSON configuration file for easy use
- Supports webOS OSE CLI tool for application and platform development

### Known Issues

- Flickering occurs when playing some WebGL content such as <http://www.kevs3d.co.uk/dev/canvasmark>.
- Displayed text is not clear when you change the size of the QEMU windows to low resolution.
