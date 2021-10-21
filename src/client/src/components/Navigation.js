import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import routes from '../helpers/routes';
import userAuth from '../auth/userAuth';


export default function Navigation() {
    const { isLogged, logout } = userAuth();

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Navbar.Brand >
                My Favorites
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={routes.favorites}>
                        Favorites
                    </Nav.Link>
                </Nav>
                <Nav >

                    {!isLogged() ? (
                        <NavDropdown title="Account" >
                            <NavDropdown.Item as={NavLink} to={routes.login}>Login</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to={routes.register}>Register</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <NavDropdown title="Account" >
                            <NavDropdown.Item as="button" to={routes.home} onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}