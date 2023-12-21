import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';
import { Nav, Navbar } from 'react-bootstrap';

const NavigationMenu = () => {
  const padding = {
    padding: 10,
  };

  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>
                users
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <LoggedUser />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationMenu;
