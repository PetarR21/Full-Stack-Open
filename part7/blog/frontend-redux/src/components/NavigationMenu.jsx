import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';

const NavigationMenu = () => {
  return (
    <div className='menu'>
      <Link className='menuItem' to='/'>
        blogs
      </Link>
      <Link className='menuItem' to='/users'>
        users
      </Link>
      <LoggedUser className='menuItem' />
    </div>
  );
};

export default NavigationMenu;
