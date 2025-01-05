---
title: Default Stand-by App Using webOS
date: 2024-12-03
slug: stand-by-app-webos
posttype: solution
toc: true
thumbnail: th-stand-by-app.png
---

**Author: Minjung Bae, Seungbeom Baek, Suhyeon Yun, Jongun Jeong**

# Introduction to the Project

### **A Lifestyle Custom Standby App**

This project is an app/widget development project based on the webOS so that users can obtain meaningful information even in a standby state.

<p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/beb0422d-845f-4a01-8cb0-6fa83408f2f5" 
         style="width: 49%;">
    <img src="https://github.com/user-attachments/assets/8fd56178-2bbd-44e9-9dd3-d40a1148b5bb" 
         style="width: 49%;">
</p>

<br/>

# Project Content

### **Background**

When the display is in a standby state, it is necessary to develop an app that allows users to receive meaningful information (standby function)
By implementing a function to provide various information while minimizing battery usage, it aims to develop an app that can obtain information in real time or continuously even while waiting

① **Standby Screen App/Widget Development**

- Objective: Develop a standby app/widget that continuously provides information tailored to the needs of the user, using minimal battery even when the device is in the standby state.
- Features: It provides widget functions such as slide show (image), weather (temperature, precipitation, fine dust, etc.), schedule list (calender, to-do list), and media player. It minimizes battery consumption through dimming function, which automatically reduces screen brightness after 20 seconds even in standby state.

② **Implementing Web App Features**

- User login service: It loads the standby settings for each user through the login function and provides a screen tailored to the settings of the logged-in user. In addition, through the user dashboard, functions to be displayed on the standby screen can be selected and stored, and a real-time preview screen is provided. At this time, widgets and functions can be set directly on the app screen through the UI controller.
- Standby Screen Customization: Various widgets are customized to suit user needs and displayed on the standby screen. Additional functions are also developed and displayed on the screen. (e.g., slide show, weather information, schedule list, media play, medication notification, etc.)

### **Implemented Features and Technologies**

### Home Screen

This is the initial screen that appears when the application starts. The configured widgets are displayed here.

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-1.png">

You can also add a wallpaper through the widget setting mode.(only web browser)

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-11.png">

### Settings Screen

This screen allows users to access various features.

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-9.png">

### Login and Signup

`react-hook-form` is used for validation, and `useForm` is utilized to manage login and signup states.<br/>

**On login or signup** -> The input values are sent to the server, and a token is received in response.

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-3.png">
<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-4.png">

### Widget Mode and Image Slide Mode

- **Widget Mode** displays the widgets. Additionally, you must log in first to add widgets <br/>
  <img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-12.png">
  <img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-13.png">

- **Image Slide Mode** displays an image slideshow. (will be updated)
  <img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-5.png">

### Widget Configuration Screen

Users can modify or delete widget positions on this screen. At this point, `react-use-gesture` is used to update the widget's position. After pressing the edit button, users can rearrange widget positions. Once editing is complete, pressing the save button updates the widget position array in local storage and also sends the changes to the server via an API.<br/>

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-6.png">

### Widget Addition Screen

Users can add their desired widgets on this screen. Widgets are categorized by type and size (L, M, S). Upon selecting a widget to add, users are directed to the widget editing page. During this process, the widget position and type arrays are updated in the user's local device and Server.<br/>

### Calendar Widget

Clicking on a widget opens a modal where users can add schedules in the calendar widget.<br/>

**When adding a calendar** -> The calendar widget data is sent via an API, and users are directed to the widget editing page.<br/>

**When deleting a calendar** -> The calendar widget is deleted via an API. Simultaneously, the local storage data is updated, and the UI is reloaded to reflect the changes.<br/>

**When adding a schedule** -> The schedule title and content are received using `react-hook-form`. Clicking the "Add Schedule" button sends the data to the server. `TanStack Query` caches the data and updates it using a cache key.<br/>

