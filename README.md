# Idle View App for webOS Devices

## Overview of Project

This project develops a **Personalized IdleView application** for webOS, designed to provide users with tailored information during idle screen states. By leveraging minimal power, the application enhances energy efficiency and ensures consistent delivery of real-time, customizable content.

### Key Features

- **Customizable Dashboards and Widgets**
  Users can configure dashboards with widgets for weather updates, schedules, and media playback.

- **Seamless Integration**
  A user-friendly interface and backend systems powered by Node.js, MySQL, and REST APIs support personalization and data management.

- **Real-Time Information Updates**
  The system dynamically displays weather using secure HTTPS communications.

---

## Hardware Requirements

To set up this project, you need a **target device** and **host PC**.

### Target Device

You need a Raspberry Pi 4 with webOS OSE as the target device.

| Hardware                        | Description                                                                                              |
|---------------------------------|----------------------------------------------------------------------------------------------------------|
| **Raspberry Pi 4 Model B (8GB)** | The core computing unit for the application.                                                             |
| **MicroSD Card with webOS OSE Image** | A MicroSD for flashing webOS OSE. <br> - webOS OSE 2.24.0 is used in this project. You can get the pre-built image in [webOS OSE GitHub](https://github.com/webosose/build-webos/releases/tag/v2.26.0). <br> - To install a webOS OSE image on a MicroSD card, use the following guide: [Flashing webOS OSE](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/). |
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
   DATABASE_URL="mysql://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:3306/<DB_NAME>"
   JWT_SECRET=awjdlksejnlsdjgslgang/4ksjfskdvn= # Replace with any random secure string
   WEATHER_API_KEY=4c4c552d80ea31da2d4e01e48bc04a61 # Obtain your API key from a weather API provider

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
