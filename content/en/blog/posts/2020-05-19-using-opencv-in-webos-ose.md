---
title: Using OpenCV in webOS OSE
date: 2020-05-19
slug: using-opencv-in-webos-ose
posttype: article
toc: true
thumbnail: th-article.png
---

**Author: Jaeduck Oh**

## Introduction

Open Source Computer Vision Library (OpenCV) is an open source computer vision and machine learning software library. Main features of OpenCV are as follows:

- Binarization
- Noise Filtering
- Edge detection
- Template matching
- Machine learning
- Image warping

{{< note >}}
For more details about OpenCV, visit the [OpenCV website](https://opencv.org/).
{{< /note >}}

In this article, you will learn how to set up, verify and use OpenCV on webOS OSE.

## Setting Up OpenCV

The webOS OSE image (current version is 2.5.0) does not contain OpenCV by default, but there is a recipe for OpenCV in the webOS OSE source code. That is, you can make IPK files for OpenCV using `bitbake opencv` command and install them on webOS OSE.

However, you might meet a problem. When you build OpenCV with the command, a bunch of IPK files will be generated in the build directory. Right, you have to INSTALL them one by one.

Instead of making IPK files, let's include OpenCV features into the webOS OSE image at the time of building the image.

### Adding OpenCV Feature in webOS OSE Image

First, you have to add `opencv \` into the `WEBOS_FOSS_MISSING_FROM_RDEPENDS` section of `/build-webos/meta-webosose/meta-webos/recipes-core/packagegroups/packagegroup-webos-extended.bb` file.


``` shell
WEBOS_FOSS_MISSING_FROM_RDEPENDS = " \
    bzip2 \
    curl \
    e2fsprogs \
    hunspell \
    icu \
    iproute2 \
    lsb \
    makedevs \
    ncurses \
    openssl \
    procps \
    psmisc \
    sqlite3 \
    opencv \
    ${@oe.utils.conditional('VIRTUAL-RUNTIME_init_manager', 'systemd', 'systemd-analyze', 'sysvinit-pidof', d)} \
```

After that, build the webOS OSE image including OpenCV.

``` shell
build-webos$ source oe-init-build-env
build-webos$ bitbake webos-image
```

## Verifying OpenCV

You can verify the installation using `opencv_version` command or Python.

### opencv_version Command

To verify the installation, type the following command on your target device.

``` shell
root@raspberrypi4:/sysroot/home/root# opencv_version
3.4.3
```

### Python

The installed OpenCV only works with Python version 3.5. It must be executed with `python3.5` command.

``` shell
root@raspberrypi4:/sysroot/home/root# python3.5
Python 3.5.6 (default, Jan  1 1970, 00:00:00)
[GCC 8.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> cv2.__version__
'3.4.3'
>>> exit()
```

If you run with the `python` command, the following error occurs. Note that the default Python version for webOS OSE is 2.7.

``` shell
root@raspberrypi4:/sysroot/home/root# python
Python 2.7.16 (default, Jan  1 1970, 00:00:00)
[GCC 8.2.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named cv2
>>> exit()
```

## Using OpenCV

Let's make a simple example of how to use OpenCV. This is an example of converting a [sample image file](/images/blog/articles/opencv-color-pencil.jpg) to a grayscale image.

Create a `change2gray.py` file and add the below code into the created file.

``` shell {linenos=table}
import cv2

img_color = cv2.imread('color pencil.jpg', cv2.IMREAD_COLOR)
img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
cv2.imwrite('savedimage.jpg', img_gray)
```

A brief explanation of the above file:

- Line(3) : Reads the image from the file.
- Line(4) : Converts the read image into a grayscale image.
- Line(5) : Writes the converted image to the file.

Now, shall we run the Python code?

``` shell
root@raspberrypi4:/sysroot/home/root# python3.5 convert2gray.py
```

If it works without any failure, the `savedimage.jpg` file is created.

{{< figure src="/images/blog/articles/opencv-before-and-after-converting-colors.jpg" alt="" caption="Before converting the colors (left), After converting the colors (right)" >}}

## Limitations

- You can use OpenCV on webOS OSE with the native development environment or the console environment.

- OpenCV ported to webOS OSE is a little different from that ported to other platforms such as Ubuntu.

    For example, webOS OSE does not allow Python to draw the screen. So, its associated features are not available in OpenCV on webOS OSE. Thus, you cannot use window-related methods when you make something using Python.

    - cv2.namedWindow('NAME')
    - cv2.imshow('NAME', img_color)

- Since web applications can not directly access OpenCV, you may need to implement a specific service that connects between OpenCV and web applications.

- webOS OSE is based on Yocto 2.6 and Yocto 2.6 has a recipe for OpenCV 3.4. So, if you follow the guide on this page, you can only use OpenCV 3.4.