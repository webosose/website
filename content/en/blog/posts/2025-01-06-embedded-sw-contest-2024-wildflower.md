---
title: Embedded Software Contest 2024 - webOS Winner
display_title: The World Embedded Software Contest 2024 - Wildflower
date: 2025-01-06
slug: embedded-sw-contest-2024-Wildflower
posttype: article
toc: true
thumbnail: th-eswc-2024-wildflower.png
---

## Introduction

The Grand Prize-winning team at the 22nd Embedded Software Competition, Wildflower, has developed PLANT & KIT (PLKIT)—a groundbreaking system that maximizes the benefit of precision agriculture through data-driven solutions. During this project, the team created a simple, modular sensor-based device management solution and offerred a knowledge sharing and trading platform for agricultural data. PLKIT modularized various sensors used in agriculture and, by doing so, implemented an accessible and adaptable farming environment, allowing even those unfamiliar with ICT to improve productivity using collected agricultural data.

The team utilized the webOS platform in developing a smart farm monitoring and control system to control the modular solution. This system collects and visualizes key environmental data, such as temperature, humidity, soil moisture, and light intensity, in real-time, enabling users to monitor their farms at a glance. Additionally, an agricultural data platform was built using the Enact framework, providing a web app to manage the collected data and enhance smart farm productivity. The utilization of the webOS platform facilitates real-time data management and improves the efficiency of farm operations and resource optimization.

With its modular design and ability to diversify agricultural data applications, PLKIT has the potential to revolutionize smart farming, improve crop cultivation environments, and drive further advancements in agricultural R&D.

Let's see a demo video of the project (Korean only).

{{< youtube yzjNMHQbjM0 >}}

{{< note >}}
If you are also curious about the previous winner of the contest, see [The World Embedded Software Contest 2023]({{< relref "2024-01-17-embedded-sw-contest-2023-voidmian" >}}).
{{< /note >}}

## System Architecture
  
The following description shows the overall system architecture.

### Hardware

The following figure describes a hardware device with a modular smart farm sensor.

{{< figure src="/images/blog/articles/eswc-2024-hardware-structure.png" alt="Hardware Structure" >}}

<table>
<tr>
<th colspan="7">PLKIT</th>
</tr>
<tr>
<td colspan="2">Cultivation method</td>
<td colspan="5">Deep Flow Technique (DTF)</td>
</tr>
<tr>
<td colspan="2">Hardware Board</td>
<td colspan="5">Raspberry Pi 4, ESP32</td>
</tr>
<tr>
<td rowspan="2" colspan="2">Module Connectivity</td>
<td colspan="2">Power Supply Unit</td>
<td colspan="3">Magnetic Charger</td>
</tr>
<tr>
<td colspan="2">User Connection Device</td>
<td colspan="3">Quick Connector</td>
<tr>
<th>Sensor</th>
<th>Measurement Value</th>
<th>Range</th>
<th>Unit</th>
<th rowspan="7"></th>
<th>Control Device</th>
<th>Control Value</th>
</tr>
<tr>
<td rowspan="2">Temperature & Humidity Sensor</td>
<td>Temperature</td>
<td>-40 ~ 80</td>
<td>℃</td>
<td>Pump</td>
<td>Emulsion</td>
</tr>
<tr>
<td>Humidity</td>
<td>0 ~ 100</td>
<td>%</td>
<td>Fan</td>
<td>Temperature & Humidity</td>
</tr>
<tr>
<td>Water Temperature Sensor</td>
<td>Temperature</td>
<td>-55 ~ 150</td>
<td>℃</td>
<td>Heater</td>
<td>Temperature</td>
</tr>
<tr>
<td>Light Sensor</td>
<td>Light</td>
<td>0 ~ 100</td>
<td>%</td>
<td>LED</td>
<td>Light</td>
</tr>
<tr>
<td>TDS Sensor</td>
<td>Nutrient Solution Concentration</td>
<td>0 ~ 1000</td>
<td>ppm</td>
<td rowspan="2" colspan="2"></td>
</tr>
<tr>
<td>Water Level Sensor</td>
<td>Tank Water Level</td>
<td>0 ~ 100</td>
<td>%</td>
</tr>
<tr></tr>
</table>

### Software
The following diagram describes the webOS platform-based modular smart farm system. It showcases how sensor data collected from the smart farm is transmitted to a web app using the MQTT protocol and how control signals are sent to manage smart farm devices.

{{< figure src="/images/blog/articles/eswc-2024-sw-architecture.png" alt="Software Structure" >}}

## Features

The key features of the project are as follows:

### Modular Smart Farm Kit

PLKIT offers a customizable modular design that adapts flexibly to various agricultural environments.

- The modular system allows users to easily add or remove hardware components, such as sensors, actuators, and communication modules, as needed.
- Magnetic charging further enhances convenience for users.

{{< figure src="/images/blog/articles/eswc-2024-modular-smart-farm-kit.png" caption="" alt="the feature of the Modular Smart Farm Kit" >}}

### Agricultural Data Exchange Platform

PLKIT provides a platform for collecting, analyzing, and sharing sensor data from devices, such as temperature, humidity, and water level sensors.

- Users can share crop growth data with other farmers, enabling efficient cultivation of new or existing crops.
- Collected data is managed securely with technologies supporting data anonymization and privacy protection. This ensures safe trading of agricultural data while offering data providers opportunities for additional revenue.
- Research institutions and agribusinesses can utilize the platform to acquire data needed for agricultural R&D.

{{< figure src="/images/blog/articles/eswc-2024-agricultural-data-sharing-platform.png" caption="" alt="Agricultural Data Exchange Platform" >}}

### AI Chatbot and Predictive Models

PLKIT employs time-series data analysis and deep learning-based predictive models to support crop growth predictions and resource optimization.

- By analyzing both accumulated and real-time data, the system predicts future yields and the likelihood of pest outbreaks.
- These insights assist users in making informed decisions to optimize farm management.

{{< figure src="/images/blog/articles/eswc-2024-aI-chatbot-predictive-models.png" caption="" alt="AI Chatbot and Predictive Models" >}}

## Winner's Interview

The Wildflower team, the winner of the Grand Prize in the webOS category, shared their thoughts:
> This project helped us take a step forward as embedded software developers.

They added, 
> The 22nd Embedded Software Competition was a new challenge. It was our first team project and our first experience tackling unfamiliar topic 'smart farming'. Coming up with innovative ideas was tough but also an exciting journey. Thankfully, prior exposure to the webOS platform in university lectures helped us identify its strengths early on, which streamlined the direction of our ideas.
> The process was challenging. For example, the display size limitations created difficulties in web development. That said, the various components provided by the Enact framework made it easy for us to build the UI. On the downside, it’s a bit disappointing that we couldn’t find a wealth of webOS-related resources through internet searches or GenAI tools. Instead, we had to rely on traditional learning methods, like the content on the webOS developer site. It would be wonderful to see the webOS development ecosystem grow with more sample projects, practical tips, and essential resources for first-time developers.

Finally, the team expressed their hopes:
> We wish for more developers to take on new challenges, just as we did successfully.

We look forward to seeing teams with diverse ideas using webOS OSE in the 23rd Embedded Software Competition. See you next year with a fresh theme!

## Resources

- Source code: [GitHub](https://github.com/yasaenghwa/PLKIT.git) (Korean only)
- Video demo: [YouTube](https://www.youtube.com/watch?v=yzjNMHQbjM0) (Korean only)