---
title: Idle View App for webOS Devices
date: 2024-12-26
slug: idle-view-app
posttype: app
toc: true
thumbnail: th-idle-view-app.png
---

**Author: Kangin Lee, Seungjin Kim, Tutku Genis**

# Idle View App for webOS Devices


## Overview of Project

**The Personalized IdleView Application** for webOS aims to revolutionize idle screen functionality by delivering meaningful, real-time information tailored to each user. Designed with energy efficiency as main principle, this app minimizes power consumption while ensuring consistent delivery of real-time, customizable content.

<p align="center"> <img src="https://github.com/gangin0221/website/blob/main/dashboard_heritage_red.png?raw=true" alt="alt text" /> </p>

<p align="center">
  <img src="https://github.com/gangin0221/website/blob/main/brightness_control_settings.png?raw=true" alt="Image 1" width="49%" />
  <img src="https://github.com/gangin0221/website/blob/main/background_change_widget.png?raw=true" alt="Image 2" width="49%" />
</p>
                                                                            


### Key Features
This section highlights the core functionalities of the IdleView project.

- **Customizable Dashboards and Widgets**  
  Users can personalize their IdleView screen with widgets for weather updates, calendar schedules, media playback, and more.
  <p align="center"> <img src="https://github.com/gangin0221/website/blob/main/dashboard_heritage_red.png?raw=true" alt="Customizable Dashboard" width="100%" /> </p> <p align="center"> <small>*Example of a customizable dashboard with various widgets.*</small> </p>

- **Seamless Integration**  
  A user-friendly interface and backend systems powered by Node.js, MySQL, and REST APIs support personalization and data management.
  <p align="center"> <img src="https://github.com/gangin0221/website/blob/main/Integration%20Diagram.png?raw=true" alt="Integration Diagram" width="100%" /> </p> <p align="center"> <small>*Diagram showcasing the seamless integration between the frontend, backend, and database systems.*</small> </p>

- **Real-Time Information Updates**  
  The system securely retrieves and displays real-time weather updates via HTTPS communication.
  <p align="center"> <img src="https://github.com/gangin0221/website/blob/main/weather_widget.png?raw=true" alt="Weather Updates" width="100%" /> </p> <p align="center"> <small>*Real-time weather widget displaying current conditions.* </small></p>



## Tech Stack
This section outlines the core technologies and libraries used in the project, categorized into frontend, backend, and database.

### Frontend
| Technology               | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Runtime environment for executing JavaScript outside the browser.                         |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | A strongly typed programming language that builds on JavaScript.                          |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)          | Fast build tool for modern web development.                                               |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)       | JavaScript library for building user interfaces.                                          |

### Frontend Libraries
| Library                  | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| ![React-Router-Dom](https://img.shields.io/badge/-React--Router--Dom-CA4245?logo=react&logoColor=white) | Library for routing and navigation in React apps.                                         |
| ![Styled-Components](https://img.shields.io/badge/-Styled--Components-DB7093?logo=styled-components&logoColor=white) | Library for writing CSS in JavaScript.                                                   |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white)       | Library for making HTTP requests.                                                        |

### Backend
| Technology               | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Runtime environment for backend development.                                              |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Enhances JavaScript for type-safe backend development.                                    |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Fast and lightweight web application framework for Node.js.                              |

### Backend Libraries
| Library                  | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white) | Modern ORM for Node.js and TypeScript to manage database access.                         |

### Database
| Technology               | Description                                                                                           |
|--------------------------|-------------------------------------------------------------------------------------------------------|
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)     | Relational database management system for structured data storage.                      |


---

## Hardware Requirements

To set up this project, you need a **target device** and **host PC**.

### Target Device

You need a Raspberry Pi 4 with webOS OSE as the target device.

