---
title: Face Certification Kiosk Using webOS
date: 2023-12-21
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
- The web app offers personalized menu recommendations based on customer data.
- The recommended menus will be changed based on customer data (for example, allergies).
- [User-based collaborative filtering](https://www.geeksforgeeks.org/user-based-collaborative-filtering/) is used as the recommendation algorithm. It is based on the order history of registered customers.

### Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | [![React][React.js]][React-url][![npm][npm]][npm-url][![Bootstrap][Bootstrap.com]][Bootstrap-url][![Socket.io][Socket.io]][Socket.io-url][![JavaScript][JavaScript.js]][JavaScript-url][![Figma][Figma]][Figma-url] |
| Face Identify Server | [![Flask][Flask]][Flask-url][![OpenCV][OpenCV]][OpenCV-url][![Socket.io][Socket.io]][Socket.io-url][![Python][Python.org]][Python-url] |
| Kiosk API Server | [![Nodejs][Nodejs]][Nodejs-url][![npm][npm]][npm-url][![Prisma][Prisma]][Prisma-url][![JavaScript][JavaScript.js]][JavaScript-url] |
| Database | [![MySQL][MySQL]][MySQL-url][![Prisma][Prisma]][Prisma-url] |
| Development Environment | [![macOS][macOS]][macOS-url] |

## Hardware Requirements

To set up this project, you need a **client device** and **host PC**.

### Client Device

We used a Raspberry Pi 4 with webOS OSE as the client device.

<dl>
<dt>Raspberry Pi 4 Model B 4GB (+@)</dt>
<dd>The core computing unit for the kiosk.</dd>
<dt>MicroSD Card with webOS OSE Image</dt>
<dd>To use the webOS OSE on the Raspberry Pi 4, a MicroSD card is used.<ul><li><strong>webOS OSE 2.24.0</strong> is used in this project. You can get the pre-built image in <a href="https://github.com/webosose/build-webos/releases/tag/v2.24.0">webOS OSE GitHub</a>.</li><li>To install a webOS OSE image on a MicroSD card, use the following guide: <a href="https://www.webosose.org/docs/guides/setup/flashing-webos-ose/">Flashing webOS OSE</a>.</li></ul></dd>
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

Our team developed this project using Apple silicon computers. To ensure compatibility, **we recommend using a similar Apple silicon-based environment** for development. The following are the specs for the computer we used:
- SoC: Apple Silicon (M1, M1 Pro, M1 Max, or later)
- OS: macOS Big Sur or later
- Memory: 8GB or more
- Storage: 256GB or higher

## Installation

This section describes how to set up this project on your client device and host PC.

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

    Each link has a step-by-step setup guide for `nodejs`, `flask`, and `react_signage` directories. You **MUST be set in the order of the links above**.  

## Source Code

### Face Recognition

- Reference GitHub: [Facial Recognition Repository](https://github.com/subhamroy021/Facial-Recognition.git)
- A pre-trained XML file using the Haar Algorithm is used (`haarcascade_frontalface_default.xml`). You can download the classifier for face detection from [Haarcascades on GitHub](https://github.com/opencv/opencv/tree/master/data/haarcascades).

#### LBPHFaceRecognizer

**LBPHFaceRecognizer** is a face recognition model library supported by OpenCV ([link](https://docs.opencv.org/4.7.0/df/d25/classcv_1_1face_1_1LBPHFaceRecognizer.html)). **Local Binary Patterns Histograms (LBPH)** represents the surrounding values in binary, calculating the values subsequently.

Binary values are generated based on the relative brightness difference between the central pixel and its neighbors. If a neighboring pixel is brighter than the center, it's represented as 1; otherwise, 0. This binary number is used to extract the texture features of each pixel.

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

> [image source link](https://towardsdatascience.com/face-recognition-how-lbph-works-90ec258c3d6b)

#### face_detector

`face_detector` function for face detecting.


{{< code "flask/app.py" >}}
``` python
import cv2
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def face_detector(img, size = 0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5,minSize=(210,210)) # Minimum size for face detecting. If less than this, ignore it.

    if faces is():
        return img,[]

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y),(x+w,y+h),(0,255,255),2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))

    return img,roi
```
{{< /code >}}

1. Load the `haarcascade_frontalface_default.xml` classifier using `cv2.CascadeClassifier` from OpenCV.
2. `face_detector` detects faces on the input image.
    1. Convert the image to grayscale (`cv2.cvtColor`).
    2. `detectMultiScale` detects faces in the image and returns the position and size of each face.
    3. For detected faces, draw rectangles on the image to highlight the faces (`cv2.rectangle`).

#### receive_data

`receive_data` processes image data sent by the client for user registration.

{{< code "flask/app.py">}}
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
        image, roi = face_detector(face)  # Ignore roi
        if len(roi) > 0: # If more than one face is detected,
            # Face detected, increment the count
            # Increase face_detected_count
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

                # Train 100 models
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
                    # Save model
                    model.save(f'./temp/{phone_number}/trained_model_{phone_number}.yml')
                    print(f"{phone_number}'s Model Training Complete!!!!!")

                    # Store the image in the database so that it maps to the user ID passed in
                    # Read the model files in binary format
                    with open(f'./temp/{phone_number}/trained_model_{phone_number}.yml', 'rb') as file:
                        model_data = file.read()
                    
                    userId = str(uuid.uuid4())
                    # Store the user information and model data into the database
                    insert_user_query = "INSERT INTO User (user_id, user_name, phoneNumber, user_face_model) VALUES (%s, %s, %s, %s)"
                    cursor.execute(insert_user_query, (userId, name, phone_number, model_data))
                    conn.commit()

                    # If successful
                    print(f"> User {name} with phone number {phone_number} has been successfully registered.")
                    emit("registration_result", {"status": "success",
                                                "message": "registered successfully",
                                                "user_id": f"{userId}",
                                                "name": f"{name}",
                                                "phone_number": f"{phone_number}"}, room=client_id)
                except Exception as e:
                    # If failed
                    print(f"> An error occurred during user registration: {e}")
                    emit("registration_result", {"status": "failed",
                                  "error": str(e)}, room=client_id)
                    
                # Delete images and those paths
                temp_path = f'./temp/{phone_number}'
                shutil.rmtree(temp_path)
                print(f"Images and directory {temp_path} have been deleted")
                # Registeration complete!
                
        else:
            # No face detected, optionally emit a message indicating failure to detect a face
            emit("face_not_detected", {"message": "No face detected in the image"}, room=client_id)
    except Exception as e:
        print(f"An error occurred: {e}")
```
{{< /code >}}

1. Use the `@socketio.on("data_for_storage")` decorator as an **event handler**.
2. Extract data such as images, phone numbers, and names.
3. Decode the Base64-encoded image data and **detect faces** using the `face_detector` function.
4. Count the number of times a face is detected and **temporarily store the image on the server**.
5. When 100 images of a specific user are collected, use them to **train a face recognition model**.
6. **Store the trained model in the database**.
7. If user registration is successful, **transmit the result to the client**.

{{< figure src="https://github.com/noFlowWater/signage_solution/assets/112642604/f4fa27ea-f77b-4dc8-8914-bfe9d90eddf7" alt="" caption="Registering User Face" >}}


#### load_user_models

`load_user_models` loads face recognition models from the database into the global `users_models` list. This is executed on the server before the client sends images.

{{< code "flask/app.py" >}}
```python
def load_user_models(cursor):
  """
  Load user models from the database and add them to the global users_models list.
  :param cursor: Database cursor to execute the query
  """
  global users_models

  try:
      # Find model data and names for all users
      fetch_models_query = "SELECT user_id, user_name, user_face_model FROM User"
      cursor.execute(fetch_models_query)

      # Process search result
      for (user_id, user_name, model_data) in cursor.fetchall():
          # Check if the model is already contained in the list
          if any(user_id == loaded_id for loaded_id, _, _ in users_models):
              continue  # Skip if the model has already loaded
          
          temp_model_path = f"temp_model_{user_id}.yml"
          with open(temp_model_path, "wb") as file:
              file.write(model_data)

          # Load model
          model = cv2.face.LBPHFaceRecognizer_create()
          model.read(temp_model_path)

          # Create a tuple of models and usernames and add it to the list
          users_models.append((user_id, user_name, model))

          # Delete loaded temp models
          os.remove(temp_model_path)

      # Verify that the user model is loaded
      for user_id, user_name, model in users_models:
          print(f"Model for {user_name} (ID: {user_id}) loaded.")
      return True

  except Exception as e:
      print(f"An error occurred while loading user models: {e}")
      return False
```
{{< /code >}}

1. Search for model data and names of all users stored in the database.
2. For each found user, save their model data to a temporary file and load it as a face recognition model in OpenCV.
3. Add the loaded models to the `users_models` list with user IDs and names, then delete the temporary files.
4. Verify the successful loading of all user models.

#### recognize_face_in_image

`recognize_face_in_image` identifies faces in images and returns the user with the highest confidence, aiding in user authentication within `handle_image_upload`.

{{< code "flask/app.py" >}}
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
{{< /code >}}

1. Use face recognition models from the global `users_models` list to **predict faces in images**.
2. **Calculate confidence scores** from the results of each model, reflecting how similar the user is to the detected face.
3. Determine and return the ID and name of the user with the **highest confidence**.

#### determine_most_recognized_user

`determine_most_recognized_user` analyzes temporarily stored images for a given client ID to determine the most recognized user, playing a key role in user authentication within `handle_image_upload`.


{{< code "flask/app.py" >}}
```python
def determine_most_recognized_user(client_id):
  client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
  user_predictions = Counter()

  if os.path.exists(client_dir):
      for filename in os.listdir(client_dir):
          # Extract user ID and name from the file name
          parts = filename.split('_')
          recognized_user_id = parts[0]
          recognized_user_name = parts[1]

          user_predictions[(recognized_user_id, recognized_user_name)] += 1

  # Find ID and name of the most predicted user
  if user_predictions:
      (most_common_user_id, most_common_user_name), _ = user_predictions.most_common(1)[0]
      return most_common_user_id, most_common_user_name
  else:
      return None, None  # If there are no predicted users
```
{{< /code >}}

1. Verify that a temporary image directory exists for the client ID.
2. Extract the user's ID and name from the name of each image file and count the frequency of recognition.
3. Use a `Counter` object to determine and return the ID and name of the most recognized user.

#### handle_image_upload

`handle_image_upload` processes images sent by clients for **user recognition and authentication**:

{{< code "flask/app.py" >}}
```python
@socketio.on('upload_image')
def handle_image_upload(client_id, data):
    image_data = data['image']
    
    # If a user sends data for the first time, set the intial value 0 to the dictionary
    if client_id not in client_face_counts:
        client_face_counts[client_id] = 0

    face = base64_to_image(image_data)
    image, face = face_detector(face)
    try:
        if len(face) > 0:
            face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

            recognized_user_id, recognized_user_name, highest_confidence = recognize_face_in_image(face)
            
            if highest_confidence > 75:
                # Check that 30 photos have been collected
                if client_face_counts[client_id] >= 30:
                    # If the number of collected images is below 30, stop the function
                    if not is_30_images_collected(client_id):
                        return
                    
                    emit("stop_sending", {"message": "30 face images have been saved"}, room=client_id)
                    
                    # Gather predicted values
                    most_common_user_id, most_common_user_name = determine_most_recognized_user(client_id)
                    
                    # Return the result to the client
                    emit('user_recognized', {
                                                'predicted_user_name': most_common_user_name, 
                                                'predicted_user_id':most_common_user_id
                                            }, room=client_id)
                    print(f">>> most_common_user : {most_common_user_name}")

                    # Clear temp storages
                    clear_temp_storage(client_id)
                else:
                    image = putTextWithKorean(image, f"Unlocked: {recognized_user_name} / {highest_confidence}", (75, 200), korean_font_path, 20, (0, 255, 0))
                    # Increase the number of face detections and store temporary images
                    client_face_counts[client_id] += 1
                    emit("send_success", {"message": f"{client_face_counts[client_id]}send_success"}, room=client_id)
                    save_temp_image(client_id, face, recognized_user_id, recognized_user_name)
                    print("!", end="")
                    sys.stdout.flush()  # Manual flush
            else:
                image = putTextWithKorean(image, "Locked", (75, 200), korean_font_path, 20, (0, 0, 255))
        else:
            image = putTextWithKorean(image, "Face Not Found", (75, 200), korean_font_path, 20, (255, 0, 0))
        
        # Process and send the images
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
{{< /code >}}

1. Use the `@socketio.on('upload_image')` decorator as an **event handler**.
2. **Detect faces** in the image using the `face_detector` function.
3. Using the `recognize_face_in_image` function, **identify the user and calculate confidence** based on the recognized face.
4. If confidence meets a certain threshold, store the user's image on the server temporarily. 

    Use stored images (up to 30) to **determine the most recognized user**.<br />(using `determine_most_recognized_user`)

5. If confidence is low or no face is detected, display a corresponding message on the image.
6. Resize, encode, and convert the image into the Base64 format.
7. **Send the processed image to the client**.

<p align="center" style="display: flex; justify-content: space-between;">
  <img style="width: 49%;" alt="Detecting user" src="https://github.com/noFlowWater/signage_solution/assets/112642604/999e78e4-031e-4ee0-885a-2683735138b9">
  <img style="width: 49%;" alt="Verifying user" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f8ba2823-7dd0-420a-8adc-106e66505853">
</p>

### Recommendation Algorithm

In this project, [**user-based collaborative filtering**](https://en.wikipedia.org/wiki/Collaborative_filtering) is used for the recommendation algorithm.

The algorithm measures the order history similarity among users and selects N similar users It analyzes the order history of these N users to recommend the most frequently ordered menu. The algorithm uses [Jaccard similarity](https://en.wikipedia.org/wiki/Jaccard_index) to measure the similarity between users and selects the recommendation target based on this similarity.

#### Algorithm Flow

1. **Measuring User Similarity**: Pair all users in the database and calculate Jaccard similarity to select N users with similar order histories.
2. **Selecting Similar Users**: Using Jaccard similarity, select the top N users with the highest similarity.
3. **Analyzing Order History**: Summarize the order history of the selected N users and calculate the frequency of each menu item.
4. **Selecting Recommended Menu**: Select the menu with the highest frequency as the recommended items.

#### JaccardSimilarity

The `JaccardSimilarity` function calculates the Jaccard similarity coefficient between two sets of menuIDs representing user orders. This coefficient is a measure of similarity between two sets and is defined as the size of the intersection of the sets divided by the size of their union.

{{< code "nodejs/src/routes/recommendation.js" >}}

```javascript
function JaccardSimilarity(targetUserOrders, userOrders) {
  // Extract menuID values and creating new sets
  const set1 = new Set(targetUserOrders.map(order => order.menuID));
  const set2 = new Set(userOrders.menuIDList.map(order => order.menuID));

  // Calculate intersection and union sets
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  // Calculate sizes of intersection and union sets
  const intersectionSize = intersection.size;
  const unionSize = union.size;

  // Calculate and return Jaccard similarity coefficient
  return unionSize === 0 ? 0 : intersectionSize / unionSize;
}
```
{{< /code >}}

#### getMostOrderedMenu

The `getMostOrderedMenu` function identifies the menu that is most frequently ordered by users who are considered the most similar to the target user. The function takes a list of top similar users and the target user's orders as input. It uses a map to track the frequency of each menu across similar users' orders.

{{< code "nodejs/src/routes/recommendation.js" >}}
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

  // Iterate through the top similar users
  for (const similarUser of topSimilarUsers) {
    // Retrieve menu orders for the current similar user
    const userMenus = await prisma.menuOrderInfo.findMany({
      where: {
        userID: similarUser.userId,
      },
      select: {
        menuID: true,
      },
    });

    // Update menu frequency based on the orders of the current similar user
    userMenus.forEach(menu => {
      // Checking if the menu is not present in the target user's orders
      if (!targetUserOrders.some(order => order.menuID === menu.menuID)) {
        const currentCount = menuFrequency.get(menu.menuID) || 0;
        menuFrequency.set(menu.menuID, currentCount + 1);
      }
    });
  }

  // Find the menu with the highest frequency
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
{{< /code >}}

#### recommendMenuForUser

The `recommendMenuForUser` function recommends a menu for the target user based on other users' orders. It utilizes Jaccard similarity to measure the similarity between the target user's orders and other users' orders. Then, it selects the most frequently ordered menu among the top similar users.

{{< code "nodejs/src/routes/recommendation.js" >}}
```javascript
/**
 * Asynchronous function to recommend a menu for a target user based on the orders of other users.
 *
 * @param {string} targetUserId - The ID of the target user.
 * @param {number} N - The number of top similar users to consider.
 * @returns {Object} - An object containing the menuID of the recommended menu.
 */
async function recommendMenuForUser(targetUserId, N) {
  // Retrieve orders of the target user
  const targetUserOrders = await prisma.menuOrderInfo.findMany({
    where: {
      userID: targetUserId,
    },
    select: {
      menuID: true,
    },
  });

  // Retrieve orders of all users
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

  // Create a structure to store all users' orders
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

  // Measure similarity between the target user and other users
  const similarUsers = [];

  for (const userOrders of allUsersOrders) {
    const similarity = JaccardSimilarity(targetUserOrders, userOrders);
    similarUsers.push({ userId: userOrders.userId, similarity });
  }

  // Sort users based on similarity in descending order
  similarUsers.sort((a, b) => b.similarity - a.similarity);

  // Retrieve the top N similar users
  const topSimilarUsers = similarUsers.slice(0, N);

  // Select the most ordered menu among the top similar users
  const mostOrderedMenu = await getMostOrderedMenu(topSimilarUsers, targetUserOrders);

  return mostOrderedMenu;
}
```
{{< /code >}}

#### Algorithm Features and Notes

Our recommendation algorithm provides the following features:

- Suggesting menu based on user-based collaborative filtering
- Extracting similar users who tried menus that the target user has not yet experienced.

However, there are also situations where the recommendation algorithm may not work effectively. Note that these limitations in the algorithm may cause the recommendation process to produce no results.

<dl>
<dt>When the user has never placed an order before</dt>
<dd>In this scenario, it is challenging to extract similar users because the algorithm relies on user history. Consequently, the recommendation algorithm may not operate optimally when the user has not placed any orders before.</dd>
<dt>When the user has tried too different menus before</dt>
<dd>Our algorithm selects menus that the user has not tried yet. However, if the user has a wide variety of tried menus, it becomes difficult to make recommendations. In such cases, the algorithm may not be able to provide suggestions effectively.
</dd>
</dl>

#### Testing Method

1. Check that the similarity is correct by logging.
2. Use dummy data to verify the accuracy and efficiency of the algorithm. Multiple tests are conducted to ensure that the expected results are achieved. Necessary measures are taken to improve the algorithm's performance based on the test results.

| Item | Description |
|------|-------------|
| Data Examples | <ul><li>A: Ordered 5 bowls of ramen</li><li>B: Ordered 5 bowls of ramen, 3 pork cutlets</li><li>C: Ordered 5 bowls of ramen, 10 cheese pork cutlets (highest order frequency)</li><li>D: Ordered 5 bowls of ramen, 2 rice cakes in spicy sauce</li><li>E: Ordered 5 rolls of gimbap</li></ul>
| Configuration | <ul><li>Set N=3 to select the top 3 users with the highest similarity.</li><li>Combine the order histories of selected users B, C, D to recommend the most frequently ordered menu. </li></ul> |

##### Results

First, we saw results and contents by logging:

![recommend1](/images/samples/solutions/face-recognize-kiosk/recommend1.png)
![recommend2](/images/samples/solutions/face-recognize-kiosk/recommend2.png)

Next, The anticipated results from the test are as follows:

- Similar Users: B, C, D
- Combined Order History: 15 bowls of ramen, 3 pork cutlets, 10 cheese pork cutlets, 2 rice cakes in spicy sauce, 5 rolls of gimbap
- Recommended Menu: Cheese Pork Cutlets (most frequently ordered)

If the results align with expectations, it confirms the accuracy of the algorithm.

##### Future Improvements

If any performance issues or accuracy concerns are identified during testing, efforts will be made to address those areas and enhance the algorithm for better efficiency and accuracy.

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

[Socket.io]: https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=fff
[Socket.io-url]: https://socket.io/

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
