// AddWidgets.tsx
import React, { useState } from 'react';
import './Widget-Settings.css';
import { Clock } from './Widgets/Clock/Clock';
import WeatherWidget from './Widgets/WeatherWidget';
import BasicCalendar from './Widgets/Calendar/BasicCalendar';
import MediaPlayer from './Widgets/MediaPlayer/MediaPlayer';

type Props = {
  onAddWidget: (widgetType: string) => void;
};

const AddWidgets: React.FC<Props> = ({ onAddWidget }) => {
  const [activeWidget, setActiveWidget] = useState<string>('Media');

  const handleWidgetSelection = (widget: string) => {
    setActiveWidget(widget);
  };

  const renderWidget = () => {
    switch (activeWidget) {
      case 'Media':
        return <div className="widgetContent"><MediaPlayer/></div>;
      case 'Calendar':
        return <div className="widgetContent"><BasicCalendar/></div>;
      case 'Weather':
        return <div className="widgetContent">
          <WeatherWidget/>
        </div>;
      case 'Time':
        return (
          <div className="widgetContent">
            <Clock />
          </div>
        );
      case 'More':
        return <div className="widgetContent">More Widget Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className='wrapper'>
      <div className="left-sidebar">
        <button
          onClick={() => handleWidgetSelection('Media')}
          className={`button ${activeWidget === 'Media' ? 'buttonActive' : ''}`}
        >
          Media
        </button>
        <button
          onClick={() => handleWidgetSelection('Calendar')}
          className={`button ${activeWidget === 'Calendar' ? 'buttonActive' : ''}`}
        >
          Calendar
        </button>
        <button
          onClick={() => handleWidgetSelection('Weather')}
          className={`button ${activeWidget === 'Weather' ? 'buttonActive' : ''}`}
        >
          Weather
        </button>
        <button
          onClick={() => handleWidgetSelection('Time')}
          className={`button ${activeWidget === 'Time' ? 'buttonActive' : ''}`}
        >
          Time
        </button>
        
      </div>
      <div className="container">
        <div className="contentArea" onClick={() => onAddWidget(activeWidget)} >
          {renderWidget()}
        </div>
      </div>
    </div>
  );
};

export default AddWidgets;
