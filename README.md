# Idle View App for webOS Devices

## Overview of Project

This project develops a **Personalized IdleView application** for webOS, designed to provide users with tailored information during idle screen states. By leveraging minimal power, the application enhances energy efficiency and ensures consistent delivery of real-time, customizable content.

### Key Features

- **Customizable Dashboards and Widgets**  
  Users can configure dashboards with widgets for weather updates, schedules, and media playback.

- **Seamless Integration**  
  A user-friendly interface and backend systems powered by Node.js, MySQL, and REST APIs support personalization and data management.

- **Real-Time Information Updates**  
  The system securely retrieves and displays real-time weather updates via HTTPS communication.

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

Our team developed this project using a Windows environment. However, the project can be set up and executed on other operating systems such as Linux or macOS. The following are the general specifications and software requirements for the host PC:

- **Operating System**: Windows, Linux, or macOS (tested on Windows 10)
- **CPU**: No specific requirements (standard modern CPUs are sufficient)
- **Memory**: 4GB or more
- **Storage**: At least 256GB of available space

---

## Software Requirements

- **Node.js**: Required for running the backend server and webOS OSE CLI.
- **MySQL**: Database management system used in the project.
- **Prisma ORM**: Used for data modeling and database interactions.

---

## Project Setup

1. **Clone the repository.**
   ```sh
   git clone <repository_url>
   cd backend
   ```

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

### React Application Setup

#### Setting Up Node.js on Your Local PC

1. **Install Node.js on your local PC. Verify the installation:**
   ```sh
   node -v
   ```
   This will display the installed version of Node.js.
2. **Navigate to the React project’s root directory:**
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

### Deployment to webOS

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
2. **Deploy the React application:**
   ```sh
   ./deploy.sh {DEVICE_NAME} {APP_ID} {APP_VERSION} {VENDOR_NAME} {APP_TITLE}
   ```
   Example:
   ```sh
   ./deploy.sh raspberrypi com.example.idleview 1.0.0 "MyCompany" "Idle View App"
   ```
   The script automates the following:
   - Builds the React project.
   - Packages the application into an `.ipk` file.
   - Installs the application on the webOS device.

#### Running the Application on webOS

1. Access the webOS application launcher on your Raspberry Pi.
2. Launch the Idle View app.
3. Verify real-time communication with the backend server.

---

### Additional Notes for Packaging and Installing Apps

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

#### Packaging and Installing the App

1. **Package the app into an `.ipk` file:**
   ```sh
   ares-package <PATH TO YOUR APP>
   ```
   Example:
   ```sh
   ares-package ./sampleApp
   ```
2. **Install the `.ipk` file on the target device:**
   ```sh
   ares-install -d <TARGET DEVICE> <IPK FILE>
   ```
   Example:
   ```sh
   ares-install -d raspberrypi com.domain.app_1.0.0_all.ipk
   ```

3. **Run the app from the webOS launcher.**

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

3. **Frontend/src/components/Service

