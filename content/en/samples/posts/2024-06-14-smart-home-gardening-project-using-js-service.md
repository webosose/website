---
title: Smart Home Gardening Project Using JS Service
date: 2024-06-14
slug: smart-home-gardening-project-using-js-service
posttype: solution
toc: true
thumbnail: th-smart-home-gardening-app.png
---

**Author: YoungHoon Kim, Jiseung Hong, Jihwan Park, Seungwoo Oh, Jaehoon Kim**  

This project is a webOS-based smart home gardening project with remote and automatic control!

<!-- PROJECT LOGO -->
<br />
<div align="center">
 
  <p align="center">
    ·
    <a href="https://github.com/dudgns128/webos-gardening/issues">🐞 Report Bug</a>
    ·
    <a href="https://github.com/dudgns128/webos-gardening/issues">💬 Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Overview
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
   <li>
      <a href="#technology-stack">Technology Stack</a>
    </li>
    <li>
      <a href="key-features">Key Features</a>
    </li>
     <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#system-architecture">System Architecture</a></li>
     </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#how-to-use">How to use</a></li>
    <li><a href="#webpage-develpment-for-remote-users">Webpage Develpment for remote users</a></li>
    <li><a href="#code-implementation---react">Code Implementation - React</a></li>
    <li><a href="#code-implementation---js-service">Code Implementation - JS Service</a></li>
    <li><a href="#future-improvements">Future Improvements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62871662/99b70587-d427-4ed7-b7bd-177a4a2d32dd" 
         alt="projectImage1" 
         style="width: 49%;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62871662/43271141-2471-45ff-8fb0-1dbcd2d7e109" 
         alt="projectImage2" 
         style="width: 49%;">
</p>


### Development Motivation and Description
[Difficulty in growing and managing plants at home]
- Time and cost burden to manage plants every day, and barriers to entry into cultivation and management, especially for beginners
- When growing at home, each environmental condition (wind, sunlight, humidity, temperature, etc.) is different, so there is a limit to cultivating only by referring to the manual

[Features for user convenience and satisfaction]
- **Automatic control to maintain appropriate environmental conditions according to plant species**, **monitoring companion plant conditions**, and **managing companion plant affection** through JS service between HW and web apps
- Development of external servers and mobile pages to implement user information management, **remote control (watering/light volume)**, and **multiple individual plant management functions**

<!-- Technology Stack -->
## Technology Stack
#### WebApp

[![React][React.js]][React-url][![npm][npm]][npm-url][![HTML5][HTML5]][HTML5-url][![JavaScript][JavaScript.js]][JavaScript-url][![Figma][Figma]][Figma-url][![Nodejs][Nodejs]][Nodejs-url][![HTTP][HTTP]][HTTP-url]

#### JS-service

[![JavaScript][JavaScript.js]][JavaScript-url][![Nodejs][Nodejs]][Nodejs-url][![npm][npm]][npm-url][![WEBSOCKET][WEBSOCKET]][WEBSOCKET-url][![LS2API][LS2API]][LS2API-url]

#### External Server

[![AWS][AWS]][AWS-url][![WEBSOCKET][WEBSOCKET]][WEBSOCKET-url][![HTTP][HTTP]][HTTP-url][![Spring][Spring]][Spring-url]

#### Database

[![MySQL][MySQL]][MySQL-url][![InfluxDB][InfluxDB]][InfluxDB-url]

#### Hardware

[![LG][LG]][LG-url][![Arduino][Arduino]][Arduino-url][![Raspberry][Raspberry]][Raspberry-url]

#### Development Environment

[![window][window]][window-url]

## Key Features

**1. Automation of Maintaining Optimal Environmental Conditions Based on Plant Species**

  - **Real-time data collection** is achieved through sensors connected to an Arduino, including temperature and humidity sensors, light sensors, and moisture sensors.
    
  - Based on the collected sensor data, an **automatic watering system and light control system create suitable environments for different plants automatically.**

  - The appropriate environmental conditions for each plant species are stored in a database using domain knowledge in botany. For instance, cacti require temperatures of 30-40°C during the day and 10°C at night, with high light levels and 40-60% humidity, while peonies require temperatures of 18-25°C and 50-70% humidity.

**2. Meeting Various User Needs**

  - The system supports both **an automation mode for convenient management** and **a customization mode for users who wish to interact directly with their plants.** Users can switch between modes without restrictions. For example, someone who enjoys watering their plants manually can use the customization mode but switch to automation mode when they need to be away for an extended period.
  
  - Through a mobile web interface, users can monitor plant conditions and environmental factors remotely, such as light and moisture levels, and make adjustments as needed.

## Architecture


  <summary>🖼️ System Architecture 🖼️</summary>
  
  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62871662/d195e54b-0019-48d7-a6bd-de325828ab61" alt="System Architecture" style="width: 66%;">
  </p>

   <summary>🖼️ System Architecture2 🖼️</summary>
  
  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62871662/cc9c79c9-0587-4fcc-8ce4-f929a318af90)" alt="System Architecture" style="width: 66%;">
  </p>



  <summary>🖼️ Database ERD 🖼️</summary>
  
  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62871662/95a01590-4a6f-4642-b032-fc596e9324af" alt="Database ERD" style="width: 66%;">
  </p>

