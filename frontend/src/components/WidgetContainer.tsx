// WidgetsContainer.tsx
import React from 'react';
import Draggable from 'react-draggable';
import { Clock } from './Widgets/Clock/Clock';
import WeatherWidget from './Widgets/WeatherWidget';
import BasicCalendar from './Widgets/Calendar/BasicCalendar';
import MediaPlayer from './Widgets/MediaPlayer/MediaPlayer';

// Define widget type
type Widget = { id: number; type: string; x: number; y: number };

type Props = {
  widgets: Widget[];
};

const WidgetsContainer: React.FC<Props> = ({ widgets }) => {
  const nodeRef = React.useRef(null);
  return (
    <div className='noglobal'>
      {widgets.map((widget) => (
        <Draggable nodeRef={nodeRef} key={widget.id} defaultPosition={{ x: widget.x, y: widget.y }}>
          <div ref={nodeRef} className='noglobal'>
            {widget.type === 'Time' && <Clock />} {/* Clock component */}
            {widget.type === 'Media' && <MediaPlayer />}
            {widget.type === 'Calendar' && <BasicCalendar />}
            {widget.type === 'Weather' && <WeatherWidget />} {/* Weather widget */}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default WidgetsContainer;
