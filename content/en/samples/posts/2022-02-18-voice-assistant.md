---
title: Voice Assistant using Python Speech Recognition and Google Assistant
date: 2022-02-18
slug: voice-assistant
posttype: solution
toc: true
thumbnail: th-voice-assistant.png
---

## Overview of Project

This project creates an LG Voice Assistant on webOS OSE by implementing **Speech-To-Text (STT)** and **Text-To-Speech (TTS)** using Python3.

The voice assistant implements some Google Assistant actions like:

- Creating, listing, and deleting google calendar events using Google Calendar API.
- Getting information from Wikipedia.
- Playing videos on YouTube.
- Getting the date, time, and weather information.

## Prepare the Target device

You must have a target device (RPi 4) with webOS OSE. If you do not have the device, set it up by performing the instructions mentioned at [Building webOS OSE](https://www.webosose.org/docs/guides/setup/building-webos-ose/). After you have performed the procedures, you have a fully functional webOS OSE target device. Note down the IP address of the device. 

{{< note >}}
On the target device, create a Google (*@gmail.com) account. This Google account will be used later to configure the required Google services.
{{< /note >}}

### H/W Connections

You will need to connect a USB headphone to the target device.

![Hardware Connection](/images/samples/solutions/voice-assistant/voice-assistant-hw-connection.jpeg)

### Audio Device Configuration

Configure the audio output device. By default, the audio output is played on the USB headset. However, if you want the output on a Bluetooth speaker, you must:

1. Connect to the target device.  
2. Create a file named `.asoundrc` at path `~/` and add the following content:

    ``` shell
    $ vi ~/.asoundrc
    ```
    
    ``` bash
    pcm.!default {
        type asym
        playback.pcm {
            type plug
            slave.pcm pulse
        }
        capture.pcm {
            type plug
            slave.pcm "hw:1,0"
        }
    }
    ```

    This is an audio configuration file that handles playback audio on the runtime pulse availability of the audio device that is attached to the target device. For example, Bluetooth speakers and USB headsets.

3. Save the file.

### Install Python3 Packages

This solution requires some python packages to be available on the target device. For easy installation of these packages, run the `easy_setup.sh` script as described below.
The script provides easy installation of the required packages.

1. Connect to the target device.  
2. Download the required shell script.

    ``` shell
    $ wget http://www.github.com/webosose/samples/blob/master/poc-apps/easy_setup.sh
    ```

3. Give execution permission to the shell script.

    ``` shell
    $ chmod 777 easy_setup.sh
    ```

4. Run the shell script to install the required Python packages.

    ``` shell
    $ ./easy_setup.sh
    ```

## Enable and Configure Google Services

A service account is a special type of Google account intended to represent a non-human user that needs to authenticate and be authorized to access data in Google APIs. Typically, service accounts are used in scenarios such as running workloads on virtual machines (VMs).
Create a Google service account and its key:

1. Use the Google account created above (when preparing the target device) to log in to the [Google Cloud Platform](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts/create?supportedpurview=project&_ga=2.141742325.695140773.1618398931-214654605.1616934586).

2. Select an existing project or create a new project and proceed with the remainder of the Google service configurations.

3. Create a service account:

    1. In the **Service account name** field, enter a name.
    2. The **Service account ID** field is automatically updated based on this name.
    3. In the **Service account description** field, enter a description. For example, Service account for quickstart.
    4. Click **CREATE AND CONTINUE.**
    5. Click the **Select a role field**.
    6. Under **Quick access**, click **Basic**, then click **Owner** and click **Continue**.
    7. Click **DONE** to finish creating the service account.

4. Create the service account key.

    1. Click the email address.
    2. In the **KEYS** tab, click **Add key**, then click **Create new key**.
    3. Select **Key type** as **JSON** (default selected), then click **Create**. A JSON key file is downloaded to your local system.
    4. Click **Close**.
    5. Rename the downloaded JSON file on your local system to `gstt.json`.
    6. Copy the **gstt.json** file to the target device at path: `/usr/palm/services/voiceui/`.

5. Enable Google Speech-to-Text (STT).

    1. Select the existing project that you created above.
    2. In the search bar, type **Cloud Speech-to-Text API**.
    3. Click on the **Cloud Speech-to-Text API** search result.
    4. Click **Enable**.
    5. Enable and create the **billing account**.  

        {{< caution >}}
        You may be charged depending on your usage of the TTS and STT services.
        {{< /caution >}}

6. Enable Google Text-to-Speech (TTS).

    1. Select the existing project that you created above.
    2. In the search bar, type **Cloud Text-to-Speech API**.
    3. Click on the **Cloud Text-to-Speech** search result.
    4. Click **Enable**.
    5. Enable and create the **billing account**.

7. Configure the Google Calendar API.

    1. Select the existing project that you created above.
    2. Enable Google Calendar API as follows:

        1. In the search bar, type **Google Calendar API**.
        2. Click on the **Google Calendar API** search result.
        3. Click **Enable**.
        4. Create a credential file as shown in the following video:  

            {{< note >}}
            Select application type as **Desktop app** instead of **WebApp** during credential creation.
            {{< /note >}}

            <video controls>
              <source src="/images/samples/solutions/voice-assistant/creating_credential_file.mp4" type="video/mp4">
            </video>

        5. Rename the above-created credential file to `credentials.json`.
        6. Copy the `credentials.json` file to the target device at path: `/usr/palm/services/voiceui/`.

# Launch LG Voice Assistant 

You can now launch the voice assistant and check out the functionality offered by it.

{{< note >}}
If you want to understand the code implementation, skip to [Code Implementation](#code-implementation) section below.
{{< /note >}}

1. Go to the `/usr/palm/services/voiceui/` directory on the target device.

2. Enable the key on the system by running the following command:

    ``` shell
    $ export GOOGLE_APPLICATION_CREDENTIALS="/usr/palm/services/voiceui/gstt.json"
    ```

3. Execute the following command:

    ``` shell
    $ python3 main.py --noauth_local_webserver
    ```

    After this, perform the instructions provided in the following video:

    <video controls>
      <source src="/images/samples/solutions/voice-assistant/voice_assistant_setup.mp4" type="video/mp4">
    </video>

4. To list the events of the calendar, we need one `token.json` file which can be generated by the user. User executes `python3 main.py` and says "LG list calendar event". A link that is generated and the user has to copy and paste is at the place of URL in the below command and execute in the terminal:

    ``` shell
    $ luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '{"id":"com.webos.app.enactbrowser", "params": {"target":"URL"}}'
    ```

5. Get an updated list of services available on the target device.

    ``` shell
    $ ls-control scan-services
    ```

6. Run the LG voice assistant.

    ``` shell
    $ /usr/bin/run-js-service -k -g -n /usr/palm/services/voiceui
    ```

7. In the target device, open the Enact browser and enter the URL as `http://<IP_Address_target_device>:<port_number>`. For example, <http://192.168.0.2:5500>.   
    
    To start the LG voice assistant, click the **Start** button. Then, speak the instruction starting with the "LG" hot word.

    ![Voice Assistant Response Example](/images/samples/solutions/voice-assistant/voice-assistant-response-example.png)

    As seen in the above screen, the user has requested the time. LG assistant responds with the current time. Similarly, you can view information on Wikipedia, play videos on Youtube, and get the current date, time, and weather information.

## Code Implementation

The source code for the LG voice assistant (`main.py`) is available at the [voice assistant](https://github.com/webosose/samples/poc-apps/voice-assistant) repository under the `poc-apps` repository. To get a deeper understanding, refer to the snippets provided below, that show the implementation of the voice assistant.

Additionally, after launching the app, the source code is available in the target device at `/usr/palm/services/voiceui`.

### Importing Libraries

Includes the necessary libraries on the target device when the program runs and executes.

``` python
import pyaudio
import speech_recognition as sr
import wave
import pyttsx3
import requests
import datetime
import wikipedia
import pickle
import os
import os.path
import time
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import httplib2
import os
from oauth2client import file
from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools
from datetime import datetime
```

### talk()

This function takes input as text and does the following:

1. Writes the output text to the file (`output.txt`) so that the user can see the output text in UI.
2. Converts that output text into .mp3 file.
3. Sets the state to `Answering` when the .mp3 file is ready.
4. Plays the .mp3 file on the speaker.

``` python
def talk(text):
    from gtts import gTTS
    import os
    mytext = text
    text_file = open("/usr/palm/services/voiceui/public/js/output.txt", "w")
    n = text_file.write(mytext)
    text_file.close()
    language = 'en'
    myobj = gTTS(text=mytext, lang=language, slow=False)
    myobj.save("welcome.mp3")
    text_file = open("/usr/palm/services/voiceui/public/js/status.txt", "w")
    n = text_file.write("Answering...")
    text_file.close()
    os.system("mpg123 " + "welcome.mp3")
```

### take_command()

This function takes input voice from the user and finds the hot word "LG" with the help of the following command functions:

1. Invokes the `voicein()` function.
2. Sets status to `Listening` by writing to the `status.txt` file.
3. Starts recording user voice for 5 seconds.
4. After 5 seconds, it stops recording and the state is changed to "Processing" by writing to the `status.txt` file.
5. A .wav file gets generated.
6. With the help of google cloud library, the application converts the .wav file into a .txt file.
7. Checks whether the text file is empty.
    - If the text file is empty, it calls the `voicein()` function again.
    - If the text file is not empty, it converts the text to lowercase and finds the "LG" as hot word.
        - If LG as hot word is not present, it recursively calls the `voicein()` function.
        - If LG as hot word is detected, it returns the remaining text which can be further used as input for processing.

``` python
def take_command():
    """Transcribe the given audio file."""
    
    def voicein():
        CHUNK = 515
        FORMAT = pyaudio.paInt16
        CHANNELS = 2
        RATE = 44100
        RECORD_SECONDS = 5
        WAVE_OUTPUT_FILENAME = "output.wav"

        p = pyaudio.PyAudio()

        stream = p.open(format=FORMAT,
                        channels=CHANNELS,
                        rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK)
        print("* recording")
        text_file = open("/usr/palm/services/voiceui/public/js/status.txt", "w")
        n = text_file.write("Listening...")
        text_file.close()

        frames = []

        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)

        print("* done recording")
        text_file = open("/usr/palm/services/voiceui/public/js/status.txt", "w")
        n = text_file.write("Processing...")
        text_file.close()
        
        stream.stop_stream()
        stream.close()
        p.terminate()

        wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))
        wf.close()
        
        from google.cloud import speech
        import io

        client = speech.SpeechClient()
        speech_file = "/usr/palm/services/voiceui/output.wav"
       
        with io.open(speech_file, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code="en-US",
            audio_channel_count=2,
        )

        response = client.recognize(config=config, audio=audio)

        # Each result is for a consecutive portion of the audio. Iterate through
        # them to get the transcripts for the entire audio file.
       
        if len(response.results) == 0:
            return voicein()
        else:   
            for result in response.results:
                # The first alternative is the most likely one for this portion.
                print(u"Transcript: {}".format(result.alternatives[0].transcript))
                resultvoice = (format(result.alternatives[0].transcript))
                resultvoice = resultvoice.lower()
                if 'lg' in resultvoice:
                    outputvoice = resultvoice.replace('lg', '')
                    
                    text_file = open("/usr/palm/services/voiceui/public/js/input.txt", "w")
                    n = text_file.write(outputvoice)
                    text_file.close()
                    
                    text_file = open("/usr/palm/services/voiceui/public/js/output.txt", "w")
                    n = text_file.write("")
                    text_file.close()
                    
                    return outputvoice
                else:
                    return take_command()
                    
    text = voicein()
    return text;
```

### take_alter_command()

This function is used for user commands that do not require the "LG" hot word. This is relevant for the following operations: create a calendar, delete calendar, and list calendar events.

1. Invokes the `voicein()` function.
2. Sets status to `Listening` by writing to the `status.txt` file.
3. Starts recording user voice for 5 seconds.
4. After 5 seconds, it stops recording and the state is changed to "Processing" by writing to the `status.txt` file.
5. A .wav file gets generated.
6. With the help of google cloud library, the application converts the .wav file into a .txt file.
7. Checks whether the text file is empty.
    - If the text file is empty, it calls the `voicein()` function again.
    - If the text file is not empty, it converts the text to lowercase and returns the remaining text which can be further used as input for processing.

``` python
def take_alter_command():
    """Transcribe the given audio file."""
    
    def voicein():
        CHUNK = 515
        FORMAT = pyaudio.paInt16
        CHANNELS = 2
        RATE = 44100
        RECORD_SECONDS = 5
        WAVE_OUTPUT_FILENAME = "output.wav"

        p = pyaudio.PyAudio()

        stream = p.open(format=FORMAT,
                        channels=CHANNELS,
                        rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK)
        print("* recording")
        text_file = open("/usr/palm/services/voiceui/public/js/status.txt", "w")
        n = text_file.write("Listening...")
        text_file.close()

        frames = []

        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)

        print("* done recording")
        text_file = open("/usr/palm/services/voiceui/public/js/status.txt", "w")
        n = text_file.write("Processing...")
        text_file.close()
        
        stream.stop_stream()
        stream.close()
        p.terminate()

        wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(p.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))
        wf.close()
        
        from google.cloud import speech
        import io

        client = speech.SpeechClient()
        speech_file = "/usr/palm/services/voiceui/output.wav"
        with io.open(speech_file, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=44100,
            language_code="en-US",
            audio_channel_count=2,
        )

        response = client.recognize(config=config, audio=audio)

        # Each result is for a consecutive portion of the audio. Iterate through
        # them to get the transcripts for the entire audio file.
        
        if len(response.results) == 0:
            return voicein()
        else: 
            for result in response.results:
                # The first alternative is the most likely one for this portion.
                
                print(u"Transcript: {}".format(result.alternatives[0].transcript))
                
                resultvoice = (format(result.alternatives[0].transcript))
                text_file = open("/usr/palm/services/voiceui/public/js/input.txt", "w")
                n = text_file.write(resultvoice)
                text_file.close()
                    
                return resultvoice
    text = voicein()
    return text;
```

### run_lg()

This function serves the user voice commands to actions by calling the `take_command()` function.

``` python
def run_lg():
    command = take_command()
    print(command)
```

#### YouTube

If the input text contains "play" as a keyword, the voice assistant invokes YouTube by performing the following steps:

1. Removes play from the input text, and assigns the remaining text in a variable called `command`.
2. Replaces white spaces with `+` symbol.
3. Passes the remaining text to search query of YouTube and lists down all video links.
4. Extracts the 11 digit video ID from the first ID.
5. Insert this ID to YouTube watch URL and pass it to the enact browser as a parameter.
6. The enact browser plays the video.

``` python
    if 'play' in command:
        try:
            import urllib.request
            import re
            if 'play' in command:
                command = command.replace('play ', '')
            talk("playing "+command)
            if ' ' in command:
                command=command.replace(' ','+')
            html = urllib.request.urlopen("https://www.youtube.com/results?search_query="+command)
            video_ids = re.findall(r"watch?v=(S{11})", html.read().decode())
            print(video_ids[0])
            searchresult = (video_ids[0])
            temp = ('luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '+"'"+'{"id":"com.webos.app.enactbrowser", "params": {"target":"https://www.youtube.com/watch?v='+searchresult+'"'+"}}'")
            print(temp)
            os.system(temp)
        except:
            talk("This youtube operation is having some issue please try again!")
```

#### Wikipedia

If the input text contains "Who is" as a keyword, the voice assistant invokes Wikipedia by performing the following steps:

1. Removes "who is" from the input text and assigns the remaining text in a variable called `person`.
2. Concatenates and forms the Wikipedia search query and launches Wikipedia via enact browser.
3. The voice assistant plays the first paragraph of the Wikipedia content over the BT speaker.

``` python
    elif 'who is' in command:
        try:
            person = command.replace('who is', '')
            temp = ('luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '+"'"+'{"id":"com.webos.app.enactbrowser", "params": {"target":"https://en.wikipedia.org/wiki/'+person+'"'+"}}'")
            os.system(temp)
            info = wikipedia.summary(person, 1);
            talk(info)
        except:
            talk("This wiki operation is having some issue please try again!")
```

#### Temperature and Weather

If the input text contains "temperature" or "weather" as a keyword, the voice assistant performs the following steps:

1. Removes "tell" and "how" keywords from input text.
2. Split the sentence into words and pair those words with a pattern like 3 words, 2 words, and a single word at a time to get the name of the city.
3. Validates these city names with the weather API.
4. If the city is available, the voice assistant fetches the weather and temperature details and announces them to the user.
5. If the city is available, the voice assistant, announces that the city is not found.

``` python
    elif 'temperature' in command or 'weather' in command:
        try:
            def cityValidate(name):
                complete_url = base_url + "appid=" + api_key + "&q=" + name
                response = requests.get(complete_url)
                x = response.json()
                return x, complete_url
            if 'tell' in command:
                command = command.replace('tell','')
            if 'how' in command:
                command = command.replace('how','')
            import requests, json
            api_key = "ed5459fa93e76130e7d895742ee345dd"
            base_url = "http://api.openweathermap.org/data/2.5/weather?"
            temp = 0
            if 'today' in command or 'outside' in command or 'place' in command or 'location' in command:
                city_name = 'bengaluru'
                complete_url = base_url + "appid=" + api_key + "&q=" + city_name
                response = requests.get(complete_url)
                x = response.json()
                temp = 1
            else:
                brk = command.split()
                s=0
                temp=0
                t = 0
                for i in brk:
                    if (s+2) < len(brk):
                        h=(i+" "+brk[s+1]+" "+brk[s+2])
                        x, complete_url = cityValidate(h)
                        if x["cod"] != "404":
                            temp = 1
                            city_name = h
                            break
                    s=s+1
                if temp == 0:
                    for i in brk:
                        if (t+1) < len(brk):
                            h=(i+" "+brk[t+1])
                            x, complete_url = cityValidate(h)
                            if x["cod"] != "404":
                                temp = 1
                                city_name = h
                                break
                        t=t+1
                if temp == 0:
                    for i in brk:
                        x, complete_url = cityValidate(i)
                        if x["cod"] != "404":
                            temp = 1
                            city_name = i
                            break
            if temp == 1:
                url=("https://www.timeanddate.com/weather/india/"+city_name)
                temp = ('luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '+"'"+'{"id":"com.webos.app.enactbrowser", "params": {"target":"'+city_name+' weather"'+"}}'")
                os.system(temp)
                response = requests.get(complete_url)    
                y = x["main"]
                current_temperature = y["temp"]
                temperature = current_temperature - 273.15
                current_pressure = y["pressure"]
                current_humidiy = y["humidity"]
                z = x["weather"]
                weather_description = z[0]["description"]
                temperature = int(temperature)
                temperature = str(temperature)
                current_pressure = str(current_pressure)
                current_humidiy = str(current_humidiy)
                weather_description = str(weather_description)
                if 'temperature' in command:
                    talk("Today in "+ city_name +" the temperature is "+temperature+" degree Celsius") 
                if 'weather' in command:  
                    talk("Today in "+ city_name +" the temperature is "+temperature+" degree Celsius")
                    talk("with an atmospheric pressure of "+current_pressure+" hPa")
                    talk("and humidity of "+current_humidiy+" percent with "+weather_description)
                    
                    print(" Temperature (in kelvin unit) = " +
                                    str(int(temperature)) +
                        " atmospheric pressure (in hPa unit) = " +
                                    str(current_pressure) +
                        " humidity (in percentage) = " +
                                    str(current_humidiy) +
                        " description = " +
                                    str(weather_description))            
            else:
                talk("city not found")
        except:
            talk("This weather operation is having some issue please try again!")
```

#### Time

If the input text contains "time" as a keyword, the voice assistant fetches the current timestamp from the system and announces it to the user.

``` python
    elif 'time' in command:
        try:
            time = datetime.now().strftime('%I:%M %p')
            print(time)
            talk('Current time is ' + time)
        except:
            talk("This operation is having some issue please try again!")
```

#### Date

If the input text contains "date" as a keyword, the voice assistant fetches the current date from the system and announces it to the user.

``` python
    elif 'date' in command:
        try:
            from datetime import date
            today = date.today()
            today = datetime.now().strftime("%d %B, %Y")
            print("Today's date:", today)
            talk("Today's date:" + today)
        except:
            talk("This operation is having some issue please try again!")
```

#### Create Calendar Events

If the input text contains "create" along with either "calendar" or "event" as a keyword, the voice assistant performs the following steps:

{{< note >}} 
To create a calendar event, we should have a credential file that gets created through the google developer console with calendar API (described above).
{{< /note >}}

1. `get_credentials()` function validates user credentials from storage.
2. If no credentials are stored, or if the stored credentials are invalid, the OAuth2 flow is completed to obtain the new credentials and returns the obtained credential.
3. Validates the user scopes along with the user credentials.
4. If the scopes and credentials are valid, it will create a .credentials file to the root location in the OSE device.
5. Asks the user about the title of the event, start time, and end time.
6. The end time and start_time function extracts time from the sentence and converts it into 24 hours format.
7. Frames the title, start, and end time to the calendar API query and creates the event.

``` python
    elif 'create' in command and ('calendar' in command or 'event' in command):
        def get_credentials():
            """Gets valid user credentials from storage.

            If nothing has been stored, or if the stored credentials are invalid,
            the OAuth2 flow is completed to obtain the new credentials.

            Returns:
                Credentials, the obtained credential.
            """
            try:
                import argparse
                flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
            except ImportError:
                flags = None

            # If modifying these scopes, delete your previously saved credentials
            # at ~/.credentials/calendar-python-quickstart.json
            SCOPES = 'https://www.googleapis.com/auth/calendar'
            CLIENT_SECRET_FILE = 'credentials.json'
            APPLICATION_NAME = 'Google Calendar API Python Quickstart'

            home_dir = os.path.expanduser('~')
            credential_dir = os.path.join(home_dir, '.credentials')
            if not os.path.exists(credential_dir):
                os.makedirs(credential_dir)
            credential_path = os.path.join(credential_dir,
                                           'calendar-python-quickstart.json')

            store = oauth2client.file.Storage(credential_path)
            credentials = store.get()
            if not credentials or credentials.invalid:
                flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
                flow.user_agent = APPLICATION_NAME
                if flags:
                    credentials = tools.run_flow(flow, store, flags)
                else:  # Needed only for compatibility with Python 2.6
                    credentials = tools.run(flow, store)
                print('Storing credentials to ' + credential_path)
            return credentials

        def create_event():
            try:
                import datetime
                import time
                """Shows basic usage of the Google Calendar API.

                Creates a Google Calendar API service object and outputs a list of the next
                10 events on the user's calendar.
                """
                credentials = get_credentials()
                http = credentials.authorize(httplib2.Http())
                service = discovery.build('calendar', 'v3', http=http)

                # Refer to the Python quickstart on how to setup the environment:
                # https://developers.google.com/google-apps/calendar/quickstart/python
                # Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
                # stored credentials.
                talk('Sure, what is the tittle of the event: ')
                opt_var = take_alter_command()
                tittle = opt_var
                
                def start_time():
                    talk('start time of event: ')
                    str1 = take_alter_command()
                    if 'a.m.' in  str1 :
                        str1 = str1.replace('a.m.', '')
                        if ' 'in str1:
                            str1 = str1.replace(' ','')
                        if len(str1) == 1 or len(str1) == 2:
                            str1 = (str1 +":00")
                        if str1[:2] == "12":
                            start=( "00" + str1[2:])
                        else:
                            start =( str1)
                    elif 'p.m.' in  str1 :
                        str1 = str1.replace('p.m.', '')
                        if ' 'in str1:
                            str1 = str1.replace(' ','')
                            print(len(str1))
                        if len(str1) == 1:
                            str1 = ("0"+str1 +":00")
                        if len(str1) == 2:
                            str1 = (str1 + ":00")
                        if len(str1) == 4:
                            str1 = ("0"+str1)
                        if str1[:2] == "12":
                            start = (str1)
                        else:
                            start = (str(int(str1[:2]) + 12) + str1[2:5])
                    else:
                        talk("Please specify AM or PM in you Start time of Event")
                        start = start_time()
                    return start
                start = start_time()    
                    

                def end_time():    
                    talk('end time of event: ')
                    str1 = take_alter_command()
                    if 'a.m.' in  str1 :
                        str1 = str1.replace('a.m.', '')
                        if ' 'in str1:
                            str1 = str1.replace(' ','')
                        if len(str1) == 1 or len(str1) == 2:
                            str1 = (str1 +":00")
                        if str1[:2] == "12":
                            end=( "00" + str1[2:])
                        else:
                            end =(str1)
                    elif 'p.m.' in  str1 :
                        str1 = str1.replace('p.m.', '')
                        if ' 'in str1:
                            str1 = str1.replace(' ','')
                            print(len(str1))
                        if len(str1) == 1:
                            str1 = ("0"+str1 +":00")
                        if len(str1) == 2:
                            str1 = (str1 + ":00")
                        if len(str1) == 4:
                            str1 = ("0"+str1)
                        if str1[:2] == "12":
                            end = ( str1)
                        else:
                            end = ( str(int(str1[:2]) + 12) + str1[2:5])
                            
                    else:
                        talk("Please specify AM or PM in your End time of Event")
                        end = end_time()
                    
                    shr = int(start[0:2])
                    smint = int(start[-2:])
                    ehr = int(end[0:2])
                    emint = int(end[-2:])
                    if (ehr < shr or (ehr == shr and emint <= smint )):
                        talk("End time should always be greater than start time")
                        end = end_time()
                    return end
                end = end_time()

                print(start)
                print(end)
                today = datetime.datetime.today()
                stoday = datetime.datetime.strftime(today, "%Y-%m-%d")
                startdate = stoday+'T'+start+":00"
                enddate = stoday+'T'+end+":00"
                print(startdate)
                print(enddate)
                event = {
                    'summary': tittle,
                    'start': {
                        'dateTime': startdate,
                        'timeZone': 'Asia/Calcutta',
                    },
                    'end': {
                        'dateTime': enddate,
                        'timeZone': 'Asia/Calcutta',
                    },
                    'reminders': {
                        'useDefault': False,
                        'overrides': [
                            {'method': 'email', 'minutes': 24 * 60},
                            {'method': 'popup', 'minutes': 10},
                        ],
                    },
                }

                event = service.events().insert(calendarId='primary', body=event).execute()
                print('Event created: %s' % (event.get('htmlLink')))
                temp = ('luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '+"'"+'{"id":"com.webos.app.enactbrowser", "params": {"target":"https://calendar.google.com/'+'"'+"}}'")
                os.system(temp)
                talk("event created")
            except:
                talk("This operation is having some issue please try again!") 
        create_event()
```

#### List Calendar Events

If the input text contains "list" along with either "calendar" or "event" as a keyword, the voice assistant performs the following steps:

1. `main()` function checks whether the `scopes.json` file is available in the system.
    - If it is there, proceeds to list the event.
    - Else, gives a link to create the scopes.json file based on `credential.json` file.
2. After the validation of `scopes.json` file, based on the current time the application fetches the next 10 upcoming events.
    - If there are no upcoming events, it announces no upcoming event found.
    - Else, it announces the upcoming events along with the time.

``` python
elif 'list' in command and ('calendar' in command or 'event' in command):
        def main():
            try:
                """Shows basic usage of the Google Calendar API.
                Prints the start and name of the next 10 events on the user's calendar.
                """
                creds = None
                # The file token.json stores the user's access and refresh tokens, and is
                # created automatically when the authorization flow completes for the first
                # time.
                if os.path.exists('token.json'):
                    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
                # If there are no (valid) credentials available, let the user log in.
                if not creds or not creds.valid:
                    if creds and creds.expired and creds.refresh_token:
                        creds.refresh(Request())
                    else:
                        flow = InstalledAppFlow.from_client_secrets_file(
                            'credentials.json', SCOPES)
                        creds = flow.run_local_server(port=0)
                    # Save the credentials for the next run
                    with open('token.json', 'w') as token:
                        token.write(creds.to_json())

                service = build('calendar', 'v3', credentials=creds)

                # Call the Calendar API
                now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
                print('Getting the upcoming 10 events')
                #events_result = service.events().list(calendarId='primary', timeMin=now,maxResults=10, singleEvents=True,orderBy='startTime').execute()
                events_result = service.events().list(calendarId='primary', timeMin=now,
                                                    maxResults=10, singleEvents=True,
                                                    orderBy='startTime').execute()
                events = events_result.get('items', [])

                if not events:
                    print('No upcoming events found.')
                    talk("No upcoming events found.")
                else:
                    talk("following are the calendar events")
                    for event in events:
                        start = event['start'].get('dateTime', event['start'].get('date'))
                        print(start, event['summary'])
                        str2 = (str(start))
                        print(str2)
                        str2 = str2[-14:-9]
                        d = datetime.strptime(str2, "%H:%M")
                        print(d.strftime("%I:%M %p"))
                        d2 = (d.strftime("%I:%M %p"))
                        talk(event['summary'] +" at " + str(d2))
            except:
                talk("This operation is having some issue please try again!") 

        if __name__ == '__main__':
            main()
```

#### Delete Calendar Events

If the input text contains "delete" along with either "calendar" or "event" as a keyword, the voice assistant performs the following steps:

1. `main()` function checks whether the scopes.json file is available in the system.
    - If it is there, proceeds to list the event.
    - Else, gives a link to create the scopes.json file based on `credential.json` file.
2. After the validation of `scopes.json` file, based on the current time, the application fetches the next 10 upcoming events.
    - If there are no upcoming events, it announces no upcoming event found.
    - Else, it announces the upcoming events along with the time.
3. Asks the user which event to be removed.
    - If the event asked by the user is present, it deletes the event and announces the deleted event with time.
    - Else, it announces event not found.

``` python
elif 'delete' in command and ('calendar' in command or 'event' in command):
        def main():
            try:
                """Shows basic usage of the Google Calendar API.
                Prints the start and name of the next 10 events on the user's calendar.
                """
                creds = None
                # The file token.json stores the user's access and refresh tokens, and is
                # created automatically when the authorization flow completes for the first
                # time.
                if os.path.exists('token.json'):
                    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
                # If there are no (valid) credentials available, let the user log in.
                if not creds or not creds.valid:
                    if creds and creds.expired and creds.refresh_token:
                        creds.refresh(Request())
                    else:
                        flow = InstalledAppFlow.from_client_secrets_file(
                            'credentials.json', SCOPES)
                        creds = flow.run_local_server(port=0)
                    # Save the credentials for the next run
                    with open('token.json', 'w') as token:
                        token.write(creds.to_json())

                service = build('calendar', 'v3', credentials=creds)

                # Call the Calendar API
                now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
                print('Getting the upcoming 10 events')
                #events_result = service.events().list(calendarId='primary', timeMin=now,maxResults=10, singleEvents=True,orderBy='startTime').execute()
                events_result = service.events().list(calendarId='primary', timeMin=now,
                                                    maxResults=10, singleEvents=True,
                                                    orderBy='startTime').execute()
                events = events_result.get('items', [])

                if not events:
                    print('No upcoming events found.')
                    talk("No upcoming events found.")
                else: 
                    talk("following are the calendar events")
                    for event in events:
                        start = event['start'].get('dateTime', event['start'].get('date'))
                        print(start, event['summary'])
                        str2 = (str(start))
                        print(str2)
                        str2 = str2[-14:-9]
                        d = datetime.strptime(str2, "%H:%M")
                        print(d.strftime("%I:%M %p"))
                        d2 = (d.strftime("%I:%M %p"))
                        talk(event['summary'] +" at " + str(d2))
                    talk("which one you want to delete")
                    ename = take_alter_command()
                    s=0
                    h=0
                    dtime = d2
                    for eventt in events:
                        s=s+1
                        if eventt['summary'] == ename:
                            foxs = (eventt['id'])
                            temp = ('luna-send -n 1 -f luna://com.webos.service.applicationmanager/launch '+"'"+'{"id":"com.webos.app.enactbrowser", "params": {"target":"https://calendar.google.com/'+'"'+"}}'")
                            os.system(temp)
                            service.events().delete(calendarId='primary', eventId=foxs).execute()
                            talk(ename +' event at '+ d2 +' deleted')
                        else:
                            h=h+1
                    if s == h:
                        talk(ename+ ' event not found')
            except:
                talk("This operation is having some issue please try again!")

        if __name__ == '__main__':
            main()
```