## Hardware Setup

| Hardware                           | Description                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------|
| Raspberry Pi 4 Model B (8GB)       | The core computing unit for the device                                                                           |
| MicroSD Card with webOS OSE Image  | A MicroSD for flashing webOS OSE. webOS OSE 2.24.0 is used in this project. You can get the pre-built image from the webOS OSE GitHub. To install a webOS OSE image on a MicroSD card, use the following guide: Flashing webOS OSE. |
| Touchscreen or Monitor             | The display device that interacts with the sensor. We recommend using a touchscreen for a more interactive experience. We used the 10.1 Touchscreen. |
| DHT11 sensor                       | To measure temperature and humidity of plants. |
| CDS sensor / Neo Pixel             | A light-dependent resistor that changes its resistance based on the amount of light it detects. And we control light by NeoPixel.


#### Raspberry Pi
* HardWare : Raspberry Pi 4 Model B 8GB

* OS : WebOS OSE 2.24.0

1. Download WebOS image from [WebOS OSE](https://github.com/webosose/build-webos/releases)
 
     <img width="899" alt="pre build image file" src="https://github.com/dudgns128/webos-gardening/assets/62871662/16e99917-2954-41f6-8a28-02c64be7f586">


2. Extracting image files
    * Uncompressed using the [7-zip](https://www.7-zip.org/) program

    * You can decompress it and a folder called webos-ose-2-24-0-raspberrypi4-64.tar is created.

    * If you enter the folder, there is a .tar file, and you can proceed with decompressing it.

    * Uncompressed creates a folder called webos-ose-2-24-0-raspberrypi4-64.
 
    * When you enter the folder, you'll find a .mic file, which means the Image file is ready.


3. Formatting SD Cards
    * You can refer to it and format the SD card.
    * Windows 10 default format doesn't matter!


4. Image flashing to sd card
    * Image flashing to sd card using program : [Win 32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) 
    * Please select the .mic file obtained above, select the SD card you formatted, and press the Write button.
    * It's taking some time.
    * Done! Now when you insert the SD card into the bottom of the Raspberry Pi and boot it up, WebOS will boot normally!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

This section describes how to set up this project on your client device.

{{< note "Before You Begin" >}}
- This project uses a spring boot external server, and only describes the client part except for that part.
- Using JS service, we implemented a task that handles all the heavy logic to handle in the background or WebApp.
{{< /note >}}

1. Clone the repository.

   ```sh
   git clone https://github.com/dudgns128/webos-gardening.git
   ```
   
2. Move into the cloned directory.

    ```sh
    cd gardening_react
    ```

    After moving into the directory, you will find the following three directories: 

    ```sh
    gardening_react
      |- public
      |- src
      |- ...
    ```

3. Follow the guides in the following links:

   [Getting Started - React App](https://github.com/dudgns128/webos-gardening/blob/Webos/dev/gardening_react/README.md) The link has a step-by-step setup guide for `gardening_react` directories.

## How to use

### Launch the App

  {{< caution >}}
  Before running, install the required libraries through `npm install` in the **JS services** and **gardening_react** directories and resolve dependencies.
  {{< /caution >}}


1. (Optional) Connect the sensors with arduino and Rasberrry pi 4.

2. (Optional) Launch the server.

3. Check that the target device’s networks are working well.

4.  Launch the app with `deploy.sh` that automates the building and deploying process of the project.

```sh
./deploy.sh [TARGET_DEVICE_NAME]
```

[Getting Started - React App](https://github.com/dudgns128/webos-gardening/blob/Webos/dev/gardening_react/README.md) The link explains how to use `deploy.sh`.


### Create an Account

1. If you don't have an account, click the 'sign-up shortcut'. 

2. Fill in the necessary information. This information is stored in a server DB so that you can manage your information and manage diverse plants remotely.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/8841754a-8378-4323-aeb1-343956df68c7" style="width: 70%;">
  </p>

### Login and Plant Registration

1. Fill in the e-mail and password used when signing up for membership and press the 'OK' button.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/98e96989-49b7-47bd-a198-19ed3a08d362" style="width: 70%;">
  </p>


2. On the 'plant information registration' page, choose the type of plant to grow, name and birthdate of the plant, and press the 'OK' button.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/78ad4e35-bd69-46d4-9fcf-675ca6470cdc" style="width: 70%;">
  </p>

### Mainpage

After 3 seconds, you will see an image, name, level (initial level is 1), experience gauge bar, plant satisfaction status gauge bar, and menu bar with access to various functions.

1. When you press the Plant Satisfaction Gauge Bar, a modal window displays the values for the four current environmental conditions supply (temperature, humidity, water supply, and light volume).

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/bd1a7753-ba56-430e-8a5b-59c62fb736dd" style="width: 70%;">
  </p>


2. When you press the calendar icon, a modal window appears to display water supply by date and plant satisfaction by date. Users can check the monthly plant growth level and satisfaction level.

Water supply shows the date in blue, and plant satisfaction shows five images according to satisfaction.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/6dc8cbc4-7ca5-4040-ad91-584498ff107c" style="width: 70%;">
  </p>

3. When you press the sprout icon to indicate automatic control, and the instructions for growing the plant are moved to a modal window in text format.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/a716d2bc-576a-459c-9e23-23d60682a056" style="width: 70%;">
  </p>

4. Pressing the solar icon takes you to a modal window that controls the amount of light you want. The slider allows you to provide the amount of light you want.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/817ad0ca-2a8c-41c9-8173-c706316dc0ca" style="width: 70%;">
  </p>

5. When you tap the water drop icon to go to the moisture control page and go to the modal window. You can provide the amount of water you need by clicking the button.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/a7740f24-9348-42e2-aa55-9571b3bd2e8e" style="width: 70%;">
  </p>


## Webpage Develpment for remote users

Users away from home have also developed and implemented mobile pages to monitor plant conditions, control water and light, and provide them.

And when a user manages multiple plants, it is additionally implemented to monitor and control by selecting one plant from the plant list.

1. After logging in, go to the plant selection page, check the list of plants you are growing, and select a plant you want to monitor and control to move to the main page.

The logic of the rest of the pages and functions is the same as the app that goes up on the webOS.

  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/dudgns128/webos-gardening/assets/62577519/438a0129-fe93-4343-acfd-341dd2c614d5" style="width: 70%;">
  </p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Code Implementation - React

**Source code**: [GitHub link](https://github.com/dudgns128/webos-gardening)


**Create an Account** for Signup.

- `checkPassword()` function calls to check if the password is the same as verifying the password. If it is not valid, stop running the function.
- It uses `axios.post` to send a POST request to the server's `/api/user` endpoint. The request's header specifies JSON format.
- It waits for a response from the server. If the response status code is 201, call navigate ('/user/login') to the login page.
- If the request fails, get an error message and notify the user through a modal window. The default message is "Membership failed. Please try again."

{{< code "gardening_react/src/pages/UserSignup.js" >}}
``` javascript
    const onSubmit = async () => {
        if (!checkPassword()) return;

        
        const formatYear = year.replace('년', '');
        const formatMonth = month.replace('월', '').padStart(2, '0');
        const formatDay = day.replace('일', '').padStart(2, '0');

        // year, month, day를 'YYYY-MM-DD' 형식의 문자열로 합치기
        const birthdate = `${formatYear}-${formatMonth}-${formatDay}`;
        
        const userData = {
            name: name,
            gender: sex,
            nickname: nickname,
            birth: birthdate,
            email: email,
            password: pwd
        };
            
        try {
            const response = await axios.post(`${server}/api/user`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 201) {
                navigate('/user/login');
            }
        } catch (error) {
            const message = error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해 주세요.';
            setModalMessage(message);
            setShowModal(true);
        }
    };
```
{{< /code >}}

**Plant Registration** for registering plant information

- `fetchPlantInfo()` function is an asynchronous function that gets plant information from the server. If the data is successfully imported, update the status through the `setPlantList`.
- It sorts the `plantList` in ascending order by id, extract the scientific name of each plant to generate `PLANT_SPECIES_LIST`.
- It uses `axios.post` to send a POST request to the server's `/api/user` endpoint to submit plant information to server. At this time, the required parameters are delivered through the parameters object.
- If the request is successful, save the user plant ID through the `setUserPlantId`, and go to the /main page after the delay.
- If the request fails, set the appropriate message according to the error status and notify the user via modal.

{{< code "gardening_react/src/pages/UserSignup.js" >}}
``` javascript
    async function delay() {
      return new Promise(resolve => setTimeout(resolve, 1));
    }
    
    useEffect(() => {
      const fetchPlantInfo = async () => {
        try {
          const response = await axios.get(`${server}/api/plantinfo`);
          setPlantList(response.data);
        } catch (error) {
          const message = error.response?.data?.message || '식물 리스트를 가져올 수 없습니다';
          setModalMessage(message);
          setShowModal(true);
        }
      };

      fetchPlantInfo();
    }, []);

    useEffect(() => {
      // 선택된 식물 종에 상응하는 id를 plantInfoId에 저장
      const selectedPlant = plantList.find(plant => plant.scientificName === plantSpecies);
      if (selectedPlant) {
        setSelectedPlantId(selectedPlant.id);
      }
    }, [plantSpecies]);

    // id 오름차순으로 식물 정보를 정렬하고, 식물 이름만 추출하여 PLANT_SPECIES_LIST를 생성
    const PLANT_SPECIES_LIST = plantList
      .sort((a, b) => a.id - b.id)
      .map(plant => plant.scientificName);

    const onSubmit = async () => {
      
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

      const formatYear = year.replace('년', '');
      const formatMonth = month.replace('월', '').padStart(2, '0');
      const formatDay = day.replace('일', '').padStart(2, '0');
      
      const birthDate = `${formatYear}-${formatMonth}-${formatDay}`;
      setPlantBirthdate(birthDate) // just for JS service API
      
      try {
        const response = await axios.post(`${server}/api/userplant`, null, {
          params:{
            email: email,
            password: password,
            plantInfoId: selectedPlantId,
            name: plantName,
            birthDate: birthDate,
            isAutoControl: isAutoControl,
            level: level
          }
        });

        if (response.status === 201) {
          setUserplantId(response.data.id);
          await delay();
          navigate('/main');
        } 
      } catch (error) {
        let message;
        if (error.response && error.response.status === 404) {
          message = error.response?.data?.message || '사용자 정보나 식물 정보가 없습니다';
        } 
        else if (error.response && error.response.status === 400) {
          message = error.response?.data?.message || '사용자 이메일과 비멀번호가 일치하지 않습니다';
        }
        else {
          message = error.response?.data?.message || '오류 발생';
        }
        setModalMessage(message);
        setShowModal(true);
      }
    };
```
{{< /code >}}

**Mainpage** for key Features

- It uses **WebOSServiceBridge** that is a JavaScript API enabling web applications to access Luna Bus.

{{< code "gardening_react/src/pages/MainPage.js" >}}
``` javascript
  useEffect(() => {
    const bridge = new WebOSServiceBridge();

    const serviceURL = "luna://com.team17.homegardening.service/getPlantInfos"; // 사용할 서비스의 URL

    bridge.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      if (response.success) {
        setPlantSatisfactionValue(response.satisfaction);
        setPlantImageUrl(response.imageUrl);
        setPlantName(response.name);
        setPlantLevel(response.level);
        setPlantExp(response.exp);
      }
    };
})
```
{{< /code >}}

**PlantConditionModal** for periodically displaying sensing data values

- When the initial value of the environmental data range is set and sensing data is received, an appropriate degree is indicated based on the value at that time.

{{< code "gardening_react/src/components/PlantConditionModal.js" >}}
``` javascript
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const serviceURL2 = "luna://com.team17.homegardening.service/envData";
    bridge2.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      waterMin = response.waterValue-response.waterRange;
      waterMax = response.waterValue+response.waterRange;
      lightMin = response.lightValue-response.lightRange;
      lightMax = response.lightValue+response.lightRange;
      temperatureMin = response.temperatureValue-response.temperatureRange;
      temperatureMax = response.temperatureValue+response.temperatureRange;
      humidityMin = response.humidityValue-response.humidityRange;
      humidityMax = response.humidityValue+response.humidityRange;

      bridge1.onservicecallback = function (msg) {
        const response = JSON.parse(msg);
        if (response.success) {
          setWater(response.water);
          setLight(response.light);
          setTemperature(response.temperature);
          setHumidity(response.humidity);
          setWaterStatus(getStatus(response.water, waterMin, waterMax));
          setLightStatus(getStatus(response.light, lightMin, lightMax));
          setTemperatureStatus(getStatus(response.temperature, temperatureMin, temperatureMax));
          setHumidityStatus(getStatus(response.humidity, humidityMin, humidityMax));
        }
      };
    };
    bridge2.call(serviceURL2, '{}');
    
    const serviceURL1 = "luna://com.team17.homegardening.service/getSensingData";

    bridge1.call(serviceURL1, '{}');  // 처음 센싱 데이터값 바로 노출되도록 추후 개발
    const intervalId1 = setInterval(() => bridge1.call(serviceURL1, '{}'), 3000);

    return () => {
      clearInterval(intervalId1);};
  }, [isOpen]);

```
{{< /code >}}

**CalledarModal** for displaying plant satisfaction and water supply date by date

- Logic, which imports water cycle and satisfaction data for a specific date from a database or API and updates the status, allows components to dynamically display data on a date.
- **UseEffect** runs whenever `isOpen` and `date` changes. Call uses the **bridge.call** method to call the service by delivering `serviceURL` and parameters.

{{< code "gardening_react/src/components/CalendarModal.js" >}}
``` javascript
  useEffect(() => {
  useEffect(() => {
        if (!isOpen) {
            return;
        }

        const updatedYear = date.getFullYear();
        const updatedMonth = date.getMonth() + 1;
    
        const params = JSON.stringify({
            "year": updatedYear,
            "month": updatedMonth
        });

        const serviceURL = "luna://com.team17.homegardening.service/calendar";

        bridge.onservicecallback = function (msg) {
            const response = JSON.parse(msg);
            if (response.success) {
                // isWater 데이터를 사용하여 waterDay 업데이트
                const newWaterDays = [];
                for (let day = 1; day <= 31; day++) {
                    if (response.isWater[`day${day}`]) {
                        const dateStr = `${updatedYear}-${String(updatedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        newWaterDays.push(dateStr);
                    }
                }
                setWaterDay(newWaterDays);

                // satisfaction 데이터를 사용하여 satisfactionDay 업데이트
                const newSatisfactionDays = {};
                for (let day = 1; day <= 31; day++) {
                    if (response.satisfaction[`day${day}`] !== null) {
                        newSatisfactionDays[day] = response.satisfaction[`day${day}`];
                    }
                }
                setSatisfactionDay(newSatisfactionDays);
            }
        };

        bridge.call(serviceURL, params);
    }, [isOpen, date]);
})
```
{{< /code >}}

**PlantAutocontrolModal** for displaying automatic control mode status and precautions for growing plants

- It uses two bridges to sync between when the user sets up in a remote state and whether the user sets up in automatic management mode at home.

{{< code "gardening_react/src/components/PlantAutocontrolModal.js" >}}
``` javascript
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const bridge1 = new WebOSServiceBridge();
    const bridge2 = new WebOSServiceBridge();

    const serviceURL = "luna://com.team17.homegardening.service/isAutocontrol";

    bridge1.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      if (response.success) {
        setCurrentState(response.currentState);
      }
    };

    bridge1.call(serviceURL, '{}');
    const intervalId = setInterval(() => bridge1.call(serviceURL, '{}'), 1000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const toggleHandler = () => {
    const serviceURL = "luna://com.team17.homegardening.service/toggleAutocontrol";

    bridge2.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      if (response.success) {
        setCurrentState(response.currentState);
      }
    };

    bridge2.call(serviceURL, '{}');
  };

