import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Navbar.Brand >
                My Favorites
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/favorites">
                        Favorites
                    </Nav.Link>
                </Nav>
                <Nav >
                    <Nav.Link as={NavLink} to="/login">
                        Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register">
                        Register
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/account">
                        My account
                    </Nav.Link>
                    {/* <Nav.Link as={NavLink} to="/logout">
                        Logout
                    </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}