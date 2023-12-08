---
title: Face Recognize Kiosk Using webOS
date: 2023-12-19
slug: face-recognize-kiosk-using-webos
posttype: solution
toc: true
thumbnail: th-face-recognize-kiosk.jpg
---

# KNU Capstone design project for the second semester of 2023

## Project Overview

### Background
Small-scale business owners often face financial constraints that make it challenging to afford expensive signage solutions. Therefore, there is a growing need for an affordable, open-source-based signage solution that can be easily implemented without the high costs associated with traditional signage products. This proposal aims to develop a user-customized kiosk that recognizes users to recommend menus and dynamically update menu lists.

### Project Objectives and Content
User Recognition:
- The kiosk will utilize a camera to identify users and check if they are returning visitors with previous visit and payment records.
- Images captured by the kiosk camera will be sent to an image recognition server for user identification.
- The server will verify if the recognized user is a returning visitor.
- In cases where user recognition is unsuccessful, an alternative authentication method will be provided.

Menu Recommendations and Reconfiguration through Web App:
- Real-Time Menu Recommendations and Reconfiguration through Web App:
- User data registration will be facilitated both at the kiosk and in the server's database.
- The web app will offer menu recommendations based on the user information.
- Menus will be dynamically altered based on user data (considering factors like allergies, etc.).
> Note: Payment processing is not included in the scope of this project.


## Hardware Specifications and Recommendations

### Development Environment Specifications
Our project was developed in an Apple Silicon environment, which provided us with advanced computing capabilities and efficiency. Here are the details:

- **Platform**: Apple Silicon (M1, M1 Pro, M1 Max, or later)
- **Operating System**: macOS Big Sur or later
- **Memory**: 8GB RAM or more
- **Storage**: 256GB SSD or higher

We recommend using a similar Apple Silicon-based environment for development to ensure compatibility and optimal performance.

## Hardware Requirements for Client Device

For setting up the client device in this project, you will need the following hardware components:

- **Raspberry Pi**: The core computing unit for the kiosk.
- **MicroSD Card with webOS Image**: Use a microSD card loaded with the webOS image to boot the Raspberry Pi. For this project, we have used the pre-built webOS OSE 2.24.0 image for Raspberry Pi 4, which can be downloaded from [here](https://github.com/webosose/build-webos/releases/tag/v2.24.0).
- **Touchscreen or Monitor**: A display unit to interact with the kiosk. A touchscreen is preferred for a more interactive experience.
- **Optional Input Devices**: Devices like a mouse and keyboard for initial setup and troubleshooting.
- **Power Supply and Cables**: A suitable power supply for the Raspberry Pi and screen, along with necessary cables such as HDMI for connectivity.

Ensure that you have all these components available before proceeding with the setup of your client device for the signage solution project.


> [webOS Offitial Docs](https://www.webosose.org/docs/guides/setup/system-requirements/)

### Flask Server and Database Environment Recommendations
For the server and database environment, it is crucial to consider the following setup for efficient model loading and data processing:

- **Unified FlaskServer-Database Setup**: We highly recommend that the server hosting the Flask application and the database should be on the same computer system. This approach significantly speeds up the loading of the "per-user trained model data", ensuring faster response times and efficient operations.


This configuration is recommended to minimize latency and maximize the efficiency of the data processing, especially when dealing with large, user-specific trained models.

### Additional Notes
- Ensure a stable internet connection for seamless data transfers and cloud-based operations.
- Regular backups and a consistent power supply are recommended for data protection.


## Face Recognition Server START Guide

This guide provides step-by-step instructions for setting up and running the face recognition server as part of the signage solution project. Follow these steps to ensure the server is configured and operational.

### Step 1: Navigate to the Flask Directory<br/>
First, navigate to the Flask directory in the project root. Use the following command:

```plaintext
$ cd signage_solution/flask
```
### Step 2: Verify Python Installation<br/>
Check if Python 3.9 is installed by running:
```plaintext
$ python3.9 -V
```

If Python 3.9 is not installed, you can install it using Homebrew on MacOS or download it from the Python website for Windows users:<br/>
For MacOS:
```plaintext
$ brew install python@3.9
```
For Windows:<br/>
- Download the Python 3.9 installer from the [official Python website](https://www.python.org/downloads/).
- Run the installer and follow the prompts to install Python 3.9.


### Step 3: Set Up a Virtual Environment
After installing Python 3.9, go back to `/signage_solution/flask` directory and set up a virtual environment named `env` using:

```plaintext
$ python3.9 -m venv env
```
Verify that the `env` folder has been created in the current directory.

### Step 4: Activate the Virtual Environment
Activate the virtual environment with the following command:<br/>
For MacOS/Linux:
```plaintext
$ source env/bin/activate
```
For Windows:
```plaintext
$ env\Scripts\activate
```
### Step 5: Install Dependencies
While in the virtual environment and in the flask directory, install the required dependencies:

```Plain text
$ pip install -r requirements.txt
```
### Step 6: Create the .env File

Create a `.env` file in the `/flask` directory. This file will store environment-specific variables, which are essential for configuring the server settings.

Here is an example of what the contents of the `.env` file might look like:

```plaintext
user=<database username> e.g. root
password=<database password> e.g. pass
host=<database host> e.g. localhost
database_name=<database name> e.g. kioskDB
sql_file_path=<path to SQL file> e.g. ./db.sql
korean_font_path=<path to Korean font file> e.g. /System/Library/Fonts/AppleSDGothicNeo.ttc
```
### Step 7: Start the Flask Authentication Server
Run the Flask app with the following command to start the authentication server:

```plaintext
$ python app.py
```

Exiting the Virtual Environment
To deactivate the virtual environment when you're finished, simply run:

```plaintext
$ deactivate
```


## **NodeJS Server for Basic Setup Kiosk-API Guide**

### Step 1: Navigate to the NODEJS Directory

```plaintext
$ cd signage_solution/nodejs
```

### Step 2: **Install npm Modules**

Install the necessary npm modules to run the project.

```plaintext
$ npm i
```

### Step 3: **Create .env File**

Create a **`.env`** file in the nodejs project's root directory and configure the database connection information, admin password, and port number.

```plaintext
DATABASE_URL="mysql://<database username e.g. root>:<database password e.g. 8246>@<database host e.g. localhost>:3306/<database name e.g. kioskDB>"
PORT=(the number what you want)
```

### Step 4: **Create Database**

To create a database, open MySQL Shell and execute the following code.

```plaintext
CREATE DATABASE <database name> e.g. kioskDB;
```

### Step 5: **Migrate Tables**

Execute the migration to create database tables in mysql database.

```plaintext
$ npx prisma migrate dev
```

### Step 6: **Generate Dummy Data**

Generate dummy data for testing using the following command.

```plaintext
$ npm run seed
```

If successful, the following message will be displayed:

```plaintext
Connected
Success
```

### Step 7: **Run the Program**

To run the program, use the following command.

```plaintext
$ npm run start
```

If successful, you should see a message similar to the following:

```plaintext
Server is running on port {port}.
Connected
```
## **Basic Setup Client**

Before starting the setup process, ensure the following requirements are met:

- **Raspberry Pi Setup**: You should have a Raspberry Pi that successfully boots with the webOS OSE image.
- **Network Connection**: The Raspberry Pi and your local PC must be connected to the same network. This connection is essential for the setup process using the webOS OSE CLI from your local PC.
- **Node.js on Local PC**: Node.js must be installed on your local PC as it is required to run the webOS OSE CLI. 

### Setting Up Node.js on Your Local PC

If you haven't installed Node.js on your local PC, please complete the installation of Node.js.
Once installed, verify the installation by running `node -v` in your command line or terminal. This will display the installed version of Node.js.

### Installing the webOS OSE CLI

After setting up Node.js, install the webOS OSE CLI by executing the following command:

```plaintext
$ npm install -g @webosose/ares-cli
```
### Verify webOS OSE CLI Installation

After installing the webOS OSE CLI, you can verify its installation by running:

```plaintext
$ ares
```
This command will display a list of available ares commands, confirming that the webOS OSE CLI is correctly installed.

### Device Setup Process
To set up a new device for development, use the ares-setup-device command. This will guide you through the process of registering and configuring a new device for your development environment:

```plaintext
$ ares-setup-device
```

### Check Installed Devices
To verify the devices that are already set up, use the following command:
```bash
$ ares-install -D
```
This will list all the devices that have been set up and are ready for development.

Follow the on-screen prompts to complete the setup of your device.

### Deployment Script: deploy.sh

Before running the `deploy.sh` script, ensure you are in the react project's root directory, which is the parent directory where the `build` will be created. The `deploy.sh` script automates the building and deploying process of the project.

#### Requirements
- The `deploy.sh` script should be located in the react project's root directory.
- An `icon.png` file should also be placed in the react project's root directory.
- Raspberry Pi with webOS set must be powered on
- The local PC (from which you are deploying) and the Raspberry Pi must be connected to the same network for successful deployment.

#### deploy.sh Script

The `deploy.sh` script performs the following actions:
- Removes existing build and IPK directories.
- Creates a new build of the react project.
- Generates the `appinfo.json` file and copies the `icon.png` file into the build directory.
- Packages the application into an IPK file.
- Installs and launches the app on the specified device.

```bash
#!/bin/bash

# Remove build file.
rm -rf build

# Remove IPK file.
rm -rf IPK

# Build the project
npm run build

# Change to the build directory
cd build

# Create appinfo.json and add content
printf '{\n "id": "kr.ac.knu.app.signage",\n "version": "1.0.0",\n "vendor": "My Company",\n "type": "web",\n "main": "index.html",\n "title": "new app",\n "icon": "icon.png",\n "requiredPermissions": [ "time.query", "activity.operation" ]\n}' > appinfo.json

# Copy the icon.png file
cp ../icon.png icon.png

# Package the application
ares-package . -o ../IPK

# Change to the IPK directory
cd ../IPK

# Remove existing installation
ares-install -d jongmal -r kr.ac.knu.app.signage

# Install the new package
ares-install -d jongmal kr.ac.knu.app.signage_1.0.0_all.ipk

# Launch the app
ares-launch -d jongmal kr.ac.knu.app.signage

# Open inspector
ares-inspect -d jongmal --app kr.ac.knu.app.signage

# Change directory
cd ..
```

### Setting Execution Permission
After creating the deploy.sh script, change its execution permission with the following command:

```plaintext
$ chmod +x deploy.sh
```
To deploy your project, execute the deploy.sh script from the project's root directory:

```plaintext
$ ./deploy.sh
```
This script simplifies the deployment process, ensuring that your application is built, packaged, and deployed efficiently to your target device.



# **Recommendation Algorithm and Testing**

## **Algorithm Overview**

In this project, collaborative user filtering is utilized. The algorithm measures the similarity of order histories among users to select N similar users. It then analyzes the order histories of these N users to recommend the most frequently ordered menu items. The algorithm primarily employs cosine similarity to measure the similarity between users and selects the recommendation target based on this similarity.

## **Algorithm Flow**

1. **Measuring User Similarity**: Pairing all users in the database and calculating cosine similarity to select N users with similar order histories.
2. **Recruiting Similar Users**: Using cosine similarity as a criterion, selecting the top N users with the highest similarity.
3. **Order History Analysis**: Summarizing the order histories of the selected N users and calculating the frequency of each menu item.
4. **Selecting Recommended Menu**: Choosing the menu item with the highest frequency as the recommended item.

## **Testing Method**

Testing focuses on using dummy data to verify the accuracy and efficiency of the algorithm. Multiple tests are conducted to ensure that the expected results are achieved. Necessary measures are taken to improve the algorithm's performance based on the test results.

### **Test Data Example:**

- A: Ordered 5 bowls of ramen
- B: Ordered 5 bowls of ramen, 3 pork cutlets
- C: Ordered 5 bowls of ramen, 10 cheese pork cutlets (highest order frequency)
- D: Ordered 5 bowls of ramen, 2 rice cakes in spicy sauce
- E: Ordered 5 rolls of gimbap

### **Test Configuration:**

- Set N=3 to select the top 3 users with the highest similarity.
- Combine the order histories of selected users B, C, D to recommend the most frequently ordered menu.

## **Expected Results**

The anticipated results from the test are as follows:

- Similar Users: B, C, D
- Combined Order History: 15 bowls of ramen, 3 pork cutlets, 10 cheese pork cutlets, 2 rice cakes in spicy sauce, 5 rolls of gimbap
- Recommended Menu: Cheese Pork Cutlets (most frequently ordered)

If the results align with expectations, it confirms the accuracy of the algorithm.

## **Future Improvements**

If any performance issues or accuracy concerns are identified during testing, efforts will be made to address those areas and enhance the algorithm for better efficiency and accuracy.