```
{{< /code >}}

**PlantAutocontrolModal** for displaying automatic control mode status and precautions for growing plants

- It uses two bridges to sync between when the user sets up in a remote state and whether the user sets up in automatic management mode at home.

{{< code "gardening_react/src/components/PlantAutocontrolModal.js" >}}
``` javascript
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const bridge1 = new WebOSServiceBridge();
    const bridge2 = new WebOSServiceBridge();

    const serviceURL = "luna://com.team17.homegardening.service/isAutocontrol";

    bridge1.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      if (response.success) {
        setCurrentState(response.currentState);
      }
    };

    bridge1.call(serviceURL, '{}');
    const intervalId = setInterval(() => bridge1.call(serviceURL, '{}'), 1000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const toggleHandler = () => {
    const serviceURL = "luna://com.team17.homegardening.service/toggleAutocontrol";

    bridge2.onservicecallback = function (msg) {
      const response = JSON.parse(msg);
      if (response.success) {
        setCurrentState(response.currentState);
      }
    };

    bridge2.call(serviceURL, '{}');
  };

```
{{< /code >}}

**ControlLightModal** for supplying the amount of light set by the user

- It sets the value through the slider and call the JS service through the `submit()` function and send it to the parameter.

{{< code "gardening_react/src/components/ControlLightModal.js" >}}
``` javascript
    const handleSliderChange = (event) => {
        setLight(event.target.value);
    };

    const onSubmit = () => {
        const serviceURL = "luna://com.team17.homegardening.service/controlLight";

        bridge.onservicecallback = function (msg) {
            const response = JSON.parse(msg);
            if (response.success) {
                console.log("Light value successfully set to:", light);
            } else {
                console.error("Failed to set light value:", response);
            }
        };

        const params = JSON.stringify({
            "light": light
        });

        bridge.call(serviceURL, params);
    };

```
{{< /code >}}

**ControlWaterModal** for supplying water to a plant

- The hardware supplies water by calling the JS service through the `handleWaterButtonClick()` function.

{{< code "gardening_react/src/components/ControlWaterModal.js" >}}
``` javascript
    const handleWaterButtonClick = () => {
        const serviceURL = "luna://com.team17.homegardening.service/controlWater";

        bridge.onservicecallback = function (msg) {
            const response = JSON.parse(msg);
            if (response.success) {
                console.log("Watering successfully started");
            } else {
                console.error("Failed to start watering:", response);
            }
        };

        bridge.call(serviceURL, "{}");
    };

```
{{< /code >}}

## Code Implementation - JS Service

**DB8** for accessing to the database APIs which is provided over the luna-service bus

- Node.js module that implements database access and management functions using webOS services. 

- The main functions consist of:
- **PutKind** method : Create and register all DB Kinds (plant related data / environmental sensing data / water supply date and plant satisfaction data)
- **putPermissions** method:allocate all DB Kind privileges
- **Put** method: Save data objects in JSON format of a specific Kind (environmental conditions and plant satisfaction for monitoring environmental conditions and plant satisfaction / Water supply date and date information for exposing plant satisfaction to the calendar)
- **del** method : delete JSON data object
- **find** method : return object matching query
- **merge** method: Update existing objects (level / number of water supplies / automation of plant management / plant satisfaction / sensing data values updated respectively)

{{< code "/JsService/homegardening_webos_service.js" >}}
``` javascript
const busID = 'com.team17.homegardening.service';

///////////////////////// DB: plantInfo
const kindID_plantInfo = 'com.team17.homegardening.plantInfo:1';
const plantInfo = {
  putKind: function () {
    const url = 'luna://com.webos.service.db/putKind';
    const params = {
      id: kindID_plantInfo,
      owner: busID,
    };
    service.call(url, params, (res) => {});
  },
  putPermissions: function () {
    const url = 'luna://com.webos.service.db/putPermissions';
    const params = {
      permissions: [
        {
          operations: {
            read: 'allow',
            create: 'allow',
            update: 'allow',
            delete: 'allow',
          },
          object: kindID_plantInfo,
          type: 'db.kind',
          caller: '*', // 원래는 busID 를 넣어야 함!
        },
      ],
    };
    service.call(url, params, (res) => {});
  },
  replaceData: async function (newData) {
    try {
      await plantInfo.emptyDB();
    } catch (e) {
      return Promise.reject('emptyDB failed');
    }
    const url = 'luna://com.webos.service.db/put';
    const params = {
      objects: [
        {
          _kind: kindID_plantInfo,
          plantId: newData.plantId,
          plantName: newData.plantName,
          plantBirthDate: newData.plantBirthDate,
          scientificName: newData.scientificName,
          shortDescription: newData.shortDescription,
          maxLevel: newData.maxLevel,
        },
      ],
    };
    return new Promise((resolve, reject) => {
      service.call(url, params, (res) => {
        if (res.payload.returnValue == true) resolve();
        else reject('put failed');
      });
    });
  },
  getPlantId: function () {
    const url = 'luna://com.webos.service.db/find';
    const params = {
      query: {
        from: kindID_plantInfo,
      },
    };
    return new Promise((resolve, reject) => {
      service.call(url, params, (res) => {
        if (res.payload.returnValue != true) reject('getPlantId failed');
        if (res.payload.results.length != 0)
          resolve(res.payload.results[0].plantId);
        else reject('getPlantId failed');
      });
    });
  },
  getPlantName: function () {
    const url = 'luna://com.webos.service.db/find';
    const params = {
      query: {
        from: kindID_plantInfo,
      },
    };
    return new Promise((resolve, reject) => {
      service.call(url, params, (res) => {
        if (res.payload.returnValue != true) reject('getPlantName failed');
        if (res.payload.results.length != 0)
          resolve(res.payload.results[0].plantName);
        else reject('getPlantName failed');
      });
    });
  },
  emptyDB: function () {
    const url = 'luna://com.webos.service.db/del';
    const params = {
      query: {
        from: kindID_plantInfo,
      },
    };
    return new Promise((resolve, reject) => {
      service.call(url, params, (res) => {
        if (res.payload.returnValue == true) resolve();
        else reject();
      });
    });
  },
};

```
{{< /code >}}

**Heartbeat** for continueing to send beats to subscribers, and subscription services continue to operate in the background

- As a background operation, sensing data from hardware can be imported every 5 seconds, stored in webOS dB, and exchanged with web apps and servers
- In webOS, the service was automatically shut down about 5 seconds after the service was executed. However, in order to effectively utilize the service, it is not desirable to end the service without a separate action. This ensures that the service does not die automatically through heartbeat.

{{< code "/JsService/homegardening_webos_service.js" >}}
``` javascript

 // heartbeat 구독
  const sub = service.subscribe(`luna://${pkgInfo.name}/heartbeat`, {
    subscribe: true,
  });
  sub.addListener('response', function (msg) {
    console.log(JSON.stringify(msg.payload));
  });

  // Websocket : 메시지 수신 (제어하는 경우)
  connection.on('message', async (rawMessage) => {
    const wMessage = JSON.parse(rawMessage);
    const method = wMessage.method
    switch (method) {
      case 1:  case '1':
        await controlWater();
        break;
      case 2:  case '2':
        controlLight(wMessage.light);
        break;
      case 16:  case '16':
        await plantCurrentInfo.updateIsAutoControl(wMessage.isAutoControl);
        break;
      default:
        break;
    }
  });

  // 5초 주기로 센싱
  // 1. envSensingData 에 저장
  // 2. 분석해 만족도 결정(-> 자동제어 여부에 따라 제어는 이때 같이!), 만족도 평균값 갱신
  // 3. 이 최신 센싱 결과 및 만족도는 plantCurrentInfo 에도 따로 저장
  let satisfaction;
  const intervalId2 = setInterval(async function () {
    try {
      const now = new Date();
      const yearNow = now.getFullYear();
      const monthNow = now.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해야 함)
      const dayNow = now.getDate();
      const data = getSensingDataJSON();
      if ((await plantCurrentInfo.isDataExist()) != true)
        await plantCurrentInfo.putData({
          isAutoControl: true,
          level: 1,
          waterCount: 0,
          satisfaction: 0,
          sensingData: null,
        });
      if ((await avgSatisfactionRecord.isDataExist(yearNow, monthNow, dayNow)) != true)
        await avgSatisfactionRecord.putData({
          year: yearNow,
          month: monthNow,
          day: dayNow,
          avgSatisfaction: satisfaction,
          count: 1,
        });
      satisfaction = await calcSatisfaction(data);
      await envSensingData.putData({
        time: 1,
        water: data.water,
        light: data.light,
        humidity: data.humidity,
        temperature: data.temperature,
        satisfaction,
      });
      await avgSatisfactionRecord.updateAvgSatisfaction(
        yearNow,
        monthNow,
        dayNow,
        satisfaction
      );
      await plantCurrentInfo.updateSensingData(data);
      await plantCurrentInfo.updateSatisfaction(satisfaction);
      // ****************** 서버로 데이터 보내기 ************************//
      const plantId = await plantInfo.getPlantId();
      const plantName = await plantInfo.getPlantName();
      const normalImageUrl = await imageUrl.getNormalImageUrl();
      const level = await plantCurrentInfo.getLevel();
      const waterCount = await plantCurrentInfo.getWaterCount();
      connection.send(
        JSON.stringify({
          method: 0,
          userPlant: plantId,
          data: {
            plantName,
            water: data.water,
            light: data.light,
            humidity: data.humidity,
            temperature: data.temperature,
            satisfaction,
            level,
            exp: (100 * waterCount) / (level * 2),
            imageUrl: normalImageUrl
          }
        })
      );
    } catch (e) {
      message.respond({
        e,
      });
    }
  }, 3000);

  message.respond({
    success: true,
  });

