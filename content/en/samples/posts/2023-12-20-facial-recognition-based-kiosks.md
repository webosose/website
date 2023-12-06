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


### User registration - Face.js, FaceReco.js
* Take a picture of your face and send it to the server
* Face.js is a photographic activity, and FaceReco.js is a page where you import Face.js and add css.

#### Face.js
```
export default function Face(props) {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Add ref for timer id
    const timerIdRef = useRef(null);

    // Add state for remaining photos
    const [remainingPhotos, setRemainingPhotos] = useState(9); // 10장으로 설정

    const startVideo = async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Camera not available on this browser');
          }
    
          if (!videoRef.current.srcObject) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 720, height: 720 } });
    
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          }
    
          if (!videoRef.current.paused && !videoRef.current.ended) {
            // Already playing - do nothing
          } else {
            await videoRef.current.play();
          }
    
          setTimeout(() => {
            timerIdRef.current = setInterval(captureFrame, 100);
          }, 2000);
    
        } catch (error) {
          console.log("Something went wrong!", error);
        }
      };
    
      const captureFrame = async () => {
        if (remainingPhotos <= 0) return;
    
        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
    
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
    
          context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    
          const imgDataUrl = canvasRef.current.toDataURL('image/jpeg');
    
          props.setPhotos(prevPhotos => [...prevPhotos, imgDataUrl]);
    
          setRemainingPhotos(prevCount => prevCount - 1);
        }
      };
    
      useEffect(() => {
        const startTimer = () => {
          timerIdRef.current = setInterval(captureFrame, 100);
        };
    
        const stopTimer = () => {
          clearInterval(timerIdRef.current);
        };
    
        startTimer();
    
        return () => {
          stopTimer();
        };
      }, [props.setPhotos, remainingPhotos]);
    
      useEffect(() => {
        startVideo();
      }, []);

    return (
        <div id="video-container">
            <video ref={videoRef} id="video-element"></video>
            {/* Display remaining photos count */}
            <p style={{ color: 'black', fontSize: '32px', marginTop: '20px' }}>{remainingPhotos+1}</p>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}

```

