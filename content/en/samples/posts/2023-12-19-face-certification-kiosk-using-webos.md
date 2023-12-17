---
title: Face Certification Kiosk Using webOS
date: 2023-12-19
slug: face-certification-kiosk-using-webos
posttype: solution
toc: true
thumbnail: th-face-certification-kiosk.jpg
---
<a name="readme-top"></a>
**Author: Bokyeong Ju, Minsu Lee, Yusu Noh, Hyunsoo Kim, Jinno Yun**



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Face Certification Kiosk Using webOS</h3>

  <p align="center">
    It's a webOS-based signage solution kiosk example project that verificate the face of registered users and makes custom recommendations.
    <br />
    <br />
    <a href="https://github.com/noFlowWater/signage_solution">View Demo</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">Report Bug</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>🗂️ Table of Contents 🗂️</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#specifications">Specifications</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage-screenshot">Usage Screenshot</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/92e7cb81-0ae1-4640-b070-065fe28a68ec" 
         alt="User Facial Registration" 
         style="width: 49%;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/2d5b2a51-5d45-4f89-b81d-2b106f5fe7af" 
         alt="User Menu Recommendation Algorithm" 
         style="width: 49%;">
</p>


### Background
Small-scale business owners often face financial constraints that make it challenging to afford expensive signage solutions. Therefore, there is a growing need for an affordable, open-source-based signage solution that can be easily implemented without the high costs associated with traditional signage products. This proposal aims to develop a user-customized kiosk that recognizes users to recommend menus and dynamically update menu lists.

### Project Objectives and Content
User Verification:
- The kiosk will utilize a camera to identify users and check if they are returning visitors with payment records.
- Images captured by the kiosk camera will be sent to an image process server for user identification.
- The server will verify if the recognized user is a returning visitor.
- In cases where user verification is unsuccessful, an alternative authentication method is provided.

Custom Menu Recommendations and Reconfiguration through Web App:
- User data registration will be facilitated both at the kiosk and in the server's database.
- The web app will offer menu recommendations based on user information.
- Menus will be dynamically altered based on user data (considering factors like allergies, etc.).
- Menu recommendations will operate using a **user collaborative filtering algorithm** based on the order history of registered users.
- 
🖼️ System Architecture 🖼️
<img src="https://github.com/noFlowWater/signage_solution/assets/112642604/248f7596-9c3f-4de7-a14a-638547a09816" alt="System Architecture" style="width: 99%;">

🖼️ Database ERD 🖼️
<img src="https://github.com/noFlowWater/signage_solution/assets/112642604/db15a09a-faa7-4797-8f58-b865d7965681" alt="Database ERD" style="width: 99%;">


### Built With
Frontend
<br/><br/>
[![React][React.js]][React-url][![npm][npm]][npm-url][![Bootstrap][Bootstrap.com]][Bootstrap-url][![JavaScript][JavaScript.js]][JavaScript-url][![Figma][Figma]][Figma-url]
<br/>

Face Identify Server 
<br/><br/>
[![Flask][Flask]][Flask-url][![OpenCV][OpenCV]][OpenCV-url][![Python][Python.org]][Python-url]
<br/>

Kiosk API Server
<br/><br/>
[![Nodejs][Nodejs]][Nodejs-url][![npm][npm]][npm-url][![Prisma][Prisma]][Prisma-url][![JavaScript][JavaScript.js]][JavaScript-url]
<br/>
  
Database
<br/><br/>
[![MySQL][MySQL]][MySQL-url][![Prisma][Prisma]][Prisma-url]
<br/>

Development Environment
<br/><br/>
[![macOS][macOS]][macOS-url]
<br/>

Client Environment
<br/><br/>
[![LG][LG]][LG-url][![Raspberry][Raspberry]][Raspberry-url]
<br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!--SPECIFICATIONS-->
# Specifications

### Development Environment Specifications
Our project was developed in an Apple Silicon environment, which provided us with advanced computing capabilities and efficiency. Here are the details:

