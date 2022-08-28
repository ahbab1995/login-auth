import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    
      <Navbar bg="light" expand="lg">
        <Container>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="me-3" to="/">Home</Link>
              <Link  to="/Login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
};

export default Header;
