import React, { useState } from 'react';
import '../App.css';
import './Widget-Settings.css'

import background1 from '../assets/background-1.jpg';
import background2 from '../assets/background-2.jpg';
import background3 from '../assets/background-3.jpg';
import background4 from '../assets/background-4.jpg';

import avatar1 from '../assets/avatar-red.png';
import avatar2 from '../assets/avatar-black.png';
import avatar3 from '../assets/avatar-white.png'

type Props = {
  onBackgroundChange: (background: string) => void;
  onNavbarColorChange: (color: string) => void;
  onBrightnessChange: (newBrightness:number) => void;
  onAvatarChange: (avatar: string) => void;
};

const Settings: React.FC<Props> = ({onBackgroundChange,onNavbarColorChange,onBrightnessChange,onAvatarChange}) => {
  const [activeWidget, setActiveWidget] = useState<string>('Display');
  const [brightness, setBrightness] = useState<number>(100); // Local state for brightness

  const colors = [
    { name: 'Beige', rgba: 'rgba(240, 236, 228, 0.5)' },
    { name: 'Light Pink', rgba: 'rgba(255, 182, 193, 0.5)' },
    { name: 'Light Blue', rgba: 'rgba(173, 216, 230, 0.5)' }
  ];
  const backgrounds = [
    { name: 'Herit Red', image: background1 },
    { name: 'Active Red', image: background2 },
    { name: 'Active Pink', image: background3 },
    { name: 'Light Pink', image: background4 }
  ];
  const avatars = [
    {name: 'Red', image:avatar1},
    {name: 'Black', image: avatar2},
    {name: 'white', image:avatar3}
  ];

  const handleWidgetSelection = (widget: string) => {
    setActiveWidget(widget);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBrightness = Number(e.target.value);
    setBrightness(newBrightness); // Update local state
    onBrightnessChange(newBrightness); // Call parent component function
  };

  const renderWidget = () => {
    switch (activeWidget) {
      case 'Display':
        return <div className="widgetContent">Brightness Control
        <input className='brightness-input' 
          type="range"
          min="50"
          max="150"
          value={brightness} // Bind to local state
          onChange={handleBrightnessChange}/>
        </div>;
      case 'BackgroundChange':
        return (
          <>
            {backgrounds.map((background) => (
              <button
                key={background.name}
                className="widgetContent"
                style={{
                  backgroundImage: `url(${background.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #000',
                  margin: '5px'  
                }}
                onClick={() => onBackgroundChange(background.image)}
              >
                {background.name}
              </button>
            ))}
          </>
        );      
      case 'SidebarChange':
        return (
          <>
            {colors.map((color) => (
            <button className='widgetContent'
            key={color.rgba}
            style={{ backgroundColor: color.rgba, border: '1px solid #000', margin: '5px', padding: '10px' }}
            onClick={() => onNavbarColorChange(color.rgba)}
          >
            {color.name}
          </button>
        ))}
          </>
        );
        case 'UserProfile':
          return (
            <>
                {avatars.map((avatar) => (
                  <button className='widgetContent'
                    key={avatar.name}
                    style={{
                      backgroundImage: `url(${avatar.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '15vw',
                      height: '15vh',
                      border: 'none',
                      cursor: 'pointer',
                      margin: '10px'
                    }}
                    onClick={() => onAvatarChange(avatar.image)}
                  ></button>
                ))}
            </>
          );        
      case 'Reset':
        return <div className="widgetContent">Reset Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className='wrapper'>
    {/* Left Sidebar */}
      <div className="left-sidebar ">
          <button
            onClick={() => handleWidgetSelection('Display')}
            className={`button ${activeWidget === 'Display' ? 'buttonActive' : ''}`}
          >
            Display
          </button>
          <button
            onClick={() => handleWidgetSelection('SidebarChange')}
            className={`button ${activeWidget === 'SidebarChange' ? 'buttonActive' : ''}`}
          >
            Sidebar Change
          </button>
          <button
            onClick={() => handleWidgetSelection('BackgroundChange')}
            className={`button ${activeWidget === 'BackgroundChange' ? 'buttonActive' : ''}`}
          >
            BackGrnd Change
          </button>
          <button
            onClick={() => handleWidgetSelection('UserProfile')}
            className={`button ${activeWidget === 'UserProfile' ? 'buttonActive' : ''}`}
          >
            User Profile
          </button>
        </div>

      <div className="container">
        {/* Main Content Area */}
        <div className="contentArea">
          {renderWidget()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