- **Platform**: Apple Silicon (M1, M1 Pro, M1 Max, or later)
- **Operating System**: macOS Big Sur or later
- **Memory**: 8GB RAM or more
- **Storage**: 256GB SSD or higher

We recommend using a similar Apple Silicon-based environment for development to ensure compatibility

### Hardware Requirements for Client Device

For setting up the client device in this project, you will need the following hardware components:

- **Raspberry Pi 4 4GB**(+@): The core computing unit for the kiosk.
- **MicroSD Card with webOS Image**: Use a microSD card loaded with the webOS image to boot the Raspberry Pi. For this project, we have used the pre-built webOS OSE 2.24.0 image for Raspberry Pi 4, which can be downloaded from [here](https://github.com/webosose/build-webos/releases/tag/v2.24.0). Additionally, if you need guidance on flashing the webOS Open Source Edition to your microSD card, please refer to [flashing webos-ose guide](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/) for detailed instructions.
- **Touchscreen or Monitor**: A display unit to interact with the kiosk. A touchscreen is preferred for a more interactive experience.<br/> we use [this](https://www.icbanq.com/P009842845)
- **Webcam**: An essential component for facial recognition or other interactive features. Ensure compatibility with the Raspberry Pi.
- **Optional Input Devices**: Devices like a mouse and keyboard for initial setup and troubleshooting.
- **Power Supply and Cables**: A suitable power supply for the Raspberry Pi and screen, along with necessary cables such as HDMI for connectivity.


Ensure that you have all these components available before proceeding with the setup of your client device for the signage solution project.


> [webOS Offitial Docs](https://www.webosose.org/docs/guides/setup/system-requirements/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
# Getting Started

This guide will help you set up and run the project in your local environment. Follow these steps to get started.

> **Note:** This guide is tailored for a setup on **a single local PC**. It can also be adapted for multi-server environments, accommodating both centralized and distributed systems efficiently.

> **Note:** For effective data processing, we recommend hosting both the **Flask application and database on the same system**. This setup reduces latency and improves operational efficiency, especially for large, user-specific models.

## Installation

The process for installing and setting up the project is as follows. This template does not rely on any external dependencies or services.

1. Clone the repository.
   ```sh
   git clone https://github.com/noFlowWater/signage_solution.git
   ```
2. Move into the cloned directory.
   ```sh
   cd signage_solution
   ```
After cloning and moving into the directory, you will find three folders in the project directory:<br/>
`react`, `flask`, `nodejs`.

Proceed with the project in the following order:
- First, [Get Start for Kiosk API Server & Init Database](https://github.com/noFlowWater/signage_solution/tree/main/nodejs/README.md)
- Then, [Get Start for Face Authentication Server](https://github.com/noFlowWater/signage_solution/tree/main/flask/README.md)
- Finally, [Get Start for React for Deploy to webOS Client Device](https://github.com/noFlowWater/signage_solution/tree/main/react_signage/README.md)

Each step is detailed in the `README.md` file of the respective folder, allowing you to sequentially progress and gather the necessary information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage Screenshot 


<details>
  <summary>🖼️ Home 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="홈 화면" src="https://github.com/noFlowWater/signage_solution/assets/112642604/966af761-2f10-447f-90cb-241577823e90">
  </p>
</details>
<details>
<summary>🖼️ User 🖼️</summary>
<br>

### Select User Mode
<details>
  <summary>🖼️ 1. Select User Mode 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 모드 선택" src="https://github.com/noFlowWater/signage_solution/assets/112642604/211d6ba5-61ba-488c-bff9-eb5d333f68a8">
  </p>
</details>

### User Registration

<details>
  <summary>🖼️ 1. Enter User Basic Information 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 기본정보 입력" src="https://github.com/noFlowWater/signage_solution/assets/112642604/142c1e9f-d351-465c-b968-f7da5d178d3a">
  </p>
</details>

<details>
  <summary>🖼️ 2. Register user's face 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 얼굴 등록" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f4fa27ea-f77b-4dc8-8914-bfe9d90eddf7">
  </p>
</details>

<details>
  <summary>🖼️ 3. Select User Allergy 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 알러지 선택" src="https://github.com/noFlowWater/signage_solution/assets/112642604/c4d73443-6c36-4eb9-8caf-a15b70af8eae">
  </p>
</details>

### User Login

<details>
  <summary>🖼️ 1. User Authentication 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 인식" src="https://github.com/noFlowWater/signage_solution/assets/112642604/999e78e4-031e-4ee0-885a-2683735138b9">
    <img style="width: 49%;" alt="사용자 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f8ba2823-7dd0-420a-8adc-106e66505853">
  </p>
</details>

<details>
  <summary>🖼️ 2. User Alternate Authentication 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="대체 인증" src="https://github.com/noFlowWater/signage_solution/assets/112642604/05f5b522-1237-4f15-a699-8b89271df2d8">
  </p>
</details>

### Menu 

<details>
  <summary>🖼️ 1. Custom Menu recommendation 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="메뉴 추천" src="https://github.com/noFlowWater/signage_solution/assets/112642604/101989ca-4f2f-42ef-be41-31651c4bacf6">
  </p>
</details>

<details>
  <summary>🖼️ 2. Check Menu Allergy/Soldout, Detail 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="알러지:매진 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/40395041-7485-4749-878e-212477655be5">
    <img style="width: 49%;" alt="알러지 확인창" src="https://github.com/noFlowWater/signage_solution/assets/112642604/0bd82e2d-221d-4d94-ad35-da4a7d5be4f0">
  </p>
</details>

<details>
  <summary>🖼️ 3. Check Shopping Cart & Pay 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="장바구니 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/58823132-e6b8-4b13-a667-04b4f535ec82">
    <img style="width: 49%;" alt="결제 완료" src="https://github.com/noFlowWater/signage_solution/assets/112642604/a0d01536-a62a-4bc7-aac4-8cc9555f21dd">
  </p>
</details>

</details>
<details>
<summary>🖼️ Admin 🖼️</summary>
<br>

### Administrator Login

<details>
  <summary>🖼️ 1. Administrator Login 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 로그인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/e73aef73-ac9e-4c6e-b058-7fe5dcd4463c">
  </p>
</details>

<details>
  <summary>🖼️ 2. Administrator Login Failure 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 비밀번호 체크" src="https://github.com/noFlowWater/signage_solution/assets/112642604/83ae69bb-9e44-4482-bb19-297c15e288d5">
  </p>
</details>

### Administrator Menu Management

<details>
  <summary>🖼️ 1. Administrator Menu List 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 홈" src="https://github.com/noFlowWater/signage_solution/assets/112642604/6d8d6f01-440e-4b0c-96f8-2c8d2ba21fc9">
  </p>
</details>

<details>
  <summary>🖼️ 2. Administrator Menu Details 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 메뉴 상세보기" src="https://github.com/noFlowWater/signage_solution/assets/112642604/5bca34f5-1ab6-49a9-8e0b-bdf6257eb0b2">
  </p>
</details>


<details>
  <summary>🖼️ 3. Administrator Menu Registration and Deletion 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/bdb89e7e-4208-4aea-9f93-90c3daece562" 
           alt="관리자 메뉴 등록" 
           style="width: 49%;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/4433ee82-b9fa-43dd-a325-8b84be381131"    
           alt="관리자 메뉴 수정"
           style="width: 49%;">
  </p>
</details>

### Administrator Password Change

<details>
  <summary>🖼️ 1. Changing Password (fail 1) 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_1" src="https://github.com/noFlowWater/signage_solution/assets/112642604/3e66a0d8-ec91-4464-9f4a-6c32f2c897e7">
  </p>
</details>

<details>
  <summary>🖼️ 2. Changing Password (fail 2) 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_2" src="https://github.com/noFlowWater/signage_solution/assets/112642604/435dae5a-4e51-480d-8a18-9c6921775a97">
  </p>
</details>

<details>
  <summary>🖼️ 3. Changing Password (success) 🖼️</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_3" src="https://github.com/noFlowWater/signage_solution/assets/112642604/73223ce7-e487-4bbc-80ba-ffc505fd58c3">
  </p>
</details>

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>




# **Recommendation Algorithm and Testing**

## **Algorithm Overview**

In this project, collaborative user filtering is utilized. The algorithm measures the similarity of order histories among users to select N similar users. It then analyzes the order histories of these N users to recommend the most frequently ordered menu item. The algorithm primarily employs jaccard similarity to measure the similarity between users and selects the recommendation target based on this similarity.

## **Algorithm Flow**

1. **Measuring User Similarity**: Pairing all users in the database and calculating jaccard similarity to select N users with similar order histories.
2. **Recruiting Similar Users**: Using cosin jaccard similarity as a criterion, selecting the top N users with the highest similarity.
3. **Order History Analysis**: Summarizing the order histories of the selected N users and calculating the frequency of each menu item.
4. **Selecting Recommended Menu**: Choosing the menu item with the highest frequency as the recommended item.

## **recommend.js**

```javascript
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

```javascript
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


```javascript
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
First, we saw results and contents by logging:<br/>
![recommend1](/images/samples/solutions/face-recognize-kiosk/recommend1.png)
![recommend2](/images/samples/solutions/face-recognize-kiosk/recommend2.png)

Next, The anticipated results from the test are as follows:

- Similar Users: B, C, D
- Combined Order History: 15 bowls of ramen, 3 pork cutlets, 10 cheese pork cutlets, 2 rice cakes in spicy sauce, 5 rolls of gimbap
- Recommended Menu: Cheese Pork Cutlets (most frequently ordered)

If the results align with expectations, it confirms the accuracy of the algorithm.

## **Future Improvements**

If any performance issues or accuracy concerns are identified during testing, efforts will be made to address those areas and enhance the algorithm for better efficiency and accuracy.


<!-- CONTACT -->
## Contact

### 💡 노유수 ([noFlowWater](https://github.com/noFlowWater)) : [noyusu98@gmail.com](mailto:noyusu98@gmail.com)

### 💡 주보경 ([jupyter1234](https://github.com/jupyter1234)) : [wntjdals0412@gmail.com](mailto:wntjdals0412@gmail.com)

### 💡 윤진노 ([jinno321](https://github.com/jinno321)) : [jinno5522@gmail.com](mailto:jinno5522@gmail.com)

### 💡 이민수 ([ohyatt](https://github.com/ohyatt)) : [minsoo030232@gmail.com](mailto:minsoo030232@gmail.com)

### 💡 김현수 ([beoldshoe](https://github.com/beoldshoe)) : [howeve18@gmail.com](mailto:howeve18@gmail.com)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/noFlowWater/signage_solution.svg?style=for-the-badge
[contributors-url]: https://github.com/noFlowWater/signage_solution/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/noFlowWater/signage_solution.svg?style=for-the-badge
[forks-url]: https://github.com/noFlowWater/signage_solution/network/members
[stars-shield]: https://img.shields.io/github/stars/noFlowWater/signage_solution.svg?style=for-the-badge
[stars-url]: https://github.com/noFlowWater/signage_solution/stargazers
[issues-shield]: https://img.shields.io/github/issues/noFlowWater/signage_solution.svg?style=for-the-badge
[issues-url]: https://github.com/noFlowWater/signage_solution/issues
[license-shield]: https://img.shields.io/github/license/noFlowWater/signage_solution.svg?style=for-the-badge
[license-url]: https://github.com/noFlowWater/signage_solution/blob/master/LICENSE.txt

[React.js]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000
[React-url]: https://reactjs.org/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=fff
[Figma-url]: https://www.figma.com/

[Flask]: https://img.shields.io/badge/Flask-000?style=for-the-badge&logo=flask&logoColor=fff
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/

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

[LG]: https://img.shields.io/badge/webOS-A50034?style=for-the-badge&logo=lg&logoColor=fff
[LG-url]: https://www.webosose.org/

[Raspberry]: https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=fff
[Raspberry-url]: https://www.raspberrypi.com/

[macOS]: https://img.shields.io/badge/macOS-000?style=for-the-badge&logo=macOS&logoColor=fff
[macOS-url]: https://support.apple.com/ko-kr/macOS