```
{{< /code >}}

**Peripheralmanager** for utilizing the hardware of sensors and controls

- It is a service to provide APIs to monitor sensors and control actuators connected to I/O peripherals using industry-standard protocols

- Use I2C protocol (Temperature/Humidity/Light Volume/Water Volume Sensor + Light Supply/Water Supply Control) :
- i2c/open : Open a device connected to an I2C bus
- i2c/close : Close an open I2C device connected to a bus
- i2c/read : reading data from I2C device
- i2c/write : Write data to an open I2C device

{{< code "/JsService/homegardening_webos_service.js" >}}
``` javascript

function openI2C() {
  var openI2CApi = 'luna://com.webos.service.peripheralmanager/i2c/open';
  var openI2CParams = {name:"I2C1", address:1};

  service.call(openI2CApi, openI2CParams, (res) => {
    if (res.payload.returnValue) {
        console.log("open success");
    } else {
        console.log("open failed");
    }
  });
}

function closeI2C() {
  var closeI2CApi = 'luna://com.webos.service.peripheralmanager/i2c/close';
  var closeI2CParams = {name:"I2C1", address:1};

  function closeI2CApi_callback(res) {
      if (res.payload.returnValue) {
          console.log("close success");
      } else {
          console.log("close failed");
      }
  }
  service.call(closeI2CApi, closeI2CParams, closeI2CApi_callback);
}

