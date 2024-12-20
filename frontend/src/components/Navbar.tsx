import './Navbar.css';
import avatarImg from '../assets/avatar.png';
import logoutButtonImg from '../assets/log_out.png';
import addButtonImg from '../assets/add.png';
import settingsButtonImg from '../assets/settings.png';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSettingsClick: () => void;
  onAddButtonClick: () => void;
  style?: React.CSSProperties; // Accepts custom styling
  avatar?: string;
};

const Navbar: React.FC<Props> = ({ onSettingsClick, onAddButtonClick, style,avatar }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/login');
  };

  return (
    <div className="sidebar" style={{...style}}> {/* Apply the style prop here */}
      <button>
      <img className='avatar' src={avatar || avatarImg} alt="Profile" />
      </button>
      <button onClick={onAddButtonClick}>
        <img src={addButtonImg} alt="Add Widgets" />
      </button>
      <button onClick={onSettingsClick}>
        <img src={settingsButtonImg} alt="Settings" />
      </button>
      <button onClick={handleLogOut}>
        <img src={logoutButtonImg} alt="Exit" />
      </button>
    </div>
  );
};

export default Navbar;