**When deleting a schedule** -> The schedule is deleted via an API, and the cached data is also updated.

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-7.png">

### Dimming Feature

This is managed through a dimming provider. Using `window.addEventListener`, it detects `mousemove`, `keydown`, `touchstart`, and `click` events. If no such events are detected for 10 seconds, an additional layer is applied to darken the screen.

<img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-8.png">

### Dark / Light Mode

The `Context API` is used to globally manage and toggle between dark and light modes. Each mode's CSS values are globally managed to affect the UI.

- Light Mode
  <img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-9.png">

- Dark Mode
  <img src="https://github.com/KNU-LG/frontend/raw/main/src/assets/docsImage/image-10.png">

<br/>

# Usage Technology Stack

It is a diagram of the overall structure of our system.

{{< figure src="https://github.com/user-attachments/assets/1f235018-cf24-4776-b9c2-ebf476f5af99" caption="System Architecture" alt="System Architecture" >}}

The overall structure of the database of our project is as follows.

{{< figure src="https://github.com/user-attachments/assets/23917fea-4019-422c-b44a-a8cbcd71cdfd" caption="Database ERD" alt="Database ERD" >}}

The list of api statements is as follows.

{{< figure src="https://github.com/user-attachments/assets/1f235018-cf24-4776-b9c2-ebf476f5af99" caption="System Architecture" alt="System Architecture" >}}

### ✔️Frond-end

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Emotion-black?style=for-the-badge&labelColor=white">
<img src="https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
<img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/✋ react use gesture-%23CC342D.svg?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/webOS-a50034.svg?style=for-the-badge&logo=lg&logoColor=white">

### ✔️Back-end

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/>
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>

<br/><br>

# Getting Started

## Hardware Requirements

To implement this project, a client device and a host pc are required.

### Client Device

**Raspberry Pi 4 Model B 8GB**

**MicroSD Card with webOS OSE Image**

