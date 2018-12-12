import React from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'

const Header = (props) => (
	<div>
		<Navbar brand='Miguel Moran' href='/' left>
		  <NavItem href='/'>Productos</NavItem>
		</Navbar>

	</div>

);

export default Header;