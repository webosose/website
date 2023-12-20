---
title: Face Certification Kiosk Using webOS
date: 2023-12-19
slug: face-certification-kiosk-using-webos
posttype: solution
toc: true
thumbnail: th-face-certification-kiosk.jpg
---

**Author: Bokyeong Ju, Minsu Lee, Yusu Noh, Hyunsoo Kim, Jinno Yun**

This project is a webOS-based kiosk sample solution that supports face recognition login and personalized recommendations.

<div align="center">
  <p align="center">
    <a href="https://youtu.be/V7H0JUiSZ7Y">🎥 View Demo (Korean)</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">🐞 Report Bug</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">💬 Request Feature</a>
  </p>
</div>

----

**Table of Contents**

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Specifications](#specifications)
- [Getting Started](#getting-started)
- [Face Recognition Code](#face-recognition-code)
- [Recommendation Algorithm and Testing](#recommendation-algorithm-and-testing)
- [Contact](#contact)

## About This Project

<p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/92e7cb81-0ae1-4640-b070-065fe28a68ec" 
         alt="User Facial Registration" 
         style="width: 49%;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/2d5b2a51-5d45-4f89-b81d-2b106f5fe7af" 
         alt="User Menu Recommendation Algorithm" 
         style="width: 49%;">
</p>


### Background

Small-scale business owners often face financial constraints that make it challenging to afford expensive kiosk solutions. Therefore, there is a growing need for affordable, open-source kiosk solutions that can be easily implemented.

This project is a kiosk demo that **recommends menus to customers** and **dynamically updates the menu list**.

### Architecture Overview

{{< figure src="https://github.com/noFlowWater/signage_solution/assets/112642604/248f7596-9c3f-4de7-a14a-638547a09816" link="https://github.com/noFlowWater/signage_solution/assets/112642604/248f7596-9c3f-4de7-a14a-638547a09816" target="_blank" alt="" caption="System Architecture (Click image to open larger view)" >}}

{{< figure src="https://github.com/noFlowWater/signage_solution/assets/112642604/db15a09a-faa7-4797-8f58-b865d7965681" link="https://github.com/noFlowWater/signage_solution/assets/112642604/db15a09a-faa7-4797-8f58-b865d7965681" target="_blank" alt="" caption="Database Entity Relationship Diagram (Click image to open larger view)" >}}

### Key Features

#### User Verification

User verification with face recognition works in the following steps:

1. The kiosk's camera captures the image of the customer.
2. The captured image is sent to an image process server for user identification.
3. The server checks to see if the customer is a returning visitor with a payment history.
    1. If the customer has ever visited, the kiosk shows personalized menus to the customer and dynamically updates the menu list.
    2. If not, the kiosk provides an alternative authentication method to the customer.

#### Personalized Menu Recommendations

Once customers register their data, the kiosk will recommend a customized menu for each customer.

- Data registration is performed on both the kiosk and server database.
- The web app offers personalized menu recommendations based on the customer data.
- The recommended menus will be changed based on customer data (for example, allergies).
- [User-based collaborative filtering](https://www.geeksforgeeks.org/user-based-collaborative-filtering/) is used as the recommendation algorithm. It is based on the order history of registered customers.

### Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | [![React][React.js]][React-url][![npm][npm]][npm-url][![Bootstrap][Bootstrap.com]][Bootstrap-url][![JavaScript][JavaScript.js]][JavaScript-url][![Figma][Figma]][Figma-url] |
| Face Identify Server | [![Flask][Flask]][Flask-url][![OpenCV][OpenCV]][OpenCV-url][![Python][Python.org]][Python-url] |
| Kiosk API Server | [![Nodejs][Nodejs]][Nodejs-url][![npm][npm]][npm-url][![Prisma][Prisma]][Prisma-url][![JavaScript][JavaScript.js]][JavaScript-url] |
| Database | [![MySQL][MySQL]][MySQL-url][![Prisma][Prisma]][Prisma-url] |
| Development Environment | [![macOS][macOS]][macOS-url] |

## Hardware Requirements

For setting up this project, you need a **client device** and **host PC**.

### Client Device

We used a Raspberry Pi 4 with webOS OSE as the client device.

<dl>
<dt>Raspberry Pi 4 Model B 4GB (+@)</dt>
<dd>The core computing unit for the kiosk.</dd>
<dt>MicroSD Card with webOS OSE Image</dt>
<dd>To use the webOS OSE on the Raspberry Pi 4, a MicroSD card is used.<ul><li><strong>webOS OSE 2.24.0</strong> is used in this project. You can get the pre-built image in <a href="https://github.com/webosose/build-webos/releases/tag/v2.24.0">webOS OSE GitHub</a>.</li><li>To install a webOS OSE image on a MicroSD card, use the following guide  <a href="https://www.webosose.org/docs/guides/setup/flashing-webos-ose/">Flashing webOS OSE</a>.</li></ul></dd>
<dt>Touchscreen or Monitor</dt>
<dd>The display device that interacts with the kiosk. We recommend using a touchscreen for a more interactive experience. We use <a href="https://www.icbanq.com/P009842845">this (Korean website)</a>.</dd>
<dt>Webcam</dt>
<dd>An essential component for facial recognition or other interactive features. Make sure that your camera is compatible with the Raspberry Pi 4.</dd>
<dt>Optional Input Devices</dt>
<dd>Devices like a keyboard and mouse for initial setup and troubleshooting.</dd>
<dt>Power Supply and Cables</dt>
<dd>A power supply suitable for your Raspberry Pi and screen, and cables such as HDMI for connectivity.</dd>
</dl>

### Host PC

Our team developed this project using Apple silicon computers. To ensure compatibility, **we recommend using a similar Apple silicon-based environment** for development. The followings are the specs for the computer we used:
- SoC: Apple Silicon (M1, M1 Pro, M1 Max, or later)
- OS: macOS Big Sur or later
- Memory: 8GB or more
- Storage: 256GB or higher

## Installation

This section describeds how to set up this project on your client device and host PC.

{{< note "Before You Begin" >}}
- This guide is based on using **a single host PC**. It can also be adapted for multi-server environments to efficiently accommodate both centralized and distributed systems.
- To process data effectively, we recommend hosting both the **Flask application** and **database** on the same computer. This reduces latency and improves operational efficiency, especially for larger, user-specific models.
{{< /note >}}

1. Clone the repository.

   ```sh
   git clone https://github.com/noFlowWater/signage_solution.git
   ```
   
2. Move into the cloned directory.

    ```sh
    cd signage_solution
    ```

    After moving into the directory, you will find the following three directories: 

    ```sh
    signage_solution
      |- flask
      |- nodejs
      |- react_signage
      |- ...
    ```

3. Follow the guides in the following links:

    1. [Getting Started - NodeJS Kiosk-API Server & Init Database](https://github.com/noFlowWater/signage_solution/tree/main/nodejs/README.md)
    2. [Getting Started - Face Recognition Server](https://github.com/noFlowWater/signage_solution/tree/main/flask/README.md)
    3. [Getting Started - React App](https://github.com/noFlowWater/signage_solution/tree/main/react_signage/README.md)

    Each link has step-by-step setup guide for `nodejs`, `flask`, and `react_signage` directories.

## Face Recognition Code

Reference GitHub: [Facial Recognition Repository](https://github.com/subhamroy021/Facial-Recognition.git)

- Pre-trained XML file using the Haar Algorithm.
  Download the classifier for face detection from the link below:
  - Link: [Haarcascades on GitHub](https://github.com/opencv/opencv/tree/master/data/haarcascades)

### What is LBPHFaceRecognizer?
LBPH stands for Local Binary Patterns Histograms.
<br/>
The LBP algorithm represents the surrounding values in binary, calculating the value subsequently.
<br/>
Binary values are generated based on the relative brightness difference between the central pixel and its neighbors. 
<br/>
If a neighboring pixel is brighter than the center, it's represented as 1; otherwise, 0.
<br/>
This binary number is used to extract texture features of each pixel.
<br/>

It's a face recognition model library supported by OpenCV using this algorithm.
<p align="center">
  <img src="/images/samples/solutions/face-recognize-kiosk/LBP_1.jpeg" 
       alt="LBP_1" 
       style="width: 70%;">
</p>
<p align="center">
  <img src="/images/samples/solutions/face-recognize-kiosk/LBP_2.jpeg"    
       alt="LBP_2"
       style="width: 90%;">
</p>

>[image source link](https://towardsdatascience.com/face-recognition-how-lbph-works-90ec258c3d6b)


- Related Link: [LBPHFaceRecognizer in OpenCV](https://docs.opencv.org/4.7.0/df/d25/classcv_1_1face_1_1LBPHFaceRecognizer.html)
<br/>


- `face_detector` function for face detection:
```python
import cv2
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def face_detector(img, size = 0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5,minSize=(210,210)) #얼굴 최소 크기. 이것보다 작으면 무시

    if faces is():
        return img,[]

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y),(x+w,y+h),(0,255,255),2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))

    return img,roi
```
1. Load the `haarcascade_frontalface_default.xml` classifier using `cv2.CascadeClassifier` from OpenCV.
2. The `face_detector` function performs face detection on the input image.
3. First, convert the image to grayscale (`cv2.cvtColor`).
4. Use the `detectMultiScale` function to detect faces in the image, returning the position and size of each face.
5. For detected faces, draw rectangles on the image to highlight the faces (`cv2.rectangle`).



- `receive_data` process client-sent image data for user registration:
  ```python
  @socketio.on("data_for_storage")
  def receive_data(client_id,data):
      image = data.get("image")
      phone_number = data.get("phoneNumber")
      name = data.get("name")
  
      if phone_number not in user_counts:
          user_counts[phone_number] = 0
  
      # global face_detected_count
      try:
          # Decode the base64-encoded image data
          face = base64_to_image(image)
          image, roi = face_detector(face)  # roi는 사용하지 않으므로 무시합니다.
          if len(roi) > 0: #얼굴이 1개 이상 검출 시,
              # Face detected, increment the count
              # face_detected_count 증가
              user_counts[phone_number] += 1
              if user_counts[phone_number] <= 100:
                  print(str(user_counts[phone_number]) +" / "+name +" / "+ phone_number +" / "+ client_id)
                  # Optionally, emit the processed image with face boxes back to the client
                  _, buffer = cv2.imencode('.jpg', image)
                  processed_image = base64.b64encode(buffer).decode('utf-8')
                  emit("processed_image", f"data:image/jpeg;base64,{processed_image}", room=client_id)
                  # Save the image to the server
                  createFolder(f'./temp/{phone_number}')
                  cv2.imwrite(f'./temp/{phone_number}/{user_counts[phone_number]}.jpg', roi)
                  # Optionally, emit a message indicating a successful save
                  # emit("image_saved", {"count": face_detected_count})
              else:
                  # If 100 images have been saved, you can emit a message to stop sending images
                  emit("stop_sending", {"message": "100 face images have been saved"}, room=client_id)
  
                  # 모델 100장 학습 시키고
                  data_path = f'./temp/{phone_number}/'
                  onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path,f))]
  
                  Training_Data, Labels = [], []
  
                  for i, files in enumerate(onlyfiles):
                      image_path = data_path + onlyfiles[i]
                      images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                      Training_Data.append(np.asarray(images, dtype=np.uint8))
                      Labels.append(i)
                  try:
                      Labels = np.asarray(Labels, dtype=np.int32)
                      model = cv2.face.LBPHFaceRecognizer_create()
                      model.train(np.asarray(Training_Data), np.asarray(Labels))
                      # 모델 저장
                      model.save(f'./temp/{phone_number}/trained_model_{phone_number}.yml')
                      print(f"{phone_number}'s Model Training Complete!!!!!")
  
                      # 전달받은 유저 아이디에 매핑되게 디비에 저장
                      # 모델 파일을 이진 형식으로 읽기
                      with open(f'./temp/{phone_number}/trained_model_{phone_number}.yml', 'rb') as file:
                          model_data = file.read()
                      
                      userId = str(uuid.uuid4())
                      # 데이터베이스에 사용자 정보와 모델 데이터 저장
                      insert_user_query = "INSERT INTO User (user_id, user_name, phoneNumber, user_face_model) VALUES (%s, %s, %s, %s)"
                      cursor.execute(insert_user_query, (userId, name, phone_number, model_data))
                      conn.commit()
  
                      # 성공한 경우
                      print(f"> User {name} with phone number {phone_number} has been successfully registered.")
                      emit("registration_result", {"status": "success",
                                                  "message": "registered successfully",
                                                  "user_id": f"{userId}",
                                                  "name": f"{name}",
                                                  "phone_number": f"{phone_number}"}, room=client_id)
                  except Exception as e:
                      # 실패한 경우
                      print(f"> An error occurred during user registration: {e}")
                      emit("registration_result", {"status": "failed",
                                   "error": str(e)}, room=client_id)
                      
                  # 경로에 있는 이미지와 경로 삭제
                  temp_path = f'./temp/{phone_number}'
                  shutil.rmtree(temp_path)
                  print(f"Images and directory {temp_path} have been deleted")
                  # 등록완료!
                  
          else:
              # No face detected, optionally emit a message indicating failure to detect a face
              emit("face_not_detected", {"message": "No face detected in the image"}, room=client_id)
      except Exception as e:
          print(f"An error occurred: {e}")
  ```

1. Use the `@socketio.on("data_for_storage")` decorator to **set as event handler**.
2. Extract data such as images, phone numbers, and names.
3. Decode the Base64-encoded image data and **detect faces** using the `face_detector` function.
4. Count the number of times a face is detected and **temporarily store the image on the server**.
5. When 100 images of a specific user are collected, use them to **train a face recognition model**.
6. **Save the trained model in the database**.
7. If **user registration is successful**, **transmit the result to the client**.


<h3 align="center">🖼️ Register user's face 🖼️</h3>
<p align="center">
    <img style="width: 90%;" alt="User Face Registration" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f4fa27ea-f77b-4dc8-8914-bfe9d90eddf7">
</p>

- `load_user_models` loads face recognition models from the database into the global `users_models` list, executed on the server before clients send images:
  ```python
  def load_user_models(cursor):
    """
    Load user models from the database and add them to the global users_models list.
    :param cursor: Database cursor to execute the query
    """
    global users_models

    try:
        # 모든 사용자의 모델 데이터와 이름 검색
        fetch_models_query = "SELECT user_id, user_name, user_face_model FROM User"
        cursor.execute(fetch_models_query)

        # 검색 결과 처리
        for (user_id, user_name, model_data) in cursor.fetchall():
            # 이미 리스트에 모델이 있는지 확인
            if any(user_id == loaded_id for loaded_id, _, _ in users_models):
                continue  # 이미 로드된 모델이면 건너뛰기
            
            temp_model_path = f"temp_model_{user_id}.yml"
            with open(temp_model_path, "wb") as file:
                file.write(model_data)

            # 모델 로드
            model = cv2.face.LBPHFaceRecognizer_create()
            model.read(temp_model_path)

            # 모델과 사용자 이름을 튜플로 묶어 리스트에 추가
            users_models.append((user_id, user_name, model))

            # 로드된 임시 파일 삭제
            os.remove(temp_model_path)

        # 사용자 모델 로드 확인
        for user_id, user_name, model in users_models:
            print(f"Model for {user_name} (ID: {user_id}) loaded.")
        return True

    except Exception as e:
        print(f"An error occurred while loading user models: {e}")
        return False
  ```
1. Search for model data and names of all users stored in the database.
2. For each found user, save their model data to a temporary file and load it as a face recognition model in OpenCV.
3. Add the loaded models to the `users_models` list with user IDs and names, then delete the temporary files.
4. Verify the successful loading of all user models.


- `recognize_face_in_image` identifies faces in images and returns the user with the highest confidence, aiding in user authentication within `handle_image_upload`:
  ```python
  def recognize_face_in_image(image):
    """
    Recognizes a face in the given image using the users_models list.
    Returns the user ID, name, and confidence of the most recognized user.
    """
    highest_confidence = 0
    recognized_user_id = None
    recognized_user_name = ""

    for user_id, user_name, model in users_models:
        result = model.predict(image)
        confidence = int(100 * (1 - (result[1]) / 300))
        if confidence > highest_confidence:
            highest_confidence = confidence
            recognized_user_id = user_id
            recognized_user_name = user_name

    return recognized_user_id, recognized_user_name, highest_confidence
  ```

1. Use face recognition models from the global `users_models` list to **predict faces in images**.
2. **Calculate confidence scores** from the results of each model, reflecting how similar the user is to the detected face.
3. Determine and return the ID and name of the user with the **highest confidence**.


- `determine_most_recognized_user` analyzes temporarily stored images for a given client ID to determine the most recognized user, playing a key role in user authentication within `handle_image_upload`.
  ```python
  def determine_most_recognized_user(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    user_predictions = Counter()

    if os.path.exists(client_dir):
        for filename in os.listdir(client_dir):
            # 파일 이름에서 인식된 사용자 ID와 이름 추출
            parts = filename.split('_')
            recognized_user_id = parts[0]
            recognized_user_name = parts[1]

            user_predictions[(recognized_user_id, recognized_user_name)] += 1

    # 가장 많이 예측된 사용자의 ID와 이름 찾기
    if user_predictions:
        (most_common_user_id, most_common_user_name), _ = user_predictions.most_common(1)[0]
        return most_common_user_id, most_common_user_name
    else:
        return None, None  # 예측된 사용자가 없는 경우
  ```

1. Check for the existence of a temporary image directory for the client ID.
2. Analyze each image file's name to extract recognized users' IDs and names, tallying their recognition frequency.
3. Use a `Counter` object to determine and return the ID and name of the most recognized user.
   


- `handle_image_upload` processes images sent by clients for **user recognition and authentication**:
  ```python
  @socketio.on('upload_image')
  def handle_image_upload(client_id, data):
      image_data = data['image']
      
      # 유저가 처음 데이터를 보내는 경우, 딕셔너리에 초기값 0 설정
      if client_id not in client_face_counts:
          client_face_counts[client_id] = 0
  
      face = base64_to_image(image_data)
      image, face = face_detector(face)
      try:
          if len(face) > 0:
              face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
  
              recognized_user_id, recognized_user_name, highest_confidence = recognize_face_in_image(face)
              
              if highest_confidence > 75:
                  # 30장의 사진이 모였는지 확인
                  if client_face_counts[client_id] >= 30:
                      # 이미지가 30장 미만이면 함수를 종료합니다.
                      if not is_30_images_collected(client_id):
                          return
                      
                      emit("stop_sending", {"message": "30 face images have been saved"}, room=client_id)
                      
                      # 예측값 집계
                      most_common_user_id, most_common_user_name = determine_most_recognized_user(client_id)
                      
                      # 클라이언트에 결과 반환
                      emit('user_recognized', {
                                                  'predicted_user_name': most_common_user_name, 
                                                  'predicted_user_id':most_common_user_id
                                              }, room=client_id)
                      print(f">>> most_common_user : {most_common_user_name}")
  
                      # 임시 저장소 정리
                      clear_temp_storage(client_id)
                  else:
                      image = putTextWithKorean(image, f"Unlocked: {recognized_user_name} / {highest_confidence}", (75, 200), korean_font_path, 20, (0, 255, 0))
                      # 얼굴 인식 횟수 증가 및 임시 이미지 저장
                      client_face_counts[client_id] += 1
                      emit("send_success", {"message": f"{client_face_counts[client_id]}send_success"}, room=client_id)
                      save_temp_image(client_id, face, recognized_user_id, recognized_user_name)
                      print("!", end="")
                      sys.stdout.flush()  # 수동으로 flush   
              else:
                  image = putTextWithKorean(image, "Locked", (75, 200), korean_font_path, 20, (0, 0, 255))
          else:
              image = putTextWithKorean(image, "Face Not Found", (75, 200), korean_font_path, 20, (255, 0, 0))
          
          # 이미지 처리 및 송출
          frame_resized = cv2.resize(image, (640, 360))
          encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
          _, frame_encoded = cv2.imencode(".jpg", frame_resized, encode_param)
          processed_img_data = base64.b64encode(frame_encoded).decode()
          b64_src = "data:image/jpg;base64,"
          processed_img_data = b64_src + processed_img_data
          emit("image_processed", processed_img_data, room=client_id)
              
      except Exception as e:
          print(f"Error: {e}")
  ```


1. Use the `@socketio.on('upload_image')` decorator to **set as event handler**.
2. **Detect faces** in the image using the `face_detector` function.
3. Call the `recognize_face_in_image` function to **identify the user and calculate confidence** based on the recognized face.
4. If confidence meets a certain threshold, temporarily store the user's image on the server. Use stored images (up to 30) to **determine the most recognized user** (using `determine_most_recognized_user`).
5. If confidence is low or no face is detected, display a corresponding message on the image.
6. **Transmit the processed image to the client** after resizing, encoding, and converting to Base64.
<h3 align="center">🖼️ User Authentication 🖼️</h3>
<p align="center" style="display: flex; justify-content: space-between;">
  <img style="width: 49%;" alt="사용자 인식" src="https://github.com/noFlowWater/signage_solution/assets/112642604/999e78e4-031e-4ee0-885a-2683735138b9">
  <img style="width: 49%;" alt="사용자 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f8ba2823-7dd0-420a-8adc-106e66505853">
</p>
  




## Recommendation Algorithm and Testing

### Algorithm Overview

In this project, collaborative user filtering is utilized. The algorithm measures the similarity of order histories among users to select N similar users. It then analyzes the order histories of these N users to recommend the most frequently ordered menu item. The algorithm primarily employs jaccard similarity to measure the similarity between users and selects the recommendation target based on this similarity.

### Algorithm Flow

1. **Measuring User Similarity**: Pairing all users in the database and calculating jaccard similarity to select N users with similar order histories.
2. **Recruiting Similar Users**: Using cosin jaccard similarity as a criterion, selecting the top N users with the highest similarity.
3. **Order History Analysis**: Summarizing the order histories of the selected N users and calculating the frequency of each menu item.
4. **Selecting Recommended Menu**: Choosing the menu item with the highest frequency as the recommended item.

### recommend.js

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


### Algorithm features and a point of note

Our recommended algorithm aims to provide users with menu suggestions based on user-based collaborative filtering, extracting similar users who have tried menus that the target user has not yet experienced. However, there are situations in which the recommendation algorithm may not function effectively.

**1. When the user has never placed an order:**<br/>
In this scenario, it is challenging to extract similar users, as the algorithm relies on user history. Consequently, the recommendation algorithm may not operate optimally when the user has not placed any orders.

**2. When the user has a diverse history of tried menus:**<br/>
Our algorithm selects menus that the user has not tried yet. However, if the user has a wide variety of tried menus, it becomes difficult to make recommendations. In such cases, the algorithm may not be able to provide suggestions effectively.<br/><br/>
Please be mindful of these potential limitations in the algorithmic process, as they could lead to instances where the recommendation process does not yield results.

### Testing Method
First, we confirmed that similarity is correct by logging.<br/>
Second,Testing focuses on using dummy data to verify the accuracy and efficiency of the algorithm. Multiple tests are conducted to ensure that the expected results are achieved. Necessary measures are taken to improve the algorithm's performance based on the test results.


#### Test Data Example:

- A: Ordered 5 bowls of ramen
- B: Ordered 5 bowls of ramen, 3 pork cutlets
- C: Ordered 5 bowls of ramen, 10 cheese pork cutlets (highest order frequency)
- D: Ordered 5 bowls of ramen, 2 rice cakes in spicy sauce
- E: Ordered 5 rolls of gimbap

#### Test Configuration:

- Set N=3 to select the top 3 users with the highest similarity.
- Combine the order histories of selected users B, C, D to recommend the most frequently ordered menu.

### Expected Results
First, we saw results and contents by logging:<br/>
![recommend1](/images/samples/solutions/face-recognize-kiosk/recommend1.png)
![recommend2](/images/samples/solutions/face-recognize-kiosk/recommend2.png)

Next, The anticipated results from the test are as follows:

- Similar Users: B, C, D
- Combined Order History: 15 bowls of ramen, 3 pork cutlets, 10 cheese pork cutlets, 2 rice cakes in spicy sauce, 5 rolls of gimbap
- Recommended Menu: Cheese Pork Cutlets (most frequently ordered)

If the results align with expectations, it confirms the accuracy of the algorithm.

### Future Improvements

If any performance issues or accuracy concerns are identified during testing, efforts will be made to address those areas and enhance the algorithm for better efficiency and accuracy.


<!-- CONTACT -->
## Contact

### 💡 노유수 ([noFlowWater](https://github.com/noFlowWater)) : [noyusu98@gmail.com](mailto:noyusu98@gmail.com)

### 💡 주보경 ([jupyter1234](https://github.com/jupyter1234)) : [wntjdals0412@gmail.com](mailto:wntjdals0412@gmail.com)

### 💡 윤진노 ([jinno321](https://github.com/jinno321)) : [jinno5522@gmail.com](mailto:jinno5522@gmail.com)

### 💡 이민수 ([ohyatt](https://github.com/ohyatt)) : [minsoo030232@gmail.com](mailto:minsoo030232@gmail.com)

### 💡 김현수 ([beoldshoe](https://github.com/beoldshoe)) : [howeve18@gmail.com](mailto:howeve18@gmail.com)


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
