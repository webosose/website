---
title: Facial recognition-based kiosks
date: 2023-12-21
slug: facial-recognition-based-kiosks
posttype: solution
toc: true
thumbnail: th-facial-recognition-based-kiosks.png
---

**Author: Dahun Kim, Yeongjae Shin, Junseok Park, Seungwoon Lee, Donghyuk Shin**

## Overview

This project demonstrates how to develop a face recognition-based kiosk that **recognizes the user's face** and **provides customized menu recommendation** and **menu lists**.

Key features are as follows:

- User Registration
- User Recognition
- Customized Menu Recommendation
- Order Placement

## Hardware Requirements

To set up this project, you need a **target device** and **host PC**.

### Target Device

You need a Raspberry Pi 4 with webOS OSE as the target device.

| Hardware | Description |
|----------|-------------|
| [Raspberry Pi 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (8GB) | The core computing unit for the kiosk. |
| MicroSD Card with webOS OSE Image | A MicroSD for flashing webOS OSE. <ul><li>webOS OSE 2.24.0 is used in this project. You can get the pre-built image in <a href="https://github.com/webosose/build-webos/releases/tag/v2.24.0">webOS OSE GitHub</a>.</li><li>To install a webOS OSE image on a MicroSD card, use the following guide: <a hreaf="https://www.webosose.org/docs/guides/setup/flashing-webos-ose/">Flashing webOS OSE.</a></li></ul> |
| Touchscreen or Monitor | The display device that interacts with the kiosk. We recommend using a touchscreen for a more interactive experience. We used <a href="https://www.sunfounder.com/products/10inch-touchscreen-for-raspberrypi">SunFounder 10.1 Touchscreen</a>. |
| Camera | webOS OSE supports V4L2 (Video for Linux 2) cameras. We used <a href="https://prod.danawa.com/info/?pcode=13386197">ROYCHE RPC-20F FHD webcam (Korean website)</a>.

### Host PC

Host PC is required to run the kiosk server.

We'd implemented this project on Windows and Ubuntu. To ensure compatibility, we recommend using a similar development environment.

{{< note >}}
Both Windows and Linux environments are possible, but we recommend Linux environments.
{{< /note >}}

Make sure that your host PC **supports a camera** to record. This camera is required in the [registrating your face section](#signing-up-the-account).

## Project Setup

This section provides a step-by-step guide to set up the project.

{{< note "Before You Begin" >}}
- We highly recommend using [Python](https://www.python.org/) 3.11.
- Any non-English character in file paths might cause unexpected error. Change it into English character.
- The host PC and target device **MUST** be on the same network.
{{< /note >}}

### Kiosk Server (On Host PC)

A kiosk server runs on your host PC. Setting up a server involves the following steps:

1. Setting up prerequisites
2. Setting up the virtual environment
3. Running the server

#### Setting Up Prerequisites

1. you have to **install [Node.js](https://nodejs.org/en)** on your host PC. Verify the installation by entering the following commands on your terminal:

    ```bash
    node -v # Print your Node.js version
    ```

2. Install `create-react-app`.

    ```bash
    npm install -g create-react-app
    ```

3. Clone the project repository.

    ```bash
    git clone https://github.com/Cheetah-19/Kiosk_KNU
    ```

4. Install the required libraries

    1. Go to `Kiosk_KNU/frontend/kiosk_page` and enter the following commands:

        ```bash
        npm install react-scripts
        npm install axios
        npm install react-bootstrap bootstrap
        ```

    2. Go to `Kiosk_KNU/frontend/register` and enter the following commands:

        ```bash
        npm install react-scripts
        npm install axios
        ```

#### Setting Up the Virtual Environment

1. Go back to your project root directory.
2. Activate the virtual environment. Choose one of the following two methods:

    1. **Using Anaconda (Recommended)**

        1. Install [Anaconda](https://www.anaconda.com/).
        2. Create a virtual environment.

            ```bash
            conda create -n <VIRTUAL ENVIRONMENT NAME> python=3.11

            # Example
            # conda create -n kiosktest python=3.11
            ```
        
        3. Activate the virtual envrionment.

            ```bash
            conda activate <VIRTUAL ENVIRONMENT NAME>

            # Example
            # conda activate kiosktest
            ```

            Once the virtual environment is activated, you'll see the preceding parentheses in your terminal.

            ```bash
            # Preceding (kiosktest) means the name of your virtual environment
            (kiosktest) root@testuser#
            ```

    2. **Using `virtualenv` (Simpler)**

        1. Install `virtualenv`.

            ```bash
            pip install virtualenv
            ```

        2. Create a virtual environment.

            ```bash
            virtualenv <VIRTUAL ENVIRONMENT NAME> --python=<PYTHON VERSION>

            # Example
            # virtualenv kiosktest --python=python3.11
            ```

        3. Activate the virtual environment.

            ```bash
            # For Ubuntu and macOS
            source <VIRTUAL ENVIRONMENT NAME>/bin/activate

            # For Windows
            # Note that using backslash (\) in the path
            .\\<VIRTUAL ENVIRONMENT NAME>\Scripts\activate
            ```

3. In this virtual environment terminal, proceed to the following step: [Running the Server](#running-the-server).

#### Running the Server

1. Install [Django](https://www.djangoproject.com/) and other frameworks.

    ```bash
    pip install django 
    pip install djangorestframework django-cors-headers 
    pip install drf-yasg 
    ```

2. Install libraries for menu recommendation and face recognition.

    ```bash
    pip install scikit-learn
    pip install deepface
    ```

3. Go to the `Kiosk_KNU/backend` directory.
4. Run the server with a specified port number. **Make sure you note this port number.** This number will be used in the [Setting Up the Server Connection](#setting-up-the-server-connection).

    ```bash
    python manage.py runserver 0.0.0.0:<PORT NUMBER>

    # Example
    python manage.py runserver 0.0.0.0:8000
    ```

    If you succeed, you'll see the following messages.

    ![23](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/dca1a421-7fa4-4a4b-81b0-aea5c67b6244)

Your server is ready! **Don't turn off this server terminal.**

Now it's time to set up the kiosk app. 

### Kiosk App

A kiosk app runs on your target device (Raspberry Pi). Setting up an app involves the following steps:

1. Setting up webOS OSE CLI
2. Creating an app
3. Setting up the server connection
4. Building the app
5. Packaging and Installing the app


#### Setting Up webOS OSE CLI

[webOS OSE Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}})

    To install CLI, enter the following command on your terminal.

    ```bash
    npm install -g @webosose/ares-cli
    ```



#### Setting Up the Server Connection

1. Find an IP address of your server (host PC).

    ```bash
    # For Ubuntu and macOS
    ifconfig

    # For Windows
    ipconfig
    ```

2. 

1. Setting Port-Forwarding & Changing variables for Server Connections
    * Verify the local ip address of the server running with ipconfig
        * Verify the IPv4 address of the wireless LAN.

            ![24](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed02c030-48c5-42fc-8d17-0c790f01a739)

        * Port forwarding on your router settings page.
    * Saves the port number port forwarded from 
        * frontend/kiosk_page/src/constant/Url.js
        * frontend/register/src/constant/Url.js 
        * with the public IP (https://www.findip.kr/) in the BASE_URL variable.
        ![25](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1ff4c30c-ef76-4376-99ba-f0ac43d96a00)
        ![26](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/e562a9d9-524e-4985-b159-ee51c19aed8c)

#### Packaging and Installing the App

1. 

4. Packaging
     - You can change only the part of 'sampleApp' from the code below to the project name you want. (sampleApp = folder name)
    
	        ares-package ./sampleApp

        <img width="418" alt="15" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/395c1cc3-c671-4e50-923e-6c146c8b21f2">

        * If it's Success, it's Success.
        * If you look at the picture above, there is com.domain.app_0.0.1.ipk.
        * This ipk file is the app you install on Raspberry Pi's webOS.

  5. Installation
        * In the code below, 'Raspberry' is the Devide name set by ssh set above.
	    * For 'com.domain.app_0.0.1_all.ipk', write the name of the completed ipk file after packaging.
     
	            ares-install —device Rasberry com.domain.app_0.0.1_all.ipk

        * if it becomes Success, it is Success, and the application will work successfully.
  
        ![18](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5feb04b8-7d20-4f4c-b350-64afc260aaa6)

## Install the App

Install the app on the target device by using the webOS OSE CLI from your local PC.

On your local PC, follow these steps:

1. SSH Settings
    * Device settings are required for ssh connections.

	        ares-setup-device 
 
        <img width="566" alt="12" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/17ff7663-0290-433c-8a12-016ea5cc8487">

    * If you look at the picture above, you can see that a new device has been added.

    - Add : Add Mode
    - Name : Please name the device.
    - IP address : You can write down the IP address of the Raspberry Pi.
    - Port : I set the port number as 22. (When I used another port, I got a package error.)
    - User : You can set it to root.
    - Description : You can skip it. (skip = Enter)
    - Authentication : Choose whether you want to use the password or ssh key as the permission setting. I chose the password because the password is simpler than the ssh key.
    - Password : You can set the password. (skip = Enter)
    - Default : It's N in the picture, but it's more convenient to choose Y.
    - Save : Please save it as Y.

2. Installing the webOS OSE app
    * You must create an app using template.
    * You can change only the part of 'sampleApp' from the code below to the project name you want. (sampleApp = folder name)

	        ares-generate -t webapp sampleApp

        <img width="483" alt="13" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/620b1604-5726-481b-a2fb-6f9afef7f91a">
 
        * If it's Success, it's Success.
   
    * It becomes Success, creates a folder, and you can see that it contains the settings.

        <img width="789" alt="14" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/6cbb0492-6400-4927-b2b6-de58753b5f09">

        * app id : You can omit the app as an id that distinguishes it.
        * title : The title of the application.
        * version : You can specify a version.

    * You must allow camera permission to do face recognition in appinfo.json.
    
        <img width="300" alt="14" src="https://github.com/baegopababjo/website/assets/95912522/05a07ec1-f80e-466f-95f5-feeff382cf2d">


  3. Overwrite the built content over the folder you created (in this case 'sampleApp').
{{< note >}}
You must navigate to the folder you want to build and run it (frontend/kiosk_page in this case)
{{< /note >}}


            npm run build
        
        * If you get an error such as Can't resolve 'react-dom', please execute the command below and try again.

                npm install
        
        * If you get an error such as Can't save 'bootstrap/dist/css/bootstrap.css', please execute the following command from the ./Kiosk_KNU location.

                npm install react-bootstrap bootstrap
        

        * When you build a project, a build file will be created.
        
        <img width="737" alt="스크린샷 2023-12-06 오후 10 06 55" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a133af50-dc41-4e2e-8313-7c5688a0622f">

        * You can see that a 'build' folder has been created.
        * You can 'overlay' the contents of the file inside the sampleApp folder created above.


  

## How to use
1. Connect the camera to the Raspberry Pi.
2. Connecting Raspberry Pi to the Internet.
3. Change your unique server address (Please refer to the Url.js part of Code Implementation)
4. Run the installed application.
5. You must go to the frontend/register file and proceed with membership registration using the command below to log in.

        npm start

6. When the membership registration page is launched, you can register your information to sign up.

    {{< note >}}
        * The face model is downloaded from the server when you first do face recognition. I recommend you turn the server back on when you see the cmd window and see that the face model has been downloaded from the server.
        * Please note that downloading files before signing up for membership is fast, and the model downloading after signing up for membership is large, so it takes time.

    {{< /note >}}

    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/bad5d665-65c0-41f3-839a-73a2b35dae78">
    * This page allows you to register your face.
    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/9f5c919f-e630-4d0f-a7f3-45de15f5ada1">
    * This page allows you to register your name.
    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f95fc192-a1fc-42a4-a2eb-70603a42dd83">
    * This page allows you to register your mobile phone number.
    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/53e8d30c-6617-4c80-a175-03cce27cac87">
    * This page allows you to register whether you are vegan or religious.
    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/7ceba5d5-22c9-4ba9-9908-bc8afc0d9c2c">
    * This page allows you to register whether you are allergic.
    * When you press the Finish button on the Allergy Check page, the face model is downloaded, which may take time to sign up for the first time. Check the server to see what is downloaded.
    * After that, if face recognition doesn't work well, turn on the server again and try it
    * <img width="30%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/145134a1-5461-4e90-b6a1-969298c50eb9">
    * This page tells you that your payment has been completed.

    * If registered, you can log in with your face information and cell phone number.
    

7. Log in with your registered face information or cell phone number.
* If you press the login button above, you will automatically attempt to log in through facial recognition.

    <img width="50%" alt="31" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/96006ef1-7b7f-4ea8-b8b6-716abd60ff44">

* You can log in with your cell phone number by pressing the button below.

    <img width="50%" alt="32" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/385cee9e-9116-4d71-a9eb-f9a3565a558e">

* If you successfully log in, you can use the kiosk with a menu tailored to your information!

    <img width="50%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/fcae8dfa-07fb-4cf9-905b-b39231a4a340">


## Code Implementation
* If you want to see the source code, please click the [Git link](https://github.com/Cheetah-19/Kiosk_KNU)

### Url.js
* This file can set the server address at once.
* You can put your personal server address inside.
* You can change it from the file in the two paths below.
    * frontend/kiosk_page/src/constants/Url.js ( Server setup address for kiosk page )
    * frontend/register/src/constants/Url.js ( Server setup address for user registration page )

```
    export const BASE_URL = 'http://127.0.0.1:8000';
```

### face_recognition/extractor.py
* You must specify a pre-training model name for facial recognition.

```
    # recognizer
    model_name = 'VGG-Face'
    target_size = functions.find_target_size(model_name)
```
* homomorphic_filter()

* This is a function that controls image illumination.
```
    def homomorphic_filter(img):
    try:
        # Only the calculation for Y with YUV color space
        img_YUV = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
        y = img_YUV[:, :, 0]

        rows = y.shape[0]
        cols = y.shape[1]

        # Logs are taken to separate illumination elements and reflection elements
        imgLog = np.log1p(np.array(y, dtype='float') / 255)

        M = 2 * rows + 1
        N = 2 * cols + 1

        # Generate gaussian mask, sigma = 10
        sigma = 10
        (X, Y) = np.meshgrid(np.linspace(0, N - 1, N), np.linspace(0, M - 1, M))
        Xc = np.ceil(N / 2)
        Yc = np.ceil(M / 2)
        gaussianNumerator = (X - Xc) ** 2 + (Y - Yc) ** 2

        # Create low pass filter and high pass filter
        LPF = np.exp(-gaussianNumerator / (2 * sigma * sigma))
        HPF = 1 - LPF

        LPF_shift = np.fft.ifftshift(LPF.copy())
        HPF_shift = np.fft.ifftshift(HPF.copy())

        # The image covered with Log is FFTed and multiplied by LPF and HPF to divide the LF and HF components.
        img_FFT = np.fft.fft2(imgLog.copy(), (M, N))
        img_LF = np.real(np.fft.ifft2(img_FFT.copy() * LPF_shift, (M, N)))
        img_HF = np.real(np.fft.ifft2(img_FFT.copy() * HPF_shift, (M, N)))

        # The lighting and reflection values are controlled by multiplying each LF and HF component by the scaling factor.
        gamma1 = 0.3
        gamma2 = 0.7
        img_adjusting = gamma1 * img_LF[0:rows, 0:cols] + gamma2 * img_HF[0:rows, 0:cols]

        # The adjusted data is now made into an image through exp operations.
        img_exp = np.expm1(img_adjusting)
        img_exp = (img_exp - np.min(img_exp)) / (np.max(img_exp) - np.min(img_exp))
        img_out = np.array(255 * img_exp, dtype='uint8')

        # YUV replaces Y space with a filtered image and converts it to RGB space.
        img_YUV[:, :, 0] = img_out
        result = cv2.cvtColor(img_YUV, cv2.COLOR_YUV2BGR)

        return result
    except:
        pass
```
* resize_with_padding()

* This function adjusts the image size to the model target_size.
```
    def resize_with_padding(image, target_size):
        height, width = image.shape[:2]
        target_height, target_width = target_size

        # Calculate the image ratio.
        aspect_ratio = width / height
        target_aspect_ratio = target_width / target_height

        # Resize according to the image ratio.
        if aspect_ratio > target_aspect_ratio:
            new_width = target_width
            new_height = int(new_width / aspect_ratio)
        else:
            new_height = target_height
            new_width = int(new_height * aspect_ratio)

        # Resize the image.
        resized_image = cv2.resize(image, (new_width, new_height))

        # Fill the margins with black
        padding_top = (target_height - new_height) // 2
        padding_bottom = target_height - new_height - padding_top
        padding_left = (target_width - new_width) // 2
        padding_right = target_width - new_width - padding_left
        padded_image = cv2.copyMakeBorder(resized_image, padding_top, padding_bottom, padding_left, padding_right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

        return padded_image
```
* extractor()

* This function converts base64 to embedding.
    1. base64 -> image
    2. image -> face
    3. face -> embedding
```
    def extractor(base64):
    try:
        # 1. base64 -> image
        img = functions.loadBase64Img(base64)

        # 2. image -> face (Face Area Extracted)
        face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
        x, y, w, h = face['x'], face['y'], face['w'], face['h']
        face = img[y:y + h, x:x + w]

        # Adjusting lighting
        face = homomorphic_filter(face)

        # Resizing an image
        face = resize_with_padding(face, target_size)

        # 3. face -> embedding
        embedding_img = DeepFace.represent(img_path=face, model_name=model_name, detector_backend='skip')[0]['embedding']

        return embedding_img
    except:
        return None
```

### face_recognition/identification.py
* findCosineDistance()

* This function is a function that calculates the distance between a user's face info and the embedding of a photo taken from the front in the cosine similarity method.

```
    def findCosineDistance(db_list, target):
        a = np.dot(db_list, target)
        b = np.linalg.norm(db_list, axis=1)
        c = np.sqrt(np.sum(np.multiply(target, target)))

        return 1 - (a / (b * c))
```
* identification()

* This function returns the shortest distance between a user's face info and the embedding of a photo taken from the front.

```
    def identification(db_embedding_list, target_embedding):
        return np.min(findCosineDistance(db_embedding_list, target_embedding))
```

### face_recognition/base2vector.py
* base_to_vector()

* This function converts a base64 list received from the front into an embedding list.

```
    def base_to_vector(face_bases: list) -> list:
        embedding_list = []

        for base in face_bases:
            # base64 -> embedding
            input_embedding = extractor(base)

            if input_embedding is not None:
                embedding_list.append(input_embedding)
        return embedding_list
```

### face_recognition/checker.py
* Input size must be specified according to Keras CNN model (150 x 150)

```
    target_size = (150, 150)
    model = load_model('./face_recognition/mask_model.h5')
```
* isFace()
* This function determines whether your face is well detected or whether you are wearing a mask.
```
    def isFace(base64):
        try:
            # 1. base64 -> image
            img = functions.loadBase64Img(base64)

            # 2. image -> face (Extracting Face Areas)
            face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
            x, y, w, h = face['x'], face['y'], face['w'], face['h']
            face = img[y:y + h, x:x + w]

            # Adjusting lighting
            face = homomorphic_filter(face)

            # Resizing an image
            face = resize_with_padding(face, target_size)

            # Image preprocessing
            face = face[:, :, ::-1]
            face = face.astype(np.float64) / 255.0

            # Determining whether or not to wear a mask
            face = np.expand_dims(face, axis=0)
            value = model.predict(face)

            print(value)
            if value <= 0.5:
                return False
            else:
                return True
        except:
            return False
```

### login/views.py
* post()

* This function provides an indication of how facial recognition logins work.
    1. 5 base64 files POST via Front Face.js
    2. base64 -> image -> embedding
    3. Get information from all users
    4. Calculate the face info distance between embedding and user at number 2
    5. Returns the user's mobile phone number whose distance was less than the threshold and the shortest distance.

```
    class FaceLoginView(APIView):
        def post(self,request):
            # 1. 5 base64 files POST (list) via Front Face.js
            if request.method == 'POST':
                try:
                    face_bases = request.data.get('imageData')
                except:
                    return Response('')

                # 2. base64 -> image -> vector
                target_embedding_list = base_to_vector(face_bases)
                print("Received face data from front")

                # 3. vector-> embedding
                embedding_array =  np.array(target_embedding_list)
                # 3. Get information from all users
                user_table = User.objects.all()

                min_dist = 1e9
                phonenum = None
                name = None

                for user in user_table:
                    try:
                        user_face_list = np.array(eval(user.user_face_info))

                        # 4. Calculate the vector and user's face info distance at number 2
                        distance = 1e9
                        for target in embedding_array:
                            distance = min(distance, identification(user_face_list, target))

                        #print(f"{user.user_name}: {distance}")

                        if distance < min_dist:
                            min_dist = distance

                            # Pull only when the distance is lower than the threshold.
                            if min_dist <= 0.15:
                                phonenum = user.user_phonenum
                                name = user.user_name
                    except:
                        pass

                if phonenum is not None:
                    print(f"Success\nname: {name}, phonenum: {phonenum}")
                else:
                    print("None")

                # 5. Returns the user's mobile phone number whose distance was below the threshold and the shortest distance
                return Response({"phone_number": phonenum, "name": name})
```
### signup/views.py
* post()
* This function checks if it is a suitable face photo during the membership registration process.
```
    class FaceCheckView(APIView):
        def post(self, request):
            face_base = request.data.get('imageData')

            # Face extracted
            if isFace(face_base):
                print("No mask")
                return Response({'result': True})
            # Face not extracted
            else:
                print("mask")
                return Response({'result': False}, status=400)
```


### menu/recommendation.py
* get_recommended()
* This function recommends menus to users based on their past order information and ingredient information in the menu.
* Don't recommend ingredients that users can't eat

```
    def get_recommended(user_id):
        # Menu and ingredients
        menus_db = Menu.objects.all()
        # Importing User Instances
        user_instance = User.objects.get(user_phonenum = user_id)             

        try:
            user_preprocessed_data = PreprocessedData.objects.get(user=user_instance)
            exclude_ingredient_str = user_preprocessed_data.excluded_ingredients
        except PreprocessedData.DoesNotExist:
            exclude_ingredient_str = ""


        # Process of changing String to Set
        # Split into commas after removing brackets
        if exclude_ingredient_str == "empty":
            excluded_ingredients = set() 
        else :
            exclude_ingredient_list = exclude_ingredient_str[1:-1].split(',')
            #String -> Create set after integer conversion
            excluded_ingredients = set(int(item.strip()) for item in exclude_ingredient_list)

        menus = {}
        for menu in menus_db:
            ingredients = [ingredient.id for ingredient in menu.menu_ingredient.all()]
            # Skip menus with excluded ingredients
            if any(ingredient in excluded_ingredients for ingredient in ingredients):
                continue
            ingredients_str = " ".join([ingredient.ingredient_name for ingredient in menu.menu_ingredient.all()])
            menus[menu.menu_name] = ingredients_str

        # Order data: {Order number: {'user': User ID, 'menus': [Order menu list]}}
        orders_db = Order.objects.filter(user=user_instance)

        orders = {}
        for order in orders_db:
            ordered_items = Ordered_Item.objects.filter(order=order)
            orders[order.order_num] = {'user': order.user.user_phonenum, 'menus': [item.menu.menu_name for item in ordered_items]}

        # TF-IDF conversion
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(menus.values())
        tfidf_features = np.array(tfidf_matrix.todense())

        # Calculate cosine similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # Extract menus from a user's past orders
        past_orders = []
        for order in orders.values():
            if order['user'] == user_id:
                past_orders.append(order['menus'])
        
        past_menus = []
        for order in past_orders:
            for menu in order:
                past_menus.append(menu)           # ex) ["Salmon Salad", "Salmon Salad", "Psyburger", "Rice Noodles", and "Rice Noodles"] It comes out as "Salmon Salad", and the more you come out twice, the higher the weight.
        

        # Find menus similar to those ordered in the past
        similar_menus = np.zeros(len(menus))
        for menu in past_menus:
            index = list(menus.keys()).index(menu)
            similar_menus += cosine_sim[index]

        # Functions to obtain indexes for similarity calculations
        def get_index(menu):
            menu_keys = list(menus.keys())
            index = menu_keys.index(menu)
            return similar_menus[index]

        # Creating a Menu List
        menu_list = list(menus.keys())

        # Sorts menus in order of high similarity
        sorted_menus = []
        for menu in menu_list:
            sorted_menus.append((menu, get_index(menu)))

        sorted_menus.sort(key=lambda x: x[1], reverse=True)

        # Extract only menu names
        sorted_menus = [menu[0] for menu in sorted_menus]
        recommended_menus = []
        for recom in sorted_menus:
            this_menu = Menu.objects.get(menu_name=recom)
            this_serial = MenuSerializer(this_menu)
            recommended_menus.append(this_serial.data)
        # # Sort menus in order of high similarity
        # sorted_menus = sorted(list(menus.keys()), key=lambda x: similar_menus[list(menus.keys()).index(x)], reverse=True)

        # Previous orders are excluded from the recommendation list
        #  recommended_menus = []
        #  for menu in sorted_menus:
        #      if menu not in past_menus:
        #         recommended_menus.append(menu)
        recommended_menus = recommended_menus[0:3]
        return recommended_menus
```

## Contact
* Dahun Kim ([Github](https://github.com/baegopababjo)) : ekgns1106@naver.com
* Yeongjae Shin ([Github](https://github.com/Apoliasm)) : aji5820@naver.com
* Junseok Park ([Github](https://github.com/Lucerna00)) : pjs3859811@naver.com
* Seungwoon Lee ([Github](https://github.com/Usimth)) : syjsir@gmail.com
* Donghyuk Shin ([Github](https://github.com/WannaBeTop)) : optimuslove0223@icloud.com