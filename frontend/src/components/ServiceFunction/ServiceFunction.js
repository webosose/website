const bridge = new WebOSServiceBridge();

export function fetchWeatherData(location,token) {
  console.log("fetchdatacalled");
  return new Promise((resolve, reject) => {
    console.log("[fetchWeatherData] Called with location:", location);

    if (!location) {
      console.error("[fetchWeatherData] Error: Location parameter is required.");
      reject("Location parameter is required.");
      return;
    }

    if (!token) {
      console.error("[fetchWeatherData] Error: Token parameter is required.");
      reject("Token parameter is required.");
      return;
    }

    const serviceURI = "luna://com.idleview.app.service/fetchWeatherData";
    const params = JSON.stringify({ location, token });

    console.log("[fetchWeatherData] Preparing to call service:", serviceURI, "with params:", params);

    
    bridge.onservicecallback = (response) => {
      console.log("[fetchWeatherData] Service callback received:", response);

      try {
        const parsedResponse = JSON.parse(response);

        if (parsedResponse.returnValue) {
          console.log("[fetchWeatherData] Success response data:", parsedResponse.data);
          resolve(parsedResponse.data);
        } else {
          console.error("[fetchWeatherData] Error response:", parsedResponse.errorText);
          reject(parsedResponse.errorText || "Unknown error occurred.");
        }
      } catch (error) {
        console.error("[fetchWeatherData] Failed to parse response:", error);
        reject("Invalid response format.");
      }
    };

    console.log("[fetchWeatherData] Calling service...");
    bridge.call(serviceURI, params);
  });
}

export function callWebOSService(serviceUrl, params = {}) {
  return new Promise((resolve, reject) => {

    bridge.onservicecallback = (response) => {
      try {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.returnValue) {
          resolve(parsedResponse);
        } else {
          reject(
            new Error(
              `Service Error: ${parsedResponse.errorText || "Unknown error"}`
            )
          );
        }
      } catch (error) {
        reject(new Error(`Parsing Error: ${String(error)}`));
      }
    };

    bridge.call(serviceUrl, JSON.stringify(params));
  });
}

export function setToken(token) {
  return new Promise((resolve, reject) => {
    console.log("[setToken] Setting token:", token);

    if (!token) {
      console.error("[setToken] Error: Token is missing.");
      reject("Token parameter is required.");
      return;
    }

    const serviceURI = "luna://com.idleview.app.service/setToken";
    const params = JSON.stringify({ token });

    console.log("[setToken] Preparing to call service:", serviceURI, "with params:", params);

    bridge.onservicecallback = (response) => {
      console.log("[setToken] Service callback received:", response);

      try {
        const parsedResponse = JSON.parse(response);

        if (parsedResponse.returnValue) {
          console.log("[setToken] Success response data:", parsedResponse.token);
          resolve(parsedResponse.token);
        } else {
          console.error("[setToken] Error response:", parsedResponse.errorText);
          reject(parsedResponse.errorText || "Unknown error occurred.");
        }
      } catch (error) {
        console.error("[setToken] Failed to parse response:", error);
        reject("Invalid response format.");
      }
    };

    console.log("[setToken] Calling service...");
    bridge.call(serviceURI, params);
  });
}


