---
title: Facial recognition-based kiosks
date: 2023-12-20
slug: facial-recognition-based-kiosks
posttype: solution
toc: true
thumbnail: th-facial-recognition-based-kiosks.png
---

## Overview of Project

The project demonstrates how to develop a face recognition-based kiosk that **recognizes the user's face** and **provides custom menu recommendations** and **menu lists**.


The kiosk app provides the following features:

- User registration
- User Recognition
- User Custom Menu Recommendations
- Kiosk Order Processing

## Prepare the Target device

You must have a target device (RPi 4) with webOS OSE. Please refer to the [Building webOS](https://www.webosose.org/docs/guides/setup/building-webos-ose/)



### Raspberry pi
* HardWare : [Raspberry PI 4 Model B 8GB](https://smartstore.naver.com/eleparts/products/4799825062?n_media=11068&n_query=%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B44&n_rank=4&n_ad_group=grp-a001-02-000000007238914&n_ad=nad-a001-02-000000229608972&n_campaign_type=2&n_mall_id=ncp_1nlzbo_01&n_mall_pid=4799825062&n_ad_group_type=2&n_match=3&NaPm=ct%3Dlpihmmrs%7Cci%3D0Au0003H1knzI6qsyfp7%7Ctr%3Dpla%7Chk%3D9ad14e585bbe9eea74201d2e1f1481527ed653e7)

* OS : [webos ose](https://github.com/webosose/build-webos/releases)

1. Download webos image from [webos ose](https://github.com/webosose/build-webos/releases) 
     <img width="899" alt="image" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/1f147666-4f88-4db0-bac5-4f7d88631648">
    {{< note >}}
    We have installed version 2-24-0 as of December 2023.
    {{< /note >}}


2. Extracting image files
    * Uncompressed using the [7-zip](https://www.7-zip.org/) program
    ![1](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/ed374a79-e867-4a87-a388-56b2023ef70f)
    * You can decompress it.

        ![2](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/03555465-ac71-4b42-b756-ee4412a94e8d) 
    * A folder called webos-ose-2-24-0-raspberrypi4-64.tar is created.
    ![3](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/f8e1629b-020f-422a-8267-04e1c93c48ce)
    * If you enter the folder, there is a .tar file, and you can proceed with decompressing it.
    ![4](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a863fbc4-99cc-4150-bea7-ab89cae26c73) 
    ![5](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/d80c904e-979f-46ca-8dd1-951add57e53c) 
    * Uncompressed creates a folder called webos-ose-2-24-0-raspberrypi4-64.
    ![6](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/be9e14e9-4aeb-4eb9-adc4-3fb449fbf6d5) 
    * When you enter the folder, you'll find a .mic file, which means the Image file is ready.


3. Formatting SD Cards
    * You can refer to it and format the SD card. - [Flashing webOS Open Source Edition](https://www.webosose.org/docs/guides/setup/flashing-webos-ose/) 
    * Windows 10 default format doesn't matter!


4. Image flushing to sd card
    * Image flushing to sd card using program : [Win 32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) 
    * Please select the .mic file obtained above, select the SD card you formatted, and press the Write button.
    ![8](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2c0252ba-a718-4e1b-9857-593a12b6f12a)
    * It's taking some time.
    ![9](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/2cf967ab-8a65-4c13-8abd-a0cec6607281)
    * Done! Now when you insert the SD card into the bottom of the raspberry pie and boot it up, WebOs will boot normally!
        {{< note >}}
        If you insert the sd card into the sd reader and insert it into USB on its own, it will not boot! Make sure you remove the sd card separately and insert it into the bottom of the raspberry pie!
        {{< /note >}}
    ![10](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/5015e33f-8ff7-44e4-8ad6-8976d0befe53)
    * If Writing Successful appears, you have successfully flushing the image on the sd card.

### Touch display

* HardWare : [Raspberry Pi Display 10.1-Inch Touch Screen LCD](https://smartstore.naver.com/mcuboard/products/5006590307?NaPm=ct%3Dlpihmuhk%7Cci%3D2d0b272112d74fa2c41384d2a3b0e4a94ff945f5%7Ctr%3Dsls%7Csn%3D186400%7Chk%3D991293f6377b661f14470419dc8bc00fa26ea908)

    ![11](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/3f2edb87-7a3c-4c05-8dd7-0b0c24286da1)
 * If you assemble the components well on the touch display and power the raspberry pie, you can see that the screen is coming out well.


### Building a CLI Environment
   1. Install Node.js [Link](https://nodejs.org/en)
    * If the installation is successful, you can check the version by executing the command below.
        
            node -v

   2. Install npm
   	* npm is included in Node.js, so if Node.js is installed successfully, npm is already available.
   	* You can check if the npm is installed well through the command below.

 	        npm -v

   3. CLI Installation
    *  Use the -g option to run the following command on the terminal to install the CLI globally.

	        npm install –g @webosose/ares-cli


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
    - IP address : You can write down the IP address of the raspberry pie.
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
   
        * app id : You can omit the app as an id that distinguishes it.
        * title : The title of the application.
        * version : You can specify a version.

        * It becomes Success, creates a folder, and you can see that it contains the settings.
   
        <img width="789" alt="14" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/6cbb0492-6400-4927-b2b6-de58753b5f09">

  3. Overwrite the built content over the folder you created (in this case 'sampleApp').
    
            npm run build

        * When you build a project, a build file will be created.
        <img width="737" alt="스크린샷 2023-12-06 오후 10 06 55" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/a133af50-dc41-4e2e-8313-7c5688a0622f">
        * You can see that a 'build' folder has been created.
        * You can 'overlay' the contents of the file inside the sampleApp folder created above.


  4. Packaging
     - You can change only the part of 'sampleApp' from the code below to the project name you want. (sampleApp = folder name)
    
	        ares-package ./sampleApp

        <img width="418" alt="15" src="https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/395c1cc3-c671-4e50-923e-6c146c8b21f2">

        * If it's Success, it's Success.
        * If you look at the picture above, there is com.domain.app_0.0.1.ipk.
        * This ipk file is the app you install on Raspberry Pie's webOS.

  5. Installation
    * In the code below, 'Raspberry' is the Devide name set by ssh set above.
	* For 'com.domain.app_0.0.1_all.ipk', write the name of the completed ipk file after packaging.
     
	        ares-install —device Rasberry com.domain.app_0.0.1_all.ipk

        * if it becomes Success, it is Success, and the application will work successfully.
  
        ![16](https://github.com/Cheetah-19/Kiosk_KNU/assets/29055106/8190f164-fd48-4206-b16b-b4ebbf5b95b2)

## Code Implementation
* If you want to see the source code, please click the [Git link](https://github.com/Cheetah-19/Kiosk_KNU)


### face_extractor.py 
* You must name the model as a linear learning model that extracts faces.

```
    # recognizer
    model_name = 'VGG-Face'
    target_size = functions.find_target_size(model_name)
```

### face_extractor.py - homomorphic_filter()
* This is a function that removes image illumination.

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

        # Finally, YUV replaces Y space with a filtered image and converts it to RGB space.
        img_YUV[:, :, 0] = img_out
        result = cv2.cvtColor(img_YUV, cv2.COLOR_YUV2BGR)

        return result
    except:
        pass
```

### face_extractor.py - resize_with_padding()
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

### face_extractor.py - extractor()
* This function converts base64 to embedding.
    1. base64 -> image
    2. image -> face
    3. face -> embedding

```
    def extractor(base64):
    # 1. base64 -> image
    

    try:
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

### face_identification.py - findCosineDistance()
* This function is a function that calculates the distance between a user's face info and the embedding of a photo taken from the front in the cosine similarity method.

```
    def findCosineDistance(db_list, target):
        a = np.dot(db_list, target)
        b = np.linalg.norm(db_list, axis=1)
        c = np.sqrt(np.sum(np.multiply(target, target)))

        return 1 - (a / (b * c))
```

### face_identification.py - identification()
* This function returns the shortest distance between a user's face info and the embedding of a photo taken from the front.

```
    def identification(db_embedding_list, target_embedding):
        return np.min(findCosineDistance(db_embedding_list, target_embedding))
```

### face_methods.py - base_to_vector(face_bases: list) -> list
* This function converts a base64 list received from the front into an embeds list.

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

### views.py - post()
* This function provides an indication of how facial recognition logins work.
    1. 5 base64 files POST via Front Face.js
    2. base64 -> image -> embedding
    3. Get information from all users
    4. Calculate the face info distance between embedding and user at number 2
    5. Returns the user's mobile phone number whose distance was less than the threshold and the shortest distance.

```
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

                    print(f"{user.user_name}: {distance}")

                    if distance < min_dist:
                        min_dist = distance

                        # 거리가 임계값보다 낮을 때만 뽑음
                        if min_dist < 0.2:
                            phonenum = user.user_phonenum
                            name = user.user_name
                except:
                    pass

            if phonenum is not None:
                print(f"\nSuccess\nname: {name}, phonenum: {phonenum}")
            else:
                print("\nNone")

            # 5. Returns the user's mobile phone number whose distance was below the threshold and the shortest distance
            return Response({"phone_number": phonenum, "name": name})
```

### run_lg()

