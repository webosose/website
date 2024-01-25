---
title: Embedded SW Contest 2023 - webOS Winner
display_title: The World Embedded Software Contest 2023 - Web Oh Yes
date: 2024-01-24
slug: embedded-sw-contest-2023-webohyes
posttype: article
toc: true
thumbnail: th-eswc-2023-webohyes.png
---

## Introduction

The winner in the webOS sector of the 21st World Embedded Software Contest was team Web Oh Yes who developed the Housespital (House + Hospital) service. The Housepital service is a personalized medical service that can upgrade each individual's personal health management.

With a growing number of single-person households in all age groups, the need for lifestyle-customized healthcare services is also increasing. Older people need those services as their nutrition intake and activities decrease, and young people need them because they are too busy working to care for their health. To adress this problem, the team designed a telemedicine service, a.k.a. Housepital service, for the medically vulnerable. In order to overcome the time and physical limitations to visit a hospital, they developed a real-time remote medical treatment system using webRTC and further advanced it to an all-in-one healthcare service where all related players - patients, doctors, pharmacists, and emergency rescue situation rooms - are brought together. This Housepital service aims at building a 24-7 remote medical checkup system for the medically vulnerable by sharing neceessary data, such as medication and healthcare records, with hostipals and ultimately providing a customized comprehensive healthcare service. 

Let's see a demo video of the project (Korean only).

{{< youtube SRm__HseULQ >}}

{{< note >}}
If you are also curious about the previous winner of the contest, see [The World Embedded Software Contest 2022]({{< relref "2022-12-29-embedded-sw-contest-2022" >}}).
{{< /note >}}

## System Architecture
  
The following description shows the overall system architecture.

{{< figure src="/images/blog/articles/eswc-2023-system-architecture-webohyes.png" alt="The overall system architecture of the project" >}}

| Component | Description |
|-----------|-------------|
| Housepital Application | <ul><li>Web app developed using Enact.js and React that enables seamless collaboration among patients, hospitals, doctors, and emergency rescue situation rooms</li><li>Easy to sign up using social login, such as Naver and Kakao</li><li>Provides real-time peer-to-peer (P2P) chat using WebRTC</li></ul> |
| Healthcare Server | <ul><li>Server that manages data from sensors and processes and transmits data for the Housepital app.</li><li>Handles events for user-device calls using bidirectional [socket.io](https://socket.io/) communication</li><li>Saves and searches for data in the database and determines if there is any possible side effect of medication to the user using the Dialogflow chatbot</li></ul> |
| Healthcare Sensor: IoT Devices | <ul><li>Auxiliary device that measures the body temperature and heart rate and transmits the data to the server</li><li>Manages data delivered from external sensors through I2C communication with submodules connected to the Arduino board</li></ul> |

## Features

The key features of the project are as follows:

{{< figure src="/images/blog/articles/eswc-2023-feature-structure-webohyes.png" alt="The overall flow diagram of the project" >}}

### Medical Appointment

{{< figure src="/images/blog/articles/eswc-2023-feature-medical-appointment-webohyes.png" caption="" alt="the feature of the medical-appointment system" >}}

- Enables users to make an appointment with one of the registered medicall staff and receive face-to-face or remote video medical treatment using the Housepital app
- Shares medication and health information of users for personalized medical services
- As an all-in-one medical service from medical treatment to pharmacy reservation, it improves patient convenience.

### Madication Management

{{< figure src="/images/blog/articles/eswc-2023-feature-medication-webohyes.png" caption="" alt="the flowchart of the medication-management system" >}}

- Detects drugs that possibly cause side effects
- Sets off an alarm for medication inatke to help users not forget
- Provides a medication planner (calendar) to check medication history

### Health Management

{{< figure src="/images/blog/articles/eswc-2023-feature-healthcare-webohyes.png" caption="" alt="the structure of the health-management system via IoT devices" >}}

- Measures the health condition, such as blood pressure and body temperature, accurately using IoT devices
- Provides an emergency call button to make a call to the designated location easily in case of an emergent health problem
- Provides highly readable health data on graphs

## Winner's Interview

The Housepital service was a good and opportune use case of webOS that builds an efficient medical examination and treatment system for both face-to-face and remote cases in an era where the number of single-person households is increasing.

Let's listen to what the Web Oh Yes team members want to talk about the experience in the competition and the award.

> When we first experienced webOS to compete in the webOS sector, we became fascinated by its expressive power, and while developing web apps and services using LS2API on the platform, we also found out that its development environment is very efficient. 
> 
> Sometimes we ran into  problems in setting and configuring the development environment in the process, but thanks to the kind and active support from the mentor in LG Electronics, we were able to fix them. We would like to take this opportunity to express our gratitude to the mentor. Although the competition is over, we are planning to organize a circle or study group to continue studying webOS and searching for ways to make use of it. 

## Resources

- Source code: [GitHub](https://github.com/hwna00/2023ESWContest_webOS_3015) (Korean only)
- Video demo: [YouTube](https://www.youtube.com/watch?v=SRm__HseULQ) (Korean only)