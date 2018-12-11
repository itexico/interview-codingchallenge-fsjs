import React from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';

class Header extends React.Component {
   
    render() {
        return (
            <Navbar className="row">
                <NavbarBrand href="/" >
                        <h1>
                        Interview Challenge
                        </h1>
                </NavbarBrand>
            </Navbar>
        );
    };
};

export default Header;