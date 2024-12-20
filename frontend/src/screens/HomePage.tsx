import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddWidgets from '../components/AddWidgets';
import Settings from '../components/Settings';
import WidgetsContainer from '../components/WidgetContainer';
import styles from '../components/Overlay.module.css';

type Widget = { id: number; type: string; x: number; y: number };
type Props = {
  onBackgroundChange: (background: string) => void;
  onBrightnessChange: (newBrightness: number) => void;
};

const HomePage: React.FC<Props> = ({ onBackgroundChange, onBrightnessChange }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [widgetCounter, setWidgetCounter] = useState(0);
  const [activeComponent, setActiveComponent] = useState<'settings' | 'addWidget' | null>(null);
  const [navbarColor, setNavbarColor] = useState('rgba(240, 236, 228, 0.5)'); // Default Navbar color
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const addWidget = (type: string) => {
    setWidgets([...widgets, { id: widgetCounter, type, x: 0, y: 0 }]);
    setWidgetCounter(widgetCounter + 1);
  };

  const toggleSettings = () => {
    setActiveComponent((prev) => (prev === 'settings' ? null : 'settings'));
  };

  const toggleAddWidget = () => {
    setActiveComponent((prev) => (prev === 'addWidget' ? null : 'addWidget'));
  };

  const changeNavbarColor = (color: string) => {
    setNavbarColor(color); // Update the Navbar color
  };

  const changeAvatar = (avatar: string) => {
    setSelectedAvatar(avatar); // Store selected avatar
  };
  
  return (
    <>
      <Navbar
        onSettingsClick={toggleSettings}
        onAddButtonClick={toggleAddWidget}
        style={{ backgroundColor: navbarColor }}
        avatar={selectedAvatar}
      />

      {activeComponent === 'settings' && (
        <div className={styles.overlay}>
          <Settings 
            onBackgroundChange={onBackgroundChange} 
            onNavbarColorChange={changeNavbarColor} 
            onBrightnessChange={onBrightnessChange} 
            onAvatarChange={changeAvatar}
          />
        </div>
      )}
      {activeComponent === 'addWidget' && (
        <div className={styles.overlay}>
          <AddWidgets onAddWidget={addWidget} />
        </div>
      )}
      <WidgetsContainer widgets={widgets} />
    </>
  );
};

export default HomePage;
