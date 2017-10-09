import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


const Navigation = () =>{
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="https://github.com/rkobismarck/interview-codingchallenge-fsjs">List App</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem href="#">GitHub Repo</NavItem>
      </Nav>
    </Navbar>
  );
}


export default Navigation;