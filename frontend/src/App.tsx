  import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  import HomePage from "./screens/HomePage";
  import LoginPage from "./screens/LoginPage";
  import SignUpPage from "./screens/SignUpPage";
  import { useState } from "react";

  import background1 from './assets/background-1.jpg';

  function App() {
    const [brightness, setBrightness] = useState<number>(100);
    const [background, setBackground] = useState<string>(background1); // Inital background


    // Adjust the brightness based on slider input
    const changeBrightness = (newBrightness: number) => {
      setBrightness(newBrightness);
    };

    const changeBackground = (background: string) => {
      setBackground(background);
    };

    return (
      <Router>
        <div
          className="app brightness-100"
          style={{
            backgroundImage: `url(${background})`,
            filter: `brightness(${brightness}%)`
          }}
        >
          <Routes>
            {/* Redirect from '/' to '/home' */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={<HomePage onBackgroundChange={changeBackground} onBrightnessChange={changeBrightness} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;
