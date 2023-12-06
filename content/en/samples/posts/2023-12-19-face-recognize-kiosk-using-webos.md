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

Real-Time Menu Recommendations and Reconfiguration through Web App:
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

### Target Device Requirements
A target device is a device that runs webOS OSE. To test apps and services on your target device, we recommend that you prepare the following set of hardware and peripheral devices.

- For webOS OSE 2.0.0 or Higher
- Raspberry Pi 4
- microSD card (8 GB or larger) and microSD card reader device
- HDMI-compatible touchscreen using USB interface, with 1920x1080 resolution
- Micro HDMI to HDMI cable
- Ethernet cable and internet connection
- (Optional) Input devices such as a keyboard and a mouse

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

```Plain text
$ cd signage_solution/flask
```
### Step 2: Verify Python Installation<br/>
Check if Python 3.9 is installed by running:
```Plain text
$ python3.9 -V
```

If Python 3.9 is not installed, you can install it using Homebrew on MacOS or download it from the Python website for Windows users:<br/>
For MacOS:
```Plain text
$ brew install python@3.9
```
For Windows:<br/>
- Download the Python 3.9 installer from the [official Python website](https://www.python.org/downloads/).
- Run the installer and follow the prompts to install Python 3.9.


### Step 3: Set Up a Virtual Environment
After installing Python 3.9, go back to `/signage_solution/flask` directory and set up a virtual environment named `env` using:

```Plain text
$ python3.9 -m venv env
```
Verify that the `env` folder has been created in the current directory.

### Step 4: Activate the Virtual Environment
Activate the virtual environment with the following command:<br/>
For MacOS/Linux:
```Plain text
$ source env/bin/activate
```
For Windows:
```Plain text
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
user=<database username e.g. root>
password=<database password e.g. 8246>
host=<database host e.g. localhost>
database_name=<database name e.g. kioskDB>
sql_file_path=<path to SQL file e.g. ./db.sql>
korean_font_path=<path to Korean font file e.g. /System/Library/Fonts/AppleSDGothicNeo.ttc>
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