#### FaceReco.js
```
export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const [alert, setAlert] = useState(false);

  const [gotoPhoneNUm, setGotoPhoneNUm] = useState(false);
  const [slide, setSlide] = useState(false);

  const [photos, setPhotos] = useState([]); // photos 상태 추가

  useEffect(() => {
    setTimeout(() => { setAlert(true) }, 2200);
  });

  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">1/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">얼굴정보 등록하기</div>
            </div>
            <div className="middle_camera">
              {
              alert ===  true ?
              <Face setPhotos={setPhotos} />
              :
              <div id='face-img-container'>
                <img src={face} style={{ width: '30%', margin: '0px 0px 40px 0px' }} />
                <div>
                  <span id='face-contents'>아이콘을 터치해</span><br />얼굴 정보를 등록해주세요.
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        <div className="Bottom_button">
          <div className="right_section">
            <div className="right_section">
              <div id="right_button" onClick={() => {
                  console.log(photos); // photos를 출력
                  navigate("/username", { state: { photos } }); // 다음 페이지로 이동
                }}>
                <div className="button_text" > 다음으로 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### User registration - UserName.js, PhoneNum.js
* UserName : This is the page where you enter your name.
* PhoneNum : This is the page where you enter your cell phone number.

#### UserName.js
```
export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const location = useLocation();
  const photos = location.state.photos;

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    if (/^\d+$/.test(event.target.value)) {
      alert('숫자는 입력할 수 없습니다.');
    } else if (event.target.value.split(' ').join('') !== event.target.value) {
      alert('공백은 입력할 수 없습니다.');
    } else {
      setInputValue(event.target.value);
    }
  }

  const handleNext = () => {
    if (inputValue.trim().length === 0) {
      alert('숫자 또는 공백을 입력할 수 없습니다.');
    } else {
      navigate('/PhoneNum', { state: { inputValue, photos } });
    }
  };

  const goback = () => {
    navigate('/', { state: { photos: [] } });
  };

  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">2/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">이름 등록하기</div>
            </div>
            <div className="middle_camera">
              <input className="input-des" type="text" value={inputValue} onChange={handleChange} placeholder="이름을 입력해주세요" />
            </div>

          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={goback}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
                console.log(photos); // photos를 출력
                handleNext(); // 다음 페이지로 이동
              }}>
              <div className="button_text" > 다음으로 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```


#### PhoneNum.js

```
export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const inputValue = location.state.inputValue;
    const [PhoneNumber, setInputValue] = useState('');
    //PhoneNum페이지로 input된 정보를 넘겨준다.
    const handleChange = (event) => {
      // '-'를 입력할 경우
      if (!/^[0-9]*$/.test(event.target.value)) {
        alert('0~9 이외의 값은 입력할 수 없습니다.');
      } else {
        setInputValue(event.target.value);
      }
    }

    const handleNext = () => {
      if (PhoneNumber.length !== 11) {
        alert("핸드폰 번호는 11글자를 입력해야 합니다.");
        return;
      }
      navigate('/Vegan_Religion_Check', { state: { inputValue, PhoneNumber, photos } });
    };

  const goback = () => {
    navigate('/username', { state: { inputValue: null } });
  };

  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">3/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">휴대폰번호 등록하기</div>
            </div>
            <div className="middle_camera">
              <input className="input-des" type="text" value={PhoneNumber} onChange={handleChange} placeholder="휴대폰 번호를 입력해 주세요" />
            </div>

          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={goback}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
                console.log(photos); // photos를 출력
                console.log(inputValue); // 이름 출력
                console.log(PhoneNumber); // 번호 출력
                handleNext(); // 다음 페이지로 이동
              }}>
              <div className="button_text"> 다음으로 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```
### User registration - Vegan_Religion_Check.js, Allergy.js
* Vegan_Religion_Check.js : This is a page for entering vegan and religious information.
* Allergy : This is a page where you enter allergy information.

#### Vegan_Religion_Check.js

```
export default function FaceReco() {
  const navigate = useNavigate();
  const location = useLocation();

  const photos = location.state.photos;
  const PhoneNumber = location.state.PhoneNumber;
  const inputValue = location.state.inputValue;

  const [selectedItemId, setSelectedItemId] = useState("");
  const [isUnchecked, setIsUnchecked] = useState(true); // uncheck 상태 여부를 추적하는 상태 추가
  const [selectedReligion, setSelectedReligion] = useState(""); // 'None'으로 초기화


  const handleNext = () => {

      navigate("/Allergy", { state: { inputValue, PhoneNumber, photos, selectedItemId, selectedReligion } });
  };

  //이전으로
  const resetPhotos = () => {
    navigate('/PhoneNum', { state: { PhoneNumber: null } });
  };

  //비건 체크 박스
  const handleUncheck = () => {
    setIsUnchecked((prevValue) => {
      if (prevValue) {
        setSelectedItemId(""); // uncheck 상태이면 selectedItemId를 'None'으로 설정
      }
      return !prevValue; // 상태를 토글하여 변경
    });
  };


  //드롭다운
  const handleDropdownSelect = (selectedItemId) => {
    setSelectedItemId(selectedItemId);
    setIsUnchecked(false); // 드롭다운 선택 시 상태 변경
  };

  //종교 선택
  const handleClickReligion = (religion) => {
    if (selectedReligion === religion) {
      setSelectedReligion(null);
    } else {
      setSelectedReligion(religion);
    }
  };

  const dropdownItems = [
    { id: 'Fruiterian', label: '프루테리언' },
    { id: 'Vegan', label: '비건' },
    { id: 'Lacto', label: '락토' },
    { id: 'Ovo', label: '오보' },
    { id: 'LactoOvo', label: '락토오보' },
    { id: 'Pesco', label: '페스코' },
    { id: 'Pollo', label: '폴로' },
  ];


  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">4/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">기타 정보 등록하기</div>
            </div>
            <div className="middle_camera">
              <div className="top_section">
                해당되는 항목에 체크해주세요
              </div>
              <div className="middle_section">
                <div className="row">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill="#FF7A00" />
                    </svg>
                  </div>
                  <div className="center">비건 여부</div>
                  <div className="right">
                    <div
                      id={`${isUnchecked ? 'uncheck' : 'check'}`}
                      onClick={handleUncheck}
                    ></div>
                  </div>
                </div>
                <div className="row">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill={isUnchecked ? '#D9D9D9' : '#FF7A00'} />
                    </svg>
                  </div>
                  <div className="center_2" style={{ color: isUnchecked ? '#D9D9D9' : '#000000' }}>비건 유형</div>
                  <div className="right_2">
                    {/* 드롭다운 활성/비활성 상태에 따라 disabled 속성 추가 */}
                    <select
                      className="select-wrapper"
                      onChange={(e) => handleDropdownSelect(e.target.value)}
                      disabled={isUnchecked}
                    >
                      <option className="drop_text" value="">
                        유형선택하기
                      </option>
                      {dropdownItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="bottom_section">
                <div className="row_2">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill="#FF7A00" />
                    </svg>
                  </div>
                  <div className="center">종교</div>
                  <div className="right"></div>
                </div>
                <div className="row_2_button_area">
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === "" ? 'selected' : ""}`}
                      onClick={() => handleClickReligion("")}
                    >
                      해당없음
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Islam' ? 'selected' : ''}`}
                      id="Islam"
                      onClick={() => handleClickReligion('Islam')}
                    >
                      이슬람교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Hinduism' ? 'selected' : ''}`}
                      id="Hinduism"
                      onClick={() => handleClickReligion('Hinduism')}
                    >
                      힌두교
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Buddhism' ? 'selected' : ''}`}
                      id="Buddhism"
                      onClick={() => handleClickReligion('Buddhism')}
                    >
                      불교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Judaism' ? 'selected' : ''}`}
                      id="Judaism"
                      onClick={() => handleClickReligion('Judaism')}
                    >
                      유대교
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Christian' ? 'selected' : ''}`}
                      id="Christian"
                      onClick={() => handleClickReligion('Christian')}
                    >
                      기독교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Protestant' ? 'selected' : ''}`}
                      id="Protestant"
                      onClick={() => handleClickReligion('Protestant')}
                    >
                      개신교
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={resetPhotos}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
              console.log(photos); // photos를 출력
              console.log(PhoneNumber);
              console.log(inputValue);
              console.log(selectedItemId);
              console.log(selectedReligion);

              handleNext(); // 다음 페이지로 이동
            }}>
              <div className="button_text" > 다음으로 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```


#### Allergy.js
```
export default function FaceReco() {

  const BASE_URL = 'https://kioskknu2023.run.goorm.site';
  //const BASE_URL = 'http://127.0.0.1:8000';

  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const location = useLocation();
  const photos = location.state.photos;
  const inputValue = location.state.inputValue;
  const PhoneNumber = location.state.PhoneNumber;
  const selectedVeganItemId = location.state.selectedItemId;
  const selectedReligion = location.state.selectedReligion;

  //None 값이면 0으로 변경
  if (typeof selectedReligion === "") {
    selectedReligion = 0;
  }

  if (typeof selectedVeganItemId === "") {
    selectedVeganItemId = 0;
  }

  const [selectedAllergy, setSelectedAllergy] = useState([]); // 'None'으로 초기화

  const resetPhotos = () => {
    navigate('/VeganCheck', { state: { inputValue, PhoneNumber, photos } });
  };

  //알레르기 선택
  const handleClickAllergy = (allergy) => {
    if (allergy === "") {
      setSelectedAllergy([]); // 해당없음을 누르면 selectedAllergy 배열에 "" 값만 남게 함
    } else {
      const index = selectedAllergy.indexOf(allergy);

      if (index !== -1) {
        const updatedAllergy = [...selectedAllergy];
        updatedAllergy.splice(index, 1);
        setSelectedAllergy(updatedAllergy);
      } else {
        // 해당없음 버튼을 선택해제하고 선택된 값들을 제거
        const updatedAllergy = selectedAllergy.filter((item) => item !== "");
        setSelectedAllergy([...updatedAllergy, allergy]);
      }
    }
  };

  //서버로 사용자의 입력값을 보내준다. 등록버튼 클릭 시 호출.
  const handleNext = () => {
    console.log(photos); // photos를 출력
    console.log(PhoneNumber); // 핸드폰 번호 출력
    console.log(inputValue);  // 이름 출력
    console.log(selectedVeganItemId); // 선택된 비건 정보 출력
    console.log(selectedReligion); // 선택된 종교 정보 출력
    console.log(selectedAllergy); // 선택된 알레르기 정보 출력



    // 서버로 데이터 전송
    const postData = {
      user_name: inputValue,
      user_phonenum: PhoneNumber,
      user_allergy: selectedAllergy,
      user_face_info : photos.join('||')
    };

    if (selectedVeganItemId !== 0) {
      postData.user_vegetarian = selectedVeganItemId;
    }

    if (selectedReligion !== 0) {
      postData.religion = selectedReligion;
    }
    
    axios.post(`${BASE_URL}/signup/`, postData)  // '서버 URL' 부분에 테스트할 서버 주소 넣어주면 됨.
      .then(response => {
        console.log(postData);
        console.log(response.data);  // 요청 성공시 alert 하나 해줄 예정.
        alert("사용자 등록이 완료되었습니다");
        navigate("/complete", { state: { inputValue, PhoneNumber, photos, selectedVeganItemId, selectedReligion, selectedAllergy } });

      })
      .catch(error => {
        console.log(postData);
        console.error(error);
        alert("사용자 등록이 실패했습니다. 다시 시도해주세요.");
      });

  };


  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">5/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">알러지 정보 등록하기</div>
            </div>
            <div className="middle_camera">
              <div className="top_section">
                해당되는 항목에 체크해주세요
              </div>
              <div className="row_2_button_area_2">
                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.length === 0 ? 'selected' : ''}`}
                    onClick={() => handleClickAllergy("")}
                  >
                    해당없음
                  </div>

                  <div
                    className={`row_2_button ${selectedAllergy.includes('Buckwheat') ? 'selected' : ''}`}
                    id="Buckwheat"
                    onClick={() => handleClickAllergy('Buckwheat')}
                  >
                    메밀
                  </div>
                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Wheat') ? 'selected' : ''}`}
                    id="Wheat"
                    onClick={() => handleClickAllergy('Wheat')}
                  >
                    밀
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Soybean') ? 'selected' : ''}`}
                    id="Soybean"
                    onClick={() => handleClickAllergy('Soybean')}
                  >
                    대두
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Walnut') ? 'selected' : ''}`}
                    id="Walnut"
                    onClick={() => handleClickAllergy('Walnut')}
                  >
                    호두
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Peanut') ? 'selected' : ''}`}
                    id="Peanut"
                    onClick={() => handleClickAllergy('Peanut')}
                  >
                    땅콩
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Peach') ? 'selected' : ''}`}
                    id="Peach"
                    onClick={() => handleClickAllergy('Peach')}
                  >
                    복숭아
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Tomato') ? 'selected' : ''}`}
                    id="Tomato"
                    onClick={() => handleClickAllergy('Tomato')}
                  >
                    토마토
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Pork') ? 'selected' : ''}`}
                    id="Pork"
                    onClick={() => handleClickAllergy('Pork')}
                  >
                    돼지고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Egg') ? 'selected' : ''}`}
                    id="Egg"
                    onClick={() => handleClickAllergy('Egg')}
                  >
                    난류
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Milk') ? 'selected' : ''}`}
                    id="Milk"
                    onClick={() => handleClickAllergy('Milk')}
                  >
                    우유
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Chicken') ? 'selected' : ''}`}
                    id="Chicken"
                    onClick={() => handleClickAllergy('Chicken')}
                  >
                    닭고기
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Beef') ? 'selected' : ''}`}
                    id="Beef"
                    onClick={() => handleClickAllergy('Beef')}
                  >
                    쇠고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Shrimp') ? 'selected' : ''}`}
                    id="Shrimp"
                    onClick={() => handleClickAllergy('Shrimp')}
                  >
                    새우
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Mackerel') ? 'selected' : ''}`}
                    id="Mackerel"
                    onClick={() => handleClickAllergy('Mackerel')}
                  >
                    고등어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Mussels') ? 'selected' : ''}`}
                    id="Mussels"
                    onClick={() => handleClickAllergy('Mussels')}
                  >
                    홍합
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Abalone') ? 'selected' : ''}`}
                    id="Abalone"
                    onClick={() => handleClickAllergy('Abalone')}
                  >
                    전복
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Oyster') ? 'selected' : ''}`}
                    id="Oyster"
                    onClick={() => handleClickAllergy('Oyster')}
                  >
                    귤
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('shellfish') ? 'selected' : ''}`}
                    id="shellfish"
                    onClick={() => handleClickAllergy('shellfish')}
                  >
                    조개류
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Crab') ? 'selected' : ''}`}
                    id="Crab"
                    onClick={() => handleClickAllergy('Crab')}
                  >
                    게
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Squid') ? 'selected' : ''}`}
                    id="Squid"
                    onClick={() => handleClickAllergy('Squid')}
                  >
                    오징어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('food_containing_Sulfite') ? 'selected' : ''}`}
                    id="food_containing_Sulfite"
                    onClick={() => handleClickAllergy('food_containing_Sulfite')}
                  >
                    아황산 포함식품
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={resetPhotos}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
              handleNext(); // 다음 페이지로 이동
            }}>
              <div className="button_text" > 등록하기 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### User registration - Complete.js
* This page tells you that your registration has been completed.

```
export default function FaceReco() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const inputValue = location.state.inputValue;
    const PhoneNumber = location.state.PhoneNumber;
    const selectedItemId = location.state.selectedItemId;
    const selectedReligion = location.state.selectedReligion;

    const goback = () => {
        navigate('/', { state: { photos: [] } });
    };

    return (
        <div>
            <div>
                <header>Easy KIOSK</header>
            </div>
            <div>
                <div className="Top_text">
                    <div className="title"> 내 정보 등록하기 </div>
                </div>
                <div className="Middle_Menu">
                    <div id="inner-bg_2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                            <path d="M32.2471 14.6224C32.98 13.8895 34.1689 13.8895 34.9018 14.6224C35.6347 15.3556 35.6347 16.5444 34.9018 17.2774L20.8029 31.3768C20.0697 32.1097 18.8809 32.1097 18.1479 31.3768L11.0982 24.3271C10.3653 23.5942 10.3653 22.4053 11.0982 21.6724C11.8314 20.9392 13.0202 20.9392 13.7532 21.6724L19.4754 27.3947L32.2471 14.6224ZM22.9999 0.5C29.2122 0.5 34.8378 3.01882 38.9095 7.09052C42.9812 11.162 45.5 16.7878 45.5 22.9999C45.5 29.2129 42.9814 34.8378 38.9095 38.9095C34.8378 42.9812 29.2122 45.5 22.9999 45.5C16.7871 45.5 11.162 42.9814 7.09052 38.9095C3.01831 34.8378 0.5 29.2129 0.5 22.9999C0.5 16.7878 3.01882 11.162 7.09052 7.09052C11.162 3.01831 16.7871 0.5 22.9999 0.5ZM36.2548 9.7452C32.8629 6.35355 28.1764 4.25546 22.9999 4.25546C17.8231 4.25546 13.1366 6.35355 9.7452 9.7452C6.35355 13.1369 4.25546 17.8236 4.25546 22.9999C4.25546 28.1769 6.35355 32.8634 9.7452 36.2548C13.1366 39.6465 17.8231 41.7443 22.9999 41.7443C28.1764 41.7443 32.8629 39.6465 36.2548 36.2548C39.6465 32.8634 41.7443 28.1769 41.7443 22.9999C41.7443 17.8236 39.6465 13.1369 36.2548 9.7452Z" fill="#FF7A00" />
                        </svg>
                    <div className="middle_text">
                    등록이 완료되었습니다!
                    </div>
                    </div>
                </div>
                <div className="Bottom_button">
                    <div className="left_section">
                        <div id="left_button" onClick={() =>{
                            console.log(photos); // photos를 출력
                            console.log(PhoneNumber);
                            console.log(inputValue);
                            console.log(selectedItemId);
                            console.log(selectedReligion);
                            goback();
                            }}>
                            
                            <div className="button_text" > 메인으로 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

### User Recognition - 



### take_alter_command()

### run_lg()

#### YouTube

#### Wikipedia

#### Temperature and Weather

#### Time

#### Date

#### Create Calendar Events

#### List Calendar Events

#### Delete Calendar Events
