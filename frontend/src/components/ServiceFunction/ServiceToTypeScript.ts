import { fetchWeatherData } from "./ServiceFunction";

export async function getWeatherData(location: string,token: string): Promise<any> {
  try {
    const data = await fetchWeatherData(location,token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error)); 
    }
  }
}

// Import JavaScript functions
import { callWebOSService } from "./ServiceFunction";

export async function fetchVideoUrl(): Promise<string> {
  const serviceUrl = "luna://com.idleview.app/getVideoURL";
  const params = {}; // Add additional parameters here if you need them

  try {
    const response = await callWebOSService(serviceUrl, params);
    return response.videoUrl; // Return Video URL
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`fetchVideoUrl Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

import { setToken } from "./ServiceFunction";

export async function settoken(token:string): Promise<string> {

  try {
    const response = await setToken(token);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`fetchVideoUrl Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}