- You can get the pre-built image in [this GitHub address](https://github.com/webosose/build-webos/releases/tag/v2.24.0).
- You need to flash this image on a micro sd card.

**Monitor**

- The model we used is a 7-inch Raspberry Pi 1024x600 HDMI touchscreen LCD.

### Host PC

This is the **host pc specification** we used.

Hardware Specification

- CPU: intel i5-8400
- RAM: 8GB
- Storage: 512GB SSD

Software Specification

- OS: Arch Linux
- Node.js
- Yarn
- Git
- PostgreSQL
- webOS OSE Image (for raspberry pie)
- webOS CLI tool (@webos-tools/cli)

## How to run

First of all, I will explain the process from the back-end perspective.

### Clone the repository.

```sh
git clone https://github.com/KNU-LG/backend.git
```

### Server Setup

The project uses **Yarn 4.5.0** as its package manager, managed as a `.cjs` file in `.yarn/releases`. It requires Node.js version **18 or higher**, and has been tested with version **22.5.1**.

### Environment Variables

Before running the project, you need to create an `.env` file in the project root. An example `.env` file is provided as `example.env`. Below are the descriptions of the environment variables:

- **PORT**: Port number on which the server will run. Ensure proper port forwarding in your firewall or router.
- **DATABASE_URL**: URL for accessing the PostgreSQL database.
- **PASSWORD_ROUND**: Integer value used for password hashing. A value between 1 and 100 is recommended.
- **JWT_SECRET**: String used for generating JWT tokens. Use a secure and non-obvious value.
- **MAIL_USER**: The email address used for sending emails in the password recovery API.
- **MAIL_PASSWORD**: The password associated with the email account specified in `MAIL_USER`.

Example:

```
PORT=1234
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PASSWORD_ROUND=10
JWT_SECRET=your-secret-key-here
MAIL_USER=your-email@example.com
MAIL_PASSWORD=your-email-password
```

### Email Configuration

The `find_password` API works by sending emails. The following instructions explain how to configure a Gmail account:

<img width="351" alt="gmail-1" src="https://github.com/user-attachments/assets/6bdbcd6e-c4d3-48d3-a6b0-a44541f76a7a">

1. Log in to your Gmail account, click the gear icon at the top right, and select "See all settings."

<img width="504" alt="gmail-2" src="https://github.com/user-attachments/assets/2a80528c-a1a7-4c0e-b5f0-dbe2fcd8f9da">

2. Navigate to the **Forwarding and POP/IMAP** tab, enable IMAP access, and save the changes.

Set your Gmail address as the value for the `MAIL_USER` environment variable.

<img width="902" alt="gmail-3" src="https://github.com/user-attachments/assets/8f0e5f37-2083-4b3d-a708-1de94d470d3f">

3. Go to your Google Account settings and search for **App Passwords**. Generate an app password for Gmail. Copy the 16-character password and set it as the value for the `MAIL_PASSWORD` environment variable.

### Database Configuration

Ensure that the database is accessible using the `DATABASE_URL` environment variable. It is recommended to use Docker and Docker Compose for setting up PostgreSQL. Below is an example `docker-compose.yml` file for configuring the database:

```yml
services:
  db:
    image: postgres:17
    container_name: postgres
    restart: always
    ports:
      - "40001:5432"
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - ./data/postgres/:/var/lib/postgresql/data
```

- **image**: Specifies the PostgreSQL image version (17).
- **container_name**: The name of the container. You can set this to any value.
- **restart**: Ensures the container always restarts, even after a server reboot.
- **ports**: Maps the container’s PostgreSQL port (5432) to a port on the host machine.
- **environment**: Sets the environment variables for the PostgreSQL image, including the database password.
- **volumes**: Maps a local directory to the container’s PostgreSQL data directory.

For more details on the PostgreSQL Docker image, visit the [official documentation](https://hub.docker.com/_/postgres).

If you prefer not to use Docker, you can set up PostgreSQL locally, but the `DATABASE_URL` environment variable must still ensure proper connectivity.

### Install Project Dependencies

After completing all configurations, run the following command to install project dependencies:

```bash
$ yarn install
```

### Compile and Run the Project

Use one of the following commands to run the project. The server will use the port specified in the `PORT` environment variable.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## How to run frontend application

### Clone the repositroy

git clone https://github.com/KNU-LG/frontend.git

### Install node_modules

npm install

### Build the React app in Clone repository.

npm run build

When you build a React app, you can see the following file structure:

<img src="https://velog.velcdn.com/images/seung365/post/62a457c4-3425-4921-9ddc-a802fa417088/image.png">

You should put appinfo.json and icon.png in build file.
This is example of appinfo.json

```bash
{
  "id": "test",
  "version": "1.0.0",
  "vendor": "My Company",
  "type": "web",
  "main": "index.html",
  "title": "testapp",
  "icon": "icon.png",
  "requiredPermissions": [
  "time.query",
  "activity.operation"]
}
```

```bash
#Package the built app into an IPK file using the webOS CLI tool.
ares-package -n build
```

```bash
#Install the app onto the webOS emulator using the above command. After installation, run the app through the emulator.
ares-install your-app-name.ipk
```

### Raspberry Pi

```bash
- ensure that you already has some ipk file from repository build command.

ares-setup-devices

before command it, Check your device connected at same network. (I recommand just you can use mobile hospot)
```

<img width="642" alt="image" src="https://github.com/user-attachments/assets/812a4d48-75fb-431e-8b04-61f8c77c43b7">

```bash
manually add your device information.

ares-install app.ipk -d TARGET_DEVICE

TARGET_DEVICE is input value of Device Name at previous command.
```

# Contact

- [Organization](https://github.com/KNU-LG)
- [Frontend Repository](https://github.com/KNU-LG/frontend)
- [Backend Repository](https://github.com/KNU-LG/backend)

# License

This project is licensed under the MIT License. [MIT licensed](https://github.com/KNU-LG/backend/blob/main/LICENSE).
