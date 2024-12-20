 //import { name } from "./package.json";
 const Service = require("webos-service");
const { get, post } = require("axios");
const pkgInfo = require("./package.json");
 

 const BASE_URL = "http://14.46.254.67:3000";

 // Initialize the service
const service = new Service(pkgInfo.name);

// Token variable to store the authentication token
 let token = "";

 /**
  * Fetch weather data for a specific location.
  * Exposed as a callable service method.
  */
 service.register("fetchWeatherData", async (message) => {
  const { location } = message.payload;

  if (!location) {
    message.respond({
      returnValue: false,
      errorText: "Location parameter is required.",
    });

    if (!token) {
      throw new Error("User not authenticated. Token missing.");
    }

    return;
  }
  

  console.log("token:", token);
  console.log("location:", location);

  try {
    
    const response = await get(`${BASE_URL}/widget/weather`, {
      params: { location },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.respond({
      returnValue: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message,"token",token,"location",location);

    message.respond({
      returnValue: false,
      errorText: error.message,
    });
  }
});

 /**
  * Save a weather widget configuration.
  * Exposed as a callable service method.
  */
 service.register("saveWeatherWidget", async (message) => {
   console.log("Saving weather widget configuration...");
   const config = message.payload.config;

   if (!config) {
     message.respond({
       returnValue: false,
       errorText: "Config parameter is missing.",
     });
     return;
   }

   try {
     const response = await post(
       `${BASE_URL}/widget/add`,
       {
         widget_type: "weather",
         config,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );

     message.respond({
       returnValue: true,
       data: response.data,
     });
   } catch (error) {
     console.error("Error saving widget:", error.message);
     message.respond({
       returnValue: false,
      errorText: error.message,
     });
   }
 });

 /**
  * Set the authentication token.
  */
 service.register("setToken", (message) => {
   console.log("Setting authentication token...");
   token = message.payload.token || "";

   if (!token) {
     message.respond({
       returnValue: false,
       errorText: "Token is missing.",
     });
     return;
   }

   message.respond({
     returnValue: true,
     token,
   });
 });
 

   let currentIndex = 0;

  const videoUrls = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ];

// 비디오 URL을 반환하는 서비스 메서드
  service.register("getVideoURL", (message) => {
    const videoUrl = videoUrls[currentIndex];
    currentIndex = (currentIndex + 1) % videoUrls.length;

    message.respond({
      returnValue: true,
      videoUrl,
  });
});
  
module.exports = {
  service
};
  
