import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase.init";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }
    });
  }, []);
  const handleLogout = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login')
    }).catch((error) => {
     console.log(error)
    });
    
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="me-3" to="/">
                Home
              </Link>
              {currentUser?.email?(<Button onClick={handleLogout}>Logout</Button>):(<Link to="/Login">Login</Link>)}
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