| Hardware                        | Description                                                                                              |
|---------------------------------|----------------------------------------------------------------------------------------------------------|
| **Raspberry Pi 4 Model B (8GB)** | The core computing unit for the application.                                                             |
| **MicroSD Card with webOS OSE Image** | A MicroSD for flashing webOS OSE. <br> - webOS OSE 2.24.0 is used in this project. You can get the pre-built image in [webOS OSE GitHub](https://github.com/webosose/build-webos/releases/tag/v2.24.0). <br> - To install a webOS OSE image on a MicroSD card, use the following guide: [Flashing webOS OSE](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/). |
| **Touchscreen or Monitor**      | The display device that interacts with the application. We recommend using a touchscreen for a more interactive experience. |

### Host PC

This project is developed using a Windows environment and it can be easily set up and executed on other operating systems such as Linux or macOS. Below are the general specifications and software requirements for the host PC:

- **Operating System**: Windows, Linux, or macOS (tested on Windows 10)
- **CPU**: No specific requirements (standard modern CPUs are sufficient)
- **Memory**: 4GB or more
- **Storage**: At least 256GB of available space

---

## Software Requirements
This section outlines the essential software required for the project.

- **Node.js**: Required for running the backend server and webOS OSE CLI.
- **MySQL**: Database management system used in the project.
- **Prisma ORM**: Used for data modeling and database interactions.

## Version Dependencies in the Project
This section outlines the essential version dependencies required for the project.
### Frontend Dependencies
| Dependency Name       | Current Version | Required/Peer Version(s)     | Notes                          |
|------------------------|-----------------|------------------------------|--------------------------------|
| `react`               | ^18.3.1         | Compatible with React ^18.x  | Core library for UI rendering.|
| `react-dom`           | ^18.3.1         | Matches React version ^18.x  | Required for React rendering. |
| `vite`                | ^5.4.9          | Node.js >=16.0               | Bundler; needs Node.js v16+.  |
| `tailwindcss`         | ^3.4.14         | Works with PostCSS ^8.4      | Styling framework.            |
| `vite-plugin-svgr`    | ^4.3.0          | Compatible with Vite ^5.x    | For SVG imports as components.|

### Backend Dependencies
| Dependency Name       | Current Version | Required/Peer Version(s)        | Notes                          |
|------------------------|-----------------|---------------------------------|--------------------------------|
| `prisma`              | ^5.21.1         | Node.js >=16.x, `@prisma/client` must match | ORM for database.             |
| `express`             | ^4.21.1         | Works with Node.js >=12.x      | Backend framework.            |
| `jsonwebtoken`        | ^9.0.2          | Requires `bcryptjs` for hashing| For authentication.           |
| `mysql2`              | ^3.11.3         | Works with MySQL >=8.x         | Database connector.           |


## Project Setup
This section provides a step-by-step guide to setting up the IdleView project, covering both backend and frontend configurations.

### General Setup
1. **Clone the repository.**
   ```sh
   git clone https://github.com/seangolden11/Idle-View-team7.git
   cd Idle-View-team7
   ```

#### Repository Structure

The repository is organized into several directories, each serving a specific purpose:

- **backend**: Contains the server-side code and related resources for the project.
- **frontend**: Houses the client-side code, including the user interface components and associated assets.

Additionally, there are files in the root directory:
- **.gitattributes**: Defines attributes for pathnames to customize repository behaviors, such as end-of-line handling.
- **.gitignore**: Specifies files and directories to be ignored by Git, preventing them from being tracked.
- **README.md**: Provides an overview of the project, including setup instructions and usage guidelines.

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create `.env` file:**
   Create an `.env` file in the backend directory and configure the environment variables. Example `.env` file content:
   ```plaintext
   DATABASE_URL="mysql://root:password@localhost:3306/idleview"
   JWT_SECRET=awjdlksejnlsdjgslgang/4ksjfskdvn= # Replace with any random secure string
   WEATHER_API_KEY=4c4c552d80ea31da2d4e01e48bc04a61 # Obtain your API key from a weather API provider
   ```
#### Configuration Values Explanation

- **`DATABASE_URL`**
  - **Purpose**: Connects to the database.
  - **Example**: `mysql://root:password@localhost:3306/idleview`
  - **What to Set**: Update with your database type, username, password, host, port, and database name.

- **`JWT_SECRET`**
  - **Purpose**: A secret key for securing authentication tokens (JWTs).
  - **Example**: `awjdlksejnlsdjgslgang/4ksjfskdvn=`
  - **What to Set**: Replace with a random, secure string unique to your environment.

- **`WEATHER_API_KEY`**
  - **Purpose**: Accesses weather data from a weather API provider.
  - **Example**: `4c4c552d80ea31da2d4e01e48bc04a61`
  - **What to Set**: Get your API key from a weather service and use it here. You can find more information on how to obtain the key from [OpenWeatherMap's API documentation](https://openweathermap.org/current#name).


4. **Run database migrations:**
   ```sh
   npx prisma migrate dev
   ```
5. **Seed the database with dummy data (optional):**
   ```sh
   npm run seed
   ```
6. **Start the backend server:**
   ```sh
   npm run start
   ```
   The server should start on the specified port (default: 4000).

### Frontend Setup

#### Setting Up Node.js on Your Local PC

1. **Install Node.js on your local PC. Verify the installation:**
   ```sh
   node -v
   ```
   This will display the installed version of Node.js.
2. **Navigate to the project’s root directory:**
   ```sh
   cd frontend
   ```

#### Configuring Server Addresses with Vite

To ensure proper communication between the client and servers, configure the proxy settings in the `vite.config.ts` file.

1. Open the `vite.config.ts` file in the React project directory.
2. Add or modify the `server.proxy` section to point to your backend server:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': 'http://localhost:4000', // Replace with your backend server address if different
       },
     },
     base: './',
   });
   ```

#### Local Development

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Deployment to webOS

Before starting the deployment process, ensure the following:

- **webOS OSE CLI:** Install the CLI for deploying and managing webOS applications:
  ```sh
  npm install -g @webosose/ares-cli
  ```
- **Set up the webOS device:** Use the following command to register your Raspberry Pi:
  ```sh
  ares-setup-device
  ```

#### Deployment Script: `deploy.sh`

1. **Ensure the script is executable:**
   ```sh
   chmod +x deploy.sh
   ```
2. **Deploy the application:**
   ```sh
   ./deploy.sh {DEVICE_NAME} {APP_ID} {APP_VERSION} {VENDOR_NAME} {APP_TITLE}
   ```
   Example:
   ```sh
   ./deploy.sh raspberrypi com.example.idleview 1.0.0 "MyCompany" "Idle View App"
   ```
   The script automates the following:
   - Builds the project.
   - Packages the application into an `.ipk` file.
   - Installs the application on the webOS device.

#### Running the Application on webOS

1. Access the webOS application launcher on your Raspberry Pi.
2. Launch the Idle View app.
3. Verify real-time communication with the backend server.

---

## Additional Notes for Packaging and Installing Apps

#### Creating a Dummy App for Deployment

1. **Generate a dummy app using `ares-generate`:**
   ```sh
   ares-generate -t webapp <YOUR APP NAME>
   ```
   Example:
   ```sh
   ares-generate -t webapp sampleApp
   ```
2. **Update `appinfo.json` in the dummy app directory:**
   Add the following fields to enable additional permissions:
   ```json
   {
     "allowVideoCapture": true,
     "allowAudioCapture": true,
     "enableWebOSVDA": true
   }
   ```
3. **Build the frontend project:**
   ```sh
   npm run build
   ```
4. **Copy the build files to the dummy app directory.**

Follow the official [WebOS Guide](https://www.webosose.org/docs/tutorials/web-apps/developing-downloadable-web-apps/#step-01-creating-a-dummy-app) for detailed steps.

#### Packaging and Installing the App

1. **Package the app into an `.ipk` file with a JS Service:**
   ```sh
   ares-package <PATH TO YOUR APP> <PATH TO YOUR SERVICE>
   ```
   Example:
   ```sh
   ares-package ./sampleApp ./sampleService
   ```
   If the command succeeds, an `.ipk` file will be generated under the current directory.
2. **Install the `.ipk` file on the target device:**
   ```sh
   ares-install -d <TARGET DEVICE> <IPK FILE>
   ```
   Example:
   ```sh
   ares-install -d raspberrypi com.domain.app_1.0.0_all.ipk
   ```

3. **Run the app from the webOS launcher.**
   ```sh
   ares-launch -d raspberrypi com.domain.app
   ```

Follow the official [WebOS  JS Services Guide](https://www.webosose.org/docs/tutorials/js-services/developing-downloadable-js-services/#step-02-packaging-the-service) for detailed steps.

## Code Implementation

The Idle View application leverages a modular architecture to manage services, widgets, and backend communication. Below is a detailed description of key code components and their functionality.

---

### **Backend Code: Server Implementation**

The backend server is built using Node.js and Express, facilitating secure and efficient communication between the frontend and external APIs. Below are the key endpoints:

1. **`GET /widget/weather`**  
   Fetches weather data using the OpenWeather API.  
   Example request:
   ```http
   GET /widget/weather?location=Seoul
   Authorization: Bearer <TOKEN>
   ```
   Implementation:
   ```typescript
   app.get("/widget/weather", authenticateToken, async (req, res) => {
     try {
       const { location } = req.query;
       const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
       const response = await axios.get(weatherApiUrl, {
         params: { q: location, appid: process.env.WEATHER_API_KEY, units: "metric" },
       });
       res.json(response.data);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

2. **`POST /login`**  
   Authenticates users and returns a JWT token.  
   Implementation:
   ```typescript
   app.post("/login", async (req, res) => {
     const { username, password } = req.body;
     // Authentication logic
     const token = generateJwtToken(userDetails);
     res.json({ token });
   });
   ```

---

### **Frontend Code: Service and Component Integration**

1. **Service Registration (`service.js`)**  
   Handles backend communication via webOS Luna services.  
   Example:
   ```javascript
   const service = new Service(pkgInfo.name);
   service.register("fetchWeatherData", async (message) => {
     const { location } = message.payload;
     const response = await get(`${BASE_URL}/widget/weather`, {
       params: { location },
       headers: { Authorization: `Bearer ${token}` },
     });
     message.respond({ returnValue: true, data: response.data });
   });
   ```

2. **Frontend/src/components/ServiceFunction/serviceFunction.js**  
   Provides functions for interacting with webOS services from the frontend.  
   - **`fetchWeatherData(location)`**: Fetches weather data by calling the `fetchWeatherData` service.  
     Example:
     ```javascript
     export function fetchWeatherData(location) {
       return new Promise((resolve, reject) => {
         const serviceURI = "luna://com.idleview.app.service/fetchWeatherData";
         const params = JSON.stringify({ location });
         bridge.onservicecallback = (response) => {
           const parsedResponse = JSON.parse(response);
           if (parsedResponse.returnValue) {
             resolve(parsedResponse.data);
           } else {
             reject(parsedResponse.errorText);
           }
         };
         bridge.call(serviceURI, params);
       });
     }
     ```
   - **`setToken(token)`**: Stores an authentication token using the `setToken` service.  
     Example:
     ```javascript
     export function setToken(token) {
       return new Promise((resolve, reject) => {
         const serviceURI = "luna://com.idleview.app.service/setToken";
         const params = JSON.stringify({ token });
         bridge.onservicecallback = (response) => {
           const parsedResponse = JSON.parse(response);
           if (parsedResponse.returnValue) {
             resolve(parsedResponse.token);
           } else {
             reject(parsedResponse.errorText);
           }
         };
         bridge.call(serviceURI, params);
       });
     }
     ```

## Contact
- **[게니시툿쿠 (ttkgns)](https://github.com/ttkgns)** : [genistutku@gmail.com](mailto:genistutku@gmail.com)  
- **[이강인 (gangin0221)](https://github.com/gangin0221)** : [gangin0221@gmail.com](mailto:gangin0221@gmail.com)  
- **[김승진 (seangolden11)](https://github.com/seangolden11)** : [seangolden11111@gmail.com](mailto:seangolden11111@gmail.com)
