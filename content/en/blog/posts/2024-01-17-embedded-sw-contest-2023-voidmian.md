---
title: Embedded SW Contest 2023 - Grand Prize
display_title: The World Embedded Software Contest 2023 - VOIDMIAN
date: 2024-01-17
slug: embedded-sw-contest-2023-voidmian
posttype: article
toc: true
thumbnail: th-eswc-2023-voidmian.png
---

## Introduction

The grand prize of the 21st World Embedded Software Competition goes to SOFI of team VOIDMIAN! SOFI stands for sound of food information and is a voice-enabled food information system for those who are visually impaired or with low vision. With the food classification and use-by date detection device, SOFI helps users with visual impairment or low vision, due to age, LASEK, etc., select food and prevents them from consuming unhealthy food. Team VOIDMIAN analyzed the space of the refrigerator's home bar from a fresh point of view and added a rotating food scanning function to the door of the home bar, and also they implemented a voice-enabled food information system based on webOS Open Source Edition (OSE).

Let's see a demo video of the project (Korean only).

{{< youtube GVSaJLW1eDQ >}}

{{< note >}}
If you are also curious about the previous winner of the contest, see [The World Embedded Software Contest 2022]({{< relref "2022-12-29-embedded-sw-contest-2022" >}}).
{{< /note >}}

## System Architecture
  
The following description shows the overall system architecture.

| Component | Type | Description |
|-----------|-------------|-------------|
| Image Scanner on the Magic space <br>(DC Motor / ESP32-CAM w/ Arduino) | Hardware | <ul><li>Scan product images to get barcodes, use-by dates, allergy information, etc. (ESP32-CAM)</li><li>Control the rotation of the product using the installed DC motor (Servo Motor)</li></ul> |
| Flask Server | Software | <ul><li>Extract and save user information and scanned product data in the JSON format and return data upon client requests</li></ul> |
| Client (Application) | Software | <ul><li>Web App (webOS)<ul><li>To manage (register, delete, etc.) and inquire on user and product information</li><li>Functions: View the scan history / Register product and user information / Connect to websites that provide cooking recipes / Guide how to use SOFI</li></ul></li><li>Mobile App (Android)<ul><li>To inquire on registered users and product information</li><li>Functions: View today's scanned products / View the whole list of scanned products/ View the user list</li></ul></li></ul> |

### Hardware (Image Scanner on the Magic-space)

The following figure describes how the hardware, including the Magic-space on the refrigerator, works to scan product images.

{{< figure src="/images/blog/articles/eswc-2023-system-architecture-hardwear-voidmian.png" alt="The overall system architecture(hardware) of the project of the Voidmian team" >}}

### Software

The following diagram describes the system composed of a webOS-based web app and a FLASK server to store and manage product image data.

{{< figure src="/images/blog/articles/eswc-2023-system-architecture-software-voidmian.png" alt="The overall system architecture(software) of the project of the Voidmian team" >}}


## Features

The key features of the project are as follows:

### Voice command recognition

- Users can scan, register, and inquire on products using voice.
- Provides voice-enabled UI so that those who are visually impaired or with low vision can use all the functions with voice commands 
- Buttons are also available if voice commands are not needed.

### Product image scanning and data storage

- Scans and registers barcodes, use-by dates, and allergy information of products using ESP32-CAM
- Stores product information in JSON files for ease of management and platform independence of data 
- Secures accuracy of product information by scanning multiple images 
- Ensures accuracy in barcode recognition using the product barcode image recognition library (via Pyzbar)

### Data management and inquiry

- Users can inquire on the registered product and user information via web app (webOS) and mobile app (Android)
- Outputs product and user information, which is originally text based, with voice using TTS
- Helps determine whether to purchase products by analyzing the product information (allergies, use-by date, etc.)


{{< figure src="/images/blog/articles/eswc-2023-sequence-diagram-scan-voidmian.png" caption="" alt="the sequence diagram that describes the process of the image scanning" >}}

## Winner's Interview

The SOFI was proudly awarded the grand prize recognized as an excellent example of how webOS can be used to help the visually impaired and others with low vision. 

Here's what the VOIDMIAN team members feel about the whole experience in the competition.

> It wasn't a difficult choice that we picked webOS when applying for the competition. We knew it is a stable operating system that had already been adapted to LG smart TVs and thought it would be a good fit for our project.
>
> However, despite the wide knowledge about Linux and Windows that our team has, we had to go through many difficulties as novice developers of webOS. We had to start from understanding how webOS works. While working on the project, the webOS OSE developer website helped us a lot as it provides detailed guides on how to implement web apps, use the LS2 API, and so on. Thanks to those guides, we could resolve problems one by one during the development.

## Resources

- Source code: [GitHub](https://github.com/dbrjsdn1220/webOS_Contest_2023_SOFI) (Korean only)
- Video demo: [YouTube](https://www.youtube.com/watch?v=GVSaJLW1eDQ) (Korean only)