---
title: Face Recognize Kiosk Using webOS
date: 2023-12-19
slug: face-recognize-kiosk-using-webos
posttype: solution
toc: true
thumbnail: th-face-recognize-kiosk.jpg
---

**Author: Jaeduck Oh**

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
- **MicroSD Card with webOS Image**: Use a microSD card loaded with the webOS image to boot the Raspberry Pi. For this project, we have used the pre-built webOS OSE 2.24.0 image for Raspberry Pi 4, which can be downloaded from [here](https://github.com/webosose/build-webos/releases/tag/v2.24.0). Additionally, if you need guidance on flashing the webOS Open Source Edition to your microSD card, please refer to [this guide](#링크주소) for detailed instructions.
- **Touchscreen or Monitor**: A display unit to interact with the kiosk. A touchscreen is preferred for a more interactive experience.
- **Webcam**: An essential component for facial recognition or other interactive features. Ensure compatibility with the Raspberry Pi.
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
### Step 7: **Terminate Seed Command**

After successfully generating dummy data using the `npm run seed` command, you may need to terminate the seed command to proceed with other tasks or steps. Follow the step below to gracefully stop the running process:


### Terminate Seed Command:

In your command-line interface where the seed command is running, press `Ctrl + C`.

```bash
$ Ctrl + C
```

### Step 8: **Run the Program**

To run the program, use the following command.

```plaintext
$ npm run start
```

If successful, you should see a message similar to the following:

```plaintext
Server is running on port {port}.
Connected
```

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





## **Basic Setup Client With React**

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
![ares-setup-device-1](/images/samples/solutions/face-recognize-kiosk/ares-setup-device-1.png)
![ares-setup-device-2](/images/samples/solutions/face-recognize-kiosk/ares-setup-device-2.png)
![ares-setup-device-3](/images/samples/solutions/face-recognize-kiosk/ares-setup-device-3.png)
### Check Installed Devices
To verify the devices that are already set up, use the following command:
```bash
$ ares-install -D
```
This will list all the devices that have been set up and are ready for development.

Follow the on-screen prompts to complete the setup of your device.

### Navigate to the React Directory
Move to react project's root directory
```plaintext
$ cd signage_solution/react_signage
```

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
# bash 자동화 스크립트 실행 전, 디렉토리는 build를 생성할 상위 디렉토리이어야 한다.
# deploy.sh는 프로젝트 디렉토리에서 실행해야 한다.

# Remove build file.
rm -rf build

# Remove IPK file.
rm -rf IPK

# Build the project
npm run build

# Change to the build directory
cd build

# Create appinfo.json and add content
printf '{\n "id": "kr.ac.knu.app.signage",\n "version": "1.0.0",\n "vendor": "My Company",\n "type": "web",\n "main": "index.html",\n "title": "new app",\n "icon": "icon.png",\n "allowVideoCapture": true,\n "requiredPermissions": [ "time.query", "activity.operation" ]\n}' > appinfo.json

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
ares-inspect -d jongmal —app kr.ac.knu.app.signage

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

In this project, collaborative user filtering is utilized. The algorithm measures the similarity of order histories among users to select N similar users. It then analyzes the order histories of these N users to recommend the most frequently ordered menu items. The algorithm primarily employs jaccard similarity to measure the similarity between users and selects the recommendation target based on this similarity.

## **Algorithm Flow**

1. **Measuring User Similarity**: Pairing all users in the database and calculating jaccard similarity to select N users with similar order histories.
2. **Recruiting Similar Users**: Using cosin jaccard similarity as a criterion, selecting the top N users with the highest similarity.
3. **Order History Analysis**: Summarizing the order histories of the selected N users and calculating the frequency of each menu item.
4. **Selecting Recommended Menu**: Choosing the menu item with the highest frequency as the recommended item.

## **recommend.js**

```plaintext
function JaccardSimilarity(targetUserOrders, userOrders) {
  // Extracting menuID values and creating new sets
  const set1 = new Set(targetUserOrders.map(order => order.menuID));
  const set2 = new Set(userOrders.menuIDList.map(order => order.menuID));

  // Calculating intersection and union sets
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  // Calculating sizes of intersection and union sets
  const intersectionSize = intersection.size;
  const unionSize = union.size;

  // Calculating and returning Jaccard similarity coefficient
  return unionSize === 0 ? 0 : intersectionSize / unionSize;
}
```

<br/>
The JaccardSimilarity function calculates the Jaccard similarity coefficient between two sets of menuIDs representing user orders. This coefficient is a measure of similarity between two sets and is defined as the size of the intersection of the sets divided by the size of their union.
<br/><br/>

```plaintext
/**
 * Asynchronous function to retrieve the most ordered menu among the menus ordered by top similar users.
 *
 * @param {Array} topSimilarUsers - An array of objects representing the top similar users.
 * @param {Array} targetUserOrders - An array of objects representing menu orders for the target user.
 * @returns {Object} - An object containing the most ordered menuID.
 */
async function getMostOrderedMenu(topSimilarUsers, targetUserOrders) {
  const menuFrequency = new Map();

  // Iterating through the top similar users
  for (const similarUser of topSimilarUsers) {
    // Retrieving menu orders for the current similar user
    const userMenus = await prisma.menuOrderInfo.findMany({
      where: {
        userID: similarUser.userId,
      },
      select: {
        menuID: true,
      },
    });

    // Updating menu frequency based on the orders of the current similar user
    userMenus.forEach(menu => {
      // Checking if the menu is not present in the target user's orders
      if (!targetUserOrders.some(order => order.menuID === menu.menuID)) {
        const currentCount = menuFrequency.get(menu.menuID) || 0;
        menuFrequency.set(menu.menuID, currentCount + 1);
      }
    });
  }

  // Finding the menu with the highest frequency
  let mostOrderedMenu = null;
  let maxFrequency = 0;

  menuFrequency.forEach((count, menuID) => {
    if (count > maxFrequency) {
      mostOrderedMenu = { menuID };
      maxFrequency = count;
    }
  });

  return mostOrderedMenu;
}
```
<br/>

<br/>
The getMostOrderedMenu function aims to identify the menu that is most frequently ordered among the menus ordered by users who are considered the most similar to the target user. The function takes a list of top similar users and the target user's orders as input, and it utilizes a Map to track the frequency of each menu across the similar users' orders.
<br/><br/>


```plaintext
/**
 * Asynchronous function to recommend a menu for a target user based on the orders of other users.
 *
 * @param {string} targetUserId - The ID of the target user.
 * @param {number} N - The number of top similar users to consider.
 * @returns {Object} - An object containing the menuID of the recommended menu.
 */
async function recommendMenuForUser(targetUserId, N) {
  // Retrieving orders of the target user
  const targetUserOrders = await prisma.menuOrderInfo.findMany({
    where: {
      userID: targetUserId,
    },
    select: {
      menuID: true,
    },
  });

  // Retrieving orders of all users
  const usersMenuOrders = await prisma.menuOrderInfo.findMany({
    select: {
      user: {
        select: {
          user_id: true,
        },
      },
      menu: {
        select: {
          menu_id: true,
        },
      },
    },
  });

  // Creating a structure to store all users' orders
  const allUsersOrders = usersMenuOrders.reduce((result, order) => {
    const userId = order.user.user_id;
    const menuId = order.menu.menu_id;

    const existingUser = result.find(user => user.userId === userId);

    if (existingUser) {
      existingUser.menuIDList.push({
        menuID: menuId,
      });
    } else {
      result.push({
        userId,
        menuIDList: [{
          menuID: menuId,
        }],
      });
    }
    return result;
  }, []);

  // Measuring similarity between the target user and other users
  const similarUsers = [];

  for (const userOrders of allUsersOrders) {
    const similarity = JaccardSimilarity(targetUserOrders, userOrders);
    similarUsers.push({ userId: userOrders.userId, similarity });
  }

  // Sorting users based on similarity in descending order
  similarUsers.sort((a, b) => b.similarity - a.similarity);

  // Retrieving the top N similar users
  const topSimilarUsers = similarUsers.slice(0, N);

  // Selecting the most ordered menu among the top similar users
  const mostOrderedMenu = await getMostOrderedMenu(topSimilarUsers, targetUserOrders);

  return mostOrderedMenu;
}
```
<br/>

The recommendMenuForUser function is designed to recommend a menu for a target user based on the orders of other users. It utilizes Jaccard similarity to measure the similarity between the target user's orders and the orders of other users, and then selects the most frequently ordered menu among the top similar users.

<br/><br/>


## **Algorithm features and a point of note**

Our recommended algorithm aims to provide users with menu suggestions based on user-based collaborative filtering, extracting similar users who have tried menus that the target user has not yet experienced. However, there are situations in which the recommendation algorithm may not function effectively.

**1. When the user has never placed an order:**<br/>
In this scenario, it is challenging to extract similar users, as the algorithm relies on user history. Consequently, the recommendation algorithm may not operate optimally when the user has not placed any orders.

**2. When the user has a diverse history of tried menus:**<br/>
Our algorithm selects menus that the user has not tried yet. However, if the user has a wide variety of tried menus, it becomes difficult to make recommendations. In such cases, the algorithm may not be able to provide suggestions effectively.<br/><br/>
Please be mindful of these potential limitations in the algorithmic process, as they could lead to instances where the recommendation process does not yield results.

## **Testing Method**
First, we confirmed that similarity is correct by logging.<br/>
Second,Testing focuses on using dummy data to verify the accuracy and efficiency of the algorithm. Multiple tests are conducted to ensure that the expected results are achieved. Necessary measures are taken to improve the algorithm's performance based on the test results.


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