function controlNeopixel(br) {
  var writeI2CApi = 'luna://com.webos.service.peripheralmanager/i2c/write';
  var writeI2CParams1 = {name:"I2C1", address:1, data:[0, 0]};
  var writeI2CParams2 = {name:"I2C1", address:1, data:[br]};

  function writeI2CApi_callback1(res) {
    if (res.payload.returnValue) {
      service.call(writeI2CApi, writeI2CParams2, writeI2CApi_callback2);
    } else {
      console.log("fail to control Neopixel");
    }
  }

  function writeI2CApi_callback2(res) {
    if (res.payload.returnValue) {
      console.log("success to control Neopixel");
    } else {
      console.log("fail to control Neopixel");
    }
  }
  service.call(writeI2CApi, writeI2CParams1, writeI2CApi_callback1);
}

function controlPump(on) {  // 0: turn off, 1: turn on
  var writeI2CApi = 'luna://com.webos.service.peripheralmanager/i2c/write';
  var writeI2CParams1 = {name:"I2C1", address:1, data:[0, 1]};
  var writeI2CParams2 = {name:"I2C1", address:1, data:[on]};

  function writeI2CApi_callback1(res) {
      if (res.payload.returnValue) {
          service.call(writeI2CApi, writeI2CParams2, writeI2CApi_callback2);
      } else {
          console.log("fail to control water pump");
      }
  }

  function writeI2CApi_callback2(res) {
      if (res.payload.returnValue) {
          console.log("success to control water pump");
      } else {
          console.log("fail to control water pump");
      }
  }

  service.call(writeI2CApi, writeI2CParams1, writeI2CApi_callback1);
}

