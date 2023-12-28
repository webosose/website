---
title: Advanced Kiosk - Face Recognition and Menu Recommendations
date: 2023-12-28
slug: advanced-kiosk-face-recognition-and-menu-recommendations
posttype: solution
toc: true
thumbnail: th-advanced-kiosk-face-recognition-and-menu-recommendations.png
---

**Author: Dahun Kim, Yeongjae Shin, Junseok Park, Seungwoon Lee, Donghyuk Shin**

## Overview

This project demonstrates how to develop a face recognition-based kiosk that **recognizes the user's face** and **provides customized menu recommendation** and **menu lists**.

Key features are as follows:

- User Registration
- User Recognition
- Customized Menu Recommendation
- Order Placement

{{< note >}}
The primary language of this project is **Korean**.
{{< /note >}}

## Hardware Requirements

To set up this project, you need a **target device** and **host PC**.

### Target Device

You need a Raspberry Pi 4 with webOS OSE as the target device.

| Hardware | Description |
|----------|-------------|
| [Raspberry Pi 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (8GB) | The core computing unit for the kiosk. |
| MicroSD Card with webOS OSE Image | A MicroSD for flashing webOS OSE. <ul><li>webOS OSE 2.24.0 is used in this project. You can get the pre-built image in <a href="https://github.com/webosose/build-webos/releases/tag/v2.24.0">webOS OSE GitHub</a>.</li><li>To install a webOS OSE image on a MicroSD card, use the following guide: <a href="https://www.webosose.org/docs/guides/setup/flashing-webos-ose/">Flashing webOS OSE.</a></li></ul> |
| Touchscreen or Monitor | The display device that interacts with the kiosk. We recommend using a touchscreen for a more interactive experience. We used <a href="https://www.sunfounder.com/products/10inch-touchscreen-for-raspberrypi">SunFounder 10.1 Touchscreen</a>. |
| Camera | webOS OSE supports V4L2 (Video for Linux 2) cameras. We used <a href="https://prod.danawa.com/info/?pcode=13386197">ROYCHE RPC-20F FHD webcam (Korean website)</a>.

### Host PC

Host PC is required to run the kiosk server.

We'd implemented this project on Windows and Ubuntu. To ensure compatibility, we recommend using a similar development environment.

{{< note >}}
Both Windows and Linux environments are possible, but we recommend Linux environments.
{{< /note >}}

Make sure that your host PC **supports a camera** to record. This camera is required in [Creating an Account](#creating-an-account).

## Project Setup

This section provides a step-by-step guide to set up the project.

{{< note "Before You Begin" >}}
- We highly recommend using [Python](https://www.python.org/) 3.11.
- Any non-English character in file paths might cause unexpected error. Change it into English character.
- The host PC and target device **MUST** be on the same network.
{{< /note >}}

### Kiosk Server (On Host PC)

The kiosk server runs on your host PC. Setting up a server involves the following steps:

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

4. Install the required libraries.

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

3. Proceed the next step ([Running the Server](#running-the-server)) in this virtual environment terminal.

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
4. Run the server with a specified port number. **Note down this port number.** This number will be used in [Creating a Kiosk App](#creating-a-kiosk-app).

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

The kiosk app is created on the host PC and installed on your target device (Raspberry Pi). Setting up an app involves the following steps:

1. Setting up webOS OSE CLI
2. Creating a kiosk app
3. Packaging and Installing the app

#### Setting Up webOS OSE CLI

[Command-Line Interface (CLI)]({{< relref "cli-user-guide" >}}) is a tool for managing webOS OSE target devices.

1. On the host PC, enter the following command on your terminal to install CLI.

    ```bash
    npm install -g @webosose/ares-cli
    ```

2. Turn on the target device. Make sure that the target device is connected to the internet and on the same network as the host PC.

3. Register your target device on CLI. Enter the following command.

    ```bash
    ares-setup-device
    ```

    Then the interactive mode will be displayed.

    ```sh
    name                deviceinfo                connection  profile
    ------------------  ------------------------  ----------  -------       
    emulator (default)  developer@127.0.0.1:6622  ssh         ose

    ** You can modify the device info in the above list, or add new device.
    ? Select (Use arrow keys)
    > add
    modify
    remove
    set default
    ```
    
4. Select `add` and fill in the other fields as follows:
    
    {{< figure src="/images/samples/solutions/advanced-kiosk-face-recognition-and-menu-recommendations/ares-setup-device.png" caption="" alt="Interactive mode using ares-setup-device" class="align-left" >}}
    
    | Field | Description |
    |-------|-------------|
    | Select | Select `add` mode. |
    | Device name | This name will be used as an ID of your target device. <br /> **We recommend using a short name.** |
    | IP address | IP address of your target device. |
    | Port | Press the Enter key. Don't change the default value (`22`). |
    | SSH user | Press the Enter key. Don't change the default value (`root`). |
    | Description | Additional description for the target device. <br /> (You can skip this step by pressing the **Enter** key.) |
    | Authentication | Select `password`. |
    | Password | Password You can skip this step by pressing the **Enter** key. |
    | Set default | This option sets your target device as the default device. <br /> Choose whatever you want. |
    | Save | Enter `Y` to save this configurations. |

    {{< note >}}
    For more details about `ares-setup-device`, refer to the [CLI documentation]({{< relref "cli-user-guide#ares-setup-device" >}}).
    {{< /note >}}

#### Creating a Kiosk App

1. Create a dummy app.

    ```bash
    ares-generate -t webapp <YOUR APP NAME>

    # Example
    ares-generate -t webapp sampleApp
    ```

    If it succeeds, an app directory (`<YOUR APP NAME>`) will be generated under the current directory. 

2. Open `appinfo.json` in the generated directory. And add `allowVideoCapture`, `allowAudioCapture`, and `enableWebOSVDA` as follows. These parameters allow camera permission on the target device.

    ```json
    {
        "id": "com.domain.app",
        "version": "1.0.0",
        "vendor": "My Company",
        "type": "web",
        "main": "index.html",
        "title": "new app",
        "icon": "icon.png",
        "allowVideoCapture": true,  <- Add this parameter
        "allowAudioCapture": true,  <- Add this parameter
        "enableWebOSVDA": true,     <- Add this parameter
        "requiredPermissions": [
            "time.query",
            "activity.operation"
        ]
    }
    ```

3. Set up a connection with the server.

    1. Check the IP address of the server (host PC).
    2. Set up the IP address and port number of the server. Use the port number you set in [Running the Server](#running-the-server).

        {{< code "frontend/kiosk_page/src/constants/Url.js" >}}
        ```javascript
        export const BASE_URL = 'http://<SERVER IP>:<PORT NUMBER>'
        ```
        {{< /code >}}

        {{< code "frontend/register/src/constants/Url.js" >}}
        ```javascript
        export const BASE_URL = 'http://<SERVER IP>:<PORT NUMBER>'
        ```
        {{< /code >}}

4. Go to the `frontend/kiosk_page` directory.
5. Build the source code.

    ```bash
    npm run build
    ```

    If it succeeds, `build` directory will be generated.

    <img width="737" alt="스크린샷 2023-12-06 오후 10 06 55" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a133af50-dc41-4e2e-8313-7c5688a0622f">

    {{< note "Trouble Shooting Guide" >}}
    - **Can’t resolve ‘react-dom’** Error:
        - Execute `npm install`
    - **Can’t save ‘bootstrap/dist/css/bootstrap.css’** Error:
        - Execute `npm install react-bootstrap strap` under the root directory (`Kiosk_KNU`).
    {{< /note >}}

6. Copy the files in the `build` directory and paste them into the dummy app directory. **Overwrite** the `index.html` file.

    Directory hierarchy of the dummy app will be as follows: 

    ```
    Dummy app
    |- static/
    |- appinfo.json
    |- asset-manifest.json
    |- favicon.ico
    |- icon.png
    |- index.html
    ```

#### Packaging and Installing the App

1. Go back to the directory where the dummy app is located.
2. Package the dummy app. An `.ipk` file will be generated.

    ```bash
    ares-package <PATH TO YOUR APP>

    # Example
    ares-package ./sampleApp
    ```

3. Install the `.ipk` file to the target device.

    `<TARGET DEVICE>` is the name you set using `ares-setup-device`.

    ```bash
    ares-install -d <TARGET DEVICE> <IPK FILE>

    # Example
    ares-install -d ose com.domain.app_1.0.0_all.ipk
    ```

Now, you ready to use the kiosk on the target device.

## How to Use

### Launching the Server and App

1. Connect a camera to the target device.
2. (Optional) If your host PC doesn't have built-in camera, connect a camera to your host PC.
3. Check that the host PC and target device's networks are working well.
4. Launch the server.
5. Launch the installed kiosk app.

    {{< figure src="/images/samples/solutions/advanced-kiosk-face-recognition-and-menu-recommendations/default-screen.jpg" alt="Default screen of the kiosk app" caption="" >}}

### Creating an Account

To use the face recognition, you have to create an account and register information first.

1. (On the host PC) Go to the `frontend/register` directory and execute the following command.

    ```bash
    npm start
    ```

    A registration page will be launched on the browser. 

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/bad5d665-65c0-41f3-839a-73a2b35dae78">

    After a while, face registeration process will start.

    {{< figure src="/images/samples/solutions/advanced-kiosk-face-recognition-and-menu-recommendations/register-face.png" width="40%" class="align-left" alt="Face registration process" caption="" >}}

    {{< caution >}}
    The face model is downloaded from the internet when you first register your face. We recommend **re-launching the server** after the download is complete.

    You can check the download progress on the server terminal.
    {{< /caution >}}

2. Enter your name.

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/9f5c919f-e630-4d0f-a7f3-45de15f5ada1">

3. Enter your phone number.

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f95fc192-a1fc-42a4-a2eb-70603a42dd83">

4. If you are a vegan, enable the checkbox and fill in the detailed type. And select your religion.

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/53e8d30c-6617-4c80-a175-03cce27cac87">

5. Select your allergens.

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/7ceba5d5-22c9-4ba9-9908-bc8afc0d9c2c">

    After you finish entering the allergen information, the face model will be downloaded. If it succeeds, you will see a completion page. If it failed, re-launch the server and registration page, and try it again.

    <img width="40%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/145134a1-5461-4e90-b6a1-969298c50eb9">

### Logging In and Placing an Order

Now, you can log in with your face or phone number.
    
1. Go to the target device and launch the kiosk app.
2. If you click (or touch) the login button above, you will automatically attempt to log in with facial recognition.

    <img width="50%" alt="31" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/96006ef1-7b7f-4ea8-b8b6-716abd60ff44">

    During the face recognition process, you can log in with your phone number by pressing the button below.

    <img width="50%" alt="32" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/385cee9e-9116-4d71-a9eb-f9a3565a558e">

3. If you succeed to log in, you can place an order!

    <img width="50%" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/fcae8dfa-07fb-4cf9-905b-b39231a4a340">

## Code Implementation

**Source code**: [GitHub link](https://github.com/Cheetah-19/Kiosk_KNU)

### Url.js

This file configures the server's network address.

There are two `Url.js` files in this project.

- `frontend/kiosk_page/src/constants/Url.js`: Server address setup for kiosk page
- `frontend/register/src/constants/Url.js`: Server address setup for user registration page

{{< code "Url.js" >}}
```javascript
export const BASE_URL = 'http://127.0.0.1:8000';
```
{{< /code >}}

### backend/face_recognition/extractor.py

This file specifies a pre-training model for face recognition.

{{< code "backend/face_recognition/extractor.py" >}}
```python
# recognizer
model_name = 'VGG-Face'
target_size = functions.find_target_size(model_name)
```
{{< /code >}}

#### homomorphic_filter()

This function controls image illumination.

{{< code "backend/face_recognition/extractor.py" >}}
```python
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
{{< /code >}}

#### resize_with_padding()

This function adjusts the image size to the model `target_size`.

{{< code "backend/face_recognition/extractor.py" >}}
```python
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
{{< /code >}}

#### extractor()

This function converts base64 string into embedding.

1. base64 -> image
2. image -> face
3. face -> embedding

{{< code "backend/face_recognition/extractor.py" >}}
```python
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
{{< /code >}}

### backend/face_recognition/identification.py

#### findCosineDistance()

This function calculates the distance between a user's face info and the embedding of the photo taken from the front using the cosine similarity.

{{< code "backend/face_recognition/identification.py" >}}
```python
def findCosineDistance(db_list, target):
    a = np.dot(db_list, target)
    b = np.linalg.norm(db_list, axis=1)
    c = np.sqrt(np.sum(np.multiply(target, target)))

    return 1 - (a / (b * c))
```
{{< /code >}}

#### identification()

This function returns the shortest distance between a user's face info and the embedding of the photo taken from the front.

{{< code "backend/face_recognition/identification.py" >}}
```python
def identification(db_embedding_list, target_embedding):
    return np.min(findCosineDistance(db_embedding_list, target_embedding))
```
{{< /code >}}

### backend/face_recognition/base2vector.py

#### base_to_vector()

This function converts a base64 list received from the front into an embedding list.

{{< code "backend/face_recognition/base2vector.py" >}}
```python
def base_to_vector(face_bases: list) -> list:
    embedding_list = []

    for base in face_bases:
        # base64 -> embedding
        input_embedding = extractor(base)

        if input_embedding is not None:
            embedding_list.append(input_embedding)
    return embedding_list
```
{{< /code >}}

### backend/face_recognition/checker.py

Input size must be specified according to Keras CNN model (150 x 150).

{{< code "backend/face_recognition/checker.py" >}}
```python
target_size = (150, 150)
model = load_model('./face_recognition/mask_model.h5')
```
{{< /code >}}

#### isFace()

This function determines whether your face is well detected and whether you are wearing a mask.

{{< code "backend/face_recognition/checker.py" >}}
```python
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
{{< /code >}}

### backend/login/views.py

#### post()

This function configures how facial recognition login works.

1. 5 base64 files will be POSTed through `frontend/register/src/Face.js`.
2. Convert the files: base64 -> image -> embedding.
3. Get information of all users.
4. Calculate the face info distance between embedding and user.
5. Returns the user's phone number whose distance was less than the threshold and the shortest distance.

{{< code "backend/login/views.py" >}}
```python
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
{{< /code >}}

### backend/signup/views.py

#### post()

This function checks if it is a proper face photo during the membership registration process.

{{< code "backend/signup/views.py" >}}
```python
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
{{< /code >}}

### backend/menu/recommendation.py

#### get_recommended()

This function makes menu recommendations to users based on their past orders and the ingredients of the menu. This function will not recommend menus that the user is allergic to.

{{< code "backend/menu/recommendation.py" >}}
```python
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
            past_menus.append(menu) # ex) ["Salmon Salad", "Salmon Salad", "Psyburger", "Rice Noodles", and "Rice Noodles"] It comes out as "Salmon Salad", and the more you come out twice, the higher the weight.
    

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
    # Sort menus in order of high similarity
    # sorted_menus = sorted(list(menus.keys()), key=lambda x: similar_menus[list(menus.keys()).index(x)], reverse=True)

    # Previous orders are excluded from the recommendation list
    #  recommended_menus = []
    #  for menu in sorted_menus:
    #      if menu not in past_menus:
    #         recommended_menus.append(menu)
    recommended_menus = recommended_menus[0:3]
    return recommended_menus
```
{{< /code >}}

## Contact

- Dahun Kim ([Github](https://github.com/baegopababjo)) : ekgns1106@naver.com
- Yeongjae Shin ([Github](https://github.com/Apoliasm)) : syjsir@gmail.com
- Junseok Park ([Github](https://github.com/Lucerna00)) : pjs3859811@naver.com
- Seungwoon Lee ([Github](https://github.com/Usimth)) : aji5820@naver.com
- Donghyuk Shin ([Github](https://github.com/WannaBeTop)) : optimuslove0223@icloud.com