```
{{< /code >}}


## Future Improvements

Ideas and functions to further enhance the bond between users and plants need to be realized, and the basis for determining plant conditions and satisfaction by applying plant domain knowledge is needed. There is endless room for development, such as applying a model that can infer plant diseases through deep learning segmentation to provide practical help to users.


## Contact

### 💡 김영훈 ([dudgns128](https://https://github.com/dudgns128)) : [xoals128@naver.com](mailto:xoals128@naver.com)

### 💡 박지환 ([hw-ani](https://https://github.com/hw-ani)) : [pcbmlh73@gmail.com](mailto:pcbmlh73@gmail.com)

### 💡 김재훈 ([nanocode00](https://github.com/nanocode00)) : [rwg0901@naver.com](mailto:rwg0901@naver.com)

### 💡 오승우 ([dhtmddn00](https://github.com/dhtmddn00)) : [dhtmddn00@gmail.com](mailto:dhtmddn00@gmail.com)

### 💡 홍지승 ([HONG-2019110129](https://https://https://github.com/HONG-2019110129)) : [wltmd3847@naver.com](mailto:wltmd3847@naver.com)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dudgns128/webos-gardening.svg?style=for-the-badge
[contributors-url]: https://github.com/dudgns128/webos-gardening/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dudgns128/webos-gardening.svg?style=for-the-badge
[forks-url]: https://github.com/dudgns128/webos-gardening/network/members
[stars-shield]: https://img.shields.io/github/stars/dudgns128/webos-gardening.svg?style=for-the-badge
[stars-url]: https://github.com/dudgns128/webos-gardening/stargazers
[issues-shield]: https://img.shields.io/github/issues/dudgns128/webos-gardening.svg?style=for-the-badge
[issues-url]: https://github.com/dudgns128/webos-gardening/issues
[license-shield]: https://img.shields.io/github/license/noFlowWater/signage_solution.svg?style=for-the-badge
[license-url]: https://github.com/noFlowWater/signage_solution/blob/master/LICENSE.txt
[webos-shield]: https://img.shields.io/badge/webos%20official%20example-A50034?style=for-the-badge&logo=lg
[webos-url]: https://www.webosose.org/samples/2023/12/21/facial-recognition-kiosk-using-webos
[product-screenshot]: images/screenshot.png

[React.js]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000
[React-url]: https://reactjs.org/

[license-shield]: https://img.shields.io/github/license/noFlowWater/signage_solution.svg?style=for-the-badge
[license-url]: https://github.com/noFlowWater/signage_solution/blob/master/LICENSE.txt

[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=fff
[Figma-url]: https://www.figma.com/

[Flask]: https://img.shields.io/badge/Flask-000?style=for-the-badge&logo=flask&logoColor=fff
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/

[HTTP]: https://img.shields.io/badge/HTTP-%23ED2761?style=for-the-badge&logo=&logoColor=fff
[HTTP-url]:https://www.cloudflare.com/ko-kr/learning/ddos/glossary/hypertext-transfer-protocol-http/

[HTML5]: https://img.shields.io/badge/HTML5-%23FF4000?style=for-the-badge&logo=HTML5&logoColor=fff
[HTML5-url]: https://html.com/html5/

[LS2API]: https://img.shields.io/badge/LS2API-%234608560?style=for-the-badge&logo=LS2API&logoColor=fff
[LS2API-url]: https://www.webosose.org/docs/reference/ls2-api/ls2-api-index/

[AWS]: https://img.shields.io/badge/AWS-%23232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=fff
[AWS-url]: https://aws.amazon.com/ko/?nc2=h_lg

[WEBSOCKET]: https://img.shields.io/badge/webSocket-%23BC52EE?style=for-the-badge&logo=webSocket&logoColor=fff
[WEBSOCKET-url]: https://websocket.org/

[InfluxDB]: https://img.shields.io/badge/InfluxDB-%2322ADF6?style=for-the-badge&logo=influxdb&logoColor=fff
[InfluxDB-url]: https://www.influxdata.com/

[Arduino]: https://img.shields.io/badge/Arduino-%2300878F?style=for-the-badge&logo=arduino&logoColor=fff
[Arduino-url]: https://www.influxdata.com/

[window]: https://img.shields.io/badge/Window-%230078D4?style=for-the-badge&logo=windows&logoColor=fff
[window-url]: https://www.microsoft.com/software-download/windows11

[spring]: https://img.shields.io/badge/Spring-%236DB33F?style=for-the-badge&logo=spring&logoColor=fff
[spring-url]: https://spring.io/

[Socket.io]: https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=fff
[Socket.io-url]: https://socket.io/

[Nodejs]: https://img.shields.io/badge/Node.js-393?style=for-the-badge&logo=nodedotjs&logoColor=fff
[Nodejs-url]: https://nodejs.org/en

[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=fff
[Prisma-url]: https://www.prisma.io/

[OpenCV]: https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=fff
[OpenCV-url]: https://opencv.org/

[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=fff
[npm-url]: https://www.npmjs.com/

[MySQL]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=fff
[MySQL-url]: https://www.mysql.com/

[Python.org]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/ko/docs/Learn/JavaScript

[Raspberry]: https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=fff
[Raspberry-url]: https://www.raspberrypi.com/

[LG]: https://img.shields.io/badge/webOS-A50034?style=for-the-badge&logo=lg&logoColor=fff
[LG-url]: https://www.webosose.org/
